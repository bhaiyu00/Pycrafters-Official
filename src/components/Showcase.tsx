import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Cpu, GitBranch, ShieldCheck, Activity } from 'lucide-react';
import showcaseImg from '../assets/images/pycrafters_showcase_system_1790795931532.jpg';
import { playMicroClick, playHoverBlip } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface Hotspot {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: typeof Cpu;
  top: string;
  left: string;
}

const SYSTEM_NODES: Hotspot[] = [
  {
    id: 'ingest',
    number: '01',
    title: 'Multi-Modal Data Ingestion',
    description:
      'Continuous stream parsing from WhatsApp, webhooks, REST APIs, and enterprise databases into unified vector memory.',
    icon: GitBranch,
    top: '28%',
    left: '20%',
  },
  {
    id: 'reasoning',
    number: '02',
    title: 'Autonomous Agentic Reasoning',
    description:
      'Fine-tuned LLM reasoning loops with strict business invariants, safety filters, and context retrieval.',
    icon: Cpu,
    top: '42%',
    left: '52%',
  },
  {
    id: 'dispatch',
    number: '03',
    title: 'Real-Time Action Dispatcher',
    description:
      'Automated transaction execution, booking triggers, and CRM status updates with zero human intervention.',
    icon: Sparkles,
    top: '68%',
    left: '32%',
  },
  {
    id: 'telemetry',
    number: '04',
    title: 'Self-Optimizing Telemetry',
    description:
      'Continuous feedback analytics, latency profiling, and self-improving prompt calibration.',
    icon: ShieldCheck,
    top: '74%',
    left: '75%',
  },
];

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeNode, setActiveNode] = useState<Hotspot>(SYSTEM_NODES[1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax & scale effect on the showcase image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.15, y: -40 },
          {
            scale: 1.0,
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Heading reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
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
      id="work"
      ref={containerRef}
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#030303] text-white overflow-hidden border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-2 text-[11px] font-mono-code uppercase tracking-[0.25em] text-neutral-400 mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF5500] rounded-full shadow-[0_0_8px_#FF5500] animate-pulse" />
            <span>SYSTEM SHOWCASE / PRODUCTION ARCHITECTURE</span>
          </div>

          <h2
            ref={headlineRef}
            className="font-display text-[40px] sm:text-[60px] md:text-[80px] lg:text-[96px] font-extrabold tracking-[-0.03em] leading-[0.95] uppercase"
          >
            <span className="block text-white">FROM IDEA</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF7733] to-[#FF5500]">
              TO INTELLIGENT SYSTEM.
            </span>
          </h2>
        </div>

        {/* Large Cinematic Visual Box */}
        <div
          ref={imageWrapperRef}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 aspect-[16/10] md:aspect-[16/8] shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
        >
          {/* Main Parallax Image */}
          <img
            ref={imageRef}
            src={showcaseImg}
            alt="Pycrafters Intelligent System Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-95 contrast-105"
          />

          {/* Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/90 via-[#030303]/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/60 via-transparent to-[#030303]/60 pointer-events-none" />

          {/* Interactive Telemetry Hotspots */}
          {SYSTEM_NODES.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => {
                  playMicroClick(1500);
                  setActiveNode(node);
                }}
                onMouseEnter={playHoverBlip}
                data-cursor="NODE"
                style={{ top: node.top, left: node.left }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 focus-visible:outline-none"
                aria-label={`View system node ${node.title}`}
              >
                <div className="relative flex items-center justify-center">
                  {/* Radar pulse ping */}
                  <span
                    className={`absolute -inset-2.5 rounded-full border border-[#FF5500] transition-all duration-700 ${
                      isSelected ? 'animate-ping opacity-80' : 'opacity-0 group-hover:opacity-40'
                    }`}
                  />
                  {/* Center Dot Button */}
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#FF5500] text-white scale-110 shadow-[0_0_25px_#FF5500]'
                        : 'bg-black/80 backdrop-blur-md text-white border border-white/30 hover:border-[#FF5500]'
                    }`}
                  >
                    <node.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  {/* Floating Label */}
                  <span
                    className={`hidden md:block absolute left-full ml-3 px-2.5 py-1 rounded bg-black/90 backdrop-blur-md border border-white/15 text-[10px] font-mono-code whitespace-nowrap tracking-wider text-white transition-opacity ${
                      isSelected ? 'opacity-100 border-[#FF5500]/50' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <span className="text-[#FF5500] font-semibold">{node.number}</span> · {node.title}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Bottom Live System Node Card Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-20">
            <div className="bg-[#0a0a0a]/92 backdrop-blur-xl border border-white/15 rounded-xl md:rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FF5500]/15 border border-[#FF5500]/30 flex items-center justify-center shrink-0 text-[#FF5500]">
                  <activeNode.icon className="w-5 h-5 text-[#FF5500]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-code text-[#FF5500] font-semibold">
                      NODE {activeNode.number}
                    </span>
                    <span className="text-neutral-600">/</span>
                    <span className="text-xs uppercase tracking-wider text-white font-semibold">
                      {activeNode.title}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-300 mt-1 max-w-2xl font-light">
                    {activeNode.description}
                  </p>
                </div>
              </div>

              {/* Node selector buttons for mobile / quick navigation */}
              <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.08]">
                {SYSTEM_NODES.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      playMicroClick(1300);
                      setActiveNode(node);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all ${
                      activeNode.id === node.id
                        ? 'bg-[#FF5500] text-white font-semibold shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                        : 'bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {node.number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quantified System Invariants Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-white/[0.08]">
          <div>
            <span className="block text-2xl md:text-4xl font-bold font-mono-code text-white">
              0.02ms
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              Vector retrieval indexing latency
            </span>
          </div>
          <div>
            <span className="block text-2xl md:text-4xl font-bold font-mono-code text-[#FF5500]">
              99.98%
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              Autonomous execution SLA
            </span>
          </div>
          <div>
            <span className="block text-2xl md:text-4xl font-bold font-mono-code text-white">
              Zero
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              Manual repetitive workflow overhead
            </span>
          </div>
          <div>
            <span className="block text-2xl md:text-4xl font-bold font-mono-code text-[#FF5500]">
              100%
            </span>
            <span className="text-xs text-neutral-400 mt-1 block">
              Proprietary codebase ownership
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
