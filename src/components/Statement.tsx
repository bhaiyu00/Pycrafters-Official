import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      const whiteWords = textRef.current.querySelectorAll('.statement-word-white');
      const orangeWords = textRef.current.querySelectorAll('.statement-word-orange');

      // Scroll-driven white word scrub
      gsap.fromTo(
        whiteWords,
        {
          color: 'rgba(255, 255, 255, 0.16)',
        },
        {
          color: 'rgba(255, 255, 255, 1)',
          stagger: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 50%',
            scrub: 0.6,
          },
        }
      );

      // Scroll-driven orange word scrub
      gsap.fromTo(
        orangeWords,
        {
          color: 'rgba(255, 85, 0, 0.18)',
        },
        {
          color: '#FF5500',
          stagger: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 0.6,
          },
        }
      );

      // Subtle horizontal hairline expansion with orange glow
      const hairline = containerRef.current?.querySelector('.statement-line');
      if (hairline) {
        gsap.fromTo(
          hairline,
          { scaleX: 0, transformOrigin: 'center center' },
          {
            scaleX: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const line1 = 'WE DON’T JUST BUILD SOFTWARE.'.split(' ');
  const line2 = 'WE BUILD SYSTEMS THAT WORK.'.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-44 px-6 md:px-12 bg-[#030303] overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background radial accent with subtle warm orange */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF5500]/[0.025] blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto">
        {/* Subtle kicker */}
        <div className="mb-10 flex items-center justify-between text-[11px] font-mono-code uppercase tracking-[0.25em] text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
            THE PYCRAFTERS DOCTRINE
          </span>
          <span className="text-[#FF5500]">00 / PHILOSOPHY</span>
        </div>

        {/* Large Editorial Statement */}
        <h2
          ref={textRef}
          className="font-display text-[34px] sm:text-[50px] md:text-[68px] lg:text-[84px] font-extrabold tracking-[-0.03em] leading-[1.05] uppercase select-none"
        >
          <span className="block mb-2 md:mb-4">
            {line1.map((word, index) => (
              <span key={`l1-${index}`} className="statement-word-white inline-block mr-[0.28em] transition-colors">
                {word}
              </span>
            ))}
          </span>
          <span className="block">
            {line2.map((word, index) => (
              <span key={`l2-${index}`} className="statement-word-orange inline-block mr-[0.28em] transition-colors">
                {word}
              </span>
            ))}
          </span>
        </h2>

        {/* Hairline Divider with orange gradient */}
        <div className="statement-line my-12 md:my-16 h-[1px] w-full bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent" />

        {/* Editorial Sub-Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-neutral-400 font-light text-base md:text-lg leading-relaxed">
          <div className="md:col-span-4 text-xs font-mono-code uppercase tracking-wider text-white pt-1 flex items-center gap-2">
            <span className="text-[#FF5500]">01</span> — BEYOND FRAGMENTED APPS
          </div>
          <div className="md:col-span-8 space-y-4">
            <p>
              Most organizations run on fractured SaaS tools, duct-taped automations, and manual data re-entry.
              Pycrafters designs cohesive autonomous systems where software, AI models, and real-time operations
              act as a single synchronized organism.
            </p>
            <p className="text-neutral-400 text-sm md:text-base">
              From WhatsApp AI agents resolving customer queries with zero latency to custom computational
              infrastructure that operates 24/7 without friction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
