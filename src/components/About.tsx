import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      if (detailsRef.current) {
        gsap.fromTo(
          detailsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 md:px-12 bg-[#030303] text-white border-t border-white/[0.08] overflow-hidden"
    >
      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none grain-overlay opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Kicker */}
        <div className="mb-12 flex items-center justify-between text-[11px] font-mono-code uppercase tracking-[0.25em] text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
            ABOUT PYCRAFTERS
          </span>
          <span className="text-[#FF5500]">03 / IDENTITY & CRAFT</span>
        </div>

        {/* Minimal Large Text Quote */}
        <blockquote
          ref={quoteRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2] text-white mb-20 md:mb-32 tracking-tight"
        >
          <span className="text-[#FF5500] font-light">“</span>
          Pycrafters creates intelligent digital experiences by combining{' '}
          <span className="text-white font-semibold underline decoration-[#FF5500] decoration-2 underline-offset-8">
            software
          </span>
          ,{' '}
          <span className="text-white font-semibold underline decoration-[#FF5500] decoration-2 underline-offset-8">
            automation
          </span>{' '}
          and{' '}
          <span className="text-white font-semibold underline decoration-[#FF5500] decoration-2 underline-offset-8">
            AI
          </span>
          .
          <span className="text-[#FF5500] font-light">”</span>
        </blockquote>

        {/* Spacious Editorial Columns */}
        <div
          ref={detailsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-12 border-t border-white/[0.08]"
        >
          {/* Pillar 1 */}
          <div className="space-y-3">
            <span className="text-xs font-mono-code text-[#FF5500] tracking-wider font-semibold">
              01 — AUTONOMY FIRST
            </span>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Systems, Not Silos
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              We design tools that run autonomously in production. From self-reconciling
              databases to multi-agent pipelines that handle high-stakes customer workflows
              with deterministic precision.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-3">
            <span className="text-xs font-mono-code text-[#FF5500] tracking-wider font-semibold">
              02 — BESPOKE CODEBASE
            </span>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Zero Generic Slop
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              No cookie-cutter templates or brittle no-code stacks. Every Pycrafters
              deployment is engineered with clean TypeScript, hardened APIs, and production
              infrastructure you truly own.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-3">
            <span className="text-xs font-mono-code text-[#FF5500] tracking-wider font-semibold">
              03 — CINEMATIC EXECUTION
            </span>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Art Meets Precision
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              High-end visual refinement is never an afterthought. We bridge the gap between
              computational intelligence and award-worthy digital aesthetics that command market
              authority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
