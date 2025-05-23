
import React, { useEffect, useState, useRef, useCallback } from "react";
import { ChevronUp } from "lucide-react";

interface CyberScrollProps {
  threshold?: number;
  behavior?: ScrollBehavior;
  autoScroll?: boolean;
  autoScrollDelay?: number;
  sections?: string[];
}

const CyberScroll: React.FC<CyberScrollProps> = ({
  threshold = 300,
  behavior = "smooth",
  autoScroll = false,
  autoScrollDelay = 1000,
  sections = ["about", "skills", "projects", "blog", "certifications", "contact"],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to top if enabled
  useEffect(() => {
    if (autoScroll) {
      const timeout = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, autoScrollDelay);
      return () => clearTimeout(timeout);
    }
  }, [autoScroll, autoScrollDelay]);

  // Optimized section detection using RAF
  const updateActiveSection = useCallback(() => {
    if (isScrollingRef.current) return;

    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    // Use a for loop for better performance
    for (let i = 0; i < sections.length; i++) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const { offsetTop, offsetHeight } = section;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, [sections]);

  // Optimized scroll progress calculation
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    setScrollProgress(progress);
    setIsVisible(scrollTop > threshold);
  }, [threshold]);

  // Efficient scroll handler using requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        updateScrollProgress();
        updateActiveSection();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollProgress, updateActiveSection]);

  const scrollToTop = () => {
    isScrollingRef.current = true;
    window.scrollTo({
      top: 0,
      behavior
    });
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      isScrollingRef.current = true;
      section.scrollIntoView({ behavior });
      
      // Immediately update active section for a more responsive feel
      setActiveSection(sectionId);
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-cyber-dark/20">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-purple transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-2 rounded-full bg-cyber-dark border border-cyber-green/30
                  shadow-lg shadow-cyber-green/20 transition-all duration-300 group
                  ${isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp
          className="text-cyber-green group-hover:text-cyber-blue transition-colors duration-300"
          size={24}
        />
      </button>

      {/* Desktop Navigation Dots - Optimized */}
      <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-3 ${isMobile ? 'hidden' : 'block'}`}>
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`relative w-3 h-3 rounded-full border transition-all duration-150 will-change-transform
                      ${activeSection === section 
                        ? 'bg-cyber-green shadow-glow-green border-cyber-green scale-125' 
                        : 'border-cyber-green/50 bg-cyber-dark/70 hover:bg-cyber-green/30'}`}
            aria-label={`Navigate to ${section} section`}
          >
            <span className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                           bg-cyber-dark px-2 py-1 rounded text-xs text-cyber-green whitespace-nowrap
                           transition-opacity duration-200 pointer-events-none">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Navigation Dots - Optimized */}
      <div className={`fixed bottom-4 left-0 right-0 z-40 flex justify-center gap-3 px-4 py-2 ${isMobile ? 'flex' : 'hidden'}`}>
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`relative w-3 h-3 rounded-full border transition-all duration-150 will-change-transform
                      ${activeSection === section 
                        ? 'bg-cyber-green shadow-glow-green border-cyber-green scale-125' 
                        : 'border-cyber-green/50 bg-cyber-dark/70 hover:bg-cyber-green/30'}`}
            aria-label={`Navigate to ${section} section`}
          >
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs
                           bg-cyber-dark text-cyber-green whitespace-nowrap opacity-0 hover:opacity-100
                           transition-opacity duration-200 pointer-events-none">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default CyberScroll;
