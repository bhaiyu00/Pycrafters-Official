import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    // Mouse coordinates
    let mouse = { x: -1000, y: -1000, radius: 160 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles (sparse, elegant, minimal)
    const particleCount = Math.min(Math.floor((width * height) / 18000), 70);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const alpha = Math.random() * 0.4 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.5 + 0.6,
        alpha,
        baseAlpha: alpha,
      });
    }

    const maxConnectionDistance = 140;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital ring in center
      const centerX = width / 2;
      const centerY = height / 2;
      const ringRadius = Math.min(width, height) * 0.38;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 85, 0, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      // Outer concentric ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius * 1.45, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.setLineDash([2, 18]);
      ctx.stroke();
      ctx.restore();

      // Update and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
          p.alpha = Math.min(1, p.baseAlpha + 0.4);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Draw particle (alternate white and orange)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(255, 85, 0, ${p.alpha * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
        }
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist2 < maxConnectionDistance) {
            const lineAlpha = (1 - dist2 / maxConnectionDistance) * 0.12 * Math.min(p.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            if (i % 3 === 0 || j % 3 === 0) {
              ctx.strokeStyle = `rgba(255, 85, 0, ${lineAlpha * 1.3})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            }
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
    />
  );
}
