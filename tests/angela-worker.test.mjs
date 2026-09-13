import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../workers/angela-worker.js';
const ctx={waitUntil(){}};
const request=(path,body)=>new Request('https://journeyexpertltd.com'+path,{method:'POST',headers:{Origin:'https://journeyexpertltd.com','Content-Type':'application/json'},body:JSON.stringify(body)});
test('shared Angela supplies company facts, keeps credentials out of URL and returns English for an English visa enquiry',async()=>{
 const original=globalThis.fetch;
 try{
 globalThis.fetch=async(url,options)=>{
 assert.equal(url.includes('test-secret'),false);
 assert.equal(options.headers['x-goog-api-key'],'test-secret');
 const body=JSON.parse(options.body);const prompt=body.systemInstruction.parts[0].text;
 assert.match(prompt,/189\/A/);assert.match(prompt,/JourneyExpertBD\.com/);assert.match(prompt,/Required response language: en/);
 return Response.json({candidates:[{content:{parts:[{text:JSON.stringify({reply:'We can guide visa enquiries.',language:'en',usedSources:['JEL Company Contact and Service Information']})}]}}]});
 };
 const result=await worker.fetch(request('/api/ai/voice-agent',{message:'What visa services do you offer?'}),{GEMINI_API_KEY:'test-secret'},ctx);
 assert.equal((await result.json()).mode,'ai');
 }finally{globalThis.fetch=original;}
});
test('shared voice route returns WAV using existing server credential',async()=>{
 const original=globalThis.fetch;
 try{globalThis.fetch=async()=>Response.json({candidates:[{content:{parts:[{inlineData:{mimeType:'audio/L16;rate=24000',data:'AAAAAA=='}}]}}]});
 const r=await worker.fetch(request('/api/angela/speech',{text:'আমি অ্যাঞ্জেলা'}),{GEMINI_API_KEY:'test-secret'},ctx);
 assert.equal(r.status,200);assert.equal(r.headers.get('content-type'),'audio/wav');
 assert.equal(new TextDecoder().decode((await r.arrayBuffer()).slice(0,4)),'RIFF');
 }finally{globalThis.fetch=original;}
});

