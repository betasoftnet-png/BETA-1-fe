import React, { useState } from 'react';
import { Users, History, Cpu, ShieldAlert, Award, Star, ArrowRight } from 'lucide-react';

export default function AboutPage({ darkMode }) {
  const [selectedYear, setSelectedYear] = useState('2026');

  const milestones = {
    '2022': {
      title: 'Decentralized Key Core Conception',
      desc: 'Beta Softnet was founded with a singular mandate: abolish authentication silos. Our engineering squad built the B2Auth protocol switcher, allowing secure multi-account session synchronization with robust Two-Factor Authentication (2FA) layers.',
      metric1: '5 Founders',
      metric2: '<10ms Latency Mock',
      tag: 'RESEARCH PHASE'
    },
    '2024': {
      title: 'BNXMail Protocols & Beta Suite',
      desc: 'Fusing conversational threads (like WhatsApp groups) with secure SMTP compliance. The BNX ecosystem beta launches, letting initial corporate participants federate internal workspaces using connected accounts.',
      metric1: '1.2M API Calls/hr',
      metric2: '45 Integration Partners',
      tag: 'ECOSYSTEM BETA'
    },
    '2026': {
      title: 'Full Federated Suite Release',
      desc: 'The complete BNX ecosystem goes public, connecting BNXMail, B2Auth, Cliks, and Cliks Business under one single sign-on identity node. Beta Softnet products manage transaction ledgers and high-volume corporate cards.',
      metric1: '12M+ Active Auth Sessions',
      metric2: '99.999% SLA Uptime',
      tag: 'STABLE RELEASE'
    }
  };

  const leaders = [
    {
      name: 'Sarah Jenkins',
      role: 'Principal Product Officer',
      bio: 'Ex-Google Identity. Sarah leads the structural product roadmap of BNX, shaping unified user flows and B2Auth standards.',
      initials: 'SJ',
      avatarColor: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Marcus Chen',
      role: 'Security & Auth Architect',
      bio: 'Silo Security expert. Marcus designed the smart profile switcher and secure session token core that isolates user settings in B2Auth.',
      initials: 'MC',
      avatarColor: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Lead Cryptography Engineer',
      bio: 'Ph.D. in Distributed Systems. Elena oversees the ledger consensus algorithms linking Cliks and Cliks Business.',
      initials: 'ER',
      avatarColor: 'from-purple-500 to-pink-500'
    }
  ];

  const corePillars = [
    {
      title: 'Single-Identity Architecture',
      desc: 'One account, infinite capabilities. We do not sync databases; B2Auth cryptographically signs permissions that BNXMail and Cliks recognize in real-time.',
      icon: Cpu,
      color: 'text-indigo-500'
    },
    {
      title: 'High-Fidelity Operations',
      desc: 'We guarantee secure encryption and advanced multi-channel verification checks, maintaining zero single-points-of-failure across server clusters.',
      icon: History,
      color: 'text-cyan-500'
    },
    {
      title: 'Privacy by Isolation',
      desc: 'Your data is structurally sandboxed. Even under a unified identity, individual mail accounts and financial ledgers cannot cross-read sensitive files.',
      icon: ShieldAlert,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="pt-28 pb-20 relative overflow-hidden text-left">
      
      {/* Visual Background Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            About Beta Softnet
          </div>
          <h1 className={`font-display font-black text-4xl md:text-6xl tracking-tight mb-6 leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Abolishing Application Silos. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              Forging Connected Systems.
            </span>
          </h1>
          <p className={`text-base md:text-lg font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-655'
          }`}>
            Beta Softnet builds integrated software layers under a singular identity core. We believe that secure mail clients, corporate card treasury dashboards, and authentication vaults shouldn’t live in separate isolated systems.
          </p>
        </div>

        {/* 1. INTERACTIVE ROADMAP SLIDER */}
        <div className="mb-24">
          <h2 className={`font-display font-black text-2xl md:text-3xl tracking-tight mb-8 flex items-center gap-2.5 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <History className="w-6 h-6 text-indigo-500" />
            Interactive Founding Timeline
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Year Selectors */}
            <div className="lg:col-span-3 flex lg:flex-col gap-3">
              {Object.keys(milestones).map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`w-full py-4 px-6 rounded-2xl font-display font-black text-lg transition-all text-left border flex items-center justify-between cursor-pointer ${
                    selectedYear === year
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/15 scale-[1.02]'
                      : darkMode
                        ? 'border-slate-800 bg-slate-900/40 text-slate-450 hover:text-white hover:border-slate-700'
                        : 'border-slate-200 bg-slate-50 text-slate-655 hover:bg-slate-100 hover:border-slate-350'
                  }`}
                >
                  <span>{year}</span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    selectedYear === year 
                      ? 'bg-white/20 text-white' 
                      : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {milestones[year].tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Milestone Content Display */}
            <div className="lg:col-span-9">
              <div className={`h-full rounded-3xl border p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl transition-all duration-305 ${
                darkMode 
                  ? 'glass-card-dark border-slate-850' 
                  : 'glass-card-light border-slate-200 bg-gradient-to-br from-white to-slate-50'
              }`}>
                {/* Visual glow element */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500/[0.03] blur-3xl pointer-events-none" />

                <div>
                  <span className="font-mono text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-2">
                    Milestone Overview — {selectedYear}
                  </span>
                  
                  <h3 className={`font-display font-black text-2xl md:text-3xl mb-4 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {milestones[selectedYear].title}
                  </h3>
                  
                  <p className={`text-sm md:text-base font-light leading-relaxed mb-8 max-w-2xl ${
                    darkMode ? 'text-slate-350' : 'text-slate-600'
                  }`}>
                    {milestones[selectedYear].desc}
                  </p>
                </div>

                {/* Micro Metrics Panel */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t dark:border-slate-800/80">
                  <div>
                    <span className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                      System Scale
                    </span>
                    <span className={`font-display font-black text-lg md:text-xl ${
                      darkMode ? 'text-white' : 'text-slate-950'
                    }`}>
                      {milestones[selectedYear].metric1}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                      Benchmark Latency
                    </span>
                    <span className={`font-display font-black text-lg md:text-xl ${
                      darkMode ? 'text-white' : 'text-slate-950'
                    }`}>
                      {milestones[selectedYear].metric2}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. DYNAMIC ENGINEERING PILLARS */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`font-display font-black text-2xl md:text-4xl tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Engineering Principles
            </h2>
            <p className={`text-xs md:text-sm font-light leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Our systems are built on high-performance cryptography, secure identity protocols, and robust session isolation principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corePillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx}
                  className={`rounded-3xl border p-6 shadow-lg flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                    darkMode 
                      ? 'glass-card-dark border-slate-855 hover:border-slate-700' 
                      : 'glass-card-light border-slate-200/60 bg-white hover:border-slate-350'
                  }`}
                >
                  <div className="mb-6">
                    <div className={`w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-5 ${p.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`font-display font-black text-lg mb-3 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {p.title}
                    </h3>
                    <p className={`text-xs font-light leading-relaxed ${
                      darkMode ? 'text-slate-455' : 'text-slate-600'
                    }`}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. EXECUTIVE BOARD DECK */}
        <div className="mb-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`font-display font-black text-2xl md:text-4xl tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Executive Leadership
            </h2>
            <p className={`text-xs md:text-sm font-light leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Meet the technical visionaries orchestrating Beta Softnet’s single sign-on digital applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, idx) => (
              <div 
                key={idx}
                className={`group rounded-3xl border p-6 shadow-xl relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                  darkMode 
                    ? 'glass-card-dark border-slate-850 hover:border-indigo-500/30' 
                    : 'glass-card-light border-slate-200 bg-white hover:border-indigo-400/30'
                }`}
              >
                {/* Visual Top Highlight */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-4 mb-6">
                  {/* Decorative Initials Avatar */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${leader.avatarColor} flex items-center justify-center text-white font-display font-black text-sm shadow-md`}>
                    {leader.initials}
                  </div>
                  <div>
                    <h3 className={`font-display font-black text-base ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {leader.name}
                    </h3>
                    <p className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest">
                      {leader.role}
                    </p>
                  </div>
                </div>

                <p className={`text-xs font-light leading-relaxed mb-6 ${
                  darkMode ? 'text-slate-400' : 'text-slate-650'
                }`}>
                  {leader.bio}
                </p>

                {/* Social Highlights using Inline SVGs */}
                <div className="flex items-center gap-3 pt-4 border-t dark:border-slate-805 text-slate-450 dark:text-slate-500">
                  <a href="#" className="hover:text-indigo-550 transition-all hover:scale-110">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-indigo-550 transition-all hover:scale-110">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
