import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { playMicroClick, playHoverBlip, toggleAudioMute, getAudioMuteState } from '../utils/audio';

interface NavbarProps {
  onOpenInquiry: (initialService?: string) => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(getAudioMuteState());

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = toggleAudioMute();
    setIsMuted(muted);
    if (!muted) {
      playMicroClick(1400);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    playMicroClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#030303]/85 backdrop-blur-md border-b border-white/[0.08] py-4'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              playMicroClick();
            }}
            onMouseEnter={playHoverBlip}
            data-cursor="TOP"
            className="group flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5500]"
          >
            <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-white transition-opacity group-hover:opacity-90">
              PYCRAFTERS
            </span>
            <span className="text-[11px] font-sans font-semibold tracking-widest text-[#FF5500]">
              ™
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <a
              href="#work"
              onClick={(e) => handleNavClick(e, 'work')}
              onMouseEnter={playHoverBlip}
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-200 relative group"
            >
              <span>Work</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#FF5500] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              onMouseEnter={playHoverBlip}
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-200 relative group"
            >
              <span>Services</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#FF5500] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              onMouseEnter={playHoverBlip}
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-200 relative group"
            >
              <span>About</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#FF5500] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              onMouseEnter={playHoverBlip}
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-200 relative group"
            >
              <span>Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#FF5500] transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Zone 3: Actions (Sound + Primary CTA) */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Subtle Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Unmute atmospheric audio' : 'Mute atmospheric audio'}
              aria-label={isMuted ? 'Unmute atmospheric audio' : 'Mute atmospheric audio'}
              className="p-2 text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 opacity-50" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#FF5500] animate-pulse" />
              )}
            </button>

            {/* CTA: Let's Talk → in vibrant Orange & White */}
            <button
              onClick={() => {
                playMicroClick(1500);
                onOpenInquiry();
              }}
              onMouseEnter={playHoverBlip}
              data-cursor="TALK"
              className="group relative inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs font-semibold tracking-wider text-white bg-[#FF5500] hover:bg-[#FF661A] transition-all duration-300 shadow-[0_0_25px_rgba(255,85,0,0.35)] hover:shadow-[0_0_35px_rgba(255,85,0,0.6)] active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => {
                playMicroClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-neutral-400 hover:text-white"
            >
              <div className="w-5 flex flex-col items-end gap-1.5">
                <span
                  className={`h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'
                  }`}
                />
                <span
                  className={`h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'w-3.5'
                  }`}
                />
                <span
                  className={`h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#030303]/98 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col justify-between px-8 py-24 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-6 pt-8">
          <span className="text-[11px] font-mono-code text-neutral-500 uppercase tracking-widest">
            NAVIGATION
          </span>
          <a
            href="#work"
            onClick={(e) => handleNavClick(e, 'work')}
            className="font-display text-3xl font-bold text-white hover:text-neutral-400 transition-colors"
          >
            Work
          </a>
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, 'services')}
            className="font-display text-3xl font-bold text-white hover:text-neutral-400 transition-colors"
          >
            Services
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className="font-display text-3xl font-bold text-white hover:text-neutral-400 transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="font-display text-3xl font-bold text-white hover:text-neutral-400 transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="border-t border-white/[0.08] pt-6 flex flex-col gap-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              playMicroClick(1500);
              onOpenInquiry();
            }}
            className="w-full py-3.5 bg-[#FF5500] hover:bg-[#FF661A] text-white font-semibold text-sm rounded-full flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,85,0,0.35)] transition-colors"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-neutral-500 font-mono-code">
            AI AUTOMATION · SOFTWARE · DIGITAL SYSTEMS
          </p>
        </div>
      </div>
    </>
  );
}
