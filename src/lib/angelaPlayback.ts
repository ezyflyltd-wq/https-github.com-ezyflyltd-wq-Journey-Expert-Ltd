// One owner for every pending request, playback source and device utterance.
// cancel() also settles pending playback, so a closed panel cannot resume later.
export class AngelaPlayback {
  private controller: AbortController | null = null;
  private audio: HTMLAudioElement | null = null;
  private context: AudioContext | null = null;
  private source: AudioBufferSourceNode | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private settle: (() => void) | null = null;

  prime() {
    const Ctor = window.AudioContext || (window as any).webkitAudioContext;
    try {
      if (Ctor && (!this.context || this.context.state === 'closed')) this.context = new Ctor();
      if (this.context?.state === 'suspended') void this.context.resume().catch(() => {});
    } catch { /* HTMLAudio remains available */ }
  }

  cancel() {
    this.controller?.abort();
    this.controller = null;
    this.settle?.();
    this.settle = null;
    if (this.utterance) {
      this.utterance.onstart = this.utterance.onend = this.utterance.onerror = null;
      this.utterance = null;
    }
    window.speechSynthesis?.cancel();
    if (this.source) {
      this.source.onended = null;
      try { this.source.stop(); this.source.disconnect(); } catch { /* ended */ }
      this.source = null;
    }
    if (this.audio) {
      this.audio.onended = this.audio.onerror = null;
      this.audio.pause();
      if (this.audio.src.startsWith('blob:')) URL.revokeObjectURL(this.audio.src);
      this.audio.removeAttribute('src');
      this.audio.load();
      this.audio = null;
    }
  }

