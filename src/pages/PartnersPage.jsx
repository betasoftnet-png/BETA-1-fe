import React, { useState } from 'react';
import { Handshake, Terminal, Shield, ArrowRight, CheckCircle, Check, Globe, Code2, Server } from 'lucide-react';

export default function PartnersPage({ darkMode, partnerApplications, setPartnerApplications }) {
  const [partnerStep, setPartnerStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourcompany.com/webhook');
  const [selectedEvent, setSelectedEvent] = useState('user.session.authenticated');
  const [webhookLogs, setWebhookLogs] = useState(null);
  const [logsTriggered, setLogsTriggered] = useState(false);

  // Webhook simulator responses
  const webhookEventPayloads = {
    'user.session.authenticated': {
      event: 'user.session.authenticated',
      timestamp: 1779080200,
      signature: 'sha256=9f8a846c7535b9a848a60424564c78fe15814ad89012cd',
      data: {
        session_id: 'sess_09a1288c',
        user_id: 'usr_81a7b8e',
        authorized_scopes: ['bnxmail', 'cliks'],
        mfa_verified: true
      }
    },
    'email.group.created': {
      event: 'email.group.created',
      timestamp: 1779080215,
      signature: 'sha256=2b1a8d9a4b8c9d2f7a9a1a8c3d9a1f2e8c1b9f82637a288c',
      data: {
        group_address: 'engineering-review@bnxmail.com',
        owner: 'betasoftnet@bnxmail.com',
        initial_peers: 6,
        silo_clearance: 'high-level'
      }
    },
    'ledger.invoice.factored': {
      event: 'ledger.invoice.factored',
      timestamp: 1779080230,
      signature: 'sha256=7f8b9c2a1a8d9f4e2b8c9d3f1a2e7c6d9a1f2b8c4d9e8f7a',
      data: {
        invoice_id: 'inv_4021a88c',
        sme_client: 'Delta Tech Ltd',
        amount_usd: 12500.00,
        advancement_rate: 0.90,
        factor_status: 'disbursed'
      }
    }
  };

  const triggerWebhookSim = () => {
    setLogsTriggered(true);
    setWebhookLogs({
      status: 'sending',
      log: `DISPATCHING webhook token... [POST] ${webhookUrl}\nSignatures: ${webhookEventPayloads[selectedEvent].signature.slice(0,25)}...`
    });

    setTimeout(() => {
      setWebhookLogs({
        status: 'success',
        log: `HTTP/1.1 200 OK\nContent-Type: application/json\nResponse Received after 42ms.\n\nPayload:\n${JSON.stringify(webhookEventPayloads[selectedEvent], null, 2)}`
      });
    }, 800);
  };

  const handleApplicationNext = (e) => {
    e.preventDefault();
    if (partnerStep === 2) {
      const newApp = {
        name: companyName || 'Custom Partner',
        url: companyUrl || 'https://partner.com',
        webhook: webhookUrl,
        event: selectedEvent,
        clientId: `cl_bnx_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
        status: 'Under Review',
        date: new Date().toLocaleDateString()
      };
      setPartnerApplications([newApp, ...partnerApplications]);
      setPartnerStep(3);
    } else if (partnerStep < 3) {
      setPartnerStep(partnerStep + 1);
    }
  };

  return (
    <div className="pt-28 pb-20 relative overflow-hidden text-left">
      
      {/* Visual Background Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            Partner Integration Program
          </div>
          <h1 className={`font-display font-black text-4xl md:text-6xl tracking-tight mb-6 leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Co-Build Under a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              Single B2Auth Identity Core.
            </span>
          </h1>
          <p className={`text-base md:text-lg font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Join our Connected Systems network. Build third-party modules that recognize active B2Auth user logins, dispatch custom conversational groups inside BNXMail, and ledger invoices in Cliks Business treasury networks.
          </p>
        </div>

        {/* 1. TIER COMPARISON GRIDS */}
        <div className="mb-24">
          <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-8 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Ecosystem Integration Tiers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Silver Tier */}
            <div className={`rounded-3xl border p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              darkMode ? 'glass-card-dark border-slate-850' : 'glass-card-light border-slate-200 bg-white'
            }`}>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">
                  Silver Integration
                </span>
                <h3 className={`font-display font-black text-xl mt-4 mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  API Access Member
                </h3>
                <p className={`text-xs font-light mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Best for engineering startups and indie web devs linking third-party apps to B2Auth security sessions.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {['Standard B2Auth session callbacks', 'Standard REST SDK clearance', 'Ecosystem Help docs access'].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-light">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#apply-form" className={`w-full text-center py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                darkMode ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}>
                Select Tier
              </a>
            </div>

            {/* Gold Tier (Highlighted) */}
            <div className={`rounded-3xl border p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] relative ${
              darkMode ? 'glass-card-dark border-indigo-500/30' : 'glass-card-light border-indigo-500/20 bg-indigo-500/[0.01]'
            }`}>
              <div className="absolute -top-3.5 right-6 text-[9px] font-mono font-bold tracking-wider text-white bg-indigo-600 px-3 py-1 rounded-full uppercase shadow">
                MOST POPULAR
              </div>
              
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">
                  Gold Partner
                </span>
                <h3 className={`font-display font-black text-xl mt-4 mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Ecosystem Integration
                </h3>
                <p className={`text-xs font-light mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  For established SaaS corporations syncing active mailbox workspaces and ledger accounts inside BNX.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {['Multi-account session sync', 'Websocket Mail notifications', 'Custom fintech webhook dispatches', 'Priority integration reviews'].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#apply-form" className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all">
                Select Tier
              </a>
            </div>

            {/* Platinum Tier */}
            <div className={`rounded-3xl border p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              darkMode ? 'glass-card-dark border-slate-850' : 'glass-card-light border-slate-200 bg-white'
            }`}>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">
                  Platinum Enterprise
                </span>
                <h3 className={`font-display font-black text-xl mt-4 mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Strategic Co-Op
                </h3>
                <p className={`text-xs font-light mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Firms requiring deep, containerized security clusters and direct ledger factoring channels in Cliks Business.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {['Dedicated isolated database nodes', 'Direct invoice factoring API clearance', 'Custom SSL certifications', '24/7 dedicated support team'].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-light">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#apply-form" className={`w-full text-center py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                darkMode ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}>
                Select Tier
              </a>
            </div>

          </div>
        </div>

        {/* 2. INTERACTIVE LIVE WEBHOOK SANDBOX SIMULATOR */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Config Panel */}
            <div className="lg:col-span-5 text-left">
              <span className="font-mono text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-2">
                Developer Playground
              </span>
              <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-4 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Interactive Webhook Simulator
              </h2>
              <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Third-party partner servers process dispatches in real-time. Configure a mock endpoint URL, pick an event query, and simulate a server notification below:
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest mb-1.5 text-slate-455">
                    Your Webhook Endpoint URL
                  </label>
                  <div className="relative">
                    <Server className="absolute left-3 top-2.5 w-4 h-4 text-slate-450" />
                    <input 
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://api.yourcompany.com/webhook"
                      className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest mb-1.5 text-slate-455">
                    Select Event Trigger
                  </label>
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="user.session.authenticated">user.session.authenticated (B2Auth)</option>
                    <option value="email.group.created">email.group.created (BNXMail)</option>
                    <option value="ledger.invoice.factored">ledger.invoice.factored (Cliks Business)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={triggerWebhookSim}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-display font-semibold uppercase tracking-wider shadow-lg shadow-indigo-600/10 cursor-pointer"
                  >
                    Trigger Test Event Payload
                  </button>
                </div>
              </div>
            </div>

            {/* Right Live Server Response Terminal */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-850 bg-slate-950 shadow-2xl p-6 relative overflow-hidden text-left min-h-[340px] flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-500 animate-pulse" />
                    <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">
                      Live Webhook Terminal Log
                    </span>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-slate-500 font-extrabold">
                    SSL v3.0 Secured
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow font-mono text-[10px] leading-relaxed text-slate-300 max-h-60 overflow-y-auto mb-2">
                  {logsTriggered ? (
                    <div className="space-y-4">
                      {webhookLogs?.status === 'sending' ? (
                        <div className="text-yellow-500 animate-pulse font-semibold">
                          {webhookLogs.log}
                        </div>
                      ) : (
                        <pre className="text-slate-300 select-all">{webhookLogs?.log}</pre>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 font-light italic">
                      Click "Trigger Test Event Payload" to simulate dispatches.
                    </div>
                  )}
                </div>

                {/* Footer status line */}
                <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-[9px] font-mono text-slate-550">
                  <span>Server IP: 182.4.99.1</span>
                  <span>Payload Size: ~0.45kb</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 3. MULTI-STEP INTEGRATION APPLICATION FORM */}
        <div id="apply-form" className="max-w-2xl mx-auto mb-10 pt-10">
          <div className={`rounded-3xl border shadow-2xl p-8 relative overflow-hidden ${
            darkMode 
              ? 'glass-card-dark border-slate-800 text-white' 
              : 'glass-card-light border-slate-200 bg-gradient-to-br from-white to-slate-50 text-slate-800'
          }`}>
            
            {/* Header */}
            <div className="flex items-center gap-3 border-b dark:border-slate-800/80 pb-4 mb-6">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Handshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-black text-lg">Partner Program Application</h4>
                <p className="text-xs text-slate-400">Step {partnerStep} of 3</p>
              </div>
            </div>

            {/* Steps Progress Visual */}
            <div className="flex items-center justify-between gap-4 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex-grow flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                    partnerStep >= step
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : darkMode ? 'border-slate-800 bg-slate-900 text-slate-500' : 'border-slate-200 bg-white text-slate-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-grow h-0.5 mx-2 transition-all ${
                      partnerStep > step ? 'bg-indigo-600' : darkMode ? 'bg-slate-800' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Steps Content */}
            {partnerStep === 1 && (
              <form onSubmit={handleApplicationNext} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 text-slate-400 dark:text-slate-500">
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company legal title"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 text-slate-400 dark:text-slate-500">
                    Corporate Domain URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-450" />
                    <input 
                      type="url" 
                      required 
                      value={companyUrl}
                      onChange={(e) => setCompanyUrl(e.target.value)}
                      placeholder="https://yourcompany.com"
                      className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {partnerStep === 2 && (
              <form onSubmit={handleApplicationNext} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 text-slate-400 dark:text-slate-500">
                    Primary Integration Goal
                  </label>
                  <select
                    required
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="auth">Federate Third-Party authentication with B2Auth</option>
                    <option value="mail">Link workspace communications with BNXMail groups</option>
                    <option value="ledger">Access corporate cards factoring in Cliks Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 text-slate-400 dark:text-slate-500">
                    Integration Scope Clearance
                  </label>
                  <select
                    required
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="standard">Standard API Scope permissions</option>
                    <option value="extended">Extended Ledger read/write scopes</option>
                    <option value="custom">Full custom identity switcher clearances</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button 
                    type="button"
                    onClick={() => setPartnerStep(1)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                      darkMode ? 'border-slate-800 bg-slate-900 text-slate-350 hover:text-white' : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                    }`}
                  >
                    Back
                  </button>
                  
                  <button 
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {partnerStep === 3 && (
              <div className="space-y-6 text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto animate-float">
                  <Check className="w-8 h-8" />
                </div>
                
                <div>
                  <h5 className="font-display font-black text-xl text-emerald-500 mb-2">Integration Setup Completed!</h5>
                  <p className={`text-xs max-w-sm mx-auto leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Thank you! We have spun up a strategic partner instance for **{companyName || 'Your Company'}**. Our API security board will audit your domain and approve sandbox keys within 24 hours.
                  </p>
                </div>

                {/* Integration Status Panel Mockup */}
                <div className="max-w-sm mx-auto p-4 rounded-2xl bg-slate-950 border border-slate-900 font-mono text-[9px] leading-relaxed text-slate-300 text-left">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                    <span className="font-bold text-indigo-400">Sandbox Profile Created</span>
                    <span className="animate-pulse text-yellow-500 px-1.5 py-0.5 rounded bg-yellow-500/5 font-extrabold uppercase tracking-widest text-[8px]">
                      Under Review
                    </span>
                  </div>
                  <div>**Company:** {companyName || 'Your Company Ltd'}</div>
                  <div>**Endpoint:** {companyUrl || 'https://yourcompany.com'}</div>
                  <div>**ClientID:** cl_bnx_94a2b8e71c9f0a</div>
                  <div className="text-slate-500 pt-1">// Webhook keys will be dispatched on approvals.</div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setPartnerStep(1);
                      setCompanyName('');
                      setCompanyUrl('');
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      darkMode ? 'border-slate-800 bg-slate-900 text-slate-350 hover:text-white' : 'border-slate-200 bg-white text-slate-655 hover:bg-slate-50'
                    }`}
                  >
                    Reset Form Wizard
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Persistent Strategic Partner list */}
        {partnerApplications && partnerApplications.length > 0 && (
          <div className="max-w-4xl mx-auto mt-16 animate-float">
            <div className={`rounded-3xl border shadow-xl p-6 overflow-hidden ${
              darkMode ? 'glass-card-dark border-slate-800 text-white' : 'glass-card-light border-slate-200 text-slate-800'
            }`}>
              <div className="flex items-center justify-between border-b dark:border-slate-850 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="font-display font-black text-sm uppercase tracking-wider text-indigo-500">
                    Active Strategic Integrations ({partnerApplications.length})
                  </span>
                </div>
                <span className="text-[9px] uppercase font-mono text-slate-400">
                  Real-time DB synced
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b dark:border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-450">
                      <th className="py-2.5 px-2">Company Name</th>
                      <th className="py-2.5 px-2">Domain</th>
                      <th className="py-2.5 px-2">Client ID</th>
                      <th className="py-2.5 px-2">Webhook</th>
                      <th className="py-2.5 px-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                    {partnerApplications.map((app, idx) => (
                      <tr key={idx} className="text-xs transition-colors hover:bg-indigo-500/5">
                        <td className="py-3.5 px-2 font-display font-bold">{app.name}</td>
                        <td className="py-3.5 px-2 font-light text-slate-400">{app.url}</td>
                        <td className="py-3.5 px-2 font-mono text-[10px] text-indigo-405">{app.clientId}</td>
                        <td className="py-3.5 px-2 font-light text-slate-400 max-w-[150px] truncate">{app.webhook}</td>
                        <td className="py-3.5 px-2 text-right">
                          <span className="inline-block px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] uppercase font-extrabold tracking-widest animate-pulse">
                            {app.status}
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

      </div>
    </div>
  );
}
