import React, { useState, useEffect } from 'react';
import {
  Network,
  Cpu,
  Key,
  Webhook,
  Shield,
  Activity,
  Server,
  Zap,
  Lock,
  Terminal,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Sliders,
  Code2,
  Copy,
  Check,
  Send,
  Globe,
  Database,
  Layers,
  BarChart3,
  Search,
  Eye,
  FileCode,
  DollarSign,
  CloudLightning,
} from 'lucide-react';

export const ApiGatewayView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'gateway-status' | 'travel-integrations' | 'developer-portal' | 'webhooks' | 'security-waf' | 'analytics-logs'
  >('gateway-status');

  const [gatewayData, setGatewayData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sandbox Tester State
  const [testEndpoint, setTestEndpoint] = useState('/api/v1/flights/search');
  const [testMethod, setTestMethod] = useState('POST');
  const [testRequestBody, setTestRequestBody] = useState(
    JSON.stringify(
      {
        origin: 'DAC',
        destination: 'LHR',
        departureDate: '2026-09-15',
        passengers: 1,
        cabinClass: 'Economy',
      },
      null,
      2
    )
  );
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Key Generator State
  const [newKeyName, setNewKeyName] = useState('Beximco Corporate API Key');
  const [keyRateLimit, setKeyRateLimit] = useState('500');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    fetchGatewayOverview();
  }, []);

  const fetchGatewayOverview = () => {
    setLoading(true);
    fetch('/api/gateway/overview')
      .then((res) => res.json())
      .then((data) => {
        setGatewayData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Gateway Overview:', err);
        setLoading(false);
      });
  };

  const handleExecuteSandboxCall = () => {
    setIsExecuting(true);
    setTestResponse(null);

    setTimeout(() => {
      setIsExecuting(false);
      if (testEndpoint.includes('flights')) {
        setTestResponse({
          status: 200,
          statusText: 'OK',
          latencyMs: 34,
          gatewayHeader: 'JEL-API-GW-NODE-04',
          data: {
            searchId: 'SEARCH-98214-GDS',
            executionTimeMs: 34,
            resultsCount: 3,
            flights: [
              { airline: 'Biman BG-201', route: 'DAC-LHR', fareBDT: 88500, gds: 'Sabre' },
              { airline: 'Emirates EK-583', route: 'DAC-DXB-LHR', fareBDT: 92400, gds: 'Amadeus' },
            ],
          },
        });
      } else if (testEndpoint.includes('hotels')) {
        setTestResponse({
          status: 200,
          statusText: 'OK',
          latencyMs: 48,
          gatewayHeader: 'JEL-API-GW-NODE-01',
          data: {
            hotelId: 'HB-77491',
            name: 'Athenee Hotel Bangkok A Luxury Collection',
            nightlyRateBDT: 18500,
            availability: 'GUARANTEED',
          },
        });
      } else {
        setTestResponse({
          status: 200,
          statusText: 'OK',
          latencyMs: 28,
          gatewayHeader: 'JEL-API-GW-NODE-02',
          data: {
            message: 'API Gateway Endpoint Standard Response OK',
            timestamp: new Date().toISOString(),
          },
        });
      }
    }, 600);
  };

  const handleGenerateKey = () => {
    const randomHex = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const newApiKey = `jel_live_${randomHex}`;
    setGeneratedKey(newApiKey);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - API GATEWAY & INTEGRATION HUB */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • API GATEWAY & INTEGRATION HUB (PART 25)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>OAuth 2.0 • GDS / NDC Adapters • 1,450 Req/sec • TLS 1.3</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Enterprise API Gateway & Partner Ecosystem
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Unified High-Throughput Integration Middleware Connecting Flight GDS (Sabre, Amadeus, Galileo, Duffel), Hotel Aggregators (Hotelbeds, Expedia), Payment Gateways (bKash, SSLCommerz, Stripe), University Systems & Gemini AI Services.
            </p>
          </div>

          {/* Quick Metrics Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Throughput Rate:</span>
              <span className="text-white font-mono font-black text-sm">
                {gatewayData?.gatewayStatus?.throughputRequestsPerSec || 1450} req/sec
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Average Latency:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {gatewayData?.gatewayStatus?.averageLatencyMs || 38} ms
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Gateway SLA Uptime:</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {gatewayData?.gatewayStatus?.gatewayUptimePercent || 99.99}%
              </span>
            </div>

            <button
              onClick={fetchGatewayOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Gateway Pipeline</span>
            </button>
          </div>
        </div>

        {/* Global Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Active API Connections</span>
            <span className="text-lg font-black text-white font-mono">
              {gatewayData?.gatewayStatus?.activeApiConnections || 42} Connectors
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Blocked Attacks (24h)</span>
            <span className="text-lg font-black text-rose-400 font-mono">
              {(gatewayData?.gatewayStatus?.blockedMaliciousRequests24h || 1840).toLocaleString()} Mitigated
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Partner Developer Keys</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              {gatewayData?.gatewayStatus?.activeDeveloperKeys || 850} Issued
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Webhook Success Rate</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {gatewayData?.webhookEngine?.deliverySuccessRate || '99.94%'}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Auth Engine</span>
            <span className="text-lg font-black text-amber-300 font-mono">
              OAuth 2.0 + JWT
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Gateway Protocol</span>
            <span className="text-lg font-black text-white font-mono">
              gRPC / REST / SOAP
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('gateway-status')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'gateway-status'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Network className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Gateway Status & Topology</span>
        </button>

        <button
          onClick={() => setActiveTab('travel-integrations')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'travel-integrations'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Cpu className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Travel API Connectors</span>
        </button>

        <button
          onClick={() => setActiveTab('developer-portal')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'developer-portal'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Key className="w-4 h-4 text-[#C8A14A]" />
          <span>3. Partner Developer Portal & Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('webhooks')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'webhooks'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Webhook className="w-4 h-4 text-[#C8A14A]" />
          <span>4. Webhook Engine & Callbacks</span>
        </button>

        <button
          onClick={() => setActiveTab('security-waf')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'security-waf'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Shield className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Security, WAF & Rate Limiting</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics-logs')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'analytics-logs'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#C8A14A]" />
          <span>6. API Throughput & Error Analytics</span>
        </button>
      </div>

      {/* TAB 1: GATEWAY STATUS & TOPOLOGY */}
      {activeTab === 'gateway-status' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Distributed High-Availability Gateway Routing Engine
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Microservices Topology & Reverse Proxy Nodes
              </h3>
            </div>
            <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              4 Regional Gateway Clusters (Dhaka, Singapore, London, Frankfurt)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
              <Server className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">GW-NODE-01 (Dhaka Hub)</strong>
              <div className="space-y-1 text-[#666666]">
                <p>Status: <strong className="text-emerald-700">ONLINE (22ms)</strong></p>
                <p>Role: <strong>SSLCommerz, bKash, Local Agents</strong></p>
                <p>Load: <strong>42% (580 req/s)</strong></p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
              <Server className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">GW-NODE-02 (Singapore Hub)</strong>
              <div className="space-y-1 text-[#666666]">
                <p>Status: <strong className="text-emerald-700">ONLINE (18ms)</strong></p>
                <p>Role: <strong>Sabre, Amadeus, Hotelbeds GDS</strong></p>
                <p>Load: <strong>65% (890 req/s)</strong></p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
              <Server className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">GW-NODE-03 (London Hub)</strong>
              <div className="space-y-1 text-[#666666]">
                <p>Status: <strong className="text-emerald-700">ONLINE (31ms)</strong></p>
                <p>Role: <strong>UKVI Visa & University CAS</strong></p>
                <p>Load: <strong>28% (320 req/s)</strong></p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
              <Server className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">GW-NODE-04 (Frankfurt Hub)</strong>
              <div className="space-y-1 text-[#666666]">
                <p>Status: <strong className="text-emerald-700">ONLINE (34ms)</strong></p>
                <p>Role: <strong>Stripe, Duffel NDC & Gemini AI</strong></p>
                <p>Load: <strong>38% (410 req/s)</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRAVEL INTEGRATIONS CATALOG */}
      {activeTab === 'travel-integrations' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Third-Party Ecosystem Adapters
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Live Health Status of 42 Integrated External Providers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gatewayData?.integratedProviders?.map((prov: any, idx: number) => (
              <div key={idx} className="bg-[#F8FAF9] border border-[#ECECEC] p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                  <span className="text-[10px] font-bold text-[#0B5D3B] uppercase">{prov.category}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {prov.status}
                  </span>
                </div>
                <strong className="text-sm font-bold text-[#081C15] font-serif block">{prov.name}</strong>
                <div className="flex items-center justify-between text-[11px] text-[#666666]">
                  <span>Response: <strong className="font-mono text-[#081C15]">{prov.latencyMs} ms</strong></span>
                  <span>Uptime: <strong className="font-mono text-[#0B5D3B]">{prov.uptime}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DEVELOPER PORTAL & INTERACTIVE SANDBOX */}
      {activeTab === 'developer-portal' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Partner Developer Platform & API Key Management
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Interactive API Sandbox & Key Provisioning
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interactive API Sandbox */}
            <div className="bg-[#081C15] text-white p-6 rounded-3xl space-y-5 border border-[#C8A14A]/30 shadow-xl">
              <span className="font-serif font-black text-lg text-[#C8A14A] block">API Gateway Sandbox Playground</span>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Select Endpoint</label>
                  <div className="flex space-x-2">
                    <select
                      value={testMethod}
                      onChange={(e) => setTestMethod(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-xl px-2 py-2 text-white text-xs font-mono font-bold"
                    >
                      <option value="POST">POST</option>
                      <option value="GET">GET</option>
                    </select>

                    <input
                      type="text"
                      value={testEndpoint}
                      onChange={(e) => setTestEndpoint(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">Request JSON Body</label>
                  <textarea
                    rows={6}
                    value={testRequestBody}
                    onChange={(e) => setTestRequestBody(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-emerald-300 font-mono text-[11px] focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleExecuteSandboxCall}
                  className="w-full py-3 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-[#C8A14A]" />
                  <span>{isExecuting ? 'Executing Call...' : 'Execute Test API Call'}</span>
                </button>

                {testResponse && (
                  <div className="bg-black/60 border border-emerald-500/40 p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-2">
                      <span className="text-emerald-400 font-bold">STATUS {testResponse.status} {testResponse.statusText}</span>
                      <span className="text-amber-300">{testResponse.latencyMs} ms</span>
                    </div>
                    <pre className="text-emerald-300 text-[10px] font-mono overflow-x-auto max-h-48">
                      {JSON.stringify(testResponse.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* API Key Provisioning Engine */}
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-3xl space-y-6">
              <span className="font-serif font-black text-lg text-[#081C15] block">Generate New Partner API Key</span>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#666666] uppercase block mb-1">Partner Application Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full bg-white border border-[#ECECEC] rounded-xl px-3 py-2 text-xs font-bold text-[#081C15]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#666666] uppercase block mb-1">Rate Limit Tier</label>
                  <select
                    value={keyRateLimit}
                    onChange={(e) => setKeyRateLimit(e.target.value)}
                    className="w-full bg-white border border-[#ECECEC] rounded-xl px-3 py-2 text-xs font-bold text-[#081C15]"
                  >
                    <option value="100">Standard Partner (100 req/min)</option>
                    <option value="500">Gold Agency Partner (500 req/min)</option>
                    <option value="2000">Enterprise High-Frequency (2,000 req/min)</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateKey}
                  className="w-full py-3 bg-[#081C15] hover:bg-emerald-950 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Key className="w-4 h-4 text-[#C8A14A]" />
                  <span>Provision API Key</span>
                </button>

                {generatedKey && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold text-amber-900 uppercase block">Generated Live Key (Copy Immediately):</span>
                    <div className="flex items-center justify-between bg-white border border-amber-300 p-2 rounded-xl">
                      <code className="text-[11px] font-mono text-[#081C15] font-bold truncate mr-2">{generatedKey}</code>
                      <button
                        onClick={() => copyToClipboard(generatedKey)}
                        className="p-1.5 bg-[#0B5D3B] text-white rounded-lg shrink-0"
                      >
                        {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WEBHOOK ENGINE */}
      {activeTab === 'webhooks' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Event-Driven Asynchronous Dispatcher
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Real-Time Webhook Engine & Target Receivers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gatewayData?.webhookEngine?.activeWebhooks?.map((wh: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                  <span className="bg-[#0B5D3B] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                    EVENT: {wh.event}
                  </span>
                  <span className="text-emerald-700 font-bold text-[10px]">{wh.status}</span>
                </div>
                <strong className="text-sm font-bold text-[#081C15] font-serif block">{wh.target}</strong>
                <p className="text-[11px] text-[#666666]">
                  HMAC SHA-256 Signed • Exponential Backoff Retry up to 5 attempts
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SECURITY & WAF */}
      {activeTab === 'security-waf' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Enterprise Cyber Security Protection
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              WAF Threat Detection & OWASP Top 10 Safeguards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Shield className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">OAuth 2.0 & JWT Bearer Token Security</strong>
              <p className="text-[#666666] leading-relaxed">
                All external API requests require JWT Bearer tokens issued via JEL OAuth 2.0 Authorization Server with RS256 signature verification.
              </p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
              <Lock className="w-6 h-6 text-[#0B5D3B]" />
              <strong className="text-sm font-bold text-[#081C15] font-serif block">Rate Limiting & DDoS Mitigation</strong>
              <p className="text-[#666666] leading-relaxed">
                Sliding-window Redis rate limiter actively throttles abusive traffic and blocks suspicious IP ranges automatically.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ANALYTICS & LOGS */}
      {activeTab === 'analytics-logs' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              System Health & Performance Monitoring
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Real-Time Gateway Throughput & Latency Metrics
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#081C15] text-white p-5 rounded-2xl space-y-2 border border-emerald-800">
              <span className="text-[10px] font-bold text-emerald-300 uppercase block">Daily Requests Dispatched</span>
              <strong className="text-2xl font-mono font-black text-amber-300">12,450,000</strong>
            </div>

            <div className="bg-[#081C15] text-white p-5 rounded-2xl space-y-2 border border-emerald-800">
              <span className="text-[10px] font-bold text-emerald-300 uppercase block">P99 Latency SLA</span>
              <strong className="text-2xl font-mono font-black text-emerald-300">62 ms</strong>
            </div>

            <div className="bg-[#081C15] text-white p-5 rounded-2xl space-y-2 border border-emerald-800">
              <span className="text-[10px] font-bold text-emerald-300 uppercase block">Global Availability</span>
              <strong className="text-2xl font-mono font-black text-white">99.99%</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
