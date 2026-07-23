import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import LoadingOverlay, { hasSeenIntro } from "@/components/home/LoadingOverlay";
import IntroSection from "@/components/home/IntroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
import AchievementsSection from "@/components/AchievementsSection";
import InteractiveTerminalModal from "@/components/terminal/InteractiveTerminalModal";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import initKonamiCode from "@/utils/konamiCode";

const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const Index = () => {
  const [isLoading, setIsLoading] = useState(() => !hasSeenIntro());
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const location = useLocation();

  const sectionIds = ["home", "about", "skills", "projects", "achievements", "blog", "certifications", "contact"];
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  // Keyboard shortcut listener for terminal modal (Backtick key ` or Ctrl+Shift+T)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "`" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "t")
      ) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${section}`);
    }
  };

  const handleIntroComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        try {
          localStorage.setItem("portfolio_intro_seen", "true");
        } catch { /* ignore */ }
        setIsLoading(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading]);

  useEffect(() => {
    const cleanup = initKonamiCode(() => setShowEasterEgg(true));
    return cleanup;
  }, []);

  return (
    <>
      <Helmet>
        <title>cyb3ritic | Ethical Hacker & Security Researcher</title>
        <meta name="description" content="Cybersecurity portfolio of cyb3ritic (Samip Aanand Shah), an ethical hacker specializing in penetration testing, vulnerability research, and security analysis." />
        <meta name="keywords" content="cybersecurity, ethical hacking, penetration testing, vulnerability research, cyb3ritic, Samip Aanand Shah, bug bounty, security researcher, CTF, offensive security" />
        <link rel="canonical" href={`https://samipshah.com.np${location.pathname}`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samipshah.com.np" />
        <meta property="og:title" content="cyb3ritic | Ethical Hacker & Security Researcher" />
        <meta property="og:description" content="Cybersecurity portfolio of Samip Aanand Shah (cyb3ritic) — penetration testing, vulnerability research, CTF competitions, and ethical hacking expertise." />
        <meta property="og:image" content="https://samipshah.com.np/og-image.png" />
        <meta property="og:image:alt" content="cyb3ritic — Samip Aanand Shah, Ethical Hacker & Security Researcher" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="cyb3ritic" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@cyb3ritic" />
        <meta name="twitter:title" content="cyb3ritic | Ethical Hacker & Security Researcher" />
        <meta name="twitter:description" content="Cybersecurity portfolio of Samip Aanand Shah (cyb3ritic) — penetration testing, vulnerability research, CTF competitions, and ethical hacking expertise." />
        <meta name="twitter:image" content="https://samipshah.com.np/og-image.png" />
        <meta name="twitter:image:alt" content="cyb3ritic — Samip Aanand Shah, Ethical Hacker & Security Researcher" />
      </Helmet>

      {isLoading ? (
        <LoadingOverlay onComplete={handleIntroComplete} />
      ) : (
        <Layout
          activeSection={activeSection}
          onNavClick={handleNavClick}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          showEasterEgg={showEasterEgg}
          setShowEasterEgg={setShowEasterEgg}
        >
          <a
            href="#about"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-cyber-green focus:text-cyber-black focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("about");
            }}
          >
            Skip to content
          </a>

          <IntroSection
            onComplete={() => {}}
            onNavClick={handleNavClick}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
          <AboutSection onNavClick={handleNavClick} />

          <Suspense fallback={<div className="min-h-screen"></div>}>
            <SkillsSection />
            <ProjectsSection />
            <AchievementsSection />
            <BlogSection />
            <CertificationsSection />
            <Testimonials />
          </Suspense>

          <ContactSection />

          <InteractiveTerminalModal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
          />
        </Layout>
      )}
    </>
  );
};

export default Index;
