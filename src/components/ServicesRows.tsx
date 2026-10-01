import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { playMicroClick, playHoverBlip } from '../utils/audio';

// Visual assets generated for each service
import imgAutomation from '../assets/images/pycrafters_automation_core_1790795943758.jpg';
import imgWhatsApp from '../assets/images/pycrafters_conversational_ai_1790795955704.jpg';
import imgWebExp from '../assets/images/pycrafters_digital_experience_1790795966869.jpg';
import imgCustomSys from '../assets/images/pycrafters_showcase_system_1790795931532.jpg';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  metric: string;
  metricLabel: string;
  image: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'ai-automation',
    number: '01',
    title: 'AI AUTOMATION',
    category: 'Autonomous Workflows & RPA',
    description:
      'End-to-end intelligent pipelines that eliminate manual operational bottlenecks. Data extraction, decision routing, autonomous reconciliation, and multi-model agent loops.',
    deliverables: [
      'Autonomous CRM & ERP Sync',
      'Intelligent Document & Invoice Parsing',
      'Multi-Agent Decision Pipelines',
      'Event-Driven Webhook Routing',
    ],
    metric: '82%',
    metricLabel: 'Reduction in manual processing time',
    image: imgAutomation,
  },
  {
    id: 'whatsapp-agents',
    number: '02',
    title: 'WHATSAPP AI AGENTS',
    category: 'Conversational Intelligence',
    description:
      'Enterprise-grade WhatsApp bots powered by fine-tuned LLMs. Multilingual, context-aware customer support, automated bookings, catalog inquiries, and live CRM integration.',
    deliverables: [
      'Official Meta Cloud API Architecture',
      'Context Memory & Vector Knowledge Search',
      'Automated Appointment & Lead Qualification',
      'Human-in-the-Loop Seamless Escalation',
    ],
    metric: '<1.2s',
    metricLabel: 'Average first response latency',
    image: imgWhatsApp,
  },
  {
    id: 'web-experiences',
    number: '03',
    title: 'WEB EXPERIENCES',
    category: 'Cinematic Digital Craft',
    description:
      'Immersive, award-worthy web applications and interactive landing platforms. Built with buttery 60fps animations, WebGL shaders, and ultra-high typographic discipline.',
    deliverables: [
      'Full-Stack Next/React Applications',
      'Custom Motion & WebGL Shaders',
      'Conversion-Optimized Architecture',
      'Accessible Headless Performance',
    ],
    metric: '99/100',
    metricLabel: 'Core Web Vitals & performance score',
    image: imgWebExp,
  },
  {
    id: 'custom-digital-systems',
    number: '04',
    title: 'CUSTOM DIGITAL SYSTEMS',
    category: 'Bespoke Software Infrastructure',
    description:
      'Tailored internal tooling, high-throughput microservices, and specialized data platforms engineered from the ground up to match your proprietary operational moat.',
    deliverables: [
      'Enterprise Database & API Design',
      'Secure Multi-Role Tenant Portals',
      'Real-Time Telemetry & Monitoring',
      'Cloud Architecture & Scale-to-Zero',
    ],
    metric: '99.98%',
    metricLabel: 'Target operational system reliability',
    image: imgCustomSys,
  },
];

