import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);

        // Run GSAP outro timeline
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              onComplete();
            },
          });

          tl.to(textRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: 'power3.in',
          })
            .to(
              containerRef.current,
              {
                yPercent: -100,
                duration: 0.9,
                ease: 'power4.inOut',
              },
              '-=0.1'
            );
        }, containerRef);

        return () => ctx.revert();
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-[#030303] text-white select-none pointer-events-auto"
    >
      {/* Top Tagline */}
      <div className="flex items-center justify-between text-[11px] font-mono-code uppercase tracking-[0.25em] text-neutral-500">
        <span>PYCRAFTERS STUDIO</span>
        <span>INITIALIZING INTELLIGENCE</span>
      </div>

      {/* Center Wordmark + Counter */}
      <div ref={textRef} className="max-w-4xl mx-auto w-full text-center">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight uppercase text-white mb-6">
          PYCRAFTERS<span className="text-[#FF5500]">.</span>
        </h1>
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 mx-auto relative overflow-hidden rounded-full">
          <div
            ref={lineRef}
            className="h-full bg-[#FF5500] shadow-[0_0_12px_#FF5500] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Counter */}
      <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400">
        <span className="tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
          AUTONOMOUS COMPUTATION
        </span>
        <span ref={counterRef} className="text-[#FF5500] font-semibold text-sm">
          {progress.toString().padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
