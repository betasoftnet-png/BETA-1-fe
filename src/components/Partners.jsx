import React, { useState } from 'react';
import { ShieldCheck, Handshake, Mail, X, Check, Globe } from 'lucide-react';

export default function Partners({ darkMode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setEmailInput('');
    }, 2000);
  };

  const partnerLogos = [
    { name: 'Stripe', path: 'stripe' },
    { name: 'Vercel', path: 'vercel' },
    { name: 'Linear', path: 'linear' },
    { name: 'AWS', path: 'aws' },
    { name: 'Figma', path: 'figma' },
    { name: 'Retool', path: 'retool' }
  ];

  // Double list to ensure smooth infinite marquee scroll
  const marqueeItems = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        
        {/* Header */}
        <div className="max-w-xl mx-auto mb-12">
          <h3 className={`font-display font-extrabold text-sm uppercase tracking-widest text-indigo-500 mb-2`}>
            Trusted by Top Teams
          </h3>
          <p className={`text-xs font-light ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Beta Softnet’s ecosystem components power high-velocity workflows at leading engineering institutions.
          </p>
        </div>

        {/* CSS Infinite Marquee Scroll container */}
        <div className="relative w-full overflow-hidden py-4 mask-marquee pointer-events-none">
          {/* Fading side gradients for premium glow */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#0f172a]/0 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#0f172a]/0 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee space-x-12">
            {marqueeItems.map((logo, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl border font-display font-extrabold text-sm tracking-tight transition-colors ${
                  darkMode 
                    ? 'border-slate-800 bg-slate-900/40 text-slate-400' 
                    : 'border-slate-200/50 bg-white text-slate-500'
                }`}
              >
                <div className="w-5 h-5 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  ⚡
                </div>
                {logo.name}
              </div>
            ))}
          </div>
        </div>

        {/* Become a Partner Call to Action */}
        <div className="mt-12">
          <button 
            onClick={() => setModalOpen(true)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-xs tracking-wider uppercase border transition-all hover:scale-105 cursor-pointer ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white' 
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Handshake className="w-4 h-4 text-indigo-500" />
            Become a Partner
          </button>
        </div>

        {/* Modal Apply Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className={`w-full max-w-[460px] rounded-3xl border shadow-2xl p-6 relative animate-float ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              {/* Close Button */}
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 border-b dark:border-slate-800 pb-4 mb-5 text-left">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <Handshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg">Partner Program Application</h4>
                  <p className="text-xs text-slate-400">Join our connected digital ecosystem program</p>
                </div>
              </div>

              {/* Form Content */}
              {submitted ? (
                <div className="py-8 flex flex-col items-center justify-center text-center animate-float">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h5 className="font-display font-bold text-base text-emerald-500">Application Submitted!</h5>
                  <p className={`text-xs mt-1 max-w-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Thank you! Our integrations board will review your profile and reach out within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <div>
                    <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Company Domain
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="url" 
                        required 
                        placeholder="https://yourcompany.com" 
                        className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Corporate Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        required 
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="you@yourcompany.com" 
                        className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-display font-semibold uppercase tracking-wider shadow-lg shadow-indigo-600/10 cursor-pointer"
                    >
                      Submit Integration Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
