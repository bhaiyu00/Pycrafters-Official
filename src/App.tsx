import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statement from './components/Statement';
import ServicesRows from './components/ServicesRows';
import HorizontalMarquee from './components/HorizontalMarquee';
import Showcase from './components/Showcase';
import About from './components/About';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import AdminLeadsModal from './components/AdminLeadsModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [adminVaultOpen, setAdminVaultOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  // Secret owner access listeners (Alt + L, Alt + Shift + P, or URL #admin/#vault)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && (e.key === 'l' || e.key === 'L')) || (e.altKey && e.shiftKey && (e.key === 'p' || e.key === 'P'))) {
        e.preventDefault();
        setAdminVaultOpen((prev) => !prev);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#vault') {
        setAdminVaultOpen(true);
      }
    };

    if (window.location.hash === '#admin' || window.location.hash === '#vault') {
      setAdminVaultOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const handleOpenInquiry = (serviceName?: string) => {
    setSelectedService(serviceName);
    setInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryOpen(false);
  };

  const handleExploreWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-[#FF5500] selection:text-white">
      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Content (reveals smoothly once preloaded) */}
      <div
        className={`transition-opacity duration-700 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Minimal Transparent Sticky Navbar */}
        <Navbar onOpenInquiry={handleOpenInquiry} />

        {/* Hero Section */}
        <Hero
          onStartProject={() => handleOpenInquiry()}
          onExploreWork={handleExploreWork}
        />

        {/* Editorial Statement Section with Scroll Scrub */}
        <Statement />

        {/* Minimal Services Typography Rows */}
        <ServicesRows onSelectService={handleOpenInquiry} />

        {/* Horizontal Ambient Movement Ticker */}
        <HorizontalMarquee />

        {/* Cinematic Showcase Section with Parallax */}
        <Showcase />

        {/* Spacious About Section */}
        <About />

        {/* Fullscreen Dramatic Final CTA */}
        <FinalCTA onStartConversation={() => handleOpenInquiry()} />

        {/* Minimalist Footer */}
        <Footer onOpenAdminVault={() => setAdminVaultOpen(true)} />
      </div>

      {/* Interactive Project Intake Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={handleCloseInquiry}
        preselectedService={selectedService}
      />

      {/* Admin Leads Vault Modal (Persistent Submissions Dashboard) */}
      <AdminLeadsModal
        isOpen={adminVaultOpen}
        onClose={() => setAdminVaultOpen(false)}
      />
    </div>
  );
}
