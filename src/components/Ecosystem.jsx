import React, { useState } from 'react';
import { Shield, Mail, CreditCard, Landmark, CheckCircle2, Key, Unlock, Lock, ArrowRight, Server, Zap, RefreshCw } from 'lucide-react';
import betalogo from '../assets/beta.png'

export default function Ecosystem({ darkMode, isLogged, setIsLogged, activeUser, ledgerBalance }) {
  const [loading, setLoading] = useState(false);

  const triggerLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLogged(prev => !prev);
      setLoading(false);
    }, 1200);
  };

  const highlights = [
    { title: 'Product-Based Company', desc: 'We build proprietary foundational tech, not generic templates.' },
    { title: 'Ecosystem-Driven', desc: 'Cross-functional products integrated natively under a single protocol.' },
    { title: 'Secure & Scalable', desc: 'Advanced multi-factor security running on robust single sign-on containerized architectures.' },
  ];

  return (
    <section id="ecosystem" className="py-24 relative overflow-hidden border-t border-slate-200/50 dark:border-slate-800/40 z-10">
      
      {/* 1. STATEFUL BACKGROUND WRAPPER (Renders above body but behind cards) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute -bottom-10 left-10 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />

        {/* PhonePe-Inspired Dynamic Wave Ribbons */}
        <div className="absolute left-0 bottom-0 w-80 h-80 opacity-[0.35] dark:opacity-[0.1] translate-y-12 -translate-x-12">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M 0 300 C 100 200, 150 100, 300 0 L 0 0 Z" fill="url(#eco-wave-1)" opacity="0.4" />
            <path d="M 0 300 C 80 220, 180 120, 300 0" stroke="url(#eco-wave-2)" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
            <circle cx="150" cy="150" r="120" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
            <defs>
              <linearGradient id="eco-wave-1" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="eco-wave-2" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Zoho-Inspired Abstract Floating Blobs & Dot Matrix */}
        <div className="absolute right-0 top-12 w-96 h-96 opacity-[0.4] dark:opacity-[0.15] translate-x-20">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Dot Pattern Grid */}
            <pattern id="dot-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#3b82f6" opacity="0.4" />
            </pattern>
            <rect width="300" height="300" fill="url(#dot-grid)" />
            {/* Tilted Rounded Rects */}
            <rect x="80" y="50" width="80" height="180" rx="40" transform="rotate(-30 80 50)" fill="url(#tilted-grad)" opacity="0.5" />
            <rect x="180" y="100" width="40" height="120" rx="20" transform="rotate(-30 180 100)" fill="url(#tilted-grad-2)" opacity="0.4" />
            <defs>
              <linearGradient id="tilted-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="tilted-grad-2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Grid: Intro on Left, B2Auth Simulator on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Who We Are / Ecosystem Value */}
          <div className="lg:col-span-5 text-left flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-500 font-display font-semibold text-xs tracking-wider uppercase mb-6">
              Our Vision
            </div>
            
            <h2 className={`font-display font-black text-3xl md:text-4xl tracking-tight leading-tight mb-6 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Who We Are & How <br />We Build
            </h2>
            
            <p className={`text-base font-light leading-relaxed mb-8 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Beta Softnet is a premium engineering company designed to put an end to subscription fragmentation. 
              Instead of forcing users to stitch together disjointed systems, we architected **BNX**—a unified 
              software suite running on a singular federated core database. Secure auth, communications, 
              and global trade portals operate in lockstep.
            </p>

            {/* Core Pillars */}
            <div className="space-y-5 w-full">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {h.title}
                    </h4>
                    <p className={`text-sm mt-0.5 font-light ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Differentiator - B2Auth Simulator */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Title above simulator */}
            <div className="text-center mb-8">
              <h3 className={`font-display font-extrabold text-2xl tracking-tight ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                One Identity. Multiple Solutions.
              </h3>
              <p className={`text-sm font-light mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Interact with B2Auth below to unlock all associated apps instantly.
              </p>
            </div>

            {/* B2Auth Interactive Container */}
            <div className={`w-full max-w-[560px] rounded-3xl p-6 border shadow-2xl relative ${
              darkMode 
                ? 'glass-card-dark border-slate-800' 
                : 'glass-card-light border-slate-200'
            }`}>
              {/* Central B2Auth Module */}
              <div className="flex flex-col items-center pb-6 border-b border-dashed border-slate-200 dark:border-slate-800/80">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 mb-3 relative">
                  <Shield className="w-7 h-7" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                    <Key className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                
                <h4 className={`font-display font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  B2Auth Security Portal
                </h4>
                
                {/* Active user preview */}
                <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/10">
                  <img src={activeUser.avatar} className="w-4 h-4 rounded-full" alt="avatar" />
                  <span className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {activeUser.email}
                  </span>
                </div>

                {/* Login trigger button */}
                <button 
                  onClick={triggerLogin}
                  disabled={loading}
                  className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-xs tracking-wider uppercase text-white shadow-lg cursor-pointer transition-all duration-300 ${
                    loading 
                      ? 'bg-slate-700 pointer-events-none'
                      : isLogged 
                        ? 'bg-red-600 hover:bg-red-700 shadow-red-600/15'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/15 hover:scale-[1.02]'
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Syncing Credentials...
                    </>
                  ) : isLogged ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      Sign Out (Lock All)
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5" />
                      Authorize B2Auth Session
                    </>
                  )}
                </button>
              </div>

              {/* Connected pipeline lasers */}
              <div className="relative h-12 w-full flex justify-between px-10 pointer-events-none">
                {/* Visual Pipeline lasers */}
                <div className={`absolute top-0 bottom-0 left-[20%] w-[2px] transition-all duration-700 ${
                  isLogged 
                    ? 'bg-gradient-to-b from-indigo-500 to-blue-500 shadow-[0_0_10px_#3b82f6]' 
                    : 'bg-slate-200 dark:bg-slate-800'
                }`} />
                <div className={`absolute top-0 bottom-0 left-[50%] w-[2px] transition-all duration-700 ${
                  isLogged 
                    ? 'bg-gradient-to-b from-indigo-500 to-purple-500 shadow-[0_0_10px_#a855f7]' 
                    : 'bg-slate-200 dark:bg-slate-800'
                }`} />
                <div className={`absolute top-0 bottom-0 left-[80%] w-[2px] transition-all duration-700 ${
                  isLogged 
                    ? 'bg-gradient-to-b from-indigo-500 to-cyan-500 shadow-[0_0_10px_#06b6d4]' 
                    : 'bg-slate-200 dark:bg-slate-800'
                }`} />
              </div>

              {/* Locked/Unlocked Linked Cards */}
              <div className="grid grid-cols-3 gap-4">
                
                {/* 1. BNXMail */}
                <div className={`rounded-2xl p-3 border text-left transition-all duration-500 ${
                  isLogged 
                    ? 'border-blue-500/30 bg-blue-500/5 shadow-md shadow-blue-500/5' 
                    : darkMode ? 'border-slate-800 bg-slate-900/40 opacity-50' : 'border-slate-200 bg-slate-50 opacity-60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <Mail className={`w-5 h-5 ${isLogged ? 'text-blue-500' : 'text-slate-400'}`} />
                    <span className={`w-2 h-2 rounded-full ${isLogged ? 'bg-emerald-500 animate-ping' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  </div>
                  <div className={`font-display font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>BNXMail</div>
                  <div className="text-[10px] mt-0.5 text-slate-400 truncate">
                    {isLogged ? 'Synced Inbox' : 'Session Locked'}
                  </div>
                  {isLogged && (
                    <div className="mt-2 text-[9px] text-blue-500 font-mono tracking-tighter bg-blue-500/5 p-1 rounded leading-none">
                      Token: bnx_mail_ok
                    </div>
                  )}
                </div>

                {/* 2. Cliks Finance */}
                <div className={`rounded-2xl p-3 border text-left transition-all duration-500 ${
                  isLogged 
                    ? 'border-purple-500/30 bg-purple-500/5 shadow-md shadow-purple-500/5' 
                    : darkMode ? 'border-slate-800 bg-slate-900/40 opacity-50' : 'border-slate-200 bg-slate-50 opacity-60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <React.Fragment>
                      <CreditCard className={`w-5 h-5 ${isLogged ? 'text-purple-500' : 'text-slate-400'}`} />
                      <span className={`w-2 h-2 rounded-full ${isLogged ? 'bg-emerald-500 animate-ping' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    </React.Fragment>
                  </div>
                  <div className={`font-display font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>Cliks FinTech</div>
                  <div className="text-[10px] mt-0.5 text-slate-400 truncate">
                    {isLogged ? 'Synced Ledger' : 'Session Locked'}
                  </div>
                  {isLogged && (
                    <div className="mt-2 text-[9px] text-purple-500 font-mono tracking-tighter bg-purple-500/5 p-1 rounded leading-none">
                      Token: clk_user_ok
                    </div>
                  )}
                </div>

                {/* 3. Cliks Business */}
                <div className={`rounded-2xl p-3 border text-left transition-all duration-500 ${
                  isLogged 
                    ? 'border-cyan-500/30 bg-cyan-500/5 shadow-md shadow-cyan-500/5' 
                    : darkMode ? 'border-slate-800 bg-slate-900/40 opacity-50' : 'border-slate-200 bg-slate-50 opacity-60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <Landmark className={`w-5 h-5 ${isLogged ? 'text-cyan-500' : 'text-slate-400'}`} />
                    <span className={`w-2 h-2 rounded-full ${isLogged ? 'bg-emerald-500 animate-ping' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  </div>
                  <div className={`font-display font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>Cliks Business</div>
                  <div className="text-[10px] mt-0.5 text-slate-400 truncate">
                    {isLogged ? 'Synced Treasury' : 'Session Locked'}
                  </div>
                  {isLogged && (
                    <div className="mt-2 text-[9px] text-cyan-500 font-mono tracking-tighter bg-cyan-500/5 p-1 rounded leading-none">
                      Token: clk_biz_ok
                    </div>
                  )}
                </div>

              </div>

              {/* Live Terminal Log */}
              <div className="mt-5 p-3 rounded-xl bg-slate-950 text-slate-400 font-mono text-[10px] text-left leading-relaxed max-h-24 overflow-y-auto">
                <span className="text-indigo-500">[SYSTEM]</span> Ready to mount BNX identity...<br />
                {loading && (
                  <span className="text-amber-500 animate-pulse">[B2Auth] Initializing authentication handshake on auth.bnx.net...<br /></span>
                )}
                {isLogged ? (
                  <>
                    <span className="text-emerald-500">[B2Auth] Success: Authorized user {activeUser.email}</span><br />
                    <span className="text-emerald-400">[SYNC] Synced mail accounts, personal wallets, and business portfolios.</span>
                  </>
                ) : (
                  !loading && <span className="text-slate-500">[B2Auth] Awaiting authorization... Click authenticate button above.</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
