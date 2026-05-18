import React, { useState } from 'react';
import { BookOpen, Terminal, Code2, ArrowRight, CornerDownRight, CheckCircle } from 'lucide-react';

export default function Resources({ darkMode }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState('session');

  const blogPosts = [
    {
      title: 'Architecting a Federated Identity Hub',
      category: 'ENGINEERING',
      readTime: '6 min read',
      desc: 'How B2Auth cryptographically isolates session tokens and manages multi-account session synchronization on custom containerized node networks.',
      date: 'May 12, 2026'
    },
    {
      title: 'Conversational Email Protocols',
      category: 'UX DESIGN',
      readTime: '4 min read',
      desc: 'The technical blueprint behind BNXMail fusing open-standard email compliance with websocket-powered team messaging threads.',
      date: 'April 28, 2026'
    }
  ];

  const apiEndpoints = {
    session: {
      method: 'POST',
      path: '/v1/auth/session',
      desc: 'Interrogate active B2Auth session token, verifying session state and linked mailbox clearance.',
      response: `{
  "status": "authenticated",
  "token_id": "tok_94a2b8e",
  "user": {
    "email": "betasoftnet@bnxmail.com",
    "name": "Beta Softnet",
    "role": "Developer"
  },
  "authorized_services": [
    "bnxmail",
    "cliks_ledger",
    "cliks_biz"
  ],
  "issued_at": 1779080100
}`
    },
    groupmail: {
      method: 'GET',
      path: '/v1/mail/groups',
      desc: 'Query active team Group Mail inbox slots authorized on current B2Auth credentials.',
      response: `{
  "object": "list",
  "data": [
    {
      "group_id": "grp_d718a",
      "address": "delta-redesign@bnxmail.com",
      "active_peers": 5,
      "pending_tickets": 2,
      "last_activity": "2026-05-18T10:48:00Z"
    }
  ],
  "total_count": 1
}`
    }
  };

  const currentApi = apiEndpoints[selectedEndpoint];

  return (
    <section id="resources" className="py-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            Resources
          </div>
          <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Resources & Docs
          </h2>
          <p className={`text-base font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Gain access to our comprehensive blog posts, system architectural logs, and interactive developer documentation consoles.
          </p>
        </div>

        {/* 2x1 layout: Blog Cards on Left, Interactive Dev Docs Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Blog cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6 text-left">
              <div className="px-2 py-1 uppercase text-xs font-mono font-bold tracking-wider text-indigo-500 border-b dark:border-slate-800/80 pb-2">
                Ecosystem Publications
              </div>
              
              {blogPosts.map((post, idx) => (
                <div 
                  key={idx}
                  className={`group rounded-3xl p-6 border shadow-lg transition-all duration-300 hover:scale-[1.01] ${
                    darkMode 
                      ? 'glass-card-dark border-slate-850 hover:border-slate-700' 
                      : 'glass-card-light border-slate-200/50 hover:border-indigo-150'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-3 text-slate-400">
                    <span className="text-indigo-500 uppercase tracking-widest">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className={`font-display font-bold text-lg mb-2 transition-colors ${
                    darkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
                  }`}>
                    {post.title}
                  </h3>
                  
                  <p className={`text-xs font-light leading-relaxed mb-4 ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {post.desc}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{post.date}</span>
                    <span className="inline-flex items-center gap-1 font-bold group-hover:text-indigo-500 transition-colors cursor-pointer">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Developer API console */}
          <div className="lg:col-span-6 flex flex-col">
            <div className={`flex-grow rounded-3xl border shadow-2xl p-6 text-left flex flex-col justify-between ${
              darkMode ? 'glass-card-dark border-slate-800' : 'glass-card-light border-slate-200/60'
            }`}>
              
              {/* Header */}
              <div>
                <div className="flex items-center justify-between border-b dark:border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-1.5 text-indigo-500 font-display font-bold text-xs uppercase tracking-wider">
                    <Terminal className="w-4 h-4" />
                    <span>REST API Sandbox console</span>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-500/5 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    v1.0.8-stable
                  </span>
                </div>

                <p className={`text-xs font-light leading-relaxed mb-5 ${
                  darkMode ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  Select a live REST endpoint route below to inspect mock JSON response payloads returned from the BNX core servers:
                </p>

                {/* Endpoint Selectors */}
                <div className="flex gap-2 mb-5">
                  <button 
                    onClick={() => setSelectedEndpoint('session')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      selectedEndpoint === 'session'
                        ? 'bg-slate-950 border-indigo-500/30 text-indigo-400 shadow-md'
                        : darkMode 
                          ? 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white' 
                          : 'border-slate-200 bg-white text-slate-656 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-emerald-500 mr-1.5">POST</span>/auth/session
                  </button>
                  <button 
                    onClick={() => setSelectedEndpoint('groupmail')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      selectedEndpoint === 'groupmail'
                        ? 'bg-slate-950 border-indigo-500/30 text-indigo-400 shadow-md'
                        : darkMode 
                          ? 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white' 
                          : 'border-slate-200 bg-white text-slate-656 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-blue-500 mr-1.5">GET</span>/mail/groups
                  </button>
                </div>

                {/* Description of active Endpoint */}
                <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 mb-4 text-xs font-light flex gap-2.5 items-start">
                  <CornerDownRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{currentApi.method} {currentApi.path}</span> — {currentApi.desc}
                  </div>
                </div>
              </div>

              {/* JSON code response block */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 font-mono text-[10px] leading-relaxed text-slate-300 max-h-56 overflow-y-auto relative">
                <span className="absolute top-2.5 right-3 text-[8px] uppercase tracking-widest text-slate-600 font-extrabold">JSON Payload</span>
                <pre style={{ margin: 0 }}>{currentApi.response}</pre>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