  async play(text: string, voice: SpeechSynthesisVoice | null,
    fetchSpeech: (text: string, signal: AbortSignal) => Promise<Blob>,
    onState: (speaking: boolean) => void, onError: (error: unknown) => void) {
    this.cancel();
    this.prime();
    const controller = new AbortController();
    this.controller = controller;
    const current = () => this.controller === controller && !controller.signal.aborted;
    const clean = text.replace(/[*#_`]/g, '').replace(/https?:\/\/\S+/g, '').trim();
    if (!clean) return;
    try {
      // Prefer a free local browser voice even when the caller has not supplied
      // one yet (voice enumeration is asynchronous on several mobile browsers).
      // Keep cloud audio as fallback if local speech fails to start.
      const synth = window.speechSynthesis;
      const isBangla = /[\u0980-\u09FF]/.test(clean);
      const wanted = isBangla ? 'bn' : 'en';
      // Some mobile browsers register installed voices only after voiceschanged.
      // Wait briefly before falling back to quota-limited cloud TTS.
      if (synth && synth.getVoices().length === 0) {
        await new Promise<void>(resolve => {
          let settled = false;
          const done = () => {
            if (settled) return;
            settled = true;
            synth.removeEventListener('voiceschanged', done);
            clearTimeout(timer);
            resolve();
          };
          const timer = setTimeout(done, 650);
          synth.addEventListener('voiceschanged', done);
          synth.getVoices();
        });
      }
      if (!current()) return;
      const voices = synth?.getVoices() || [];
      const feminine = /female|woman|zira|samantha|victoria|aria|jenny|sonia|ava|allison|karen|susan|hazel|libby|natasha|serena|moira|fiona|tessa|veena|heera|tania|priya|kalpana|nabanita|tanishaa|lekha|sangeeta/i;
      const preferredVoice = voice && voice.lang.toLowerCase().startsWith(wanted) && feminine.test(voice.name) ? voice
        : voices.find(v => v.lang.toLowerCase().startsWith(wanted) && feminine.test(v.name))
        || null;
      if (synth && preferredVoice) {
        const played = await new Promise<boolean>((resolve) => {
          const utterance = new SpeechSynthesisUtterance(clean);
          this.utterance = utterance;
          let timer: ReturnType<typeof setTimeout>;
          const finish = (ok: boolean) => {
            clearTimeout(timer);
            utterance.onstart = utterance.onend = utterance.onerror = null;
            if (this.utterance === utterance) this.utterance = null;
            this.settle = null;
            resolve(ok);
          };
          this.settle = () => finish(false);
          if (preferredVoice) utterance.voice = preferredVoice;
          utterance.lang = preferredVoice?.lang || (isBangla ? 'bn-BD' : 'en-US');
          utterance.rate = 1.03;
          utterance.onstart = () => {
            if (!current()) return finish(false);
            clearTimeout(timer);
            onState(true);
            timer = setTimeout(() => finish(false), 120000);
          };
          utterance.onend = () => finish(true);
          utterance.onerror = () => finish(false);
          // Some devices accept speak() without ever starting or firing an error.
          timer = setTimeout(() => finish(false), 5500);
          try {
            window.speechSynthesis.resume();
            window.speechSynthesis.speak(utterance);
          } catch { finish(false); }
        });
        if (!current()) return;
        if (played) { onState(false); return; }
        window.speechSynthesis.cancel();
      }
      // Keep complete answers; split only at safe lengths required by the API.
      const chunks = clean.match(/[\s\S]{1,1100}(?:\s|$)|[\s\S]{1,1100}/g) || [clean];
      for (const chunk of chunks) {
        const blob = await fetchSpeech(chunk.trim(), controller.signal);
        if (!current()) return;
        const context = this.context;
        if (context?.state === 'suspended') await context.resume().catch(() => {});
        if (!current()) return;
        let decoded: AudioBuffer | null = null;
        if (context?.state === 'running') {
          try { decoded = await context.decodeAudioData(await blob.arrayBuffer()); } catch { /* use HTMLAudio */ }
        }
        if (!current()) return;
        await new Promise<void>((resolve, reject) => {
          let timer: ReturnType<typeof setTimeout>;
          const finish = (error?: unknown) => {
            clearTimeout(timer);
            this.settle = null;
            error ? reject(error) : resolve();
          };
          this.settle = () => finish();
          timer = setTimeout(() => finish(new Error('playback_timeout')), 120000);
          if (decoded && context) {
            const source = context.createBufferSource();
            source.buffer = decoded;
            source.connect(context.destination);
            this.source = source;
            source.onended = () => {
              if (this.source === source) this.source = null;
              source.disconnect();
              finish();
            };
            source.start();
            onState(true);
          } else {
            const audio = new Audio(URL.createObjectURL(blob));
            this.audio = audio;
            audio.onended = () => { URL.revokeObjectURL(audio.src); finish(); };
            audio.onerror = () => finish(new Error('audio_playback_failed'));
            void audio.play().then(() => { if (current()) onState(true); }).catch(finish);
          }
        });
        if (!current()) return;
      }
      if (current()) onState(false);
    } catch (error) {
      if (!current()) return;
      // Recover from an unavailable cloud voice using a locally installed female voice.
      const synth = window.speechSynthesis;
      const bn = /[\u0980-\u09FF]/.test(clean);
      const femaleNames = /female|woman|zira|samantha|victoria|aria|jenny|sonia|ava|allison|karen|susan|hazel|libby|natasha|serena|moira|fiona|tessa|veena|heera|tania|priya|kalpana|nabanita|tanishaa|lekha|sangeeta/i;
      const localVoice = synth?.getVoices().find(v =>
        v.lang.toLowerCase().startsWith(bn ? 'bn' : 'en') && femaleNames.test(v.name));
      if (synth && localVoice) {
        try {
          await new Promise<void>((resolve, reject) => {
            const u = new SpeechSynthesisUtterance(clean);
            this.utterance = u;
            u.voice = localVoice;
            u.lang = localVoice.lang;
            let finished = false;
            const finish = (failed: boolean) => {
              if (finished) return;
              finished = true;
              clearTimeout(watchdog);
              u.onend = u.onerror = u.onstart = null;
              this.settle = null;
              if (this.utterance === u) this.utterance = null;
              failed ? reject(new Error('local_voice_failed')) : resolve();
            };
            const watchdog = setTimeout(() => finish(true), 45000);
            this.settle = () => finish(false);
            u.onstart = () => { if (current()) onState(true); };
            u.onend = () => finish(false);
            u.onerror = () => finish(true);
            synth.cancel();
            synth.resume();
            synth.speak(u);
          });
          if (current()) onState(false);
          return;
        } catch { /* report the original upstream failure */ }
      }
      if (current()) { this.cancel(); onState(false); onError(error); }
    }
  }
}
