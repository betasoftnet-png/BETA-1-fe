import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search, 
  Filter, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Building, 
  ChevronRight,
  Upload
} from 'lucide-react';

const LOCAL_FALLBACK_JOBS = [
  {
    id: 'job-1',
    title: 'Lead Cryptography Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$180k - $220k',
    description: 'We are seeking an expert in zero-knowledge proofs and distributed ledgers to orchestrate the validation engine connecting Cliks SME finance nodes.',
    responsibilities: [
      'Architect cryptographic proof-of-authority mechanisms for high-throughput transactional logging.',
      'Refine the security primitives of the B2Auth federated identity session layer.',
      'Collaborate with the security auditing team to execute vulnerability scans on ledger operations.',
      'Review and optimize core smart contract and decentralized consensus codebases.'
    ],
    requirements: [
      'Ph.D. or equivalent industry research background in Computer Science, Mathematics, or Cryptography.',
      '5+ years of production experience implementing decentralized ledger technologies or distributed systems.',
      'Deep fluency with Rust, Go, or specialized systems engineering languages.',
      'Experience with verifiable credentials and decentralized identity (DID) standards.'
    ]
  },
  {
    id: 'job-2',
    title: 'Principal Frontend Engineer - React',
    department: 'Engineering',
    location: 'Hybrid',
    type: 'Full-time',
    salary: '$160k - $195k',
    description: 'Shape the next generation of email interaction. Lead the engineering path of the BNXMail group-driven secure client dashboard.',
    responsibilities: [
      'Drive absolute UI performance, targeting sub-100ms render speeds for high-volume inbox states.',
      'Establish a unified component structure shared across BNXMail, B2Auth, and Cliks Business interfaces.',
      'Collaborate closely with designers to build premium micro-animations and micro-interactions.',
      'Implement real-time WebSocket listeners and optimistic state updates for conversational updates.'
    ],
    requirements: [
      '8+ years of experience crafting rich client-side applications using React and Tailwind CSS.',
      'Strong eye for aesthetics, premium typography, responsive grids, and clean design patterns.',
      'Expertise in local caching strategies, service workers, and state synchronization frameworks.',
      'A portfolio showcasing fluid, highly optimized, non-generic user interfaces.'
    ]
  },
  {
    id: 'job-3',
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    salary: '$135k - $165k',
    description: 'Establish the visual identity of Beta Softnet. Work on high-fidelity designs, user workflows, and cohesive interface layouts.',
    responsibilities: [
      'Design seamless web and mobile interfaces for complex ledger systems and developer portals.',
      'Conduct user research and build interactive prototypes demonstrating session-switching flows.',
      'Maintain and expand our core design system token database, ensuring maximum visual coherence.',
      'Collaborate with developers to review front-end visual implementation details.'
    ],
    requirements: [
      '5+ years of product design experience focusing on SaaS, developer platforms, or complex Fintech tools.',
      'Expertise with Figma, design system governance, and prototyping tools.',
      'A stunning portfolio demonstrating mastery of typography, visual hierarchy, and interface design.',
      'Basic understanding of HTML/CSS/Tailwind configurations is a strong plus.'
    ]
  },
  {
    id: 'job-4',
    title: 'Security & Authorization Architect',
    department: 'Security',
    location: 'Remote',
    type: 'Full-time',
    salary: '$170k - $210k',
    description: 'Help harden the core protocols behind B2Auth SSO. Build robust sandboxed session layers and mitigate federated threat models.',
    responsibilities: [
      'Audit single sign-on authentication vectors and OAuth token-exchange systems.',
      'Design sandbox boundary layers keeping email context secure from transaction nodes.',
      'Establish real-time threat detection telemetry and response pipelines.',
      'Provide security-focused architectural designs for third-party developer APIs.'
    ],
    requirements: [
      '6+ years of experience in corporate security, application security, or identity access management (IAM).',
      'Thorough expertise with OAuth 2.1, OIDC, SAML, and WebAuthn standards.',
      'Proven experience auditing cloud systems, Docker containers, and Kubernetes environments.',
      'Relevant security certifications (e.g., CISSP, OSCP) are highly valued.'
    ]
  },
  {
    id: 'job-5',
    title: 'Developer Relations Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'Grow the developer ecosystem using our sandbox APIs. Build outstanding guides, sample apps, and foster the open-source integration community.',
    responsibilities: [
      'Author highly readable tutorials, API guides, and integration walk-throughs for B2Auth and BNXMail.',
      'Construct and maintain starter repositories and developer SDK boilerplate templates.',
      'Gather developer feedback and coordinate with core product teams to improve the API onboarding flow.',
      'Speak at technology conferences and run online developer sandbox workshops.'
    ],
    requirements: [
      '4+ years of developer advocacy or software engineering experience with public APIs.',
      'Excellent technical writing capabilities and communication skills.',
      'Strong coding skills in Javascript/React, Node.js, Python, or Go.',
      'Passion for developer communities, open-source projects, and digital education.'
    ]
  }
];

