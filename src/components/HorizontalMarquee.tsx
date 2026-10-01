import React from 'react';

const ITEMS = [
  'AI AUTOMATION',
  'WHATSAPP AI AGENTS',
  'AUTONOMOUS AGENTIC PIPELINES',
  'BESPOKE SOFTWARE SYSTEMS',
  'REAL-TIME TELEMETRY',
  'HIGH-THROUGHPUT ARCHITECTURE',
  'PROPRIETARY CODEBASE',
];

export default function HorizontalMarquee() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden py-6 bg-[#030303] border-y border-white/[0.06] select-none"
    >
      <div className="flex w-max animate-marquee space-x-12">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, index) => (
          <div key={index} className="flex items-center space-x-12 shrink-0">
            <span className="text-[12px] font-mono-code uppercase tracking-[0.3em] text-neutral-400 hover:text-white transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shadow-[0_0_6px_#FF5500]" />
          </div>
        ))}
      </div>
    </div>
  );
}
