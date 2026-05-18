import React, { useState, useEffect, useRef } from 'react';
import { Mail, Shield, CreditCard, Landmark, Check, Sparkles, Send, RefreshCw, Sliders, ArrowRight, Lock, Eye, Plus } from 'lucide-react';

export default function Products({ darkMode }) {
  const [activeTab, setActiveTab] = useState('bnxmail');
  
  // Advanced Scroll Parallax, Sticky-Pinning & Entrance Transition States
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    // 1. Mount timer guarantees that entrance transitions trigger immediately and are 100% visible on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 80);
    
    // 2. Parallax & Sticky scroll progress handler
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // A. Calculate parallax coordinates for backgrounds
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const progressVal = (viewportHeight - rect.top) / (viewportHeight + rect.height);
          setScrollY(progressVal * 140 - 50); // Fine-tuned offset shift
        }

        // B. Calculate sticky scroll tab progress
        // When the sticky container pins inside parent (height is 280vh, rect.top goes negative)
        const parentHeight = rect.height;
        const totalScrollable = parentHeight - viewportHeight;
        
        if (totalScrollable > 0) {
          const scrollOffset = -rect.top;
          // Calculate progress from 0 (starts pinning) to 1 (ends pinning)
          const rawProgress = scrollOffset / totalScrollable;
          const progress = Math.max(0, Math.min(1, rawProgress));
          
          setScrollProgress(progress * 100);

          // Cycle through the products cleanly depending on progress:
          // Adjusted slightly to leave a beautiful 10% scroll fade buffer at the end
          if (progress < 0.23) {
            setActiveTab('bnxmail');
          } else if (progress < 0.46) {
            setActiveTab('b2auth');
          } else if (progress < 0.69) {
            setActiveTab('cliks');
          } else {
            setActiveTab('cliksbus');
          }
        }
      }
    };

    // Calculate layout initial placement coordinates immediately
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 1. BNXMail Messaging Simulation State
  const [mailMessages, setMailMessages] = useState([
    { author: 'Sarah Jenkins', time: '10:42 AM', body: 'Marcus, did you review the scoped identity tokens dispatched under the v1 B2Auth gateway?' },
    { author: 'Marcus Chen', time: '10:44 AM', body: 'Audited and verified. Secure switchers isolate scopes perfectly. Keys are signed.' }
  ]);
  const [newMailInput, setNewMailInput] = useState('');
  
  const sendMailMessage = (e) => {
    e.preventDefault();
    if (!newMailInput.trim()) return;
    setMailMessages([
      ...mailMessages,
      { author: 'You (Developer)', time: 'Just now', body: newMailInput }
    ]);
    setNewMailInput('');
  };

  // 2. B2Auth Active Key Manager Simulation State
  const [sessionKeys, setSessionKeys] = useState([
    { app: 'bnx_mail_client', status: 'ACTIVE', token: 'bnx_sec_sha_c09a846c' },
    { app: 'cliks_ledger_wallet', status: 'ACTIVE', token: 'bnx_sec_sha_9f8a846c' },
    { app: 'cliks_biz_sme_bank', status: 'ACTIVE', token: 'bnx_sec_sha_12a7b8e9' }
  ]);
  const [rotatingKeys, setRotatingKeys] = useState(false);

  const rotateKeysSim = () => {
    setRotatingKeys(true);
    setTimeout(() => {
      const newKey = {
        app: 'ext_sandbox_' + Math.random().toString(36).substring(2, 6),
        status: 'ACTIVE',
        token: 'bnx_sec_sha_' + Math.random().toString(16).substring(2, 10)
      };
      setSessionKeys([newKey, ...sessionKeys]);
      setRotatingKeys(false);
    }, 900);
  };

  // 3. Cliks Personal Wealth Simulation State
  const [cliksChecking, setCliksChecking] = useState(4890.10);
  const [cliksCrypto, setCliksCrypto] = useState(13549.90);
  const [insightAlert, setInsightAlert] = useState('💡 Spending on server nodes is 12% lower this month. You earned $150.00 cash-back!');

  const simulateCheckingDeposit = () => {
    setCliksChecking(prev => prev + 1250.00);
    setInsightAlert('🎉 Success! Received $1,250.00 Invoice Milestone. Cash aggregated to Chase Checking.');
  };

  // 4. Cliks Business Invoice Factoring Simulation State
  const [invoiceSize, setInvoiceSize] = useState(38000); // USD
  const advanceRate = 0.90; // 90%
  const factoringFeeRate = 0.025; // 2.5%

  const advanceAmount = invoiceSize * advanceRate;
  const factoringFee = invoiceSize * factoringFeeRate;
  const netDisbursement = advanceAmount - factoringFee;

  // Tab switch list metadata
  const tabMetadata = [
    {
      id: 'bnxmail',
      name: 'BNXMail',
      tagline: 'Hybrid Email & Live Chat',
      desc: 'Combines traditional SMTP folders with instant WhatsApp-style collaboration channels, synchronizing private chats and team rooms in real-time.',
      icon: Mail,
      accent: 'text-blue-500',
      bgGlow: 'from-blue-500/10 to-indigo-500/5',
      badge: 'Email Reimagined'
    },
    {
      id: 'b2auth',
      name: 'B2Auth',
      tagline: 'Seamless Multi-Account Switcher',
      desc: 'Advanced authentication system with Google-style account switching, 2FA app setup, backup codes, and secure multi-channel OTP recovery.',
      icon: Shield,
      accent: 'text-indigo-500',
      bgGlow: 'from-indigo-500/10 to-purple-500/5',
      badge: 'Identity Protocol'
    },
    {
      id: 'cliks',
      name: 'Cliks',
      tagline: 'Smart Personal Wealth Dashboard',
      desc: 'Modular finance cockpit tracking checking balances, cryptocurrency portfolios, savings goals, monthly budgets, and planned transactions.',
      icon: CreditCard,
      accent: 'text-purple-500',
      bgGlow: 'from-purple-500/10 to-pink-500/5',
      badge: 'Personal Finance'
    },
    {
      id: 'cliksbus',
      name: 'Cliks Business',
      tagline: 'Books & Business Management',
      desc: 'Comprehensive SME business ledger tracking client directories, stock inventory valuation, financial forecasting, and active transaction audit trails.',
      icon: Landmark,
      accent: 'text-cyan-500',
      bgGlow: 'from-cyan-500/10 to-blue-500/5',
      badge: 'Corporate Banking'
    }
  ];

  return (
    <div ref={sectionRef} className="relative h-[280vh] z-10">
      
      {/* Sticky Inner Frame */}
      <section 
        id="products" 
        className={`sticky top-0 h-screen overflow-hidden flex flex-col justify-center transition-colors duration-1000 z-10 ${
          darkMode 
            ? 'bg-gradient-to-b from-[#0b0e17] via-[#06080e] to-[#0b0e17] border-t border-slate-900/60' 
            : 'bg-gradient-to-b from-indigo-50/20 via-slate-100/60 to-purple-50/20 border-t border-slate-200/50'
        }`}
      >
        
        {/* Core Protocol Sync Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-950/60 z-30 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-300 ease-out" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* 1. STATEFUL BACKGROUND WRAPPER */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Background radial orbs (Parallax shifts at 0.35x scroll speed) */}
          <div 
            className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[120px] transition-transform duration-300 ease-out" 
            style={{ transform: `translateY(${scrollY * 0.35}px)` }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/10 blur-[120px] transition-transform duration-300 ease-out" 
            style={{ transform: `translateY(${-scrollY * 0.35}px)` }}
          />

          {/* Zoho-Inspired Geometric Isometric Grid background (Parallax shifts at 0.15x scroll speed) */}
          <div 
            className="absolute inset-0 opacity-[0.25] dark:opacity-[0.08] transition-transform duration-300 ease-out"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M 0 100 L 800 500 M 0 200 L 800 600 M 0 300 L 800 700 M 0 400 L 800 800" stroke="#6366f1" strokeWidth="1" />
              <path d="M 0 700 L 800 300 M 0 600 L 800 200 M 0 500 L 800 100 M 0 800 L 800 400" stroke="#3b82f6" strokeWidth="1" />
              <circle cx="400" cy="400" r="300" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="8 8" />
              <circle cx="400" cy="400" r="200" stroke="#06b6d4" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* 2. FOREGROUND CONTENT WITH EXIT PARALLAX DISSOLVE */}
        <div 
          className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full transition-all duration-300 ease-out"
          style={{ 
            opacity: scrollProgress > 90 ? Math.max(0, 1 - (scrollProgress - 90) / 8) : 1,
            transform: scrollProgress > 90 ? `translateY(${(scrollProgress - 90) * -1.5}px)` : 'none'
          }}
        >
        
        {/* Section Header */}
        <div 
          className={`text-left max-w-3xl mb-6 transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-3">
            Unified Platform
          </div>
          <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tight mb-3 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Ecosystem Solutions
          </h2>
          <p className={`text-sm md:text-base font-light leading-relaxed ${
            darkMode ? 'text-slate-350' : 'text-slate-600'
          }`}>
            We engineered a unified product matrix. Individually stellar, collectively transformative—all connected natively under a single protocol. Toggle our sandbox explorer below to interact with live platform modules.
          </p>
        </div>

        {/* 12-Column Premium Split-Pane Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Custom Controller Switcher (lg:col-span-5) */}
          <div 
            className={`lg:col-span-5 flex flex-col gap-2.5 text-left transition-all duration-1000 delay-150 ease-out transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {tabMetadata.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative w-full rounded-2xl py-2.5 px-4 border text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group cursor-pointer ${
                    isActive
                      ? darkMode
                        ? 'bg-slate-900/60 border-slate-700 shadow-2xl'
                        : 'bg-white border-indigo-150 shadow-xl shadow-indigo-500/5'
                      : darkMode
                        ? 'border-slate-850 hover:border-slate-800 bg-slate-900/20'
                        : 'border-slate-200/60 hover:border-slate-300 bg-white/40'
                  }`}
                >
                  {/* Decorative Left Active glow Bar */}
                  <div className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r transition-all duration-300 ${
                    isActive ? 'bg-indigo-600 h-1/2' : 'bg-transparent h-0 group-hover:h-1/3 group-hover:bg-slate-400'
                  }`} />

                  <div className="flex gap-4 items-start pl-2">
                    {/* Brand Icon wrapper */}
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? darkMode ? 'bg-indigo-950 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                        : darkMode ? 'bg-slate-900 text-slate-500' : 'bg-slate-50 text-slate-400'
                    }`}>
                      <TabIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`font-display font-black text-base ${
                          isActive
                            ? darkMode ? 'text-white' : 'text-slate-900'
                            : darkMode ? 'text-slate-400' : 'text-slate-600 font-semibold'
                        }`}>
                          {tab.name}
                        </span>
                        
                        <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded font-extrabold tracking-widest ${
                          isActive
                            ? 'bg-indigo-500/10 text-indigo-500'
                            : 'bg-slate-500/10 text-slate-400 dark:text-slate-500'
                        }`}>
                          {tab.badge}
                        </span>
                      </div>

                      <div className={`text-xs font-semibold mb-1.5 ${tab.accent}`}>
                        {tab.tagline}
                      </div>

                      <p className={`text-xs font-light leading-relaxed ${
                        darkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {tab.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Ultra-Premium Active Sandbox Console (lg:col-span-7) */}
          <div 
            className={`lg:col-span-7 flex transition-all duration-1000 delay-300 ease-out transform ${
              isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
            }`}
          >
            <div className="w-full rounded-3xl border border-slate-850 bg-slate-950 shadow-2xl p-5 relative overflow-hidden text-left flex flex-col justify-between min-h-[415px]">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-2.5 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider ml-2">
                    BNX_CORE_PROTOCOL_PLAYGROUND // {activeTab.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest font-mono text-slate-500 font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </div>
              </div>

              {/* Dynamic Console UI Content Grid */}
              <div className="flex-grow flex flex-col justify-center relative min-h-[295px]">
                
                {/* 1. BNXMail Simulator Tab */}
                <div 
                  className={`w-full transition-all duration-700 ease-in-out transform ${
                    activeTab === 'bnxmail'
                      ? 'opacity-100 scale-100 translate-y-0 relative z-10'
                      : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute inset-x-0 top-0 z-0'
                  }`}
                >
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-2xl border border-slate-900 text-xs">
                      <div>
                        <span className="font-bold text-slate-200">Inbox Group:</span>
                        <span className="font-mono text-indigo-400 ml-1.5">engineering-review@bnxmail.com</span>
                      </div>
                      <span className="text-[9px] uppercase font-mono text-slate-500">SMTP + WebSockets</span>
                    </div>

                    <div className="space-y-2.5 max-h-[170px] overflow-y-auto pr-1">
                      {mailMessages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-2xl border text-xs max-w-[85%] leading-relaxed transition-all duration-300 ${
                            msg.author.includes('You')
                              ? 'bg-indigo-600/10 border-indigo-500/20 ml-auto text-right'
                              : 'bg-slate-900/60 border-slate-850 mr-auto text-left'
                          }`}
                        >
                          <div className={`flex items-center gap-2 mb-1.5 text-[9px] text-slate-400 ${
                            msg.author.includes('You') ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className="font-bold text-slate-300">{msg.author}</span>
                            <span>•</span>
                            <span>{msg.time}</span>
                          </div>
                          <p className="text-slate-200">{msg.body}</p>
                        </div>
                      ))}
                    </div>

                    {/* Chat Reply Form Input */}
                    <form onSubmit={sendMailMessage} className="flex gap-2 pt-2 border-t border-slate-900">
                      <input 
                        type="text" 
                        value={newMailInput}
                        onChange={(e) => setNewMailInput(e.target.value)}
                        placeholder="Compose message reply to the group mail thread..."
                        className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-850 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/35 font-sans"
                      />
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center justify-center"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* 2. B2Auth Smart Session Manager Simulator Tab */}
                <div 
                  className={`w-full transition-all duration-700 ease-in-out transform ${
                    activeTab === 'b2auth'
                      ? 'opacity-100 scale-100 translate-y-0 relative z-10'
                      : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute inset-x-0 top-0 z-0'
                  }`}
                >
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-2xl border border-slate-900 text-xs">
                      <div>
                        <span className="font-bold text-slate-200">Verification Gateway:</span>
                        <span className="font-mono text-emerald-400 ml-1.5">B2Auth Smart Switcher</span>
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded uppercase font-bold">Secured</span>
                    </div>

                    <div className="rounded-2xl border border-slate-900 bg-slate-950 p-3.5 font-mono text-[10px] text-slate-300 space-y-1.5 max-h-36 overflow-y-auto">
                      <div className="text-slate-500 pb-1 border-b border-slate-900">// Active federated session tokens:</div>
                      {sessionKeys.map((key, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-900 last:border-b-0">
                          <span className="text-slate-400">{key.app}</span>
                          <span className="text-indigo-400 select-all">{key.token}</span>
                          <span className="text-emerald-500 font-extrabold text-[9px] uppercase tracking-wider bg-emerald-500/5 px-1.5 py-0.5 rounded">
                            {key.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={rotateKeysSim}
                      disabled={rotatingKeys}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-display font-semibold uppercase tracking-wider shadow-lg shadow-indigo-600/10 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${rotatingKeys ? 'animate-spin' : ''}`} />
                      {rotatingKeys ? 'COMPUTING SECURE TOKENS...' : 'ROTATE SECURE SESSION TOKENS'}
                    </button>
                  </div>
                </div>

                {/* 3. Cliks Personal Wealth Simulator Tab */}
                <div 
                  className={`w-full transition-all duration-700 ease-in-out transform ${
                    activeTab === 'cliks'
                      ? 'opacity-100 scale-100 translate-y-0 relative z-10'
                      : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute inset-x-0 top-0 z-0'
                  }`}
                >
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-2xl border border-slate-900 text-xs">
                      <div>
                        <span className="font-bold text-slate-200">Consolidated Assets:</span>
                        <span className="font-mono text-purple-400 ml-1.5">Chase + Coinbase Synced</span>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-400 font-bold">
                        ${(cliksChecking + cliksCrypto).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Net
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Checking Card */}
                      <div className="p-3.5 rounded-2xl border border-slate-900 bg-slate-900/20 text-left">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                          Chase Checking Port
                        </span>
                        <span className="text-base font-display font-black text-slate-100">
                          ${cliksChecking.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-[9px] text-emerald-500 block mt-1 font-semibold">
                          Verified open-bank API
                        </span>
                      </div>
                      {/* Crypto Card */}
                      <div className="p-3.5 rounded-2xl border border-slate-900 bg-slate-900/20 text-left">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                          Coinbase Wallet API
                        </span>
                        <span className="text-base font-display font-black text-slate-100">
                          ${cliksCrypto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-[9px] text-indigo-400 block mt-1 font-semibold">
                          Active websocket feed
                        </span>
                      </div>
                    </div>

                    {/* Smart Alert panel */}
                    <div className="p-3 rounded-xl border border-purple-500/10 bg-purple-500/5 text-purple-300 font-sans text-xs flex items-center gap-2.5">
                      {insightAlert}
                    </div>

                    <button 
                      onClick={simulateCheckingDeposit}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-display font-semibold uppercase tracking-wider shadow-lg shadow-purple-600/10 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Simulate Invoice Receipt Payout (+$1,250.00)
                    </button>
                  </div>
                </div>

                {/* 4. Cliks Business SME Factoring Simulator Tab */}
                <div 
                  className={`w-full transition-all duration-700 ease-in-out transform ${
                    activeTab === 'cliksbus'
                      ? 'opacity-100 scale-100 translate-y-0 relative z-10'
                      : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute inset-x-0 top-0 z-0'
                  }`}
                >
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-2xl border border-slate-900 text-xs">
                      <div>
                        <span className="font-bold text-slate-200">SME Invoice Factoring:</span>
                        <span className="font-mono text-cyan-400 ml-1.5">Liquid Treasury Cash</span>
                      </div>
                      <span className="text-[9px] uppercase font-mono text-slate-500">Instant Advance</span>
                    </div>

                    {/* Interactive Factoring Range Slider */}
                    <div className="space-y-2 p-3.5 rounded-2xl border border-slate-900 bg-slate-900/10">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Total Invoice Size:</span>
                        <span className="font-display font-black text-cyan-400 text-base">
                          ${invoiceSize.toLocaleString()} USD
                        </span>
                      </div>
                      <input 
                        type="range"
                        min="10000"
                        max="150000"
                        step="2500"
                        value={invoiceSize}
                        onChange={(e) => setInvoiceSize(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-slate-500 font-bold tracking-wider">
                        <span>$10,000 MIN</span>
                        <span>$150,000 MAX CAP</span>
                      </div>
                    </div>

                    {/* Financial Calculations panel */}
                    <div className="grid grid-cols-3 gap-3 font-mono text-[10px]">
                      <div className="p-2.5 rounded-xl border border-slate-900 bg-slate-950 text-left">
                        <span className="text-slate-500 block text-[8px] uppercase tracking-wider mb-1">Advancement Size (90%)</span>
                        <span className="text-slate-200 font-bold block">${advanceAmount.toLocaleString()}</span>
                      </div>
                      <div className="p-2.5 rounded-xl border border-slate-900 bg-slate-950 text-left">
                        <span className="text-slate-500 block text-[8px] uppercase tracking-wider mb-1">Fee Margin (2.5%)</span>
                        <span className="text-red-400 font-bold block">-${factoringFee.toLocaleString()}</span>
                      </div>
                      <div className="p-2.5 rounded-xl border border-slate-900 bg-slate-950 text-left">
                        <span className="text-slate-500 block text-[8px] uppercase tracking-wider mb-1">Net Liquid Payout</span>
                        <span className="text-emerald-400 font-bold block">${netDisbursement.toLocaleString()}</span>
                      </div>
                    </div>

                    <a 
                      href="#/partners"
                      className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-display font-semibold uppercase tracking-wider shadow-lg shadow-cyan-600/10 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-4 h-4 text-white" />
                      Apply for factoring line
                    </a>
                  </div>
                </div>

              </div>

              {/* Terminal Footer Console */}
              <div className="border-t border-slate-900 pt-3.5 mt-5 flex items-center justify-between text-[9px] font-mono text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Protocol Target: active_node_handshake_ok</span>
                </div>
                <span>SSL v3.0 Clearance Secured</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  </div>
  );
}
