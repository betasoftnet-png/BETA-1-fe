import React, { useState } from 'react';
import { User, Users, Landmark, Code, CheckCircle, ArrowRight, FileCode, Play, Copy, Check } from 'lucide-react';

export default function UseCases({ darkMode }) {
  const [activeTab, setActiveTab] = useState('individuals');
  const [copied, setCopied] = useState(false);

  const handleCopy = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'individuals', label: 'Individuals', icon: User },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'businesses', label: 'Businesses', icon: Landmark },
    // { id: 'developers', label: 'Developers', icon: Code },
  ];

  const contentMap = {
    individuals: {
      headline: 'Empower Your Personal Digital Life',
      desc: 'Seamlessly switch active email profiles and manage wealth from a single secure gateway. Switch active identities instantly with B2Auth\'s Google-style account switcher, secure your access with cloud TOTP 2FA apps, and track your checking, saving goals, and crypto wallets inside Cliks Personal modular widgets.',
      benefits: [
        'Google-style account switching without logout',
        'Cloud TOTP 2FA setup & backup codes',
        'Cliks Personal saving goals & crypto trackers',
        'Modular finance widgets & warning budgets'
      ],
      mock: (
        <div className="space-y-3.5 font-sans text-left">
          <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-[10px] uppercase text-indigo-500 tracking-wider">Cliks Personal Dashboard</span>
            </div>
            <span className="text-[8px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md">B2Auth Synced</span>
          </div>
          
          {/* Multi-Account Switcher Selector representation */}
          <div className="p-2.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-display text-[9px] font-black">
                SJ
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-800 dark:text-white leading-none">Sarah Jenkins</span>
                <span className="text-[8px] text-slate-500">sarahj@bnxmail.com (Primary)</span>
              </div>
            </div>
            <span className="text-[7.5px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded uppercase">Switch Account</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850">
              <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">Chase Checking</span>
              <div className="text-sm font-black text-white mt-0.5">$4,890.10</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850">
              <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">Crypto Wallet</span>
              <div className="text-sm font-black text-white mt-0.5">3.45 ETH ($10,650.00)</div>
            </div>
          </div>

          {/* Budget warning threshold */}
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-2.5 rounded-xl text-[9px] font-mono leading-relaxed flex items-start gap-1.5">
            <span className="text-rose-500">⚠️</span>
            <div>
              <span className="font-bold block uppercase text-[8px] mb-0.5">Budget Warning Alert</span>
              Your Entertainment threshold ($200.00) has been exceeded by 12%.
            </div>
          </div>
        </div>
      )
    },
    teams: {
      headline: 'High-Velocity Project Workspaces',
      desc: 'Correlate administrative communication with your project peers. Fusing high-encryption SMTP mail folders with real-time WhatsApp-style workspace chats enables developers and managers to resolve client attachments directly inside their inbox folders.',
      benefits: [
        'SMTP folders with instant workspace sync',
        'WhatsApp-style real-time project rooms',
        'WebSocket instant typing indicators',
        'Secure organization domain routing'
      ],
      mock: (
        <div className="space-y-3 font-sans text-left">
          <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-bold text-[10px] uppercase text-blue-500 tracking-wider">BNXMail: #client-onboarding</span>
            </div>
            <span className="text-[8px] font-mono text-slate-500">WebSocket Connected</span>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            <div className="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs">
              <div className="flex justify-between items-center text-[9px] mb-1">
                <strong className="text-indigo-400">Sarah Jenkins (PM)</strong>
                <span className="text-slate-500">10:48 AM</span>
              </div>
              <p className="text-slate-350 leading-relaxed text-[10px] font-light">
                Client just dispatched contract requirements to sales@bnxmail.com folder. Let\'s resolve the invoice terms inside this synchronized workspace thread!
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs">
              <div className="flex justify-between items-center text-[9px] mb-1">
                <strong className="text-slate-300">Marcus Chen (Developer)</strong>
                <span className="text-slate-500">10:49 AM</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[10px] font-light">
                Received. I am auditing the ledger now. Generating Factoring reserves advance directly inside the Cliks integration node.
              </p>
            </div>
          </div>

          {/* WebSocket typing feedback representation */}
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-550 border-t border-slate-900/60 pt-2">
            <span className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
            <span>Sarah Jenkins is typing under organization domain...</span>
          </div>
        </div>
      )
    },
    businesses: {
      headline: 'Full-Spectrum SME Treasury & Ledgers',
      desc: 'Maintain absolute administrative transparency over your operations. Record transactional history inside unified financial balance ledgers, track client-vendor relationship directories, monitor inventory stock with automated alert triggers, and review compliance logs.',
      benefits: [
        'Financial ledgers with client directories',
        'Receivable & payable balance sheets',
        'Stock inventory low-stock alert triggers',
        'Auditor anomaly logs & leaderboards'
      ],
      mock: (
        <div className="space-y-3.5 font-sans text-left">
          <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="font-bold text-[10px] uppercase text-cyan-500 tracking-wider">Cliks Business Books Panel</span>
            </div>
            <span className="text-[8px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">Auditor Approved</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
              <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider block">Receivables Balance</span>
              <div className="text-sm font-black text-white mt-0.5">$38,000.00</div>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
              <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider block">Payables Balance</span>
              <div className="text-sm font-black text-white mt-0.5">$4,500.00</div>
            </div>
          </div>

          {/* Real-time stock low alert and auditor verification status representation */}
          <div className="space-y-1.5 font-mono text-[9px]">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-between">
              <span>🚨 Low Stock Trigger: Standard Nodes</span>
              <span className="font-bold">2 items remaining</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-850 text-slate-400">
              <span>🛡️ Auditor Anomaly Check: 0 flags raised // Compliant</span>
            </div>
          </div>
        </div>
      )
    },
    developers: {
      headline: 'Cryptographic API Integration',
      desc: 'Build secure authentication networks instantly. Integrate B2Auth session switcher gateways, enforce real-time strong password rules validation, and synchronize active ledger payloads with robust, developer-first endpoints and JSON webhooks.',
      benefits: [
        'SSO active session switcher gate APIs',
        'TOTP cloud authenticator synchronizers',
        'Real-time password rules validation code',
        'Consensus ledger split transaction webhooks'
      ],
      mock: (
        <div className="space-y-3 text-left font-mono text-xs">
          <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
            <div className="flex items-center gap-1 text-slate-400">
              <FileCode className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>validate_b2auth_switcher.js</span>
            </div>
            <button 
              onClick={() => handleCopy(`const bnx = require('@bnx/sdk')('sec_key_live_842');

// Verify B2Auth active session switcher gateway
bnx.auth.verifySession({
  sessionToken: 'bnx_sec_sha_c09a846c',
  mfaVerified: true,
  primaryEmail: 'sarahj@bnxmail.com'
}).then(res => {
  console.log('Account switcher sync:', res.status);
});`)}
              className="p-1.5 rounded bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800 cursor-pointer"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-[10px] leading-relaxed overflow-x-auto text-slate-350 select-all">
            <span className="text-purple-400">const</span> bnx = <span className="text-indigo-400">require</span>(<span className="text-emerald-400">'@bnx/sdk'</span>)(<span className="text-emerald-400">'sec_key_live_842'</span>);<br /><br />
            <span className="text-slate-500">// Verify B2Auth active session switcher gateway</span><br />
            bnx.<span className="text-cyan-400">auth</span>.<span className="text-blue-400">verifySession</span>(&#123;<br />
            &nbsp;&nbsp;sessionToken: <span className="text-emerald-400">'bnx_sec_sha_c09a846c'</span>,<br />
            &nbsp;&nbsp;mfaVerified: <span className="text-amber-400">true</span>,<br />
            &nbsp;&nbsp;primaryEmail: <span className="text-emerald-400">'sarahj@bnxmail.com'</span><br />
            &#125;).<span className="text-blue-400">then</span>(<span className="text-orange-400">res</span> =&gt; &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;console.<span className="text-blue-400">log</span>(<span className="text-emerald-400">'Account switcher sync:'</span>, res.<span className="text-cyan-400">status</span>);<br />
            &nbsp;&nbsp;&#125;);
          </div>
        </div>
      )
    }
  };

  const activeContent = contentMap[activeTab];

  return (
    <section id="use-cases" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-800/40">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            Custom Fit
          </div>
          <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Targeted Use Cases
          </h2>
          <p className={`text-base font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Beta Softnet builds solutions that match the velocity of your life and workspace operations. Choose your segment to inspect the dynamic interface.
          </p>
        </div>

        {/* Tab Controls (Segmented Selector) */}
        <div className="flex justify-center mb-12">
          <div className={`p-1.5 rounded-2xl border flex gap-1 shadow-lg ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : darkMode
                        ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel info column */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <h3 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {activeContent.headline}
            </h3>
            
            <p className={`text-base font-light leading-relaxed mb-6 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {activeContent.desc}
            </p>

            {/* Check highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {activeContent.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {b}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/80 w-full">
              <a 
                href="#final-cta"
                className="inline-flex items-center gap-1 text-sm font-display font-bold uppercase tracking-wider text-indigo-500 hover:text-indigo-600 group"
              >
                Start building today
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right mock UI display column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className={`w-full max-w-[480px] rounded-3xl p-6 border shadow-2xl relative ${
              darkMode 
                ? 'glass-card-dark border-slate-800' 
                : 'glass-card-light border-slate-200'
            }`}>
              {/* Card Titlebar */}
              <div className="flex items-center justify-between border-b dark:border-slate-800/80 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  bnx-live-context-panel
                </span>
              </div>

              {/* Dynamic render */}
              {activeContent.mock}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
