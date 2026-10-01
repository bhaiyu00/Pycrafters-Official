import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { playMicroClick, playHoverBlip } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onStartConversation: () => void;
}

export default function FinalCTA({ onStartConversation }: FinalCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll('.cta-line');
        gsap.fromTo(
          lines,
          { opacity: 0, y: 70, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.2,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, containerRef);

    // Magnetic effect on CTA button
    const btn = btnRef.current;
    if (btn) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
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
      id="contact"
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between py-24 md:py-36 px-6 md:px-12 bg-[#030303] text-white border-t border-white/[0.08] overflow-hidden"
    >
      {/* Dramatic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[500px] md:h-[700px] bg-[#FF5500]/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Top kicker */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono-code uppercase tracking-[0.25em] text-neutral-400">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500] animate-pulse" />
          04 / COMMENCE
        </span>
        <span className="text-[#FF5500]">GLOBAL INTAKE OPEN</span>
      </div>

      {/* Center Dramatic Heading & CTA */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12">
        <h2
          ref={headingRef}
          className="font-display text-[48px] sm:text-[70px] md:text-[96px] lg:text-[120px] font-extrabold tracking-[-0.04em] leading-[0.92] text-white uppercase select-none"
        >
          <span className="block overflow-hidden">
            <span className="cta-line block text-white">LET'S BUILD</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cta-line block text-white">SOMETHING</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cta-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF7733] to-[#FF5500]">
              INTELLIGENT.
            </span>
          </span>
        </h2>

        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <button
            ref={btnRef}
            onClick={() => {
              playMicroClick(1700);
              onStartConversation();
            }}
            onMouseEnter={playHoverBlip}
            data-cursor="CONNECT"
            className="group relative inline-flex items-center gap-4 px-8 md:px-10 py-5 rounded-full bg-[#FF5500] hover:bg-[#FF661A] text-white font-semibold text-base md:text-lg tracking-wide transition-all duration-300 shadow-[0_0_40px_rgba(255,85,0,0.4)] hover:shadow-[0_0_65px_rgba(255,85,0,0.65)] active:scale-95 whitespace-nowrap"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          <span className="text-xs md:text-sm text-neutral-300 font-mono-code flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
            Typical turnaround: initial architectural proposal in 48 hours
          </span>
        </div>
      </div>

      {/* Direct contact shortcut */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.08] text-xs font-mono-code text-neutral-400">
        <div>
          <span>DIRECT INQUIRIES: </span>
          <a
            href="mailto:contact@pycrafters.com"
            onClick={() => playMicroClick()}
            className="text-white hover:text-[#FF5500] hover:underline transition-colors"
          >
            contact@pycrafters.com
          </a>
        </div>
        <div>
          <span>LOCATION: </span>
          <span className="text-neutral-300">DISTRIBUTED STUDIO · WORLDWIDE</span>
        </div>
      </div>
    </section>
  );
}
