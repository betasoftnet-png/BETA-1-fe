import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Building, Mail, User, MessageSquare } from 'lucide-react';

export default function EnterpriseContactModal({ isOpen, onClose, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    products: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const productOptions = [
    { id: 'bnxmail', label: 'BNXMail' },
    { id: 'b2auth', label: 'B2Auth' },
    { id: 'cliks', label: 'Cliks' },
    { id: 'cliks-business', label: 'Cliks Business' }
  ];

  const handleProductToggle = (prodId) => {
    setFormData(prev => {
      const alreadySelected = prev.products.includes(prodId);
      const updatedProducts = alreadySelected
        ? prev.products.filter(p => p !== prodId)
        : [...prev.products, prodId];
      return { ...prev, products: updatedProducts };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', company: '', message: '', products: [] });
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className={`relative w-full max-w-lg rounded-3xl border shadow-2xl p-6 md:p-8 overflow-hidden z-10 transition-all duration-300 animate-float ${
        darkMode 
          ? 'bg-slate-900/95 border-slate-800 text-white' 
          : 'bg-white/95 border-slate-200 text-slate-800'
      }`}>
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors cursor-pointer ${
            darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className={`font-display font-black text-2xl mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Details Transmitted!
            </h3>
            <p className={`text-sm font-light leading-relaxed max-w-sm ${darkMode ? 'text-slate-400' : 'text-slate-505'}`}>
              Thank you for contacting Beta Softnet Enterprise. An account executive will reach out to you within 24 hours to schedule a system demonstration.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left relative">
            <div>
              <h3 className={`font-display font-black text-2xl tracking-tight mb-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Contact Enterprise
              </h3>
              <p className={`text-xs font-light ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Request a custom service-level agreement or custom Sandbox credentials.
              </p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="relative">
                <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-all ${
                      darkMode 
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Work Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-all ${
                      darkMode 
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'
                    }`}
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="relative">
                <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Company Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-all ${
                      darkMode 
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'
                    }`}
                  />
                </div>
              </div>

              {/* Products of Interest */}
              <div>
                <label className={`block text-[10px] uppercase font-bold tracking-widest mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Products of Interest
                </label>
                <div className="flex flex-wrap gap-2">
                  {productOptions.map(prod => {
                    const isSelected = formData.products.includes(prod.id);
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => handleProductToggle(prod.id)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                            : darkMode
                              ? 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                              : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {prod.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Describe your requirements
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your team's integration needs..."
                  className={`w-full text-xs p-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-all resize-none ${
                    darkMode 
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'
                  }`}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-5 py-2.5 rounded-xl font-display font-semibold text-xs transition-colors cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-display font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-indigo-600/25 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Transmitting...
                  </>
                ) : (
                  <>
                    Submit Request
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
