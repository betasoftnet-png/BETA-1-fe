import React, { useState } from 'react';
import { Shield, Cpu, Activity, ArrowLeftRight, Check, X, ChevronRight, Lock, Server, Clock, EyeOff, Zap } from 'lucide-react';

export default function WhyChooseUs({ darkMode }) {
  const [activeTab, setActiveTab] = useState(0);

  const corePhilosophy = [
    {
      num: '01',
      title: 'Federated Security Architecture',
      subtitle: 'Zero-Trust Protocol',
      desc: 'Our infrastructure is designed on zero-trust principles. Every session, asset pipeline, and communication channel is isolated and structurally hardened at the root level.'
    },
    {
      num: '02',
      title: 'High-Velocity Performance',
      subtitle: 'Low-Latency Pipelines',
      desc: 'Engineered with native in-memory processing and real-time streaming architectures, completely eliminating multi-vendor data synchronization gaps.'
    },
    {
      num: '03',
      title: 'Consolidated Operations',
      subtitle: 'Unified Infrastructure',
      desc: 'Bring your entire enterprise technology footprint under a singular control plane, reducing administrative friction and software licensing complexity.'
    }
  ];

  const slaMetrics = [
    {
      title: '99.99% Redundant Infrastructure SLA',
      shortTitle: 'Infrastructure Uptime',
      icon: Server,
      desc: 'Our network architecture is anchored across globally distributed edge nodes, protected by automatic failover relays and redundant hardware clusters to guarantee your workspace is always online.',
      statsTitle: 'Global Network Status',
      statsValue: '99.99% Active',
      subStats: 'Avg Ping: 12ms // 0 Lost Packets'
    },
    {
      title: '5-Minute Direct-To-Engineer Support',
      shortTitle: 'Direct Engineering Line',
      icon: Clock,
      desc: 'Skip the automated chatbot queues. We guarantee a direct, hot-line connection to our principal systems engineering staff within five minutes to solve critical operational bottlenecks immediately.',
      statsTitle: 'Technical Support Queue',
      statsValue: '3.4 Min Avg Response',
      subStats: '100% Human Engineer Desk // 24/7/365'
    },
    {
      title: 'Absolute Custody & Data Sovereignty',
      shortTitle: 'Zero-Access Data Vaults',
      icon: EyeOff,
      desc: 'Your data is strictly yours. Every database capsule, communication archive, and ledger is cryptographically isolated in highly regulated, secure database regions under strict security governance.',
      statsTitle: 'Encryption Compliance',
      statsValue: 'SOC2 Type II Audited',
      subStats: 'Zero-Access Custody // E2E PGP'
    },
    {
      title: 'Flat-Rate Unlimited Scaling capacity',
      shortTitle: 'Predictable Volume Scaling',
      icon: Zap,
      desc: 'Avoid sudden billing shocks or seat usage fees. We offer a transparent, predictable flat-rate corporate licensing model that lets you scale storage volumes and accounts infinitely without hidden caps.',
      statsTitle: 'Enterprise Resource Plan',
      statsValue: 'Unlimited Volume Capacity',
      subStats: 'Flat-Rate Billing // Zero Caps'
    }
  ];

  const activeComp = slaMetrics[activeTab];

  const renderSlaVisual = (tabIndex) => {
    switch (tabIndex) {
      case 0: // Infrastructure Uptime (Live Heartbeat visual)
        return (
          <div className="flex flex-col items-center justify-center w-full h-full relative px-6 z-10">
            <div className="flex items-center justify-between w-full max-w-md border-b border-slate-900 pb-3 mb-4">
              <span className="text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active edge systems // OK
              </span>
              <span className="text-[7.5px] font-mono text-slate-500 uppercase">SYS_REF: NODE_ALPHA</span>
            </div>
            
            {/* Live Uptime Waveform */}
            <div className="relative w-full max-w-md h-12 flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full stroke-emerald-500/80 stroke-2 fill-none" viewBox="0 0 300 40">
                <path d="M0,20 L50,20 L60,10 L70,30 L80,20 L150,20 L155,5 L160,35 L165,15 L170,25 L175,20 L300,20" className="uptime-pulse-path" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent pointer-events-none" />
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-4 font-mono text-[7.5px] text-slate-500 text-center uppercase">
              <div className="border border-slate-900 p-1.5 rounded-lg">
                <span className="block text-slate-600">EAST REGION</span>
                <span className="text-emerald-400 font-bold">100% ONLINE</span>
              </div>
              <div className="border border-slate-900 p-1.5 rounded-lg">
                <span className="block text-slate-600">EUROPE CORES</span>
                <span className="text-emerald-400 font-bold">100% ONLINE</span>
              </div>
              <div className="border border-slate-900 p-1.5 rounded-lg">
                <span className="block text-slate-600">PACIFIC NODES</span>
                <span className="text-emerald-400 font-bold">100% ONLINE</span>
              </div>
            </div>
          </div>
        );

      case 1: // Direct Support (Technical Queue meter)
        return (
          <div className="flex flex-col items-center justify-center w-full h-full relative px-6 z-10">
            <div className="flex items-center justify-between w-full max-w-md border-b border-slate-900 pb-3 mb-4">
              <span className="text-[9px] font-mono text-indigo-400 font-bold flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Live Engineering Dispatch Active
              </span>
              <span className="text-[7.5px] font-mono text-slate-550 uppercase">RESPONSE TARGET: &lt;5 MIN</span>
            </div>

            <div className="flex items-center gap-8 w-full max-w-md justify-around py-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black font-display text-white tracking-tight">3.4 min</span>
                <span className="text-[7px] font-mono text-slate-500 mt-1 uppercase">CURRENT AVERAGE WAIT</span>
              </div>
              <div className="h-10 w-px border-l border-slate-900" />
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold font-mono text-indigo-400">14 Active</span>
                <span className="text-[7px] font-mono text-slate-500 mt-1.5 uppercase">STAFF ON DUTY NOW</span>
              </div>
            </div>

            <div className="w-full max-w-md bg-slate-900 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-indigo-650 h-full rounded-full animate-loader-bar" style={{ width: '85%' }} />
            </div>
          </div>
        );

      case 2: // Zero-Access Custody (Encryption visualizer)
        return (
          <div className="flex flex-col items-center justify-center w-full h-full relative px-6 z-10">
            <div className="flex items-center justify-between w-full max-w-md border-b border-slate-900 pb-3 mb-3">
              <span className="text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Data Sovereignty Verified
              </span>
              <span className="text-[7.5px] font-mono text-slate-550 uppercase">AUDIT STATUS: PASSED</span>
            </div>

            <div className="flex items-center gap-6 py-2">
              <div className="relative w-12 h-12 flex items-center justify-center bg-indigo-500/10 rounded-xl border border-indigo-550/30">
                <div className="absolute inset-1 border border-dashed border-indigo-400/30 rounded-lg animate-spin" style={{ animationDuration: '8s' }} />
                <Lock className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[9.5px] font-mono text-white uppercase block font-black">E2E Envelope Encryption</span>
                <span className="text-[7.5px] font-mono text-slate-500 mt-1 block">Root credentials isolated inside secure database vault containers.</span>
              </div>
            </div>
          </div>
        );

      case 3: // Predictable Volume Scaling (Infinite Capacity visual)
        return (
          <div className="flex flex-col items-center justify-center w-full h-full relative px-6 z-10">
            <div className="flex items-center justify-between w-full max-w-md border-b border-slate-900 pb-3 mb-4">
              <span className="text-[9px] font-mono text-indigo-400 font-bold flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Resource scaling pipelines
              </span>
              <span className="text-[7.5px] font-mono text-slate-550 uppercase">BANDWIDTH: UNLIMITED</span>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full max-w-md py-1 font-mono text-[7px] text-center uppercase">
              <div className="border border-slate-900 rounded-lg py-1.5 px-1 bg-slate-950">
                <span className="text-slate-600 block mb-0.5">ACCOUNTS</span>
                <span className="text-white font-bold animate-pulse">∞ UNLIMITED</span>
              </div>
              <div className="border border-slate-900 rounded-lg py-1.5 px-1 bg-slate-950">
                <span className="text-slate-600 block mb-0.5">TRANSACTIONS</span>
                <span className="text-white font-bold">∞ UNLIMITED</span>
              </div>
              <div className="border border-slate-900 rounded-lg py-1.5 px-1 bg-slate-950">
                <span className="text-slate-600 block mb-0.5">STORAGE</span>
                <span className="text-white font-bold animate-pulse">∞ UNLIMITED</span>
              </div>
              <div className="border border-slate-900 rounded-lg py-1.5 px-1 bg-slate-950">
                <span className="text-slate-600 block mb-0.5">API VOLUMES</span>
                <span className="text-white font-bold">∞ UNLIMITED</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="why-choose-us" className="py-24 relative overflow-hidden z-10">
      
      {/* Dynamic Keyframe Injection block */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes uptime-pulse {
          0% { stroke-dashoffset: 600; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes loader-bar {
          0% { width: 0%; }
          100% { width: 85%; }
        }
        .uptime-pulse-path {
          stroke-dasharray: 600;
          animation: uptime-pulse 6s linear infinite;
        }
        .animate-loader-bar {
          animation: loader-bar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Radial Grid Dot drafting background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.25] dark:opacity-[0.08]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid-choose" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#6366f1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid-choose)" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            Security & Support Commitments
          </div>
          <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Why Beta Softnet?
          </h2>
          <p className={`text-base font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Learn why enterprise institutions, fast-growing workspaces, and daily users trust our secure operational infrastructure.
          </p>
        </div>

        {/* 1. 3-COLUMN CORE PHILOSOPHY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 items-stretch text-left">
          {corePhilosophy.map((phil, idx) => (
            <div 
              key={idx}
              className={`rounded-3xl border p-7 relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between ${
                darkMode 
                  ? 'glass-card-dark border-slate-800/80 hover:border-indigo-500/35 hover:shadow-indigo-500/5' 
                  : 'glass-card-light border-slate-200/80 hover:border-indigo-500/30 hover:shadow-indigo-500/5'
              }`}
            >
              <div>
                {/* Node identifier */}
                <div className="flex items-center justify-between border-b dark:border-slate-800/60 pb-3 mb-5 font-mono text-[9px] text-slate-555">
                  <span>PHIL-NODE // {phil.num}</span>
                  <span className="text-indigo-400">ACTIVE PROTOCOL</span>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-widest block mb-2">{phil.subtitle}</span>
                <h3 className={`font-display font-black text-lg tracking-tight mb-3 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {phil.title}
                </h3>
                <p className={`text-xs font-light leading-relaxed ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {phil.desc}
                </p>
              </div>
              <div className="mt-6 border-t dark:border-slate-800/60 pt-3 flex items-center justify-between text-[8.5px] font-mono text-slate-555">
                <span>SYSTEM SYNC STATUS: SECURE</span>
                <span>v1.2 // STABLE</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. THE INFRASTRUCTURE SLA & TRUST TELEMETRY COCKPIT */}
        <div className={`rounded-3xl border p-6 md:p-10 shadow-2xl relative overflow-hidden text-left ${
          darkMode ? 'bg-slate-950/80 border-slate-900' : 'bg-slate-50/50 border-slate-200'
        }`}>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Subheader */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b dark:border-slate-900 pb-5 mb-8 gap-4">
            <div>
              <span className="font-mono text-[9.5px] font-black text-indigo-500 uppercase tracking-widest block mb-1">Live Telemetry Center</span>
              <h3 className={`font-display font-black text-xl md:text-2xl tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Operational Uptime & SLA Guarantees
              </h3>
            </div>
            <span className="text-[9px] font-mono text-slate-555 uppercase bg-slate-900/60 border border-slate-800 px-3 py-1 rounded-lg">
              Audited Logs // Continuous Compliance
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Side: Clickable Selector Tabs (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              {slaMetrics.map((data, idx) => {
                const TabIcon = data.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-indigo-650 border-indigo-555 text-black shadow-lg shadow-indigo-600/15 scale-[1.01]'
                        : darkMode
                          ? 'border-slate-900 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-800'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <TabIcon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-indigo-555'}`} />
                      <span className="font-display font-bold text-xs tracking-wide uppercase">{data.shortTitle}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'text-white translate-x-0.5' : 'text-slate-555 group-hover:translate-x-0.5'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right Side: Visual telemetry visualizer + details panel (lg:col-span-8) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* LIVE DRAFTING TELEMETRY ILLUSTRATION BOARD */}
              <div className="rounded-2xl border dark:border-slate-900 bg-slate-950 p-6 relative overflow-hidden h-44 flex items-center justify-center shadow-inner">
                
                {/* Cybernetic drafting grids */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                <div className="absolute top-2 left-3 font-mono text-[7px] text-slate-600 uppercase tracking-widest">
                  Operational Dashboard Visualizer // S_REF_{activeTab}
                </div>
                <div className="absolute top-2 right-3 font-mono text-[7px] text-slate-600 uppercase tracking-widest">
                  [SLA STATUS: SECURE]
                </div>
                
                {renderSlaVisual(activeTab)}
              </div>

              {/* DETAILS AND TELEMETRY LOG CARD */}
              <div className={`rounded-3xl border p-6 relative overflow-hidden transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-indigo-950/10 via-slate-950 to-slate-950 border-slate-900 shadow-xl' 
                  : 'bg-white border-slate-200/80 shadow-md'
              }`}>
                
                <div className="flex items-center gap-3 border-b dark:border-slate-900 pb-3.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center flex-shrink-0">
                    {React.createElement(activeComp.icon, { className: 'w-4 h-4' })}
                  </div>
                  <h4 className={`font-display font-black text-sm md:text-base uppercase tracking-wider ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {activeComp.title}
                  </h4>
                </div>

                <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-350' : 'text-slate-600'
                }`}>
                  {activeComp.desc}
                </p>

                {/* Telemetry Footer info */}
                <div className="grid grid-cols-2 gap-4 border-t dark:border-slate-900 pt-4 font-mono text-left">
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block mb-0.5">Telemetry Benchmark</span>
                    <span className={`text-[11px] font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {activeComp.statsValue}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block mb-0.5">System Reference</span>
                    <span className="text-[10px] text-indigo-400 font-bold">
                      {activeComp.subStats}
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
