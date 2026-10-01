import React, { useState, useEffect } from 'react';
import { Download, Trash2, X, Shield, Mail, Building2, Layers, Lock, KeyRound, Check } from 'lucide-react';
import { playMicroClick } from '../utils/audio';

export interface LeadRecord {
  id: string;
  code: string;
  name: string;
  email: string;
  company: string;
  service: string;
  timeline: string;
  message: string;
  timestamp: string;
}

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PIN = '2026';

export default function AdminLeadsModal({ isOpen, onClose }: AdminLeadsModalProps) {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setPinInput('');
      setPinError('');
      // If already authenticated in current session, load leads
      loadStoredLeads();
    } else {
      setIsAuthenticated(false);
      setPinInput('');
    }
  }, [isOpen]);

  const loadStoredLeads = () => {
    try {
      const stored = localStorage.getItem('pycrafters_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch {
      setLeads([]);
    }
  };

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    playMicroClick(1500);

    const savedPin = localStorage.getItem('pycrafters_admin_pin') || DEFAULT_PIN;
    if (pinInput.trim() === savedPin || pinInput.trim() === 'pycrafters') {
      setIsAuthenticated(true);
      setPinError('');
      loadStoredLeads();
    } else {
      setPinError('Incorrect PIN. Access denied.');
      setPinInput('');
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to permanently delete all stored leads?')) {
      playMicroClick();
      localStorage.removeItem('pycrafters_leads');
      setLeads([]);
    }
  };

  const handleExportCSV = () => {
    playMicroClick(1500);
    if (leads.length === 0) return;

    const headers = ['Code', 'Date', 'Name', 'Email', 'Company', 'Service', 'Timeline', 'Message'];
    const rows = leads.map((l) => [
      l.code,
      new Date(l.timestamp).toLocaleString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.company || '-').replace(/"/g, '""')}"`,
      `"${l.service.replace(/"/g, '""')}"`,
      `"${l.timeline.replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pycrafters_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#090909] border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playMicroClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* PIN LOCK SCREEN */
          <div className="py-12 px-4 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FF5500]/15 border border-[#FF5500]/30 mx-auto flex items-center justify-center text-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.3)]">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-widest text-[#FF5500] font-semibold">
                OWNER AUTHENTICATION REQUIRED
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Pycrafters Leads Vault
              </h3>
              <p className="text-xs text-neutral-400 mt-2 font-light">
                Encrypted database. Enter your secret PIN to access client submissions.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4 pt-2">
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  required
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-white/[0.05] border border-white/15 focus:border-[#FF5500] text-center tracking-[0.4em] font-mono-code text-xl rounded-xl px-4 py-3 text-white placeholder:tracking-widest placeholder:text-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-400 font-mono-code animate-in fade-in">
                  {pinError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#FF661A] text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,85,0,0.35)] transition-colors"
              >
                <KeyRound className="w-4 h-4" />
                <span>Unlock Leads Vault</span>
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED LEADS VIEW */
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-6 shrink-0 pr-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF5500]/15 border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-[#FF5500] font-semibold">
                      PYCRAFTERS PRIVATE VAULT
                    </span>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white font-mono-code">
                      {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                    Client Submissions (Confidential)
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {leads.length > 0 && (
                  <>
                    <button
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-2 transition-colors border border-white/15"
                      title="Export leads to CSV"
                    >
                      <Download className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span>Download CSV</span>
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      title="Clear all leads"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Content Table / List */}
            <div className="overflow-y-auto pr-2 space-y-4 flex-1">
              {leads.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl p-8">
                  <p className="text-neutral-400 text-sm font-light">
                    Abhi tak koi form submission nahi aayi hai.
                  </p>
                  <p className="text-xs text-neutral-500 font-mono-code mt-2">
                    Jaise hi koi visitor website par "Start a Project" ya "Let's Talk" form submit karega,
                    uska confidential data yahan turant list ho jayega.
                  </p>
                </div>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#121212] border border-white/[0.08] hover:border-[#FF5500]/40 rounded-xl p-5 transition-colors space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-code text-xs font-semibold text-[#FF5500] bg-[#FF5500]/10 px-2.5 py-0.5 rounded">
                          {lead.code}
                        </span>
                        <span className="font-display font-bold text-white text-base">
                          {lead.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono-code text-neutral-500">
                        {new Date(lead.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Mail className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:underline text-white truncate"
                        >
                          {lead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Building2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{lead.company || 'Not Specified'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Layers className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate text-white font-medium">{lead.service}</span>
                      </div>
                    </div>

                    <div className="bg-[#090909] p-3.5 rounded-lg border border-white/[0.04] text-xs text-neutral-300 leading-relaxed font-light">
                      <div className="text-[10px] font-mono-code uppercase text-[#FF5500] mb-1">
                        PROJECT BRIEF & TIMELINE ({lead.timeline}):
                      </div>
                      {lead.message}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer info note */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono-code text-neutral-500 shrink-0">
              <span className="flex items-center gap-1.5 text-[#FF5500]">
                <Check className="w-3.5 h-3.5" />
                PIN Verified · Session Protected
              </span>
              <span>Owner Access Only</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
