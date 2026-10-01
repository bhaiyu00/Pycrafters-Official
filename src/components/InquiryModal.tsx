import React, { useState, useEffect } from 'react';
import { CheckCircle2, Send, X, Sparkles, ArrowRight } from 'lucide-react';
import { playMicroClick } from '../utils/audio';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const SERVICES_OPTIONS = [
  'AI Automation',
  'WhatsApp AI Agents',
  'Web Experiences',
  'Custom Digital Systems',
];

const TIMELINES = ['Immediately (< 1 month)', '1–3 Months', '3–6 Months', 'Exploring'];

export default function InquiryModal({
  isOpen,
  onClose,
  preselectedService,
}: InquiryModalProps) {
  const [selectedService, setSelectedService] = useState<string>(SERVICES_OPTIONS[0]);
  const [timeline, setTimeline] = useState<string>(TIMELINES[1]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  useEffect(() => {
    if (preselectedService) {
      const match = SERVICES_OPTIONS.find((s) =>
        preselectedService.toLowerCase().includes(s.toLowerCase())
      );
      if (match) setSelectedService(match);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }

    if (!message.trim()) {
      setError('Please share a brief summary of the system you want to build.');
      return;
    }

    playMicroClick(1500);
    setIsSubmitting(true);

    const randomCode = `PYC-${Math.floor(100000 + Math.random() * 900000)}`;

    // Save lead persistently to localStorage so Nishant receives all submissions
    const newLead = {
      id: Date.now().toString(),
      code: randomCode,
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      service: selectedService,
      timeline,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = localStorage.getItem('pycrafters_leads');
      const leadsList = existing ? JSON.parse(existing) : [];
      leadsList.unshift(newLead);
      localStorage.setItem('pycrafters_leads', JSON.stringify(leadsList));
    } catch {
      // Fallback
    }

    // Simulate architecture dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setConfirmationCode(randomCode);
      playMicroClick(1800);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setError('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#090909] border border-white/15 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playMicroClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[11px] font-mono-code uppercase tracking-[0.2em] text-neutral-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500] animate-pulse" />
                <span>INTAKE PROTOCOL · PYCRAFTERS</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
                INITIATE A SYSTEM<span className="text-[#FF5500]">.</span>
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm font-light mt-1">
                Tell us what you want to automate or build. Our systems team will review feasibility
                and deliver an initial technical architecture within 48 hours.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-950/60 border border-red-800/60 text-xs text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono-code uppercase text-neutral-400 mb-2 tracking-wider">
                  Target System Discipline
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES_OPTIONS.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        playMicroClick();
                        setSelectedService(service);
                      }}
                      className={`py-2.5 px-3 rounded-lg text-xs font-medium border text-left transition-all truncate ${
                        selectedService === service
                          ? 'bg-[#FF5500] text-white border-[#FF5500] font-semibold shadow-[0_0_15px_rgba(255,85,0,0.35)]'
                          : 'bg-white/[0.03] text-neutral-300 border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="client-name"
                    className="block text-xs font-mono-code uppercase text-neutral-400 mb-1.5 tracking-wider"
                  >
                    Your Name *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Vance"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF5500] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="client-email"
                    className="block text-xs font-mono-code uppercase text-neutral-400 mb-1.5 tracking-wider"
                  >
                    Work Email *
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@enterprise.com"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF5500] transition-colors"
                  />
                </div>
              </div>

              {/* Company & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="client-company"
                    className="block text-xs font-mono-code uppercase text-neutral-400 mb-1.5 tracking-wider"
                  >
                    Company / Organization
                  </label>
                  <input
                    id="client-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Dynamics Ltd"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF5500] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-code uppercase text-neutral-400 mb-1.5 tracking-wider">
                    Expected Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#121212] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5500] transition-colors"
                  >
                    {TIMELINES.map((t) => (
                      <option key={t} value={t} className="bg-[#121212] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message / System Goals */}
              <div>
                <label
                  htmlFor="client-message"
                  className="block text-xs font-mono-code uppercase text-neutral-400 mb-1.5 tracking-wider"
                >
                  System Scope & Objective *
                </label>
                <textarea
                  id="client-message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline current bottleneck, tools to connect, or desired AI capability..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF5500] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#FF5500] hover:bg-[#FF661A] text-white font-semibold text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(255,85,0,0.35)] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Transmitting Specs...
                  </span>
                ) : (
                  <>
                    <span>Submit Architectural Request</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FF5500]/20 border border-[#FF5500]/40 mx-auto flex items-center justify-center text-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-[#FF5500]" />
            </div>

            <div>
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#FF5500] font-semibold">
                DISPATCH VERIFIED · CODE {confirmationCode}
              </span>
              <h3 className="font-display text-3xl font-bold text-white mt-2">
                PROJECT INTAKE RECEIVED
              </h3>
              <p className="text-sm text-neutral-300 font-light mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{name}</span>. Our lead
                architects are reviewing the specifications for{' '}
                <span className="text-[#FF5500] font-medium">{selectedService}</span>. A technical
                synthesis and consultation booking link has been dispatched to{' '}
                <span className="text-white font-mono-code">{email}</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] max-w-md mx-auto text-left space-y-2 text-xs font-mono-code text-neutral-400">
              <div className="flex justify-between">
                <span>SYSTEM TARGET:</span>
                <span className="text-white">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span>ESTIMATED TIMELINE:</span>
                <span className="text-white">{timeline}</span>
              </div>
              <div className="flex justify-between">
                <span>INITIAL SLA:</span>
                <span className="text-[#FF5500] font-semibold">&lt; 48 hours</span>
              </div>
            </div>

            {/* Instant Direct Dispatch Action options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `*Pycrafters System Inquiry (${confirmationCode})*\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nService: ${selectedService}\nTimeline: ${timeline}\n\nProject Scope:\n${message}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMicroClick(1400)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-white font-semibold text-xs tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
              >
                <span>Send to WhatsApp</span>
              </a>

              <a
                href={`mailto:nishantbarman04k@gmail.com?subject=${encodeURIComponent(
                  `New Pycrafters Lead [${confirmationCode}]: ${selectedService}`
                )}&body=${encodeURIComponent(
                  `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nService: ${selectedService}\nTimeline: ${timeline}\n\nProject Details:\n${message}`
                )}`}
                onClick={() => playMicroClick(1400)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider inline-flex items-center justify-center gap-2 transition-colors border border-white/15"
              >
                <span>Send to Email</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#FF661A] text-white font-semibold text-xs tracking-wider inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-colors"
              >
                <span>Done</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
