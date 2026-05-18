import React, { useRef, useEffect, useState } from 'react';
import { Mail, Shield, CreditCard, Landmark, ArrowRight, Play } from 'lucide-react';

export default function Hero({ darkMode }) {
  const canvasRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  // Core Nodes configuration for the animated connection graph using proportional coordinates
  const nodes = [
    { id: 'b2auth', label: 'B2Auth', rx: 0.50, ry: 0.28, color: '#6366f1', icon: Shield, desc: 'Identity & Access Control' },
    { id: 'bnxmail', label: 'BNXMail', rx: 0.80, ry: 0.40, color: '#3b82f6', icon: Mail, desc: 'Secure Group Inbox' },
    { id: 'cliks', label: 'Cliks', rx: 0.20, ry: 0.65, color: '#a855f7', icon: CreditCard, desc: 'Personal FinTech' },
    { id: 'cliksbus', label: 'Cliks Business', rx: 0.65, ry: 0.76, color: '#06b6d4', icon: Landmark, desc: 'SME Financial Suite' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Scale canvas for high DPI displays
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dynamic particles traveling along paths
    const connections = [
      { from: 'b2auth', to: 'bnxmail' },
      { from: 'b2auth', to: 'cliks' },
      { from: 'b2auth', to: 'cliksbus' },
      { from: 'bnxmail', to: 'cliksbus' },
      { from: 'cliks', to: 'cliksbus' },
    ];

    const generateParticle = (w, h) => {
      if (particles.length > 25) return;
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const nodeFrom = nodes.find(n => n.id === conn.from);
      const nodeTo = nodes.find(n => n.id === conn.to);
      if (nodeFrom && nodeTo) {
        particles.push({
          x: w * nodeFrom.rx,
          y: h * nodeFrom.ry,
          targetX: w * nodeTo.rx,
          targetY: h * nodeTo.ry,
          speed: 0.8 + Math.random() * 1.2,
          progress: 0,
          color: nodeFrom.color
        });
      }
    };

    // Draw Loop
    const draw = () => {
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      ctx.clearRect(0, 0, w, h);

      // 1. Draw connection lines
      connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (fromNode && toNode) {
          const fromX = w * fromNode.rx;
          const fromY = h * fromNode.ry;
          const toX = w * toNode.rx;
          const toY = h * toNode.ry;

          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.strokeStyle = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Glow trace if one of the nodes is active
          if (activeNode === fromNode.id || activeNode === toNode.id) {
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.strokeStyle = 'rgba(99,102,241,0.2)';
            ctx.lineWidth = 3;
            ctx.stroke();
          }
        }
      });

      // 2. Spawn and draw traveling particles
      if (Math.random() < 0.1) generateParticle(w, h);
      particles.forEach((p, index) => {
        p.progress += 0.005 * p.speed;
        if (p.progress >= 1) {
          particles.splice(index, 1);
          return;
        }

        // Interpolate position
        const currentX = p.x + (p.targetX - p.x) * p.progress;
        const currentY = p.y + (p.targetY - p.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      // 3. Draw nodes
      nodes.forEach(node => {
        const isActive = activeNode === node.id;
        const nx = w * node.rx;
        const ny = h * node.ry;
        
        // Halo pulse
        ctx.beginPath();
        ctx.arc(nx, ny, isActive ? 24 : 16, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? `${node.color}15` : `${node.color}08`;
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(nx, ny, isActive ? 12 : 9, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isActive ? 15 : 5;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Inner white dot
        ctx.beginPath();
        ctx.arc(nx, ny, isActive ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Node Title Text
        ctx.font = 'bold 12px Outfit';
        ctx.fillStyle = darkMode ? '#cbd5e1' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, ny - (isActive ? 30 : 22));
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode, activeNode]);

  // Handle canvas mouse move to trigger active node states
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    let found = null;
    nodes.forEach(node => {
      const nx = w * node.rx;
      const ny = h * node.ry;
      const dist = Math.sqrt((nx - x) ** 2 + (ny - y) ** 2);
      if (dist < 30) {
        found = node.id;
      }
    });
    setActiveNode(found);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10">
      
      {/* 1. STATEFUL BACKGROUND WRAPPER (Renders above body canvas but behind content) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-cyan-500/15 blur-[100px] opacity-70" />
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] animate-pulse-slow" />
        
        {/* Decorative Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        {/* Zoho-Inspired Connected Node Circuit Grid background */}
        <div className="absolute top-12 left-6 w-80 h-80 opacity-[0.4] dark:opacity-[0.15] animate-pulse-slow">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="40" cy="40" r="4" fill="#6366f1" />
            <circle cx="160" cy="80" r="6" fill="#3b82f6" />
            <circle cx="100" cy="150" r="5" fill="#a855f7" />
            <path d="M40 40 Q 100 20, 160 80 T 100 150" stroke="url(#circuit-grad-1)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M40 40 L 100 150" stroke="url(#circuit-grad-2)" strokeWidth="1" opacity="0.5" />
            <defs>
              <linearGradient id="circuit-grad-1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="circuit-grad-2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* PhonePe-Inspired Interlocking Soft Vector Waves & Circular Radar */}
        <div className="absolute right-0 bottom-0 w-[480px] h-[480px] opacity-[0.45] dark:opacity-[0.18]">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Concentric radar loops */}
            <circle cx="200" cy="200" r="180" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
            <circle cx="200" cy="200" r="140" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
            <circle cx="200" cy="200" r="90" stroke="#06b6d4" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
            {/* Soft wavy ribbon */}
            <path d="M -50 220 C 100 120, 250 320, 450 200" stroke="url(#wave-grad-1)" strokeWidth="10" opacity="0.7" strokeLinecap="round" />
            <path d="M -50 240 C 90 140, 240 340, 450 220" stroke="url(#wave-grad-2)" strokeWidth="3" opacity="0.5" />
            <defs>
              <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="wave-grad-2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 2. FOREGROUND CONTENT GRID (Always stacked above background graphics) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 font-display font-semibold text-xs tracking-wider uppercase mb-6 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            Beta Softnet BNX Suite
          </div>

          {/* Heading */}
          <h1 className={`font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] mb-6 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Building the Future of <br />
            <span className="text-gradient-indigo-cyan">Digital Ecosystems</span>
          </h1>

          {/* Subtext */}
          <p className={`text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl ${
            darkMode ? 'text-slate-355' : 'text-slate-600'
          }`}>
            Beta Softnet engineers a unified digital world. We connect high-velocity email spaces, 
            session-secured authenticators, and SME banking services under one seamless, 
            multi-account secure identity ecosystem called <strong className="text-indigo-500 font-semibold">BNX</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a 
              href="#/products" 
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-base text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-xl shadow-indigo-600/25 hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#/" 
              className={`w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-base transition-all duration-300 border hover:scale-[1.03] active:scale-[0.98] ${
                darkMode 
                  ? 'border-slate-800 bg-slate-900 text-slate-200 hover:border-slate-700 hover:text-white' 
                  : 'border-slate-200 bg-white text-slate-750 hover:border-slate-350 hover:bg-slate-50'
              }`}
            >
              <Play className="w-4 h-4 text-indigo-500 fill-indigo-500" />
              See Unified Demo
            </a>
          </div>
        </div>

        {/* Right Graphic Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative z-20">
          {/* Connected ecosystem Canvas Card wrapper */}
          <div className={`w-full max-w-[500px] rounded-3xl p-6 border shadow-2xl transition-all relative group ${
            darkMode 
              ? 'glass-card-dark border-slate-800/80' 
              : 'glass-card-light border-slate-200/60 bg-white'
          }`}>
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className={`text-xs font-mono px-3 py-1 rounded-full ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-550'}`}>
                bnx-network-topology
              </span>
            </div>

            {/* Interactive Canvas */}
            <canvas 
              ref={canvasRef} 
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setActiveNode(null)}
              className="w-full h-[320px] cursor-pointer"
              style={{ display: 'block' }}
            />

            {/* Explanatory bubble overlay */}
            <div className={`mt-2 p-3 rounded-2xl border transition-all duration-300 text-left min-h-[74px] flex items-center ${
              activeNode 
                ? 'border-indigo-500/20 bg-indigo-500/5' 
                : darkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-100 bg-slate-50/50'
            }`}>
              {activeNode ? (
                (() => {
                  const currNode = nodes.find(n => n.id === activeNode);
                  const Icon = currNode.icon;
                  return (
                    <div className="flex items-start gap-3 w-full animate-float">
                      <div className="p-2 rounded-lg bg-white/10 text-white mt-0.5" style={{ backgroundColor: currNode.color }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          {currNode.label} Connected
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {currNode.desc} is fully synced under secure B2Auth credentials.
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center w-full text-xs font-medium text-slate-450 dark:text-slate-500">
                  Hover over the glowing nodes above to inspect connected digital ecosystem components.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