interface ServicesRowsProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesRows({ onSelectService }: ServicesRowsProps) {
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const floatingVisualRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tracking for floating visual
  useEffect(() => {
    const visual = floatingVisualRef.current;
    if (!visual) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const update = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (visual) {
        visual.style.left = `${currentX}px`;
        visual.style.top = `${currentY}px`;
      }

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const handleRowHover = (index: number) => {
    playHoverBlip();
    setActiveHoverIndex(index);
  };

  const handleRowLeave = () => {
    setActiveHoverIndex(null);
  };

  const handleRowClick = (service: ServiceItem) => {
    playMicroClick(1400);
    setSelectedService(service);
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#030303] text-white border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono-code uppercase tracking-[0.25em] text-neutral-400 mb-3">
              <span className="w-1.5 h-1.5 bg-[#FF5500] rounded-full shadow-[0_0_8px_#FF5500]" />
              <span>CAPABILITIES & ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              SERVICES<span className="text-[#FF5500]">.</span>
            </h2>
          </div>
          <p className="text-neutral-300 text-sm md:text-base font-light max-w-md">
            Engineered for high-performing enterprises that demand autonomous reliability
            and uncompromising technical aesthetics.
          </p>
        </div>

        {/* Large Typography Rows */}
        <div className="border-t border-white/[0.12] divide-y divide-white/[0.08]">
          {SERVICES.map((item, index) => {
            const isHovered = activeHoverIndex === index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleRowHover(index)}
                onMouseLeave={handleRowLeave}
                onClick={() => handleRowClick(item)}
                data-cursor="EXPAND"
                className="group relative py-8 md:py-14 cursor-pointer transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Number + Title */}
                  <div className="flex items-baseline gap-6 md:gap-12">
                    <span className="font-mono-code text-xs md:text-sm text-[#FF5500] font-semibold tracking-wider">
                      {item.number}
                    </span>
                    <h3 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white transition-all duration-300 group-hover:translate-x-3 group-hover:text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Right: Category + Action Icon */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 pl-12 lg:pl-0">
                    <div className="text-left lg:text-right">
                      <span className="block text-xs uppercase tracking-widest text-neutral-300 font-medium">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono-code text-neutral-400 block mt-0.5">
                        <span className="text-[#FF5500] font-semibold">{item.metric}</span> · {item.metricLabel}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#FF5500] group-hover:text-white group-hover:border-[#FF5500] group-hover:shadow-[0_0_20px_rgba(255,85,0,0.5)] group-hover:scale-110">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Mobile Inline Preview Visual */}
                <div
                  className={`mt-6 lg:hidden overflow-hidden transition-all duration-500 rounded-lg border border-white/[0.08] ${
                    isHovered ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover brightness-90"
                  />
                  <div className="p-4 bg-neutral-950/80">
                    <p className="text-xs text-neutral-300">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cursor Image Reveal (Desktop Only) */}
      <div
        ref={floatingVisualRef}
        className={`pointer-events-none fixed z-30 hidden lg:block -translate-x-1/2 -translate-y-1/2 w-80 h-52 rounded-xl overflow-hidden shadow-2xl border border-[#FF5500]/40 transition-all duration-300 ease-out ${
          activeHoverIndex !== null
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-90 invisible'
        }`}
      >
        {activeHoverIndex !== null && (
          <div className="relative w-full h-full bg-neutral-900">
            <img
              src={SERVICES[activeHoverIndex].image}
              alt={SERVICES[activeHoverIndex].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
              <span className="text-[10px] font-mono-code text-[#FF5500] tracking-wider font-semibold">
                {SERVICES[activeHoverIndex].category}
              </span>
              <span className="text-sm font-semibold text-white">
                {SERVICES[activeHoverIndex].title}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Service Detail Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#090909] border border-white/15 rounded-2xl p-6 md:p-10 text-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-6 mb-6">
              <div>
                <span className="text-xs font-mono-code text-[#FF5500] tracking-widest uppercase font-semibold">
                  {selectedService.number} / {selectedService.category}
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-bold mt-1 text-white">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/[0.08] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Media & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-xl overflow-hidden border border-white/10 aspect-video md:aspect-auto h-48 md:h-full bg-neutral-900">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                    {selectedService.description}
                  </p>
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-neutral-400 mb-3">
                    CORE DELIVERABLES
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-mono-code text-[#FF5500]">
                    {selectedService.metric}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono-code">
                    {selectedService.metricLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4 border-t border-white/[0.08] pt-6">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onSelectService(serviceName);
                }}
                className="px-6 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#FF661A] text-white font-semibold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-colors"
              >
                <span>Initiate This System</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
