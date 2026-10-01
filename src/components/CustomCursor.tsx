import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, [data-cursor], input, textarea, [role="button"]');
        if (interactive) {
          setIsHovered(true);
          const customText = interactive.getAttribute('data-cursor');
          setCursorText(customText || '');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    let animationFrameId: number;
    const render = () => {
      // Smooth linear interpolation for trailing ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-difference hidden md:block">
      {/* Precision center dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[#FF5500] rounded-full transition-opacity duration-150 shadow-[0_0_8px_#FF5500]"
        style={{
          opacity: isHovered && cursorText ? 0 : 1,
        }}
      />

      {/* Outer fluid trailing ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 flex items-center justify-center rounded-full transition-all duration-300 ease-out border ${
          isHovered
            ? cursorText
              ? 'w-24 h-24 -ml-12 -mt-12 bg-white text-black font-semibold tracking-wider text-[11px] font-display scale-100 border-[#FF5500] shadow-[0_0_30px_rgba(255,85,0,0.3)]'
              : 'w-14 h-14 -ml-7 -mt-7 bg-[#FF5500]/15 border-[#FF5500] backdrop-blur-[1px] scale-110 shadow-[0_0_20px_rgba(255,85,0,0.3)]'
            : 'w-10 h-10 scale-100 opacity-60 border-white/60'
        }`}
      >
        {cursorText && (
          <span className="select-none uppercase animate-in fade-in zoom-in duration-150">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
