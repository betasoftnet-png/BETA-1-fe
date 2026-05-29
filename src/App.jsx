import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import Products from './components/Products';
import UseCases from './components/UseCases';
import WhyChooseUs from './components/WhyChooseUs';
import Partners from './components/Partners';
import Resources from './components/Resources';
import Footer from './components/Footer';
import EnterpriseContactModal from './components/EnterpriseContactModal';

// Import newly created dedicated pages
import AboutPage from './pages/AboutPage';
import PartnersPage from './pages/PartnersPage';
import ResourcesPage from './pages/ResourcesPage';
import ProductsPage from './pages/ProductsPage';
import CareersPage from './pages/CareersPage';
import AdminPage from './pages/AdminPage';

import logo from './assets/beta.png';
import { ArrowUp, MessageSquare, X, Send } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false); // Default to premium Dark Mode
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSubmitted, setChatSubmitted] = useState(false);
  const [fadeTrigger, setFadeTrigger] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // --- PERSISTENT GLOBAL STATES ---
  
  // 1. Session Login State (Synced to localStorage)
  const [isLogged, setIsLogged] = useState(() => {
    const saved = localStorage.getItem('bnx_logged');
    return saved === 'true';
  });
  
  const [activeUser, setActiveUser] = useState(() => {
    const saved = localStorage.getItem('bnx_user');
    return saved ? JSON.parse(saved) : {
      name: 'Beta Softnet',
      email: 'betasoftnet@bnxmail.com',
      role: 'Developer',
      avatar: logo
    };
  });

  const defaultUser = {
    name: 'Beta Softnet',
    email: 'betasoftnet@bnxmail.com',
    role: 'Developer',
    avatar: logo
  };

  useEffect(() => {
    localStorage.setItem('bnx_logged', isLogged);
    if (!isLogged) {
      localStorage.removeItem('bnx_accessToken');
      localStorage.removeItem('bnx_user');
      setActiveUser(defaultUser);
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      localStorage.setItem('bnx_user', JSON.stringify(activeUser));
    }
  }, [activeUser, isLogged]);

  // SSO Login Callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      // Clean URL immediately
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      
      const exchangeCode = async () => {
        try {
          const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.bnxmail.com';
          
          // 1. Exchange code for token
          const tokenRes = await fetch(`${API_BASE}/api/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              grantType: 'authorization_code',
              code,
              clientId: 'beta_website',
              clientSecret: 'secure-beta-secret-2026'
            })
          });
          
          const tokenData = await tokenRes.json();
          if (!tokenData.success) {
            throw new Error(tokenData.message || 'Failed to exchange code');
          }
          
          const accessToken = tokenData.data.access_token;
          localStorage.setItem('bnx_accessToken', accessToken);
          
          // 2. Fetch user profile
          const userRes = await fetch(`${API_BASE}/api/users/me`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          
          const userData = await userRes.json();
          if (!userData.success) {
            throw new Error(userData.message || 'Failed to fetch user profile');
          }
          
          const user = userData.data;
          setActiveUser({
            name: user.fullName || user.username,
            email: user.email,
            role: user.accountType || 'User',
            avatar: logo
          });
          setIsLogged(true);
        } catch (err) {
          console.error('SSO login error:', err);
        }
      };
      
      exchangeCode();
    }
  }, []);

  // 2. Ledger Fintech Balances
  const [ledgerBalance, setLedgerBalance] = useState(() => {
    const saved = localStorage.getItem('bnx_ledger_balance');
    return saved ? parseFloat(saved) : 14250.75;
  });

  const [ledgerLogs, setLedgerLogs] = useState(() => {
    const saved = localStorage.getItem('bnx_ledger_logs');
    return saved ? JSON.parse(saved) : [
      { title: 'Contract Milestone Disbursed', amount: 2500.00, type: 'credit' },
      { title: 'SaaS server hosting node', amount: -150.00, type: 'debit' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('bnx_ledger_balance', ledgerBalance);
  }, [ledgerBalance]);

  useEffect(() => {
    localStorage.setItem('bnx_ledger_logs', JSON.stringify(ledgerLogs));
  }, [ledgerLogs]);

  // 3. Partner Applications
  const [partnerApplications, setPartnerApplications] = useState(() => {
    const saved = localStorage.getItem('bnx_partner_apps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bnx_partner_apps', JSON.stringify(partnerApplications));
  }, [partnerApplications]);

  // Listen to address bar hash changes for SPA routing
  useEffect(() => {
    const handleHashChange = () => {
      const activeHash = window.location.hash || '#/';
      
      // Trigger a smooth fade transition out and in
      setFadeTrigger(true);
      setTimeout(() => {
        setCurrentRoute(activeHash);
        setFadeTrigger(false);
        // Standard SPA protocol: Reset scroll to top on route change
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 150);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Execute initially in case they bookmarked a link
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track scroll details for scrollbar and return button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoute]);

  // Update theme selectors on the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [darkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    setChatSubmitted(true);
    setTimeout(() => {
      setChatSubmitted(false);
      setChatOpen(false);
    }, 2000);
  };

  // Router dispatcher
  const renderActivePage = () => {
    switch (currentRoute) {
      case '#/about':
        return <AboutPage darkMode={darkMode} />;
      case '#/careers':
        return <CareersPage darkMode={darkMode} />;
      case '#/admin':
        return <AdminPage darkMode={darkMode} />;
      case '#/partners':
        return (
          <PartnersPage 
            darkMode={darkMode} 
            partnerApplications={partnerApplications} 
            setPartnerApplications={setPartnerApplications} 
          />
        );
      case '#/resources':
        return (
          <ResourcesPage 
            darkMode={darkMode} 
            activeUser={activeUser} 
            isLogged={isLogged} 
          />
        );
      case '#/products':
        return (
          <ProductsPage 
            darkMode={darkMode} 
            activeUser={activeUser} 
            isLogged={isLogged} 
            setIsLogged={setIsLogged} 
            ledgerBalance={ledgerBalance} 
            setLedgerBalance={setLedgerBalance} 
            ledgerLogs={ledgerLogs} 
            setLedgerLogs={setLedgerLogs} 
          />
        );
      case '#/':
      default:
        // Homepage layout: combines high-fidelity introduction panels
        return (
          <>
            <Hero darkMode={darkMode} />
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent max-w-7xl mx-auto" />
            <Ecosystem 
              darkMode={darkMode} 
              isLogged={isLogged} 
              setIsLogged={setIsLogged} 
              activeUser={activeUser} 
              ledgerBalance={ledgerBalance} 
            />
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent max-w-7xl mx-auto" />
            <Products darkMode={darkMode} />
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent max-w-7xl mx-auto" />
            <UseCases darkMode={darkMode} />
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent max-w-7xl mx-auto" />
            <WhyChooseUs darkMode={darkMode} />
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent max-w-7xl mx-auto" />
            {/* <Partners darkMode={darkMode} /> */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent max-w-7xl mx-auto" />
            {/* <Resources 
              darkMode={darkMode} 
              activeUser={activeUser} 
              isLogged={isLogged} 
            /> */}
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      
      {/* 1. Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. Navigation Bar */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        currentRoute={currentRoute} 
        isLogged={isLogged} 
        activeUser={activeUser} 
      />

      {/* 3. Stateful Transitions Core Container */}
      <main className={`relative transition-opacity duration-150 ${fadeTrigger ? 'opacity-0' : 'opacity-100'}`}>
        {renderActivePage()}
      </main>

      {/* 4. Footer */}
      <Footer darkMode={darkMode} onContactEnterprise={() => setContactModalOpen(true)} />

      {/* Contact Enterprise Modal */}
      <EnterpriseContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
        darkMode={darkMode} 
      />

      {/* 5. Floating Interactive widgets (Scroll To Top & Live Chat) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-full border shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-350 hover:text-white' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Live Chat Widget Trigger */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/35 hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
          title="Open Ecosystem Help chat"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
        </button>
      </div>

      {/* Live Chat Box Overlay */}
      {chatOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-80 rounded-2xl border shadow-2xl p-4 animate-float text-left ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          {/* Close Header */}
          <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div>
                <h5 className="font-display font-bold text-xs">Ecosystem Guide Bot</h5>
                <span className="text-[9px] text-slate-400">Answers in real-time</span>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="space-y-2.5 max-h-48 overflow-y-auto mb-3 text-xs leading-relaxed">
            <div className={`p-2.5 rounded-xl text-xs font-light ${
              darkMode ? 'bg-slate-950 text-slate-350' : 'bg-slate-50 text-slate-605'
            }`}>
              Hi! I am the Beta Softnet assist bot. Ask me anything about our single sign-on protocols, group email sandbox interfaces, or SME banking APIs!
            </div>
            {chatSubmitted && (
              <div className="flex justify-end">
                <div className="p-2.5 rounded-xl text-xs font-light bg-indigo-600 text-white max-w-[80%]">
                  Processing integration query...
                </div>
              </div>
            )}
          </div>

          {/* Form input */}
          {chatSubmitted ? (
            <div className="p-2 text-center text-[10px] text-emerald-500 font-semibold animate-float">
              Message dispatched! We'll reply shortly.
            </div>
          ) : (
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input 
                type="text" 
                required 
                placeholder="Ask about B2Auth, Cliks, Mail..." 
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button 
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow cursor-pointer transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
}
