import React, { useState, useEffect } from 'react';
import { Mail, Shield, CreditCard, Landmark, CheckCircle, ArrowRight, CornerDownRight, Play, RefreshCw, Send, Plus } from 'lucide-react';
import Features from '../components/Features';

export default function ProductsPage({ 
  darkMode, 
  activeUser, 
  isLogged, 
  setIsLogged, 
  ledgerBalance, 
  setLedgerBalance, 
  ledgerLogs, 
  setLedgerLogs 
}) {
  const [activeProductTab, setActiveProductTab] = useState('bnxmail');
  
  // 1. BNXMail Conversational Thread Simulator
  const [mailMessages, setMailMessages] = useState([
    { author: 'Sarah Jenkins', time: '10:42 AM', body: 'Team, I updated the client B2Auth verification flow in /v1/auth/session/verify. Can someone audit the key scopes?' },
    { author: 'Marcus Chen', time: '10:44 AM', body: 'Checked and signed! Verified secure switcher isolates scopes perfectly. Dispatched test tokens.' }
  ]);
  const [newMailInput, setNewMailInput] = useState('');

  const sendMailSim = (e) => {
    e.preventDefault();
    if (!newMailInput.trim()) return;
    setMailMessages([
      ...mailMessages,
      { author: isLogged ? activeUser.name : 'You (Guest)', time: 'Just now', body: newMailInput }
    ]);
    setNewMailInput('');
  };

  // 2. B2Auth session verification simulator
  const [ssoState, setSsoState] = useState(isLogged ? 'success' : 'idle');
  
  useEffect(() => {
    setSsoState(isLogged ? 'success' : 'idle');
  }, [isLogged]);

  const triggerSsoSim = () => {
    setSsoState('checking');
    setTimeout(() => {
      setSsoState('success');
      setIsLogged(true);
    }, 1200);
  };

  const addLedgerTransaction = () => {
    const extraCredit = 1200.00;
    setLedgerBalance(ledgerBalance + extraCredit);
    setLedgerLogs([
      { title: 'Factored Invoice Payout', amount: extraCredit, type: 'credit' },
      ...ledgerLogs
    ]);
  };

  // 4. Cliks Business Factoring slider
  const [invoiceSize, setInvoiceSize] = useState(25000); // USD
  const advanceRate = 0.90; // 90%
  const factoringFeeRate = 0.025; // 2.5%

  const advanceAmount = invoiceSize * advanceRate;
  const factoringFee = invoiceSize * factoringFeeRate;
  const netDisbursement = advanceAmount - factoringFee;

  return (
    <div className="pt-28 pb-20 relative overflow-hidden text-left">
      
      {/* Visual Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            BNX Ecosystem Solutions
          </div>
          <h1 className={`font-display font-black text-4xl md:text-6xl tracking-tight mb-6 leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Unified Software for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              Connected Generation.
            </span>
          </h1>
          <p className={`text-base md:text-lg font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Beta Softnet builds secure, state-managed applications connected natively under a singular secure identity protocol. No isolated pipelines, no duplicated databases.
          </p>
        </div>

        {/* Dynamic Product Tab Selectors */}
        <div className="flex flex-wrap gap-3 mb-12 border-b dark:border-slate-800/80 pb-6">
          {[
            { id: 'bnxmail', name: 'BNXMail', icon: Mail, color: 'text-blue-500' },
            { id: 'b2auth', name: 'B2Auth Security', icon: Shield, color: 'text-indigo-500' },
            { id: 'cliks', name: 'Cliks Personal', icon: CreditCard, color: 'text-purple-500' },
            { id: 'cliksbiz', name: 'Cliks Business', icon: Landmark, color: 'text-cyan-500' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveProductTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-display font-black border transition-all cursor-pointer ${
                  activeProductTab === tab.id
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20 scale-[1.01]'
                    : darkMode
                      ? 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-350'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeProductTab === tab.id ? 'text-white' : tab.color}`} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* 1. STATEFUL DOCK PLAYGROUNDS */}
        <div className="mb-24">
          
          {/* BNXMAIL SIMULATOR */}
          {activeProductTab === 'bnxmail' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-float">
              <div className="lg:col-span-5 text-left">
                <span className="font-mono text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-2">
                  Ecosystem Client — BNXMail
                </span>
                <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-4 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  WhatsApp-Style Group Inbox
                </h2>
                <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Fusing standard SMTP/IMAP protocol emails with websocket-driven team workspaces. Instead of messy CC trees, correspond in structural conversational threads under high-encryption security.
                </p>

                <ul className="space-y-3 mb-6">
                  {['Websocket-powered message ripples', 'Automatic thread grouping', 'One-click B2Auth login integration'].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-light">
                      <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chat Thread Console */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-850 bg-slate-950 shadow-2xl p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500 animate-pulse" />
                      <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                        BNXMail Thread: dev-sprint
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 font-extrabold">
                      Cascaded Security
                    </span>
                  </div>

                  {/* Messages logs */}
                  <div className="flex-grow space-y-4 max-h-60 overflow-y-auto mb-4 font-sans text-xs">
                    {mailMessages.map((msg, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-850">
                        <div className="flex items-center justify-between font-bold text-[10px] text-slate-450 mb-1">
                          <span className="text-indigo-400">{msg.author}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="text-slate-250 leading-relaxed font-light">{msg.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Input form */}
                  <form onSubmit={sendMailSim} className="flex gap-2 border-t border-slate-900 pt-3">
                    <input 
                      type="text" 
                      required 
                      value={newMailInput}
                      onChange={(e) => setNewMailInput(e.target.value)}
                      placeholder="Reply to this group mail thread..." 
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-white font-light"
                    />
                    <button 
                      type="submit"
                      className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* B2AUTH SIMULATOR */}
          {activeProductTab === 'b2auth' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-float">
              <div className="lg:col-span-5 text-left">
                <span className="font-mono text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-2">
                  B2Auth Authentication Gateway
                </span>
                <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-4 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Smart Session & Identity Switcher
                </h2>
                <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  B2Auth enables seamless Google-style identity switching and session management across your digital ecosystem. Accounts switch without logout, storing unique secure tokens for mailbox and storage settings.
                </p>

                <ul className="space-y-3 mb-6">
                  {['Multi-account Google-style login', 'Advanced 2FA (TOTP) Setup', 'Secure Step-by-Step OTP Recovery'].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-light">
                      <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* B2Auth Session Simulation Dashboard */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-850 bg-slate-950 shadow-2xl p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between text-center">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4 text-left">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-indigo-500" />
                      <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">
                        B2Auth Session Manager Console
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 font-extrabold">
                      SSL SECURED
                    </span>
                  </div>

                  {/* Auth States */}
                  <div className="flex-grow flex flex-col items-center justify-center py-6">
                    {ssoState === 'idle' && (
                      <div className="space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/5">
                          🔑
                        </div>
                        <h4 className="font-display font-bold text-sm text-slate-300">SSO Authorization Required</h4>
                        <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                          Click "Authorize Session" below to run security key checks and unlock your BNX profile permissions.
                        </p>
                      </div>
                    )}

                    {ssoState === 'checking' && (
                      <div className="space-y-4 animate-pulse">
                        <div className="w-14 h-14 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin mx-auto" />
                        <h4 className="font-display font-bold text-sm text-yellow-500">Authorizing Secure 2FA Key...</h4>
                        <p className="text-[11px] text-slate-500 font-mono">
                          RESOLVING secure session token switches...
                        </p>
                      </div>
                    )}

                    {ssoState === 'success' && (
                      <div className="space-y-4 animate-float">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-sm text-emerald-500">Session Verified & Cascaded!</h4>
                        
                        <div className="max-w-xs mx-auto p-3 rounded-xl bg-slate-900 border border-slate-850 font-mono text-[9px] text-left text-slate-350">
                          <div>**User:** {activeUser.name}</div>
                          <div>**Email:** {activeUser.email}</div>
                          <div>**Role:** {activeUser.role}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Trigger Buttons */}
                  <div className="border-t border-slate-900 pt-3 flex gap-2">
                    <button 
                      onClick={triggerSsoSim}
                      disabled={ssoState === 'checking'}
                      className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-lg shadow-indigo-600/15"
                    >
                      Authorize Session
                    </button>
                    {ssoState === 'success' && (
                      <button 
                        onClick={() => setSsoState('idle')}
                        className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer border border-slate-800"
                      >
                        Reset Check
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLIKS PERSONAL SIMULATOR */}
          {activeProductTab === 'cliks' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-float">
              <div className="lg:col-span-5 text-left">
                <span className="font-mono text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-2">
                  Ecosystem Ledger — Cliks
                </span>
                <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-4 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Reimagined Personal Ledgers
                </h2>
                <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Cliks compiles your financial balances, credit ratings, and bank ledgers into a single, high-speed profile interface. Track transactions instantly with zero synchronization latency.
                </p>

                <ul className="space-y-3 mb-6">
                  {['Smart modular finance widgets', 'Consolidated checking, wallets & saving goals', 'Dynamic budget warning indicators'].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-light">
                      <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Personal ledger console */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-850 bg-slate-950 shadow-2xl p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between text-left">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-500" />
                      <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider">
                        Cliks Personal Ledger System
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 font-extrabold">
                      Verified B2Auth Active Session
                    </span>
                  </div>

                  {/* Balance Display */}
                  <div className="mb-4">
                    <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-1">
                      Aggregate Ledger Balance
                    </span>
                    <span className="font-display font-black text-3xl text-white select-all">
                      ${ledgerBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Transaction logs list */}
                  <div className="flex-grow space-y-2.5 max-h-40 overflow-y-auto mb-4 font-mono text-[10.5px]">
                    <div className="text-[8px] uppercase tracking-wider text-slate-655 font-bold mb-1 border-b border-slate-900 pb-1">Ledger Entry Blocks</div>
                    {ledgerLogs.map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-slate-900/60 pb-1.5 text-slate-350">
                        <div className="flex items-center gap-1.5">
                          <CornerDownRight className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{log.title}</span>
                        </div>
                        <span className={log.type === 'credit' ? 'text-emerald-500 font-bold' : 'text-rose-500'}>
                          {log.type === 'credit' ? '+' : ''}${log.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Trigger buttons */}
                  <div className="border-t border-slate-900 pt-3">
                    <button 
                      onClick={addLedgerTransaction}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all hover:scale-105 flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Simulate Invoice Receipt (+$1,200.00)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLIKS BUSINESS FACTORING SIMULATOR */}
          {activeProductTab === 'cliksbiz' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-float">
              <div className="lg:col-span-5 text-left">
                <span className="font-mono text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-2">
                  Enterprise Solutions — Cliks Business
                </span>
                <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-4 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Instant SME Factoring Core
                </h2>
                <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Liquidate your corporate invoice backlogs instantly without 60-day banking audits. Use our factoring advancements slider below to calculate net cash disbursements and immediate treasury advances:
                </p>

                <ul className="space-y-3 mb-6">
                  {['Liquidate backlogs in 10 seconds', 'Consolidated corporate card tracking', '90% immediate advancement cash reserves'].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-light">
                      <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Factoring Calculator Playground */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-850 bg-slate-950 shadow-2xl p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between text-left">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-cyan-500" />
                      <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                        Factoring Advancements Module
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 font-extrabold">
                      v2.1-stable
                    </span>
                  </div>

                  {/* Size slider */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">
                        Invoice Face Value
                      </span>
                      <span className="font-display font-black text-xl text-white select-all">
                        ${invoiceSize.toLocaleString()} USD
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="5000"
                      max="150000"
                      step="5000"
                      value={invoiceSize}
                      onChange={(e) => setInvoiceSize(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>

                  {/* Factoring Metrics Table */}
                  <div className="flex-grow space-y-3 font-mono text-[10.5px] text-slate-350 border-t border-slate-900 pt-4">
                    <div className="flex justify-between border-b border-slate-900/60 pb-1.5">
                      <span>Advancement Rate (Immediate Reserves)</span>
                      <span className="text-white font-bold">{(advanceRate * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900/60 pb-1.5">
                      <span>Reserves Advancement Cash Payout</span>
                      <span className="text-cyan-400 font-black">${advanceAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900/60 pb-1.5">
                      <span>Factoring Fee (Flat 2.5% rate)</span>
                      <span className="text-rose-500">-${factoringFee.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-900 font-bold">
                      <span className="text-indigo-400">Net Immediate Liquid Payout</span>
                      <span className="text-emerald-500 text-sm font-black">${netDisbursement.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-900 pt-3 text-[9px] font-mono text-slate-550 text-center italic">
                    // Advances are disbursed to the strategic partner profile within 10 seconds of factoring approvals.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 2. DYNAMIC COMPREHENSIVE ECOSYS SPECS MATRIX */}
        <div>
          <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-8 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Unified Ecosystem Matrix Sheet
          </h2>

          <div className="overflow-x-auto rounded-3xl border dark:border-slate-850 shadow-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className={`${
                  darkMode ? 'bg-slate-950 text-white border-b border-slate-850' : 'bg-slate-50 text-slate-900 border-b border-slate-200'
                }`}>
                  <th className="p-4 font-display font-black uppercase tracking-wider text-[10px]">Ecosystem Spec</th>
                  <th className="p-4 font-display font-black uppercase tracking-wider text-[10px]">Legacy Duplicated System</th>
                  <th className="p-4 font-display font-black uppercase tracking-wider text-[10px] text-indigo-500">Beta Softnet Unified Core (BNX)</th>
                </tr>
              </thead>
              <tbody className={darkMode ? 'text-slate-350 bg-slate-900/20' : 'text-slate-655 bg-white'}>
                <tr className="border-b dark:border-slate-855 border-slate-200/50">
                  <td className="p-4 font-semibold">User Authentication</td>
                  <td className="p-4 font-light">Duped auth vaults; slow database syncing delays user permissions.</td>
                  <td className="p-4 font-bold text-indigo-500">Cryptographically signed B2Auth session tokens cascade instantly.</td>
                </tr>
                <tr className="border-b dark:border-slate-855 border-slate-200/50">
                  <td className="p-4 font-semibold">Mail Thread Organization</td>
                  <td className="p-4 font-light">CC recipient email chains; hard to track, prone to corporate siloing.</td>
                  <td className="p-4 font-bold text-indigo-500">Websocket-driven group conversations group replies in workspaces.</td>
                </tr>
                <tr className="border-b dark:border-slate-855 border-slate-200/50">
                  <td className="p-4 font-semibold">Ledger & Transaction Logs</td>
                  <td className="p-4 font-light">Manual imports and exports of balances; prone to accounting sync gaps.</td>
                  <td className="p-4 font-bold text-indigo-500">Aggregate ledger balances are monitored and queried instantly.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">SME Invoice Factoring</td>
                  <td className="p-4 font-light">60-day bank audits, manual approval checks, and paper-based verification.</td>
                  <td className="p-4 font-bold text-indigo-500">Consensus advance pipelinesadvances immediate liquid cash in 10s.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Engineered for Scale concurrent blueprint pipeline */}
        <div className="mt-20 border-t dark:border-slate-800/60 pt-8">
          <Features darkMode={darkMode} />
        </div>

      </div>
    </div>
  );
}
