import React from 'react';
import { Shield, Mail, CreditCard, Landmark, CheckCircle2, Radio } from 'lucide-react';

export default function Features({ darkMode }) {
  const products = [
    {
      id: 'b2auth',
      name: 'B2Auth Session Hub',
      tag: 'SSO SWITCHER',
      color: 'text-indigo-400',
      strokeColor: '#6366f1',
      accentBg: 'bg-indigo-500/10',
      accentBorder: 'border-indigo-500/20',
      accentGlow: 'shadow-indigo-500/10',
      desc: 'Seamless Google-style multi-account profile switcher without logouts. Features secure active session managers, TOTP QR setup keys, and secure multi-channel recovery tools.',
      specs: [
        { label: 'Latency Gate', value: '<9.4ms' },
        { label: 'Security Level', value: 'Grade-A' }
      ],
      points: [
        'Seamless switching without logout',
        'Active session manager dashboard',
        'TOTP QR setup & backup codes',
        'Step-by-step OTP recovery flows'
      ],
      svg: (
        <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto mb-5 drop-shadow-[0_0_15px_rgba(99,102,241,0.25)]">
          <path d="M 60 12 Q 85 20, 85 45 Q 85 75, 60 88 Q 35 75, 35 45 Q 35 20, 60 12 Z" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="48" r="16" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" className="animate-spin-slow" />
          <circle cx="60" cy="48" r="8" fill="#6366f1" opacity="0.25" />
          <path d="M 54 48 L 66 48 M 60 42 L 60 54" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'cliks',
      name: 'Cliks Wealth Engine',
      tag: 'PERSONAL FINTECH',
      color: 'text-blue-400',
      strokeColor: '#3b82f6',
      accentBg: 'bg-blue-500/10',
      accentBorder: 'border-blue-500/20',
      accentGlow: 'shadow-blue-500/10',
      desc: 'Modular personal cockpit tracking check balances, card integrations, and crypto. Custom savings vaults, inter-account transfers, and budget planners with warning alerts.',
      specs: [
        { label: 'Daily Transfers', value: '$4.2M' },
        { label: 'Bank Feeds', value: '14+ Active' }
      ],
      points: [
        'Checking, wallets & crypto feeds',
        'Inter-account money transfers',
        'Goals-based emergency savings',
        'Stock & SIP analytics calendar'
      ],
      svg: (
        <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto mb-5 drop-shadow-[0_0_15px_rgba(59,130,246,0.25)]">
          <rect x="25" y="22" width="70" height="46" rx="6" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="25" y1="36" x2="95" y2="36" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="35" y="46" width="16" height="10" rx="2" fill="#3b82f6" opacity="0.3" />
          <line x1="68" y1="58" x2="68" y2="46" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="58" x2="78" y2="42" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="88" y1="58" x2="88" y2="50" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'cliksbiz',
      name: 'Cliks Business Books',
      tag: 'BOOKS MODULE',
      color: 'text-purple-400',
      strokeColor: '#a855f7',
      accentBg: 'bg-purple-500/10',
      accentBorder: 'border-purple-500/20',
      accentGlow: 'shadow-purple-500/10',
      desc: 'Advanced SME books ledger tracking client directories, payables, stock inventory, financial forecasting, and active Auditor anomaly compliance models.',
      specs: [
        { label: 'Inventory Warn', value: 'Low Alerts' },
        { label: 'Compliance Index', value: '100%' }
      ],
      points: [
        'Receivable/payable balances',
        'Real-time low-stock inventory',
        'Auditor compliance fraud reviews',
        'Ecosystem leaderboards & splits'
      ],
      svg: (
        <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto mb-5 drop-shadow-[0_0_15px_rgba(168,85,247,0.25)]">
          <path d="M 30 82 L 90 82 M 35 82 L 35 46 M 50 82 L 50 46 M 70 82 L 70 46 M 85 82 L 85 46 M 25 46 L 95 46 M 60 22 L 25 46 M 60 22 L 95 46" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="60" cy="62" r="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
          <path d="M 57 62 L 59 64 L 63 59" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    },
    {
      id: 'bnxmail',
      name: 'BNXMail Hybrid Client',
      tag: 'HYBRID COMMUNICATIONS',
      color: 'text-cyan-400',
      strokeColor: '#06b6d4',
      accentBg: 'bg-cyan-500/10',
      accentBorder: 'border-cyan-500/20',
      accentGlow: 'shadow-cyan-500/10',
      desc: 'Combines traditional SMTP folders (Inbox, Sent, Drafts) with instant WhatsApp-style live collaboration, converting threads into WebSockets streams.',
      specs: [
        { label: 'WebSocket Sync', value: '<2ms' },
        { label: 'Mailboxes', value: 'Self-Service' }
      ],
      points: [
        'SMTP folders (Inbox, Sent, Drafts)',
        'WhatsApp-style messaging chats',
        'WebSocket real-time typing sync',
        'Self-service domains validations'
      ],
      svg: (
        <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto mb-5 drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]">
          <rect x="25" y="22" width="70" height="46" rx="6" fill="none" stroke="#06b6d4" strokeWidth="2" />
          <path d="M 25 26 L 60 52 L 95 26" stroke="#06b6d4" strokeWidth="2" strokeLinejoin="round" fill="none" />
          <path d="M 70 56 Q 80 56, 80 64 Q 80 72, 72 72 L 66 77 L 66 72 Q 60 72, 60 64 Q 60 56, 70 56 Z" fill="#06b6d4" opacity="0.3" stroke="#06b6d4" strokeWidth="1" />
          <circle cx="67" cy="64" r="1" fill="#06b6d4" />
          <circle cx="70" cy="64" r="1" fill="#06b6d4" />
          <circle cx="73" cy="64" r="1" fill="#06b6d4" />
        </svg>
      )
    }
  ];

  return (
    <section id="engineered-scale" className="py-24 relative overflow-hidden bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-800/40">
      
      {/* 1. BLUEPRINT GRID LAYOUT TEXTURE */}
      <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.12] pointer-events-none z-0" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }} />

      {/* 2. DYNAMIC PIPELINE HEADER CONNECTORS (Visual SVG overlay linking columns) */}
      <div className="absolute top-[280px] inset-x-0 w-full h-8 stroke-indigo-500/15 dark:stroke-indigo-500/5 stroke-dashed fill-none pointer-events-none hidden lg:block z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 32" preserveAspectRatio="none">
          <path d="M 180 16 L 1260 16" strokeWidth="2" strokeDasharray="6 8" />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            Ecosystem Core
          </div>
          <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Engineered for Scale
          </h2>
          <p className={`text-base font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Behind our modular interface runs a fully federated digital environment syncing communications, auth switches, and personal ledgers concurrently.
          </p>
        </div>

        {/* 4-Column Architectural Grid Displaying ALL Products Simultaneously */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {products.map((p, idx) => (
            <div 
              key={p.id}
              className={`group relative rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                darkMode 
                  ? 'glass-card-dark border-slate-850 hover:border-indigo-500/30 bg-slate-950/60' 
                  : 'glass-card-light border-slate-200/80 hover:border-indigo-200 bg-white/80'
              } shadow-lg hover:${p.accentGlow}`}
            >
              {/* Coordinate Watermark (Coordinate system styling) */}
              <div className="absolute top-4 right-4 font-mono text-[9px] font-bold text-slate-500/30 uppercase tracking-widest select-none">
                SYS-NODE // 0{idx + 1}
              </div>

              <div>
                {/* 1. Custom Inline SVG Drawing illustration representing the product */}
                <div className="pt-2">
                  {p.svg}
                </div>

                {/* Tag & Title */}
                <div className="text-center mb-5">
                  <span className={`inline-block text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-1.5 ${p.accentBg} ${p.color}`}>
                    {p.tag}
                  </span>
                  <h3 className={`font-display font-black text-lg tracking-tight ${
                    darkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
                  } transition-colors`}>
                    {p.name}
                  </h3>
                </div>

                {/* Description */}
                <p className={`text-xs font-light leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {p.desc}
                </p>

                {/* Point-by-point capabilities checklist */}
                <div className="space-y-2 mb-6 border-t dark:border-slate-900 pt-5">
                  {p.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-[11px] font-light text-left">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className={darkMode ? 'text-slate-350' : 'text-slate-655'}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Specs Bar */}
              <div className="border-t dark:border-slate-900 pt-4 mt-auto flex items-center justify-between text-[10px] font-mono text-slate-400">
                {p.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="text-left">
                    <span className="block text-[8px] uppercase tracking-wider text-slate-500">
                      {spec.label}
                    </span>
                    <span className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
