import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Users, 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign, 
  Trash2, 
  ArrowRight, 
  ExternalLink, 
  Mail, 
  FileText, 
  Calendar, 
  X, 
  Check, 
  AlertCircle, 
  Loader2,
  Trash
} from 'lucide-react';

export default function AdminPage({ darkMode }) {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State for new job
  const [showAddModal, setShowAddModal] = useState(false);
  const [submittingJob, setSubmittingJob] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '',
    description: '',
    responsibilities: [''],
    requirements: ['']
  });

  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch both jobs and applications
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/jobs`).then(res => res.json()),
        fetch(`${BACKEND_URL}/api/applications`).then(res => res.json())
      ]);

      if (jobsRes.success) {
        setJobs(jobsRes.data);
      } else {
        throw new Error(jobsRes.message || 'Failed to load jobs');
      }

      if (appsRes.success) {
        setApplications(appsRes.data);
      } else {
        throw new Error(appsRes.message || 'Failed to load applications');
      }
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
      setError('Could not connect to the backend server. Make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddResponsibility = () => {
    setNewJob(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, '']
    }));
  };

  const handleRemoveResponsibility = (index) => {
    setNewJob(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const handleRespChange = (index, value) => {
    const updated = [...newJob.responsibilities];
    updated[index] = value;
    setNewJob(prev => ({ ...prev, responsibilities: updated }));
  };

  const handleAddRequirement = () => {
    setNewJob(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const handleRemoveRequirement = (index) => {
    setNewJob(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleReqChange = (index, value) => {
    const updated = [...newJob.requirements];
    updated[index] = value;
    setNewJob(prev => ({ ...prev, requirements: updated }));
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setSubmittingJob(true);
    try {
      // Filter out empty lines from arrays
      const filteredResponsibilities = newJob.responsibilities.filter(r => r.trim() !== '');
      const filteredRequirements = newJob.requirements.filter(r => r.trim() !== '');

      const payload = {
        ...newJob,
        responsibilities: filteredResponsibilities,
        requirements: filteredRequirements
      };

      const response = await fetch(`${BACKEND_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Failed to create job posting');
      }

      // Add to list and close modal
      setJobs(prev => [resData.data, ...prev]);
      setShowAddModal(false);
      // Reset form
      setNewJob({
        title: '',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        salary: '',
        description: '',
        responsibilities: [''],
        requirements: ['']
      });
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setSubmittingJob(false);
    }
  };

  return (
    <div className="pt-28 pb-20 relative overflow-hidden text-left">
      {/* Visual Background Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 font-display font-semibold text-xs tracking-wider uppercase mb-4">
              Internal Operations Portal
            </div>
            <h1 className={`font-display font-black text-3xl md:text-5xl tracking-tight leading-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Careers Admin Dashboard
            </h1>
            <p className={`text-sm font-light mt-2 max-w-xl ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Configure new job openings, manage applications, and review candidate portfolios in real-time.
            </p>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-center px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-sm shadow-lg shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </button>
        </div>

        {/* Connection Error Banner */}
        {error && (
          <div className="mb-8 p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-500 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1 text-left">
              <strong>Connection Error:</strong> {error}
            </div>
            <button 
              onClick={fetchData}
              className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer"
            >
              Retry Sync
            </button>
          </div>
        )}

        {/* Tab Selection Row */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 font-display font-bold text-sm tracking-wide uppercase transition-colors relative cursor-pointer ${
              activeTab === 'jobs'
                ? 'text-indigo-500'
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-655 hover:text-slate-950'
            }`}
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Postings ({jobs.length})
            </span>
            {activeTab === 'jobs' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 font-display font-bold text-sm tracking-wide uppercase transition-colors relative cursor-pointer ${
              activeTab === 'applications'
                ? 'text-indigo-500'
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-655 hover:text-slate-950'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Candidate Applications ({applications.length})
            </span>
            {activeTab === 'applications' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500" />
            )}
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-400 font-light">Synchronizing ledger cache...</p>
          </div>
        )}

        {/* Jobs Tab Content */}
        {!loading && activeTab === 'jobs' && (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-16 border border-dashed rounded-3xl dark:border-slate-800">
                <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold">No Job Openings</h3>
                <p className="text-xs text-slate-400 mt-1">Click "Post New Job" to populate the active listings.</p>
              </div>
            ) : (
              jobs.map(job => (
                <div 
                  key={job.id}
                  className={`rounded-3xl border p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md ${
                    darkMode ? 'glass-card-dark border-slate-850' : 'glass-card-light border-slate-200 bg-white'
                  }`}
                >
                  <div className="text-left flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-500">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {job.location}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {job.type}
                      </span>
                    </div>

                    <h3 className={`font-display font-black text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {job.title}
                    </h3>
                    <p className={`text-xs mt-1 leading-relaxed max-w-2xl line-clamp-2 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {job.description}
                    </p>

                    <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-emerald-500 font-mono">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  {/* Actions (Future delete or edit) */}
                  <div className="flex items-center gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-slate-200 dark:border-slate-800">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-lg border ${
                      darkMode ? 'border-slate-800 text-slate-450' : 'border-slate-200 text-slate-500'
                    }`}>
                      ID: {job.id}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Applications Tab Content */}
        {!loading && activeTab === 'applications' && (
          <div className="space-y-6">
            {applications.length === 0 ? (
              <div className="text-center py-16 border border-dashed rounded-3xl dark:border-slate-800">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold">No Candidate Submissions</h3>
                <p className="text-xs text-slate-400 mt-1">Applications submitted on the Careers page will appear here immediately.</p>
              </div>
            ) : (
              applications.map(app => (
                <div 
                  key={app.id}
                  className={`rounded-3xl border p-6 md:p-8 text-left shadow-lg flex flex-col gap-5 ${
                    darkMode ? 'glass-card-dark border-slate-850' : 'glass-card-light border-slate-200 bg-white'
                  }`}
                >
                  {/* Top line summary */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b dark:border-slate-800/80 pb-4">
                    <div>
                      <h3 className={`font-display font-black text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {app.fullName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <Mail className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{app.email}</span>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">Position Applied For</span>
                      <strong className="font-display text-sm text-indigo-500">{app.jobTitle}</strong>
                      <span className="block text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">
                        {app.jobDepartment} &bull; {app.jobLocation}
                      </span>
                    </div>
                  </div>

                  {/* Body elements */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    {/* Date and Resume */}
                    <div className="space-y-4">
                      <div>
                        <span className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                          Submission Date
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-655 dark:text-slate-350">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          <span>{new Date(app.createdAt).toLocaleDateString()} at {new Date(app.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                          Resume Profile
                        </span>
                        <a 
                          href={`${BACKEND_URL}${app.resumeUrl}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 hover:bg-indigo-500/10 transition-colors text-xs font-semibold cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Portfolio Resume
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Cover Letter Column */}
                    <div className="md:col-span-2 text-xs">
                      <span className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                        Candidate Cover Letter
                      </span>
                      <p className={`p-4 rounded-2xl border leading-relaxed font-light ${
                        darkMode ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-655'
                      }`}>
                        {app.coverLetter || 'No cover letter was submitted by the candidate.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer" />

          {/* Dialog */}
          <div className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 md:p-8 animate-float text-left ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-4 mb-6">
              <h2 className="font-display font-black text-xl md:text-2xl">Create New Job Posting</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className={`p-2 rounded-xl border hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                  darkMode ? 'border-slate-850 bg-slate-950 text-slate-400 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-450">Role Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Senior Backend Engineer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    className={`text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-450">Department *</label>
                  <select
                    value={newJob.department}
                    onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                    className={`text-sm px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Security">Security</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-450">Location Type *</label>
                  <select
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    className={`text-sm px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-450">Salary Compensation *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. $140k - $175k"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                    className={`text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-450">Description *</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Provide a summary of the role, team context, and key goals..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  className={`text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 resize-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              {/* Responsibilities list */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-455">Core Responsibilities</label>
                  <button 
                    type="button" 
                    onClick={handleAddResponsibility}
                    className="text-xs text-indigo-500 hover:text-indigo-400 font-semibold cursor-pointer"
                  >
                    + Add Bullet
                  </button>
                </div>
                
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {newJob.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="text"
                        placeholder={`Bullet ${idx + 1}`}
                        value={resp}
                        onChange={(e) => handleRespChange(idx, e.target.value)}
                        className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                      {newJob.responsibilities.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveResponsibility(idx)}
                          className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements list */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-455">Skills & Requirements</label>
                  <button 
                    type="button" 
                    onClick={handleAddRequirement}
                    className="text-xs text-indigo-500 hover:text-indigo-400 font-semibold cursor-pointer"
                  >
                    + Add Bullet
                  </button>
                </div>

                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {newJob.requirements.map((req, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="text"
                        placeholder={`Bullet ${idx + 1}`}
                        value={req}
                        onChange={(e) => handleReqChange(idx, e.target.value)}
                        className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                      {newJob.requirements.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveRequirement(idx)}
                          className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submittingJob}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:bg-indigo-600/60"
              >
                {submittingJob ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Opening...</span>
                  </>
                ) : (
                  <span>Publish Job Posting</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
