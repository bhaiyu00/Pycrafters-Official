import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { playMicroClick, playHoverBlip } from '../utils/audio';

interface FooterProps {
  onOpenAdminVault?: () => void;
}

export default function Footer({ onOpenAdminVault }: FooterProps) {
  const [secretClickCount, setSecretClickCount] = React.useState(0);

  const scrollToTop = () => {
    playMicroClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecretClick = () => {
    const newCount = secretClickCount + 1;
    if (newCount >= 3) {
      setSecretClickCount(0);
      playMicroClick(1800);
      if (onOpenAdminVault) onOpenAdminVault();
    } else {
      setSecretClickCount(newCount);
      setTimeout(() => setSecretClickCount(0), 1200);
    }
  };

  return (
    <footer className="relative bg-[#030303] text-white border-t border-white/[0.08] px-6 md:px-12 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-16">
        {/* Top block */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                PYCRAFTERS
              </span>
              <span className="text-xs font-sans font-bold tracking-widest text-[#FF5500]">
                ™
              </span>
            </div>
            <p className="text-xs font-mono-code uppercase tracking-[0.2em] text-neutral-400">
              <span className="text-white">AI AUTOMATION</span> • <span className="text-white">SOFTWARE</span> • <span className="text-[#FF5500]">DIGITAL SYSTEMS</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <a
              href="https://www.instagram.com/pycrafters?stkn=MWpmOXFxZjhveWhjcQ=="
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMicroClick()}
              onMouseEnter={playHoverBlip}
              data-cursor="LINK"
              className="group flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 hover:text-[#FF5500] transition-colors"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[#FF5500]" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMicroClick()}
              onMouseEnter={playHoverBlip}
              data-cursor="LINK"
              className="group flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 hover:text-[#FF5500] transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[#FF5500]" />
            </a>

            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMicroClick()}
              onMouseEnter={playHoverBlip}
              data-cursor="CHAT"
              className="group flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 hover:text-[#FF5500] transition-colors"
            >
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[#FF5500]" />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.06] text-xs font-mono-code text-neutral-600">
          <p
            onClick={handleSecretClick}
            className="cursor-default select-none transition-colors hover:text-neutral-500"
            title="Pycrafters"
          >
            © 2026 Pycrafters. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>BUILT WITH DISCIPLINE</span>
            <span className="text-neutral-700">·</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={playHoverBlip}
              data-cursor="TOP"
              className="hover:text-white transition-colors"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
