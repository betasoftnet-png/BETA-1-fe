import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Shield, Mail, CreditCard, Landmark, ArrowRight } from 'lucide-react';
import logo from "../assets/beta.png"

export default function Navbar({ darkMode, setDarkMode, currentRoute, isLogged, activeUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLoginClick = () => {
    const authUrl = import.meta.env.VITE_AUTH_URL || 'https://b2auth.com';
    window.location.href = `${authUrl}/?client_id=beta_website&redirect_uri=${encodeURIComponent(window.location.origin + '/')}`;
  };

  const productItems = [
    { name: 'BNXMail', desc: 'Group-driven secure mail client', icon: Mail, color: 'text-blue-500', link: '#/products' },
    { name: 'B2Auth', desc: 'Unified session & identity manager', icon: Shield, color: 'text-indigo-500', link: '#/products' },
    { name: 'Cliks', desc: 'Premium personal finance ledger', icon: CreditCard, color: 'text-purple-500', link: '#/products' },
    { name: 'Cliks Business', desc: 'Complete SME treasury engine', icon: Landmark, color: 'text-cyan-500', link: '#/products' },
  ];

  const getLinkClass = (hash) => {
    const isActive = currentRoute === hash;
    return `relative font-display font-semibold text-xs tracking-wider uppercase transition-all pb-1 cursor-pointer ${
      isActive 
        ? 'text-indigo-500' 
        : darkMode 
          ? 'text-slate-350 hover:text-white' 
          : 'text-slate-600 hover:text-slate-900'
    }`;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? darkMode ? 'glass-card-dark py-3 shadow-lg' : 'glass-card-light py-3 shadow-md'
        : 'bg-transparent py-5 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo - Returns Home */}
        <a href="#/" className="flex items-center gap-2 group">
          {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-display font-extrabold text-xl tracking-tight"></span>
          </div> */}
          <img src={logo} alt="Logo" className='h-16 w-16 rounded-xl '/>
          <div className="flex flex-col text-left">
            <span className={`font-display font-black text-lg leading-tight tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Beta Softnet
            </span>
            {/* <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-500">
              Ecosystem
            </span> */}
          </div>
        </a>

        {/* Desktop Links with active highlights */}
        <div className="hidden lg:flex items-center gap-8">
          {/* <a href="#/" className={getLinkClass('#/')}>
            Home
            {currentRoute === '#/' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />}
          </a> */}

          {/* Products Dropdown */}
          <div className="relative">
            <button 
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={toggleDropdown}
              className={`flex items-center gap-1 font-display font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                currentRoute === '#/products' || dropdownOpen
                  ? 'text-indigo-500' 
                  : darkMode ? 'text-slate-350 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Products <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div 
                onMouseLeave={() => setDropdownOpen(false)}
                className={`absolute top-full -left-10 mt-3 w-80 rounded-2xl p-4 shadow-xl border animate-float transition-all ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-white' 
                    : 'bg-white border-slate-100 text-slate-800'
                }`}
              >
                <div className="grid gap-2 text-left">
                  <div className="px-2 py-1 text-xs uppercase font-extrabold tracking-widest text-indigo-500 border-b border-indigo-500/10 mb-2">
                    BNX Unified Solutions
                  </div>
                  {productItems.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <a 
                        key={idx}
                        href={p.link} 
                        className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                          darkMode ? 'hover:bg-slate-900/60' : 'hover:bg-slate-50'
                        }`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className={`p-2 rounded-lg bg-indigo-500/10 ${p.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{p.name}</div>
                          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{p.desc}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <a href="#/about" className={getLinkClass('#/about')}>
            About
            {currentRoute === '#/about' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />}
          </a>

          <a href="#/partners" className={getLinkClass('#/partners')}>
            Partners
            {currentRoute === '#/partners' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />}
          </a>

          <a href="#/resources" className={getLinkClass('#/resources')}>
            Resources
            {currentRoute === '#/resources' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />}
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800 hover:scale-105' 
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:scale-105'
            }`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isLogged ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="relative group/avatar">
                <img 
                  src={activeUser.avatar} 
                  alt={activeUser.name} 
                  className="w-10 h-10 rounded-full border-2 border-indigo-500/80 shadow-md object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className={`font-sans font-bold text-xs leading-none ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                  {activeUser.name}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">
                  {activeUser.role}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={handleLoginClick}
                className={`font-display font-semibold text-sm transition-colors ${
                  darkMode ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-700 hover:text-indigo-600'
                }`}
              >
                Sign In
              </button>
              <a 
                href="#/partners" 
                className="relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-indigo-600/25"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition-all ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-amber-400' 
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-xl border transition-all ${
              darkMode 
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' 
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`lg:hidden w-full absolute top-full left-0 border-t py-6 px-8 shadow-2xl flex flex-col gap-5 transition-all duration-300 text-left ${
          darkMode 
            ? 'bg-slate-950 border-slate-900 text-slate-300' 
            : 'bg-white border-slate-100 text-slate-700'
        }`}>
          <div className="text-xs uppercase font-extrabold tracking-widest text-indigo-500 border-b border-indigo-500/10 pb-2">
            Navigation Menu
          </div>
          <a 
            href="#/" 
            className="font-display font-bold text-sm hover:text-indigo-500 flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a 
            href="#/products" 
            className="font-display font-bold text-sm hover:text-indigo-500 flex items-center justify-between"
            onClick={() => setIsOpen(false)}
          >
            Products
          </a>
          <a 
            href="#/about" 
            className="font-display font-bold text-sm hover:text-indigo-500"
            onClick={() => setIsOpen(false)}
          >
            About & Engineering
          </a>
          <a 
            href="#/partners" 
            className="font-display font-bold text-sm hover:text-indigo-500"
            onClick={() => setIsOpen(false)}
          >
            Partners
          </a>
          <a 
            href="#/resources" 
            className="font-display font-bold text-sm hover:text-indigo-500"
            onClick={() => setIsOpen(false)}
          >
            Resources & Blog
          </a>
          <div className="border-t border-slate-200 dark:border-slate-850 pt-4 mt-2 flex flex-col gap-3">
            {!isLogged && (
              <button 
                onClick={() => {
                  setIsOpen(false);
                  handleLoginClick();
                }}
                className={`w-full text-center inline-block py-3 rounded-xl font-display font-semibold text-sm border transition-all ${
                  darkMode ? 'border-slate-800 text-slate-300 hover:bg-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Sign In with B2Auth
              </button>
            )}
            <a 
              href="#/partners" 
              className="w-full text-center inline-block py-3 rounded-xl font-display font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Get Started with BNX
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
