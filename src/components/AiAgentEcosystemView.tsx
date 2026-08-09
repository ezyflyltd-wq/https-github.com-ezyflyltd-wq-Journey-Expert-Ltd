import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  Globe,
  Database,
  ShieldCheck,
  Cpu,
  MessageSquare,
  Volume2,
  RefreshCw,
  Search,
  CheckCircle2,
  Play,
  ArrowRight,
  Sliders,
  FileText,
  Lock,
  Layers,
  Send,
  Copy,
  Check,
  BarChart3,
  Terminal,
  Activity,
  Users,
  Building2,
  DollarSign,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  Headphones,
} from 'lucide-react';

export const AiAgentEcosystemView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'agent-directory' | 'agent-sandbox' | 'knowledge-vault' | 'automation-engine' | 'governance-analytics'
  >('agent-directory');

  const [aiOverview, setAiOverview] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sandbox Interactive State
  const [selectedAgentId, setSelectedAgentId] = useState<string>('angela-ai');
  const [sandboxPrompt, setSandboxPrompt] = useState<string>(
    'Assalamu Alaikum Angela! I need a 7-day luxury itinerary for London & Edinburgh with Biman Bangladesh business class flights and visa documentation assistance.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [sandboxResponse, setSandboxResponse] = useState<any>(null);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  // Search Filter State
  const [knowledgeSearch, setKnowledgeSearch] = useState<string>('');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  useEffect(() => {
    fetchAiOverview();
  }, []);

  const fetchAiOverview = () => {
    setLoading(true);
    fetch('/api/ai-agents/overview')
      .then((res) => res.json())
      .then((data) => {
        setAiOverview(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load AI Agents overview:', err);
        setLoading(false);
      });
  };

  const handleRunSandboxPrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let agentName = 'Angela AI';
      let outputText = '';
      let toolCalls = [];

      if (selectedAgentId === 'angela-ai') {
        agentName = 'Angela AI (Customer Experience)';
        outputText =
          'Wa Alaikum Assalamu! It is my pleasure to assist you with your UK luxury journey. I have searched Biman Bangladesh Airlines (DAC-LHR direct flight BG201) in Business Class for ৳320,000 BDT return. I have also generated a 7-day London & Edinburgh itinerary with boutique stays near Mayfair and The Balmoral Edinburgh. Our UK Visa Specialist team has prepared your document checklist.';
        toolCalls = ['GDS_FLIGHT_SEARCH (Sabre)', 'ITINERARY_GENERATOR', 'UK_VISA_CHECKLIST_FETCH'];
      } else if (selectedAgentId === 'visa-ai') {
        agentName = 'Visa Advisor AI';
        outputText =
          'UK Visitor Visa requirements verified for Bangladesh Passport Holder: 1) 6-Month Bank Statement with minimum ৳800,000 liquid balance, 2) Trade License / NOC from Employer, 3) Property & Asset proof. Verified against latest UK Visas & Immigration (UKVI) 2026 regulations.';
        toolCalls = ['EMBASSY_DATABASE_LOOKUP (UKVI)', 'DOCUMENT_VERIFIER'];
      } else if (selectedAgentId === 'study-ai') {
        agentName = 'Study Abroad Counselor AI';
        outputText =
          'Based on your profile, top matched UK universities for Autumn 2026 intake: 1) University of Manchester (MSc Data Science - ৳2.4M BDT tuition, ৳4,000 GBP Merit Scholarship available), 2) University of Leeds. CAS deposit timeline: 15 August 2026.';
        toolCalls = ['UNIVERSITY_CATALOG_QUERY', 'SCHOLARSHIP_MATCH_ENGINE'];
      } else {
        agentName = 'Journey AI Agent';
        outputText =
          'Query successfully processed through Journey Expert RAG Knowledge Vault. All parameters validated for 100% compliance with company SOPs and NBR Bangladesh Tax Codes.';
        toolCalls = ['RAG_VECTOR_SEARCH', 'ENTERPRISE_ERP_SYNC'];
      }

      setSandboxResponse({
        agentName,
        response: outputText,
        latencyMs: Math.floor(Math.random() * 150) + 320,
        confidenceScore: '99.4%',
        toolCalls,
        vectorMemoryContext: 'Matched 14 Vector Embeddings from Journey Knowledge Vault',
      });
      setIsGenerating(false);
    }, 1100);
  };

  const handleCopyResponse = () => {
    if (sandboxResponse) {
      navigator.clipboard.writeText(sandboxResponse.response);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - AI AGENT ECOSYSTEM */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • ENTERPRISE AI AGENT WORKFORCE (PART 32)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <Bot className="w-3 h-3 text-[#C8A14A]" />
                <span>13 GEMINI MULTI-AGENTS • 94.8% AUTO RESOLUTION • TRILINGUAL</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              AI Agent Ecosystem & Intelligent Workforce Platform
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Autonomous multi-agent intelligence suite powering Angela AI, Travel Planning, Flight Fare Comparison, Embassy Visa Audits, Study Abroad Guidance & CEO Business Intelligence.
            </p>
          </div>

          {/* Quick AI Metrics Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>24h Conversations:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {(aiOverview?.platformMetrics?.conversationsHandled24h || 18450).toLocaleString()} Chats
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Auto Resolution Rate:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {aiOverview?.platformMetrics?.automationResolutionRatePct || '94.8%'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Monthly Cost Savings:</span>
              <span className="text-white font-mono font-black text-sm">
                ৳{((aiOverview?.platformMetrics?.estimatedMonthlyCostSavedBDT || 4850000) / 1000000).toFixed(2)}M BDT
              </span>
            </div>

            <button
              onClick={fetchAiOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Agent Telemetry & RAG Vault</span>
            </button>
          </div>
        </div>

        {/* Global Key AI Workforce Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Active Autonomous Agents</span>
            <span className="text-lg font-black text-white font-mono">
              {aiOverview?.platformMetrics?.totalActiveAgents || 13} Agents
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Avg AI Response Latency</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {aiOverview?.platformMetrics?.avgResponseLatencyMs || 420}ms
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Vector RAG Embeddings</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              142,000 Docs
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Trilingual Voice & Text</span>
            <span className="text-sm font-black text-white font-mono">
              EN / BN / AR
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Guardrail Security</span>
            <span className="text-sm font-black text-emerald-300 font-mono">
              100% Passed
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Model Core</span>
            <span className="text-sm font-black text-emerald-300 font-mono">
              Gemini 2.5 Flash / Pro
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('agent-directory')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'agent-directory'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Multi-Agent Ecosystem Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('agent-sandbox')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'agent-sandbox'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Live Interactive Agent Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('knowledge-vault')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'knowledge-vault'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Database className="w-4 h-4 text-[#C8A14A]" />
          <span>3. RAG Knowledge & Vector Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('automation-engine')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'automation-engine'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Zap className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Trilingual Automation Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('governance-analytics')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'governance-analytics'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Governance, Guardrails & Analytics</span>
        </button>
      </div>

      {/* TAB 1: MULTI-AGENT ECOSYSTEM HUB */}
      {activeTab === 'agent-directory' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Autonomous Agent Workforce Roster
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Specialized Multi-Agent Roster & Functional Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiOverview?.agentDirectory?.map((agent: any) => (
              <div key={agent.id} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-4">
                <div className="border-b border-[#ECECEC] pb-3 flex items-center justify-between">
                  <div>
                    <strong className="text-sm font-bold text-[#081C15] font-serif block">{agent.name}</strong>
                    <span className="text-[10px] text-[#666666]">{agent.category}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full">
                    {agent.status}
                  </span>
                </div>

                <p className="text-xs text-[#081C15] leading-relaxed">
                  {agent.role}
                </p>

                <div className="pt-2 border-t border-[#ECECEC] space-y-1 font-mono text-[11px] text-[#666666]">
                  <div className="flex justify-between">
                    <span>LLM Engine:</span>
                    <strong className="text-[#0B5D3B]">{agent.model}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Latency:</span>
                    <strong className="text-[#081C15]">{agent.latency}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>CSAT Rating:</span>
                    <strong className="text-amber-700">{agent.satisfaction}</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedAgentId(agent.id);
                    setActiveTab('agent-sandbox');
                  }}
                  className="w-full py-2 bg-[#081C15] hover:bg-[#0B5D3B] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1"
                >
                  <Play className="w-3 h-3 text-[#C8A14A]" />
                  <span>Launch in Sandbox</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE INTERACTIVE AGENT SANDBOX */}
      {activeTab === 'agent-sandbox' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Live AI Agent Execution Testing
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Interactive Multi-Agent Prompt Testing & Tool Inspection
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Sandbox Controls */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-4 border border-[#C8A14A]/30 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-[#C8A14A]" />
                  <strong className="font-serif font-black text-sm text-[#C8A14A]">
                    Agent Simulation Controls
                  </strong>
                </div>

                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all flex items-center space-x-1 ${
                    voiceEnabled ? 'bg-emerald-800 text-white' : 'bg-white/10 text-emerald-200'
                  }`}
                >
                  <Volume2 className="w-3 h-3 text-[#C8A14A]" />
                  <span>{voiceEnabled ? 'TTS Voice Active' : 'Voice Muted'}</span>
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-emerald-200 font-bold uppercase block mb-1">Select Active Agent:</label>
                  <select
                    value={selectedAgentId}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-[#C8A14A]"
                  >
                    <option value="angela-ai" className="text-black">Angela AI — Customer Experience Agent</option>
                    <option value="planner-ai" className="text-black">Travel Planner AI — Custom Itinerary & Route</option>
                    <option value="flight-ai" className="text-black">Flight Assistant AI — Multi-GDS Fare Comparison</option>
                    <option value="visa-ai" className="text-black">Visa Advisor AI — Embassy Document Audit</option>
                    <option value="study-ai" className="text-black">Study Abroad Counselor AI — University & Scholarship</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-200 font-bold uppercase block mb-1">User Prompt / Query:</label>
                  <textarea
                    rows={4}
                    value={sandboxPrompt}
                    onChange={(e) => setSandboxPrompt(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#C8A14A]"
                  />
                </div>

                <button
                  onClick={handleRunSandboxPrompt}
                  disabled={isGenerating}
                  className="w-full py-3.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Zap className={`w-4 h-4 text-[#C8A14A] ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Simulating Gemini Agent Response...' : 'Execute Agent Query'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: AI Response & Tool Execution Visualizer */}
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <strong className="font-serif font-black text-lg text-[#081C15]">Agent Response Telemetry</strong>
                {sandboxResponse && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                    {sandboxResponse.latencyMs}ms • Score: {sandboxResponse.confidenceScore}
                  </span>
                )}
              </div>

              {sandboxResponse ? (
                <div className="space-y-4 text-xs">
                  <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#ECECEC] pb-1">
                      <strong className="text-xs font-bold text-[#0B5D3B]">{sandboxResponse.agentName} Output</strong>
                      <button
                        onClick={handleCopyResponse}
                        className="text-[10px] text-[#081C15] font-bold hover:underline flex items-center space-x-1"
                      >
                        {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#C8A14A]" />}
                        <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-[#081C15] leading-relaxed font-sans">{sandboxResponse.response}</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#ECECEC] space-y-2 font-mono text-[11px]">
                    <span className="text-[10px] font-bold text-[#666666] uppercase block">Executed Tool Actions:</span>
                    <ul className="space-y-1">
                      {sandboxResponse.toolCalls?.map((tCall: string, tIdx: number) => (
                        <li key={tIdx} className="text-emerald-800 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{tCall}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-[10px] text-[#666666] italic">
                    {sandboxResponse.vectorMemoryContext}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-[#666666] space-y-2">
                  <Bot className="w-10 h-10 text-[#0B5D3B] mx-auto opacity-40" />
                  <p className="text-xs">Select an agent and prompt above, then click "Execute Agent Query".</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RAG KNOWLEDGE & VECTOR VAULT */}
      {activeTab === 'knowledge-vault' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Enterprise Vector Search Engine
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                RAG Knowledge Repository (142,000 Vector Embeddings)
              </h3>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#666666] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search knowledge vectors..."
                value={knowledgeSearch}
                onChange={(e) => setKnowledgeSearch(e.target.value)}
                className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0B5D3B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Indexed Knowledge Categories</strong>
              <ul className="space-y-2 text-xs">
                {aiOverview?.knowledgeBaseVault?.indexedCategories?.map((cat: string, cIdx: number) => (
                  <li key={cIdx} className="bg-white p-3 rounded-xl border border-[#ECECEC] flex items-center justify-between">
                    <span className="font-bold text-[#081C15]">{cat}</span>
                    <span className="text-emerald-700 font-mono font-bold text-[10px]">Indexed & Sync’d</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Vector Storage & Embeddings Sync</strong>
              <div className="p-4 bg-white rounded-xl border border-[#ECECEC] space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span>Total Vector Embeddings:</span>
                  <strong className="text-[#0B5D3B]">{aiOverview?.knowledgeBaseVault?.vectorEmbeddingsCount?.toLocaleString() || '142,000'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Vector Indexing Engine:</span>
                  <strong className="text-[#081C15]">Pinecone / Firestore Hybrid</strong>
                </div>
                <div className="flex justify-between">
                  <span>Last Automated Vault Refresh:</span>
                  <strong className="text-[#081C15]">{aiOverview?.knowledgeBaseVault?.lastSyncTimestamp}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TRILINGUAL AUTOMATION ENGINE */}
      {activeTab === 'automation-engine' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Omnichannel Event Trigger Workflows
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Automated Trilingual Communications (WhatsApp / SMS / Email)
            </h3>
          </div>

          <div className="space-y-3">
            {aiOverview?.recentAutomationWorkflows?.map((wf: any) => (
              <div key={wf.id} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] font-bold text-[#0B5D3B]">{wf.id}</span>
                    <strong className="text-sm font-bold text-[#081C15] font-serif">{wf.name}</strong>
                  </div>
                  <p className="text-xs text-[#666666]">
                    Active Automation Trigger • Trilingual Translation Enabled (EN/BN/AR)
                  </p>
                </div>

                <div className="flex items-center space-x-6 shrink-0 justify-between md:justify-end w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-[#ECECEC]">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-[#666666] uppercase block">24h Triggers</span>
                    <strong className="text-sm font-mono font-black text-[#081C15]">
                      {wf.triggers24h} Executions
                    </strong>
                  </div>

                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold font-mono px-3 py-1 rounded-xl">
                    {wf.successRate} Success
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GOVERNANCE, GUARDRAILS & ANALYTICS */}
      {activeTab === 'governance-analytics' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              AI Safety, Compliance & Performance Monitoring
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Prompt Guardrails, Audit Logs & Human-in-the-Loop Reviews
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Prompt Guardrail Security</strong>
              <div className="p-3 bg-white rounded-xl border border-[#ECECEC] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>PII Data Masking:</span>
                  <strong className="text-[#0B5D3B] font-bold">ACTIVE (100% Scrubbed)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Prompt Injection Filter:</span>
                  <strong className="text-[#0B5D3B] font-bold">0 Vulnerabilities Flagged</strong>
                </div>
                <div className="flex justify-between">
                  <span>Human-in-the-Loop Threshold:</span>
                  <strong className="text-amber-700 font-bold">&lt;85% Confidence Escalates</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Token Cost & Efficiency Optimization</strong>
              <div className="p-3 bg-white rounded-xl border border-[#ECECEC] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Avg Cost per 1k Chats:</span>
                  <strong className="text-[#0B5D3B]">৳14.50 BDT</strong>
                </div>
                <div className="flex justify-between">
                  <span>Caching Hit Ratio:</span>
                  <strong className="text-[#081C15]">82.4% Flash Cache</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
