
import React, { useState, useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import LoadingOverlay from "@/components/home/LoadingOverlay";
import IntroSection from "@/components/home/IntroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
import { useScrollSpy } from "@/hooks/useScrollSpy";

// Lazy load heavier components for better initial load time
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const location = useLocation();

  const sectionIds = ["home", "about", "skills", "projects", "blog", "certifications", "contact"];
  const activeSection = useScrollSpy(sectionIds);

  // Handle navigation from URL hash
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

  // Handle scroll to section
  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL hash without page reload
      window.history.pushState(null, "", `#${section}`);
    }
  };

  // Handle intro completion
  const handleIntroComplete = () => {
    setIsLoading(false);
  };

  // Handle konami code easter egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setShowEasterEgg(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Helmet>
        <title>cyb3ritic | Ethical Hacker & Security Researcher</title>
        <meta name="description" content="Cybersecurity portfolio of cyb3ritic (Samip Aanand Shah), an ethical hacker specializing in penetration testing, vulnerability research, and security analysis." />
        <link rel="canonical" href={`https://samipshah.com.np${location.pathname}`} />
      </Helmet>

      {isLoading ? (
        <LoadingOverlay onComplete={handleIntroComplete} />
      ) : (
        <Layout 
          activeSection={activeSection} 
          onNavClick={handleNavClick}
          showEasterEgg={showEasterEgg}
          setShowEasterEgg={setShowEasterEgg}
        >
          <IntroSection onComplete={() => {}} onNavClick={handleNavClick} />
          <AboutSection onNavClick={handleNavClick} />
          
          <Suspense fallback={<div className="min-h-screen"></div>}>
            <SkillsSection />
            <ProjectsSection />
            <BlogSection />
            <CertificationsSection />
            <Testimonials />
          </Suspense>
          
          <ContactSection />
        </Layout>
      )}
    </>
  );
};

export default Index;
