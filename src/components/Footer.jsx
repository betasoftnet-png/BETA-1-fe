import React, { useState } from 'react';
import { Mail, Shield, CreditCard, Landmark, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';

export default function Footer({ darkMode }) {
  const [subscribed, setSubscribed] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailValue('');
    }, 2500);
  };

  const footerLinks = {
    products: [
      { name: 'BNXMail Workspace', href: '#/products' },
      { name: 'B2Auth Session Manager', href: '#/products' },
      { name: 'Cliks Personal FinTech', href: '#/products' },
      { name: 'Cliks Business Treasury', href: '#/products' }
    ],
    company: [
      { name: 'Who We Are', href: '#/about' },
      { name: 'Partner Program', href: '#/partners' },
      { name: 'Engineering Core', href: '#/about' },
      { name: 'Platform SLA', href: '#/' }
    ],
    resources: [
      { name: 'Documentation Hub', href: '#/resources' },
      { name: 'API Reference REST', href: '#/resources' },
      { name: 'Ecosystem Publications', href: '#/resources' },
      { name: 'Active Sandbox Status', href: '#/resources' }
    ],
    legal: [
      { name: 'Privacy Protocol', href: '#' },
      { name: 'Terms of Use', href: '#' },
      { name: 'Security Policy', href: '#' },
      { name: 'Identity SLA', href: '#' }
    ]
  };

  return (
    <footer id="footer" className="relative overflow-hidden border-t border-slate-200/50 dark:border-slate-800/40">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* 10. FINAL CTA PANEL */}
      <div id="final-cta" className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className={`rounded-3xl p-8 md:p-14 border shadow-2xl relative overflow-hidden text-center flex flex-col items-center ${
          darkMode 
            ? 'glass-card-dark border-slate-800' 
            : 'glass-card-light border-slate-200/80 bg-gradient-to-br from-white to-slate-50'
        }`}>
          {/* Subtle orb background inside CTA */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/[0.04] blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/[0.04] blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6">
            ⚡
          </div>

          {/* Headline */}
          <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tight mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Start Building with Beta Softnet
          </h2>

          {/* Subtext */}
          <p className={`text-sm md:text-base font-light leading-relaxed max-w-xl mb-8 ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Unleash the full potential of your identity, workspace inbox channels, and SME transactions. Deploy the secure BNX ecosystem sandbox in minutes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <a 
              href="#/partners"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl font-display font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-indigo-600/20"
            >
              Explore Platform SDK
            </a>
            <a 
              href="mailto:contact@betasoftnet.com"
              className={`w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold text-sm border hover:scale-[1.03] active:scale-[0.98] transition-all ${
                darkMode 
                  ? 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white' 
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-350 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              Contact Enterprise
            </a>
          </div>
        </div>
      </div>

      {/* 11. FOOTER SITEMAP AND COPYRIGHT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/40">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12 text-left">
          
          {/* Logo & Info column */}
          <div className="col-span-2 flex flex-col items-start gap-4">
            <a href="#/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-display font-extrabold text-sm shadow-md">
                BN
              </div>
              <span className={`font-display font-black text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Beta Softnet
              </span>
            </a>
            
            <p className={`text-xs font-light leading-relaxed max-w-xs ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Beta Softnet designs integrated secure software layers under a singular identity core, empowering scale and speed.
            </p>

            {/* Newsletter subscriber box */}
            <div className="w-full mt-2">
              <span className={`block text-[9px] uppercase font-bold tracking-widest mb-2 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Subscribe to release logs
              </span>
              
              {subscribed ? (
                <div className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-xs font-semibold animate-float">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Successfully Subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    required 
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="name@email.com" 
                    className={`w-full text-xs px-3.5 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="text-[10px] uppercase font-extrabold tracking-widest mb-4 text-slate-400 dark:text-slate-350">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href} 
                      className={`text-xs font-light transition-colors relative hover:text-indigo-500 ${
                        darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom copyright and Social links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200/50 dark:border-slate-800/40">
          <span className={`text-[10.5px] font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            © 2026 Beta Softnet Corporation. All rights reserved. BNX and B2Auth are registered trademarks.
          </span>

          {/* Socials */}
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-all hover:scale-110">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-all hover:scale-110">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-all hover:scale-110">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1-2.52-2.522A2.528 2.528 0 0 1 8.823 0a2.528 2.528 0 0 1 2.52 2.522v2.521h-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.824a2.528 2.528 0 0 1 2.522-2.52h5.043zm10.135 3.781a2.528 2.528 0 0 1 2.522-2.52 2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.52h-2.522v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043zm-3.78 10.134a2.528 2.528 0 0 1 2.52 2.522 2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.522h2.522zm0-1.262a2.528 2.528 0 0 1-2.522-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52h-5.043z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
