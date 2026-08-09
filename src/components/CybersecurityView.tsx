import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  Server,
  Activity,
  Cpu,
  RefreshCw,
  Terminal,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Eye,
  EyeOff,
  Database,
  Cloud,
  Zap,
  Layers,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';

export const CybersecurityView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'soc-center' | 'zero-trust' | 'devsecops' | 'api-security' | 'disaster-recovery'
  >('soc-center');

  const [securityData, setSecurityData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Interactive State
  const [maskPii, setMaskPii] = useState<boolean>(true);
  const [simulatedAttackAlert, setSimulatedAttackAlert] = useState<string | null>(null);
  const [simulatingFailover, setSimulatingFailover] = useState<boolean>(false);

  useEffect(() => {
    fetchSecurityOverview();
  }, []);

  const fetchSecurityOverview = () => {
    setLoading(true);
    fetch('/api/security/overview')
      .then((res) => res.json())
      .then((data) => {
        setSecurityData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load cybersecurity data:', err);
        setLoading(false);
      });
  };

  const triggerWafTest = () => {
    setSimulatedAttackAlert('Simulating WAF SQLi / XSS Attack Payload Defense...');
    setTimeout(() => {
      setSimulatedAttackAlert('WAF Successfully Blocked Malicious Payload (HTTP 403 Forbidden). Logged to SOC Event SEC-8916.');
    }, 1200);
  };

  const runFailoverSimulation = () => {
    setSimulatingFailover(true);
    setTimeout(() => {
      setSimulatingFailover(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HERO BANNER - CYBERSECURITY & ENTERPRISE INFRASTRUCTURE */}
      <div className="bg-[#081C15] text-white border border-[#C8A14A]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • ENTERPRISE CYBERSECURITY & ZERO TRUST (PART 36)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-[#C8A14A]" />
                <span>PCI-DSS v4.0 LEVEL 1 • ZERO-TRUST ARCHITECTURE</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Cybersecurity, Data Protection & Enterprise Infrastructure
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Zero Trust security architecture, real-time SOC threat monitoring, AI prompt injection defense, PCI-DSS Level 1 tokenization & automated multi-region disaster recovery for Journey Expert Ltd.
            </p>
          </div>

          {/* Quick Security Telemetry Snapshot */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Security Score:</span>
              <span className="text-[#C8A14A] font-mono font-black text-sm">
                {securityData?.securityScore || '98 / 100'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Overall Threat Level:</span>
              <span className="text-emerald-300 font-mono font-bold text-xs">
                {securityData?.threatLevel || 'LOW / SECURE'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>System Uptime:</span>
              <span className="text-white font-mono font-black text-xs">
                {securityData?.infrastructureHealth?.uptimePct || '99.99%'}
              </span>
            </div>

            <button
              onClick={fetchSecurityOverview}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Security Telemetry</span>
            </button>
          </div>
        </div>

        {/* Security Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Active WAF Rules</span>
            <strong className="text-white font-mono text-sm mt-0.5">
              {securityData?.infrastructureHealth?.activeWafRules || 1420} Rules
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">Blocked Threats (24h)</span>
            <strong className="text-amber-300 font-mono text-sm mt-0.5">
              {securityData?.infrastructureHealth?.blockedThreats24h || 3482} Attacks
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">DDoS Mitigation</span>
            <strong className="text-emerald-300 font-mono text-sm mt-0.5">
              {securityData?.infrastructureHealth?.ddosMitigationCapacityGbps || '1,200 Gbps'}
            </strong>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col">
            <span className="text-[10px] text-emerald-300 uppercase font-bold">CDN Cache Hit Ratio</span>
            <strong className="text-white font-mono text-sm mt-0.5">
              {securityData?.infrastructureHealth?.cdnCacheHitRatio || '94.2%'}
            </strong>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('soc-center')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'soc-center'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Radio className="w-4 h-4 text-[#C8A14A]" />
          <span>1. SOC Threat Command & WAF</span>
        </button>

        <button
          onClick={() => setActiveTab('zero-trust')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'zero-trust'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Lock className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Zero Trust & RBAC PII Masking</span>
        </button>

        <button
          onClick={() => setActiveTab('devsecops')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'devsecops'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <FileCode className="w-4 h-4 text-[#C8A14A]" />
          <span>3. DevSecOps & Vulnerability Scans</span>
        </button>

        <button
          onClick={() => setActiveTab('api-security')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'api-security'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Zap className="w-4 h-4 text-[#C8A14A]" />
          <span>4. API Gateway & PCI-DSS Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('disaster-recovery')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'disaster-recovery'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Server className="w-4 h-4 text-[#C8A14A]" />
          <span>5. Disaster Recovery & Failover</span>
        </button>
      </div>

      {/* TAB 1: SOC THREAT COMMAND CENTER & WAF */}
      {activeTab === 'soc-center' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Security Operations Center (SOC)
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Real-Time Threat Events & Automated WAF Defense
              </h3>
            </div>

            <button
              onClick={triggerWafTest}
              className="px-4 py-2.5 bg-[#081C15] text-white text-xs font-extrabold rounded-xl hover:bg-[#0B5D3B] transition-all flex items-center space-x-2 shadow-md"
            >
              <Zap className="w-4 h-4 text-[#C8A14A]" />
              <span>Simulate WAF Attack Defense</span>
            </button>
          </div>

          {/* Attack Alert Sandbox Notice */}
          {simulatedAttackAlert && (
            <div className="p-4 bg-emerald-900 text-white rounded-2xl border border-[#C8A14A]/40 flex items-center justify-between animate-fade-in font-mono text-xs">
              <div className="flex items-center space-x-3">
                <ShieldAlert className="w-5 h-5 text-[#C8A14A] shrink-0" />
                <span>{simulatedAttackAlert}</span>
              </div>
              <button
                onClick={() => setSimulatedAttackAlert(null)}
                className="text-xs text-[#C8A14A] underline font-bold"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Real-Time SOC Alerts Table */}
          <div className="space-y-3">
            <strong className="text-sm font-bold text-[#081C15] font-serif block">
              Active Security Incident & Audit Stream
            </strong>

            <div className="overflow-x-auto border border-[#ECECEC] rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#081C15] text-white font-serif uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Event ID</th>
                    <th className="p-3.5">Threat Event / Payload</th>
                    <th className="p-3.5">Severity</th>
                    <th className="p-3.5">Source IP</th>
                    <th className="p-3.5">Time</th>
                    <th className="p-3.5">Resolution Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC] font-mono">
                  {securityData?.socRealtimeAlerts?.map((alert: any, aIdx: number) => (
                    <tr key={aIdx} className="hover:bg-[#F8FAF9]">
                      <td className="p-3.5 font-bold text-[#0B5D3B]">{alert.id}</td>
                      <td className="p-3.5 font-bold text-[#081C15]">{alert.event}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                            alert.severity === 'HIGH'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : alert.severity === 'MEDIUM'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </td>
                      <td className="p-3.5 text-[#666666]">{alert.sourceIp}</td>
                      <td className="p-3.5 text-[#666666]">{alert.timestamp}</td>
                      <td className="p-3.5">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ZERO TRUST & RBAC PII MASKING */}
      {activeTab === 'zero-trust' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Identity & Access Control
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Zero Trust Architecture & Role-Based Access Control (RBAC)
              </h3>
            </div>

            <button
              onClick={() => setMaskPii(!maskPii)}
              className="px-4 py-2 bg-[#F8FAF9] border border-[#ECECEC] text-[#081C15] font-bold rounded-xl hover:bg-emerald-50 transition-all flex items-center space-x-2"
            >
              {maskPii ? <EyeOff className="w-4 h-4 text-[#0B5D3B]" /> : <Eye className="w-4 h-4 text-emerald-600" />}
              <span>{maskPii ? 'PII Masking Active (Click to Toggle)' : 'PII Unmasked (Audit View)'}</span>
            </button>
          </div>

          {/* RBAC Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityData?.rbacRolesConfigured?.map((rbac: any, rIdx: number) => (
              <div key={rIdx} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2">
                  <strong className="text-sm font-bold text-[#081C15] font-serif">{rbac.role}</strong>
                  <span className="bg-[#0B5D3B] text-white text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full">
                    {rbac.dataMasking}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#666666] uppercase block">Assigned Scope & Permissions</span>
                  <p className="text-xs text-[#111111] font-medium">{rbac.permissions}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#ECECEC] font-mono text-[11px] flex justify-between items-center">
                  <span className="text-[#666666]">Sample Student Passport #:</span>
                  <strong className="text-[#0B5D3B]">
                    {maskPii ? 'B0****89 (AES-256)' : 'B08924159 (Decrypted)'}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DEVSECOPS & VULNERABILITY SCANS */}
      {activeTab === 'devsecops' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Automated Pipeline Defense
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Continuous DevSecOps & AI Safety Guardrails
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityData?.devSecOpsPipeline?.map((stage: any, sIdx: number) => (
              <div key={sIdx} className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-3">
                <span className="text-[10px] font-bold text-[#0B5D3B] uppercase block">{stage.stage}</span>
                <strong className="text-sm font-bold text-[#081C15] block">{stage.tool}</strong>

                <div className="pt-2 border-t border-[#ECECEC] flex items-center space-x-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-bold font-mono">{stage.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: API GATEWAY & PCI-DSS AUDIT */}
      {activeTab === 'api-security' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Global Interoperability Shield
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              API Security, Rate Limiting & PCI-DSS v4.0 Compliance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-3xl border border-[#C8A14A]/40 space-y-4">
              <strong className="text-sm font-bold text-[#C8A14A] font-serif block border-b border-white/10 pb-2">
                PCI-DSS v4.0 Level 1 Audit Status
              </strong>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span>Credit Card Tokenization:</span>
                  <strong className="text-emerald-300">Stripe / bKash Vault</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span>Primary Encryption Standard:</span>
                  <strong className="text-[#C8A14A]">AES-256 GCM</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span>TLS Wire Protocol:</span>
                  <strong className="text-white">TLS 1.3 Strict</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span>Penetration Test Cycle:</span>
                  <strong className="text-emerald-300">Quarterly Certified</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-[#ECECEC] space-y-4">
              <strong className="text-sm font-bold text-[#081C15] font-serif block border-b border-[#ECECEC] pb-2">
                GDS & Third-Party API Rate Limiting
              </strong>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center font-mono">
                  <span>Sabre / Amadeus GDS Rails:</span>
                  <span className="font-bold text-[#0B5D3B]">10,000 req/min</span>
                </div>

                <div className="flex justify-between items-center font-mono">
                  <span>University Placement API:</span>
                  <span className="font-bold text-[#0B5D3B]">2,500 req/min</span>
                </div>

                <div className="flex justify-between items-center font-mono">
                  <span>Gemini AI Agent Endpoint:</span>
                  <span className="font-bold text-[#0B5D3B]">1,000 req/min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DISASTER RECOVERY & FAILOVER */}
      {activeTab === 'disaster-recovery' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Business Continuity & Failover Engine
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Automated Multi-Region Disaster Recovery Plan
              </h3>
            </div>

            <button
              onClick={runFailoverSimulation}
              disabled={simulatingFailover}
              className="px-4 py-2.5 bg-[#081C15] text-white text-xs font-extrabold rounded-xl hover:bg-[#0B5D3B] transition-all flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 text-[#C8A14A] ${simulatingFailover ? 'animate-spin' : ''}`} />
              <span>{simulatingFailover ? 'Simulating Failover...' : 'Test Multi-Region Failover'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-[#ECECEC] space-y-3 font-mono">
              <strong className="text-sm font-bold text-[#081C15] font-serif block border-b border-[#ECECEC] pb-2">
                Recovery Point & Time Objectives
              </strong>

              <div className="flex justify-between items-center">
                <span>Recovery Point Objective (RPO):</span>
                <strong className="text-[#0B5D3B]">
                  {securityData?.disasterRecoveryPlan?.rpoMinutes || '< 1 Minute'}
                </strong>
              </div>

              <div className="flex justify-between items-center">
                <span>Recovery Time Objective (RTO):</span>
                <strong className="text-[#0B5D3B]">
                  {securityData?.disasterRecoveryPlan?.rtoMinutes || '< 5 Minutes'}
                </strong>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-6 rounded-3xl border border-[#ECECEC] space-y-3 font-mono">
              <strong className="text-sm font-bold text-[#081C15] font-serif block border-b border-[#ECECEC] pb-2">
                GCP Multi-Region Replication Nodes
              </strong>

              <div className="flex justify-between items-center">
                <span>Primary Zone:</span>
                <strong className="text-emerald-800">
                  {securityData?.disasterRecoveryPlan?.primaryRegion || 'GCP Asia-Southeast1'}
                </strong>
              </div>

              <div className="flex justify-between items-center">
                <span>Secondary Failover Zone:</span>
                <strong className="text-emerald-800">
                  {securityData?.disasterRecoveryPlan?.secondaryRegion || 'GCP Europe-West3'}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
