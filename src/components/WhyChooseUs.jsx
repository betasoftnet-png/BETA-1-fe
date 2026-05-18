import React from 'react';
import { Layers, Shuffle, MessageSquare, Zap, Check, X } from 'lucide-react';

export default function WhyChooseUs({ darkMode }) {
  const comparisonItems = [
    { feature: 'Identity Protocol', legacy: 'Fragmented (5+ Accounts & Passwords)', bnx: 'Unified (1 B2Auth Federated Key)', isTrue: true },
    { feature: 'Billing & Licensing', legacy: 'Siloed (Separate Subscriptions)', bnx: 'Aggregate Single SaaS invoice', isTrue: true },
    { feature: 'Communication Flow', legacy: 'Rigid static threads (traditional CCs)', bnx: 'High-velocity WhatsApp-like Groups', isTrue: true },
    { feature: 'Finance & Banking', legacy: 'Manual export CSV aggregate reports', bnx: 'Open-banking synced dynamic ledgers', isTrue: true },
    { feature: 'Architecture latency', legacy: 'Third-party API hooks (slow)', bnx: 'Native federated core protocols (&lt;15ms)', isTrue: true }
  ];

  return (
    <section id="why-choose-us" className="py-24 relative overflow-hidden z-10">
      
      {/* 1. STATEFUL BACKGROUND WRAPPER */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* PhonePe-Inspired Sleek Floating Ellipse Waves */}
        <div className="absolute right-0 bottom-0 w-96 h-96 opacity-[0.35] dark:opacity-[0.1] translate-x-20 translate-y-20">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="150" cy="150" rx="140" ry="80" stroke="url(#ellipse-grad)" strokeWidth="6" transform="rotate(-25 150 150)" />
            <ellipse cx="150" cy="150" rx="110" ry="60" stroke="url(#ellipse-grad)" strokeWidth="2" strokeDasharray="6 6" transform="rotate(-25 150 150)" />
            <defs>
              <linearGradient id="ellipse-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            Comparison
          </div>
          <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Why Beta Softnet?
          </h2>
          <p className={`text-base font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Compare the structural efficiency of a unified ecosystem against the administrative friction of isolated legacy software suites.
          </p>
        </div>

        {/* 2x1 layout Grid: Interactive comparative chart on Left, Unique feature highlight on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Structural Comparator Table */}
          <div className="lg:col-span-7 text-left">
            <div className={`rounded-3xl border shadow-xl p-6 overflow-hidden ${
              darkMode ? 'glass-card-dark border-slate-800' : 'glass-card-light border-slate-200/60'
            }`}>
              <div className="px-2 py-1 uppercase text-xs font-mono font-bold tracking-wider text-indigo-500 mb-4 border-b dark:border-slate-800/80 pb-2">
                Structural Comparison Matrix
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b dark:border-slate-800 text-[11px] font-mono uppercase tracking-wider ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <th className="py-3 px-2">Core Parameter</th>
                      <th className="py-3 px-2">Isolated Silos</th>
                      <th className="py-3 px-2 text-indigo-500">BNX Suite</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                    {comparisonItems.map((item, idx) => (
                      <tr key={idx} className="text-xs transition-colors hover:bg-indigo-500/5">
                        <td className={`py-4 px-2 font-display font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                          {item.feature}
                        </td>
                        <td className="py-4 px-2 text-slate-400 font-light flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                          {item.legacy}
                        </td>
                        <td className="py-4 px-2 text-indigo-500 font-semibold">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            {item.bnx}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Unique Feature Deep-Dive (Group Email Spotlight) */}
          <div className="lg:col-span-5 text-left flex flex-col items-start justify-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-500 font-display font-semibold text-xs tracking-wider uppercase mb-5 animate-float">
              Ecosystem Highlight
            </div>

            {/* Title */}
            <h3 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Spotlight Feature: <br />
              <span className="text-gradient-purple-cyan">WhatsApp-style Group Mail</span>
            </h3>

            {/* Desc */}
            <p className={`text-sm font-light leading-relaxed mb-6 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Our primary differentiator in BNXMail is the conversational inbox protocol. Instead of sorting 
              through rigid chain responses with redundant CCs, teams establish secure, unified channels inside 
              their email system. Incoming client messages drop into shared real-time feeds, unlocking collaboration 
              without complex slack/teams hookups.
            </p>

            {/* Key list */}
            <div className="space-y-4 w-full">
              <div className="flex gap-3">
                <div className="p-2 h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-display font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Conversational inbox flows</h4>
                  <p className={`text-xs mt-0.5 font-light ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Say goodbye to cluttered reply-all chains. Brainstorm inside your inbox.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-2 h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-display font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Isolated attachment repositories</h4>
                  <p className={`text-xs mt-0.5 font-light ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Incoming files are automatically compiled into accessible project drawers.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
