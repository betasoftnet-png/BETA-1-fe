import React, { useState, useEffect } from 'react';
import { BookOpen, Terminal, Code2, Search, ArrowRight, ShieldCheck, Cpu, HardDrive, RefreshCw } from 'lucide-react';

export default function ResourcesPage({ darkMode, activeUser, isLogged }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState('auth');
  const [bearerToken, setBearerToken] = useState('bnx_sec_key_94a2b8e');
  const [mockLatency, setMockLatency] = useState(150); // ms
  const [loadingSim, setLoadingSim] = useState(false);
  const [responseLog, setResponseLog] = useState(null);

  const resourceItems = [
    {
      title: 'Architecting B2Auth Single-Sign-On',
      category: 'Security Audits',
      readTime: '6 min read',
      date: 'May 12, 2026',
      desc: 'Technical analysis on cryptographic isolation of session keys, secure multi-account switching, and federated authenticator nodes.'
    },
    {
      title: 'Group Email Routing protocols',
      category: 'API Reference',
      readTime: '4 min read',
      date: 'April 28, 2026',
      desc: 'The technical specifications linking traditional SMTP relays to modern websocket-powered group workspaces.'
    },
    {
      title: 'Treasury Factoring & factoring APIs',
      category: 'API Reference',
      readTime: '8 min read',
      date: 'March 18, 2026',
      desc: 'How Cliks Business leverages invoice ledger consensus, advanced risk evaluation models, and immediate liquid cash disbursements.'
    },
    {
      title: 'Consolidating FinTech Ledger Logs',
      category: 'Tech Blogs',
      readTime: '5 min read',
      date: 'Feb 10, 2026',
      desc: 'A case study on keeping consumer records synced across multi-account switchers without leaking transaction databases.'
    }
  ];

  const filteredResources = resourceItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const apiEndpoints = {
    auth: {
      method: 'POST',
      url: '/v1/auth/session/verify',
      desc: 'Verify B2Auth session authenticity and return linked app token credentials.',
      response: (token) => ({
        status: isLogged ? 'success' : 'unauthorized',
        client_authorized: isLogged ? true : false,
        session_id: isLogged ? 'sess_94a2b8e71c' : 'null',
        issued_to: isLogged ? {
          name: activeUser.name,
          email: activeUser.email,
          role: activeUser.role,
          identity_uuid: 'id_9f8a846c7535'
        } : 'Anonymous / Guest Session',
        scopes: isLogged ? ['bnxmail.read', 'cliks.balance'] : [],
        token_signature: isLogged ? `sha256=${token.slice(0,10)}...cascading_ok` : 'null'
      })
    },
    mail: {
      method: 'POST',
      url: '/v1/mail/groups/create',
      desc: 'Spawn an active WhatsApp-style conversational group mail thread.',
      response: (token) => ({
        status: isLogged ? 'created' : 'unauthorized',
        group_address: isLogged ? 'engineering-sprints@bnxmail.com' : 'null',
        created_at: 1779080250,
        owner: isLogged ? activeUser.email : 'null',
        active_peers: isLogged ? 5 : 0,
        silo_clearance: isLogged ? 'authorized' : 'unauthorized',
        websocket_port: isLogged ? 'ws://mail.bnx.net/v1/stream' : 'null'
      })
    },
    ledger: {
      method: 'GET',
      url: '/v1/cliks/ledger/balance',
      desc: 'Query verified aggregate balances under the authorized identity.',
      response: (token) => ({
        status: isLogged ? 'success' : 'unauthorized',
        primary_account: 'Cliks Personal Ledger',
        total_balance_usd: isLogged ? 14250.75 : 0.00,
        currency: 'USD',
        recent_ledger_entries: isLogged ? [
          { transaction_id: 'tx_4021', title: `${activeUser.name} Payout`, amount: +2500.00, status: 'cleared' },
          { transaction_id: 'tx_4020', title: 'AWS Cloud Server Hosting', amount: -150.00, status: 'cleared' }
        ] : []
      })
    }
  };

  const triggerApiRequestSim = () => {
    setLoadingSim(true);
    setResponseLog(null);

    setTimeout(() => {
      setLoadingSim(false);
      const endpointDetails = apiEndpoints[selectedEndpoint];
      setResponseLog({
        headers: `HTTP/1.1 200 OK\nDate: Mon, 18 May 2026 11:43:00 GMT\nContent-Type: application/json\nX-BNX-Latency: ${mockLatency}ms\nX-Signature-SHA256: sha256=9f8a846c753...`,
        body: JSON.stringify(endpointDetails.response(bearerToken), null, 2)
      });
    }, mockLatency + 100);
  };

  return (
    <div className="pt-28 pb-20 relative overflow-hidden text-left">
      
      {/* Visual Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[460px] h-[460px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[460px] h-[460px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            Developer Documentation Hub
          </div>
          <h1 className={`font-display font-black text-4xl md:text-6xl tracking-tight mb-6 leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            SDKs, REST APIs & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              Technical Logs.
            </span>
          </h1>
          <p className={`text-base md:text-lg font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Explore our developer playgrounds, B2Auth single sign-on REST integrations, websocket email event structures, and security consensus publications.
          </p>
        </div>

        {/* 1. SLA PERFORMANCE BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { name: 'B2Auth Core Service', value: '99.999% SLA', stats: '0.12ms Auth Latency' },
            { name: 'BNXMail WebSocket Relay', value: '100% Uptime', stats: '42ms sync delay' },
            { name: 'Cliks Ledger Ledger', value: '99.999% Stable', stats: 'Consensus verified' },
            { name: 'SME Factoring Pipeline', value: '100% Ready', stats: 'Disbursements ok' }
          ].map((sla, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl border p-4 shadow flex flex-col justify-between ${
                darkMode ? 'glass-card-dark border-slate-850' : 'glass-card-light border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-450 dark:text-slate-400">
                  {sla.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              </div>
              <div>
                <span className={`block font-display font-black text-sm ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                  {sla.value}
                </span>
                <span className="text-[9px] font-mono text-indigo-500 font-semibold">{sla.stats}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. ADVANCED REST API PLAYGROUND CLIENT */}
        <div className="mb-24">
          <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-8 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Advanced REST Sandbox Playground
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Parameters Controller */}
            <div className={`lg:col-span-5 rounded-3xl border p-6 shadow-xl flex flex-col justify-between text-left ${
              darkMode ? 'glass-card-dark border-slate-850' : 'glass-card-light border-slate-200 bg-white'
            }`}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest mb-1.5 text-slate-455">
                    Select Target Route
                  </label>
                  <div className="flex gap-2">
                    {Object.keys(apiEndpoints).map((endpointKey) => (
                      <button
                        key={endpointKey}
                        onClick={() => setSelectedEndpoint(endpointKey)}
                        className={`flex-1 py-2 rounded-xl text-[10.5px] font-mono font-black border transition-all cursor-pointer ${
                          selectedEndpoint === endpointKey
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                            : darkMode
                              ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-655 hover:bg-slate-100'
                        }`}
                      >
                        {endpointKey === 'auth' && <span className="text-emerald-400 mr-1.5">POST</span>}
                        {endpointKey === 'mail' && <span className="text-emerald-400 mr-1.5">POST</span>}
                        {endpointKey === 'ledger' && <span className="text-blue-400 mr-1.5">GET</span>}
                        /{endpointKey}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest mb-1.5 text-slate-455">
                    Authorization Header Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-mono text-[10.5px] text-slate-450 font-bold uppercase">
                      Bearer
                    </span>
                    <input 
                      type="text"
                      value={bearerToken}
                      onChange={(e) => setBearerToken(e.target.value)}
                      placeholder="bnx_sec_key_..."
                      className={`w-full text-xs pl-16 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[9px] uppercase font-bold tracking-widest text-slate-455">
                      Simulate Latency Delay
                    </label>
                    <span className="text-[10px] font-mono text-indigo-500 font-semibold">{mockLatency}ms</span>
                  </div>
                  <input 
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={mockLatency}
                    onChange={(e) => setMockLatency(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-xs font-light">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {apiEndpoints[selectedEndpoint].method} {apiEndpoints[selectedEndpoint].url}
                  </span>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {apiEndpoints[selectedEndpoint].desc}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={triggerApiRequestSim}
                  disabled={loadingSim}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-display font-semibold uppercase tracking-wider shadow-lg shadow-indigo-600/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingSim ? 'animate-spin' : ''}`} />
                  Send REST API Request
                </button>
              </div>
            </div>

            {/* Right Output Console */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-850 bg-slate-950 shadow-2xl p-6 relative overflow-hidden text-left min-h-[380px] flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-500" />
                    <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">
                      REST Response Panel
                    </span>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-slate-500 font-extrabold">
                    JSON Stream
                  </span>
                </div>

                {/* Content Output */}
                <div className="flex-grow font-mono text-[10px] leading-relaxed text-slate-350 max-h-64 overflow-y-auto mb-2 relative">
                  {loadingSim ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                      <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                      <div className="text-yellow-500 animate-pulse font-semibold">
                        RESOLVING dns domain node parameters... latency check
                      </div>
                    </div>
                  ) : responseLog ? (
                    <div className="space-y-4">
                      <div>
                        <div className="text-[8px] uppercase tracking-wider text-slate-655 font-bold mb-1 border-b border-slate-900 pb-1">Response Headers</div>
                        <pre className="text-slate-450 leading-tight">{responseLog.headers}</pre>
                      </div>
                      <div>
                        <div className="text-[8px] uppercase tracking-wider text-slate-655 font-bold mb-1 border-b border-slate-900 pb-1">JSON Payload Body</div>
                        <pre className="text-slate-200 select-all">{responseLog.body}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 font-light italic">
                      Trigger REST API request to verify signed session keys.
                    </div>
                  )}
                </div>

                {/* Console Footer */}
                <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-[9px] font-mono text-slate-550">
                  <span>DNS Node: api.betasoftnet.com</span>
                  <span>Port Clearance: 443 HTTPS</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 3. DYNAMIC CATEGORIZED RESOURCES GRID */}
        <div>
          <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-8 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Search Publications & Releases
          </h2>

          {/* Search bar and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Filter Tabs */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1.5 md:pb-0">
              {['All', 'API Reference', 'Security Audits', 'Tech Blogs'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-display font-bold border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                      : darkMode
                        ? 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-450" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications..."
                className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Grid display */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredResources.map((post, idx) => (
                <div 
                  key={idx}
                  className={`group rounded-3xl p-6 border shadow-lg transition-all duration-300 hover:scale-[1.01] text-left flex flex-col justify-between ${
                    darkMode 
                      ? 'glass-card-dark border-slate-850 hover:border-slate-700' 
                      : 'glass-card-light border-slate-200/50 hover:border-indigo-150 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-3 text-slate-400">
                      <span className="text-indigo-500 uppercase tracking-widest">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className={`font-display font-black text-lg mb-2 transition-colors ${
                      darkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
                    }`}>
                      {post.title}
                    </h3>
                    
                    <p className={`text-xs font-light leading-relaxed mb-6 ${
                      darkMode ? 'text-slate-450' : 'text-slate-600'
                    }`}>
                      {post.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-450 border-t dark:border-slate-800/80 pt-4">
                    <span>{post.date}</span>
                    <span className="inline-flex items-center gap-1 font-bold group-hover:text-indigo-500 transition-colors cursor-pointer">
                      Read Blueprint <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`py-12 text-center text-xs italic ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              No publications matched your search query. Try other keywords!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
