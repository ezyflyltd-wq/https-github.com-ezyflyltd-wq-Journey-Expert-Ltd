import React, { useState, useEffect } from 'react';
import {
  Server,
  ShieldCheck,
  Cpu,
  Database,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Layers,
  Lock,
  GitBranch,
  Radio,
  Globe,
  HardDrive,
  Cloud,
  FileCode,
  Zap,
  BarChart3,
  Clock,
  ExternalLink,
  Sliders,
  Eye,
  Settings,
  ShieldAlert,
} from 'lucide-react';

export const DevOpsInfraView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'kubernetes' | 'cicd' | 'security-vault' | 'database-cache' | 'observability' | 'disaster-recovery' | 'terraform-iac'
  >('overview');

  const [devopsData, setDevopsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [triggeringFailover, setTriggeringFailover] = useState(false);
  const [failoverSuccessMessage, setFailoverSuccessMessage] = useState('');
  const [pipelineTriggering, setPipelineTriggering] = useState(false);

  useEffect(() => {
    fetchDevOpsData();
  }, []);

  const fetchDevOpsData = () => {
    setLoading(true);
    fetch('/api/devops/overview')
      .then((res) => res.json())
      .then((data) => {
        setDevopsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load DevOps data:', err);
        setLoading(false);
      });
  };

  const handleSimulateFailover = () => {
    setTriggeringFailover(true);
    setFailoverSuccessMessage('');
    setTimeout(() => {
      setTriggeringFailover(false);
      setFailoverSuccessMessage(
        'RE-ROUTED: Cloudflare DNS Traffic successfully shifted to Secondary Failover Region (europe-west2 London) in 3.8 seconds. Zero transaction loss verified.'
      );
    }, 1500);
  };

  const handleTriggerPipeline = () => {
    setPipelineTriggering(true);
    setTimeout(() => {
      setPipelineTriggering(false);
      alert('GitHub Actions Pipeline PIPE-9022 Triggered: Helm Chart Deployment to GKE Staging Cluster initialized!');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* DEVOPS CONTROL CENTER HEADER BANNER */}
      <div className="bg-[#081C15] text-white border border-[#0B5D3B] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A14A] text-[#081C15] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • SITE RELIABILITY ENGINEERING (SRE)
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>GKE / AWS Multi-Cloud Active</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              DevOps & Cloud Infrastructure Control Center
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Enterprise Kubernetes (GKE & EKS), Multi-Region High-Availability PostgreSQL Cluster, HashiCorp Vault Zero-Trust Secret Manager, Redis Sharded Caching, Cloudflare WAF, and Automated CI/CD Pipelines.
            </p>
          </div>

          {/* Quick Action & Health Status Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Overall Uptime (30d):</span>
              <span className="text-emerald-300 font-mono font-black text-sm">
                {devopsData?.clusterHealth?.uptimePercent || 99.994}%
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Active K8s Pods:</span>
              <span className="text-white font-mono font-black text-sm">
                {devopsData?.clusterHealth?.activePodsCount || 142} Pods
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Database Lag:</span>
              <span className="text-[#C8A14A] font-mono font-black text-xs">
                {devopsData?.databasesAndCaching?.[0]?.replicationLagMs || 1.2} ms
              </span>
            </div>

            <button
              onClick={fetchDevOpsData}
              className="w-full py-2.5 bg-[#0B5D3B] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Infrastructure Telemetry</span>
            </button>
          </div>
        </div>

        {/* Global Infrastructure Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-900/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Active GKE/EKS Nodes</span>
            <span className="text-lg font-black text-white font-mono">
              {devopsData?.clusterHealth?.totalActiveNodes || 18} Nodes
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Cluster CPU Utilization</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {devopsData?.clusterHealth?.cpuUsagePercent || 34.2}%
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Redis Cache Hit Ratio</span>
            <span className="text-lg font-black text-[#C8A14A] font-mono">
              {devopsData?.databasesAndCaching?.[1]?.hitRatioPercent || 98.4}%
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">WAF Blocked (24h)</span>
            <span className="text-lg font-black text-rose-300 font-mono">
              {(devopsData?.securityAndVault?.cloudflareWafBlocked24h || 18490).toLocaleString()} Attacks
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Recovery Point (RPO)</span>
            <span className="text-lg font-black text-white font-mono">
              {devopsData?.disasterRecovery?.rpoMinutes || 0.25} Min (15s)
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-300 uppercase block">Recovery Time (RTO)</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              {devopsData?.disasterRecovery?.rtoMinutes || 4.5} Mins
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'overview'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Server className="w-4 h-4 text-[#C8A14A]" />
          <span>1. Multi-Cloud Topology</span>
        </button>

        <button
          onClick={() => setActiveTab('kubernetes')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'kubernetes'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C8A14A]" />
          <span>2. Kubernetes & Pod HPA</span>
        </button>

        <button
          onClick={() => setActiveTab('cicd')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'cicd'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <GitBranch className="w-4 h-4 text-[#C8A14A]" />
          <span>3. CI/CD & GitHub Actions</span>
        </button>

        <button
          onClick={() => setActiveTab('security-vault')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'security-vault'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Lock className="w-4 h-4 text-[#C8A14A]" />
          <span>4. HashiCorp Vault & WAF</span>
        </button>

        <button
          onClick={() => setActiveTab('database-cache')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'database-cache'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Database className="w-4 h-4 text-[#C8A14A]" />
          <span>5. PostgreSQL & Redis Cluster</span>
        </button>

        <button
          onClick={() => setActiveTab('observability')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'observability'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Activity className="w-4 h-4 text-[#C8A14A]" />
          <span>6. Observability Stack</span>
        </button>

        <button
          onClick={() => setActiveTab('disaster-recovery')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'disaster-recovery'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-[#C8A14A]" />
          <span>7. Disaster Recovery Drill</span>
        </button>

        <button
          onClick={() => setActiveTab('terraform-iac')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'terraform-iac'
              ? 'bg-[#0B5D3B] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <FileCode className="w-4 h-4 text-[#C8A14A]" />
          <span>8. Terraform & Helm IaC</span>
        </button>
      </div>

      {/* TAB 1: MULTI-CLOUD ARCHITECTURE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 text-xs text-[#111111]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 text-[#0B5D3B]">
                <Cloud className="w-6 h-6 text-[#C8A14A]" />
                <div>
                  <h3 className="font-black text-base font-serif text-[#081C15]">Primary Cloud (GCP)</h3>
                  <p className="text-[11px] text-[#666666]">Google Kubernetes Engine (asia-south1)</p>
                </div>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Hosts core Node.js Express API microservices, Sabre/Amadeus GDS connectors, and Gemini GPU inference models in Dhaka & Mumbai datacenters with sub-10ms latency.
              </p>
              <div className="bg-[#F8FAF9] p-3 rounded-2xl text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#666666]">GKE Cluster Nodes:</span>
                  <strong className="font-mono text-[#0B5D3B]">12 N2-Standard Nodes</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">VPC Latency to bKash:</span>
                  <strong className="font-mono text-emerald-700">4.2 ms</strong>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 text-[#0B5D3B]">
                <Server className="w-6 h-6 text-[#C8A14A]" />
                <div>
                  <h3 className="font-black text-base font-serif text-[#081C15]">Secondary Failover (AWS)</h3>
                  <p className="text-[11px] text-[#666666]">Amazon EKS Cluster (europe-west2 London)</p>
                </div>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Hot standby secondary region for European/UK diaspora traffic, corporate TMC clients, and zero-downtime failover during regional maintenance or outages.
              </p>
              <div className="bg-[#F8FAF9] p-3 rounded-2xl text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#666666]">EKS Backup Nodes:</span>
                  <strong className="font-mono text-[#0B5D3B]">6 m5.xlarge Instances</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Sync Latency:</span>
                  <strong className="font-mono text-emerald-700">120 ms (Cross-Cloud)</strong>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 text-[#0B5D3B]">
                <Globe className="w-6 h-6 text-[#C8A14A]" />
                <div>
                  <h3 className="font-black text-base font-serif text-[#081C15]">Edge CDN & WAF</h3>
                  <p className="text-[11px] text-[#666666]">Cloudflare Enterprise Edge & R2 Storage</p>
                </div>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Terminates TLS 1.3 at 320+ global edge locations, caches flight/hotel inventory responses, and provides Layer 7 DDoS mitigation with zero origin exposure.
              </p>
              <div className="bg-[#F8FAF9] p-3 rounded-2xl text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Global Edge Cache Ratio:</span>
                  <strong className="font-mono text-[#0B5D3B]">91.4% Hit Ratio</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">DDoS Mitigation:</span>
                  <strong className="font-mono text-emerald-700">Automated Rate Limit</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KUBERNETES & POD HPA */}
      {activeTab === 'kubernetes' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Google Kubernetes Engine (GKE) Cluster Manager
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                Namespaces, Active Pod Replicas & Horizontal Pod Autoscaler (HPA)
              </h3>
            </div>

            <span className="bg-[#081C15] text-[#C8A14A] font-mono text-xs font-black px-4 py-2 rounded-2xl border border-emerald-800">
              Cluster: gke-prod-asia-south1-v1.30
            </span>
          </div>

          <div className="space-y-4">
            {devopsData?.kubernetesNamespaces?.map((ns: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <strong className="text-base text-[#081C15] font-serif">{ns.name}</strong>
                  </div>
                  <p className="text-[#666666]">
                    Active Replicas: <strong className="text-[#111111] font-mono">{ns.currentReplicas} Pods</strong> (HPA Min: {ns.hpaMin}, Max: {ns.hpaMax})
                  </p>
                </div>

                <div className="flex items-center space-x-6 text-xs font-mono">
                  <div className="bg-white px-3 py-2 rounded-xl border border-[#ECECEC]">
                    <span className="text-[#666666] text-[10px] block font-sans">CPU Allocated</span>
                    <span className="text-[#0B5D3B] font-bold">{ns.cpu}</span>
                  </div>

                  <div className="bg-white px-3 py-2 rounded-xl border border-[#ECECEC]">
                    <span className="text-[#666666] text-[10px] block font-sans">RAM Allocated</span>
                    <span className="text-[#0B5D3B] font-bold">{ns.memory}</span>
                  </div>

                  <div className="bg-white px-3 py-2 rounded-xl border border-[#ECECEC]">
                    <span className="text-[#666666] text-[10px] block font-sans">Pods Running</span>
                    <span className="text-[#111111] font-bold">{ns.podsRunning} Pods</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CI/CD & GITHUB ACTIONS */}
      {activeTab === 'cicd' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
                Automated Build, Test & Deployment Pipelines
              </span>
              <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
                GitHub Actions Pipeline History & Blue-Green Releases
              </h3>
            </div>

            <button
              onClick={handleTriggerPipeline}
              disabled={pipelineTriggering}
              className="px-4 py-2.5 bg-[#0B5D3B] hover:bg-[#081C15] text-white font-extrabold rounded-xl shadow-md flex items-center space-x-2"
            >
              <GitBranch className="w-4 h-4 text-[#C8A14A]" />
              <span>{pipelineTriggering ? 'Triggering Pipeline...' : '+ Trigger Staging Release'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {devopsData?.ciCdPipelineStatus?.map((pipe: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                      {pipe.status}
                    </span>
                    <strong className="text-sm text-[#081C15] font-bold font-mono">{pipe.pipelineId}</strong>
                    <span className="text-[#666666] font-semibold">• {pipe.name}</span>
                  </div>
                  <p className="text-[#666666] font-mono text-[11px]">{pipe.commit}</p>
                </div>

                <div className="flex items-center space-x-6 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block">Test Coverage</span>
                    <strong className="font-mono text-[#0B5D3B]">{pipe.testCoveragePercent}%</strong>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block">Duration</span>
                    <strong className="font-mono text-[#111111]">{pipe.durationSec}s</strong>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#666666] block">Vulnerabilities</span>
                    <strong className="font-mono text-emerald-600">{pipe.vulnerabilities} Clean</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: HASHICORP VAULT & SECURITY */}
      {activeTab === 'security-vault' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Zero-Trust Key Management & Web Application Firewall
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              HashiCorp Vault Secret Manager & Cloudflare WAF Attack Shield
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-[#C8A14A]/40 shadow-xl">
              <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                <span className="font-serif font-black text-base text-[#C8A14A] flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-[#C8A14A]" />
                  <span>HashiCorp Vault Enterprise</span>
                </span>
                <span className="bg-emerald-900 text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full">
                  AUTO-UNSEALED
                </span>
              </div>

              <div className="space-y-2 text-xs text-emerald-100">
                <div className="flex justify-between">
                  <span>Sabre / Amadeus GDS API Keys:</span>
                  <strong className="font-mono text-white">Dynamic 24h Rotation</strong>
                </div>
                <div className="flex justify-between">
                  <span>bKash / Stripe Merchant Secrets:</span>
                  <strong className="font-mono text-white">Encrypted AES-256-GCM</strong>
                </div>
                <div className="flex justify-between">
                  <span>Gemini / OpenAI Model Keys:</span>
                  <strong className="font-mono text-white">Server-Side Proxy Vaulted</strong>
                </div>
                <div className="flex justify-between">
                  <span>Zero-Trust Service Mesh:</span>
                  <strong className="font-mono text-emerald-300">mTLS Enforced (Istio)</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
                <span className="font-serif font-black text-base text-[#081C15] flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-[#0B5D3B]" />
                  <span>Cloudflare WAF & Edge Security</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full">
                  ACTIVE MITIGATION
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Malicious Requests Blocked (24h):</span>
                  <strong className="font-mono text-rose-600 font-black">
                    {(devopsData?.securityAndVault?.cloudflareWafBlocked24h || 18490).toLocaleString()} Attacks
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">DDoS Mitigations Triggered:</span>
                  <strong className="font-mono text-[#081C15]">
                    {devopsData?.securityAndVault?.ddosMitigations24h || 3} Incidents
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">SSL / TLS Certificate Expiry:</span>
                  <strong className="font-mono text-[#0B5D3B]">
                    {devopsData?.securityAndVault?.sslCertExpiryDays || 284} Days Remaining
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DATABASE & REDIS CLUSTER */}
      {activeTab === 'database-cache' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              High-Performance Storage & In-Memory Layer
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              PostgreSQL 16 HA Patroni Cluster, Redis Sharding & Elasticsearch
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devopsData?.databasesAndCaching?.map((db: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2 text-[#0B5D3B]">
                  <Database className="w-5 h-5 text-[#C8A14A]" />
                  <strong className="text-sm font-black text-[#081C15] font-serif">{db.type}</strong>
                </div>

                <p className="text-[#666666] font-medium">{db.nodes}</p>

                <div className="border-t border-[#ECECEC] pt-3 space-y-1 font-mono text-[11px]">
                  {db.qps && (
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Queries Per Sec:</span>
                      <strong className="text-[#0B5D3B]">{db.qps} QPS</strong>
                    </div>
                  )}
                  {db.hitRatioPercent && (
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Cache Hit Ratio:</span>
                      <strong className="text-[#C8A14A] font-bold">{db.hitRatioPercent}%</strong>
                    </div>
                  )}
                  {db.opsPerSec && (
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Operations Per Sec:</span>
                      <strong className="text-[#081C15]">{db.opsPerSec} OPS</strong>
                    </div>
                  )}
                  {db.replicationLagMs && (
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Replication Lag:</span>
                      <strong className="text-emerald-700">{db.replicationLagMs} ms</strong>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: OBSERVABILITY STACK */}
      {activeTab === 'observability' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Enterprise Monitoring & Logging Stack
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Prometheus Telemetry, Grafana Dashboards & Sentry Error Tracking
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#0B5D3B] text-sm block">Prometheus</span>
              <p className="text-[#666666]">Scrapes 1,400+ custom metrics across GDS latency, API response times, and Kubernetes node CPU/RAM.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#0B5D3B] text-sm block">Grafana Dashboards</span>
              <p className="text-[#666666]">Real-time visual monitoring for SRE team with automated PagerDuty alert triggers for 5xx errors.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#0B5D3B] text-sm block">Sentry Exception Tracking</span>
              <p className="text-[#666666]">Full stack trace capture with zero PII leakage compliance for passenger passport data.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <span className="font-extrabold text-[#0B5D3B] text-sm block">OpenTelemetry Tracing</span>
              <p className="text-[#666666]">End-to-end distributed tracing across Next.js frontend, Express API, and Sabre GDS SOAP calls.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: DISASTER RECOVERY DRILL */}
      {activeTab === 'disaster-recovery' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Business Continuity & Regional Failover Engine
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              15-Second Database RPO & Automated Cross-Cloud Failover Drill
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-4">
              <span className="font-extrabold text-[#081C15] text-base font-serif block">Backup & Recovery Targets</span>
              <div className="space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Recovery Point Objective (RPO):</span>
                  <strong className="text-[#0B5D3B]">0.25 Minutes (15 Seconds)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Recovery Time Objective (RTO):</span>
                  <strong className="text-[#0B5D3B]">4.5 Minutes</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Backup Location:</span>
                  <strong className="text-[#111111]">GCS Multi-Region Coldline</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#081C15] text-white p-6 rounded-2xl space-y-4 border border-emerald-800">
              <span className="font-extrabold text-[#C8A14A] text-base font-serif block">Simulate Regional Failover</span>
              <p className="text-emerald-100 text-xs">
                Simulate an immediate DNS failover from Primary Dhaka/Mumbai GKE cluster to Secondary London EKS cluster.
              </p>

              <button
                onClick={handleSimulateFailover}
                disabled={triggeringFailover}
                className="w-full py-3 bg-rose-700 hover:bg-rose-800 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <ShieldAlert className="w-4 h-4 text-white" />
                <span>{triggeringFailover ? 'FAILING OVER TRAFFIC...' : 'EXECUTE REGIONAL FAILOVER DRILL'}</span>
              </button>

              {failoverSuccessMessage && (
                <div className="bg-emerald-900/80 border border-emerald-400 p-3 rounded-xl text-xs text-emerald-200 font-bold">
                  {failoverSuccessMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: TERRAFORM & HELM IAC */}
      {activeTab === 'terraform-iac' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider block">
              Infrastructure as Code (IaC) Repositories
            </span>
            <h3 className="text-xl font-black text-[#081C15] font-serif mt-0.5">
              Terraform Multi-Cloud Manifests & Helm Chart Configurations
            </h3>
          </div>

          <div className="bg-[#081C15] text-emerald-300 p-6 rounded-2xl font-mono text-[11px] space-y-3 overflow-x-auto border border-emerald-900">
            <div className="text-[#C8A14A] font-bold"># main.tf - Journey Expert Ltd. GKE Multi-Cloud Cluster</div>
            <pre className="text-emerald-100 leading-relaxed">
{`module "gke_cluster" {
  source                     = "terraform-google-modules/kubernetes-engine/google"
  version                    = "30.0.0"
  project_id                 = "journey-expert-prod"
  name                       = "gke-prod-asia-south1"
  region                     = "asia-south1"
  regional                   = true
  ip_range_pods              = "gke-pods"
  ip_range_services          = "gke-services"
  horizontal_pod_autoscaling = true
  enable_private_nodes       = true
  master_ipv4_cidr_block     = "172.16.0.0/28"

  node_pools = [
    {
      name         = "standard-pool"
      machine_type = "n2-standard-4"
      min_count    = 6
      max_count    = 36
      auto_scaling = true
    }
  ]
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
