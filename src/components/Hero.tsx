import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { playMicroClick, playHoverBlip } from '../utils/audio';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export default function Hero({ onStartProject, onExploreWork }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  // Magnetic button refs
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate kicker
      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      );

      // Animate headline lines
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.hero-line');
        tl.fromTo(
          lines,
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.2, stagger: 0.12 },
          '-=0.7'
        );
      }

      // Animate subtext
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.6'
      );

      // Animate actions
      tl.fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

      // Animate indicators
      tl.fromTo(
        indicatorsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.4'
      );
    }, containerRef);

    // Magnetic effect for primary CTA
    const btn = primaryBtnRef.current;
    if (btn) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 md:pt-36 md:pb-16 px-6 md:px-12 overflow-hidden bg-[#030303]"
    >
      {/* Interactive canvas behind typography */}
      <HeroCanvas />

      {/* Atmospheric center depth lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-radial from-[#FF5500]/[0.08] via-transparent to-transparent pointer-events-none blur-3xl" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center">
        {/* Kicker */}
        <div ref={kickerRef} className="mb-6 md:mb-8 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_10px_#FF5500] animate-pulse" />
          <p className="text-[11px] md:text-xs font-mono-code uppercase tracking-[0.28em] text-neutral-300">
            <span className="text-white">AI AUTOMATION</span> / <span className="text-white">SOFTWARE</span> / <span className="text-[#FF5500]">DIGITAL SYSTEMS</span>
          </p>
        </div>

        {/* Huge Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[48px] sm:text-[68px] md:text-[92px] lg:text-[110px] xl:text-[124px] font-extrabold tracking-[-0.04em] leading-[0.92] text-white uppercase"
        >
          <span className="block overflow-hidden">
            <span className="hero-line block text-white">BUILDING</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-white">THE DIGITAL</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-white/95">SYSTEMS OF</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF7733] to-[#FFAA80]">
              TOMORROW.
            </span>
          </span>
        </h1>

        {/* Supporting Text & CTAs */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
          <p
            ref={subtextRef}
            className="md:col-span-7 lg:col-span-6 text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-xl"
          >
            We build intelligent automation, AI agents and digital experiences that
            help businesses work smarter.
          </p>

          <div
            ref={actionsRef}
            className="md:col-span-5 lg:col-span-6 flex flex-wrap items-center gap-4 md:justify-end"
          >
            {/* Primary Button */}
            <button
              ref={primaryBtnRef}
              onClick={() => {
                playMicroClick(1600);
                onStartProject();
              }}
              onMouseEnter={playHoverBlip}
              data-cursor="PROJECT"
              className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#FF5500] text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(255,85,0,0.35)] hover:shadow-[0_0_50px_rgba(255,85,0,0.6)] hover:bg-[#FF661A] active:scale-95 whitespace-nowrap"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary Button */}
            <button
              ref={secondaryBtnRef}
              onClick={() => {
                playMicroClick(900);
                onExploreWork();
              }}
              onMouseEnter={playHoverBlip}
              data-cursor="EXPLORE"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide hover:bg-white/[0.06] hover:border-[#FF5500] hover:text-[#FF5500] transition-all duration-300 active:scale-95 whitespace-nowrap"
            >
              <span>Explore Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom status bar / scroll prompt */}
      <div
        ref={indicatorsRef}
        className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/[0.08] text-[11px] font-mono-code text-neutral-400"
      >
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-white">PYCRAFTERS STUDIO</span>
          <span className="hidden sm:inline text-neutral-700">·</span>
          <span>EST. 2026</span>
          <span className="text-neutral-700">·</span>
          <span className="text-[#FF5500] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            DEPLOYING AUTONOMY
          </span>
        </div>

        <button
          onClick={onExploreWork}
          onMouseEnter={playHoverBlip}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="uppercase tracking-widest text-[10px]">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-[#FF5500] animate-bounce" />
        </button>
      </div>
    </section>
  );
}