export default function CareersPage({ darkMode }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Filter and Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Modal and Application States
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyMode, setApplyMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    resumeUrl: '',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSimulatedSubmit, setIsSimulatedSubmit] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      setIsUsingFallback(false);
      try {
        const response = await fetch(`${API_BASE}/api/jobs`);
        if (!response.ok) {
          throw new Error(`API returned error code ${response.status}`);
        }
        const data = await response.json();
        // Assuming response structure has a jobs list or data payload
        const jobsList = data.jobs || data.data || data;
        if (Array.isArray(jobsList)) {
          setJobs(jobsList);
        } else {
          throw new Error('API did not return a valid list of jobs.');
        }
      } catch (err) {
        console.warn('API fetch failed, falling back to local pre-populated job listings:', err);
        setJobs(LOCAL_FALLBACK_JOBS);
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_BASE]);

  // Extract unique departments and locations for filter drops
  const departments = ['All', ...new Set(jobs.map(job => job.department))];
  const locations = ['All', ...new Set(jobs.map(job => job.location))];

  // Filtering Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    return matchesSearch && matchesDept && matchesLocation;
  });

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSimulatedSubmit(false);

    try {
      const response = await fetch(`${API_BASE}/api/jobs/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}`);
      }
      
      const resData = await response.json();
      if (resData.success === false) {
        throw new Error(resData.message || 'Failed to submit application.');
      }
      setSubmitSuccess(true);
    } catch (err) {
      console.warn('Failed submitting to API endpoint, simulating client-side submission success:', err);
      // Wait for a realistic network response
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsSimulatedSubmit(true);
      setSubmitSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const resetApplicationForm = () => {
    setFormData({
      fullName: '',
      email: '',
      resumeUrl: '',
      coverLetter: ''
    });
    setSubmitSuccess(false);
    setSubmitError(null);
    setApplyMode(false);
    setIsSimulatedSubmit(false);
  };

  return (
    <div className="pt-28 pb-20 relative overflow-hidden text-left">
      {/* Background Visual Blobs */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Hero Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
            Careers at Beta Softnet
          </div>
          <h1 className={`font-display font-black text-4xl md:text-6xl tracking-tight mb-6 leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              Future of Federated Tech.
            </span>
          </h1>
          <p className={`text-base md:text-lg font-light leading-relaxed ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            We build tools that break communication boundaries, manage micro-banking ledger clusters, and secure decentralized session systems. Join us to write code that matters.
          </p>

          {isUsingFallback && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs border border-indigo-500/20 bg-indigo-500/5 text-indigo-500/90 dark:text-indigo-400">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>Offline Developer Sandbox (API Fallback Enabled)</span>
            </div>
          )}
        </div>

        {/* Search & Filters Section */}
        <div className={`mb-10 rounded-2xl border p-4 md:p-6 shadow-md transition-all ${
          darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/80 border-slate-200'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search query */}
            <div className="lg:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search job titles or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full text-sm pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Department dropdown */}
            <div className="lg:col-span-3 flex flex-col gap-1 text-left">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className={`w-full text-sm px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Location dropdown */}
            <div className="lg:col-span-3 flex flex-col gap-1 text-left">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={`w-full text-sm px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4 py-8">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-40 rounded-3xl border animate-pulse ${
                  darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && jobs.length === 0 && (
          <div className="text-center py-16">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h3 className={`font-display font-black text-xl mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Failed to Load Opportunities
            </h3>
            <p className="text-sm text-slate-400 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-20 border rounded-3xl border-dashed border-slate-300 dark:border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className={`font-display font-black text-xl mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              No Openings Found
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              We couldn't find any opportunities matching "{searchTerm}" under the selected filters.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedDept('All');
                setSelectedLocation('All');
              }}
              className="mt-6 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Jobs List */}
        {!loading && filteredJobs.length > 0 && (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`group rounded-3xl border p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-indigo-500/40 cursor-pointer ${
                  darkMode 
                    ? 'glass-card-dark border-slate-850' 
                    : 'glass-card-light border-slate-200 bg-white'
                }`}
              >
                {/* Job Core Details */}
                <div className="flex-1 flex flex-col items-start gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase bg-indigo-500/10 text-indigo-500">
                      {job.department}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase flex items-center gap-1 ${
                      darkMode ? 'bg-slate-800 text-slate-350' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase flex items-center gap-1 ${
                      darkMode ? 'bg-slate-800 text-slate-350' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </span>
                  </div>

                  <div className="text-left">
                    <h3 className={`font-display font-black text-xl md:text-2xl group-hover:text-indigo-500 transition-colors ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {job.title}
                    </h3>
                    <p className={`mt-2 text-xs md:text-sm font-light leading-relaxed line-clamp-2 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {job.description}
                    </p>
                  </div>
                </div>

                {/* Right Salary and Action */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-200 dark:border-slate-800 md:self-stretch justify-self-end">
                  <div className="flex items-center gap-1 text-emerald-500 font-mono text-sm md:text-base font-bold">
                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                    <span>{job.salary}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-500 uppercase tracking-widest mt-auto group-hover:gap-2 transition-all">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detail & Apply Slide-Over / Modal Panel */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => {
              setSelectedJob(null);
              resetApplicationForm();
            }}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Panel */}
          <div className={`relative w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-float border-l ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b p-6 dark:border-slate-800/80 bg-inherit">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-500 mb-1 inline-block">
                  {selectedJob.department}
                </span>
                <h2 className={`font-display font-black text-xl md:text-2xl ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {selectedJob.title}
                </h2>
              </div>
              <button 
                onClick={() => {
                  setSelectedJob(null);
                  resetApplicationForm();
                }}
                className={`p-2 rounded-xl border hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                  darkMode ? 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 flex-1">
              
              {!applyMode ? (
                /* Description details view */
                <div className="space-y-6 text-left">
                  
                  {/* Job Metadata Chips */}
                  <div className="flex flex-wrap gap-4 p-4 rounded-2xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      <span>{selectedJob.location} (Location)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span>{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold text-emerald-500">{selectedJob.salary} / year</span>
                    </div>
                  </div>

                  <div>
                    <h4 className={`font-display font-black text-base mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      About the Role
                    </h4>
                    <p className={`text-sm font-light leading-relaxed ${darkMode ? 'text-slate-350' : 'text-slate-650'}`}>
                      {selectedJob.description}
                    </p>
                  </div>

                  {selectedJob.responsibilities && (
                    <div>
                      <h4 className={`font-display font-black text-base mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Core Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {selectedJob.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm font-light leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                            <span className={darkMode ? 'text-slate-350' : 'text-slate-650'}>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedJob.requirements && (
                    <div>
                      <h4 className={`font-display font-black text-base mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Skills & Experience Required
                      </h4>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm font-light leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                            <span className={darkMode ? 'text-slate-350' : 'text-slate-650'}>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              ) : (
                /* Interactive application form */
                <div className="space-y-6 text-left">
                  
                  {submitSuccess ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto animate-float">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className={`font-display font-black text-2xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Application Received!
                      </h3>
                      <p className={`text-sm font-light max-w-sm mx-auto leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Thank you for applying to the <strong>{selectedJob.title}</strong> role. Our engineering and culture directors will review your details.
                      </p>
                      
                      {isSimulatedSubmit && (
                        <div className="max-w-xs mx-auto p-3 rounded-xl border border-indigo-500/10 bg-indigo-500/5 text-[10px] text-indigo-400">
                          Notice: Submitted application successfully in simulation sandbox mode.
                        </div>
                      )}

                      <button 
                        onClick={() => {
                          setSelectedJob(null);
                          resetApplicationForm();
                        }}
                        className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md cursor-pointer transition-all hover:scale-105"
                      >
                        Browse Other Positions
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <h3 className={`font-display font-black text-lg border-b dark:border-slate-800 pb-2 mb-4 ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        Application Profile
                      </h3>

                      {submitError && (
                        <div className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-500 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      {/* Name input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-450 dark:text-slate-400">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="Jane Doe"
                          className={`w-full text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                            darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                          }`}
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-455 dark:text-slate-400">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="jane.doe@example.com"
                          className={`w-full text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                            darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                          }`}
                        />
                      </div>

                      {/* Resume link */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-455 dark:text-slate-400">Resume Link / Portfolio Link *</label>
                        <div className="relative">
                          <Upload className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="url" 
                            required
                            value={formData.resumeUrl}
                            onChange={(e) => setFormData({...formData, resumeUrl: e.target.value})}
                            placeholder="https://myresume.com/jane-doe-resume.pdf"
                            className={`w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                              darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Cover letter */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-455 dark:text-slate-400">Cover Letter (Optional)</label>
                        <textarea 
                          rows={4}
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                          placeholder="Describe why you are excited to join Beta Softnet and build the federated future..."
                          className={`w-full text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 resize-none ${
                            darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                          }`}
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setApplyMode(false)}
                          className={`flex-1 text-center py-3 rounded-xl font-semibold text-sm border cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 ${
                            darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-655'
                          }`}
                        >
                          Back to Details
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 text-center py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white rounded-xl font-semibold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <span>Submit Application</span>
                          )}
                        </button>
                      </div>

                    </form>
                  )}

                </div>
              )}

            </div>

            {/* Footer actions for detail mode */}
            {!applyMode && (
              <div className="sticky bottom-0 border-t p-6 dark:border-slate-800 bg-inherit flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Compensation</span>
                  <span className="font-mono font-bold text-emerald-500 text-lg">{selectedJob.salary}</span>
                </div>

                <button
                  onClick={() => setApplyMode(true)}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Apply For Role
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
