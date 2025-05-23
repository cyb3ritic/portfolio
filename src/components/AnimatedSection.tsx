
import React, { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  threshold?: number;
  animation?: "fade-up" | "fade-in" | "slide-in" | "scale-in";
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  id,
  delay = 0,
  threshold = 0.1,
  animation = "fade-up",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Simplified animations for mobile to improve performance
  const getAnimationClass = () => {
    if (isMobile) {
      // Use simpler animations on mobile for better performance
      return animation === "fade-up" ? "opacity-0 translate-y-6" : 
             animation === "fade-in" ? "opacity-0" :
             animation === "slide-in" ? "opacity-0 -translate-x-6" :
             "opacity-0 scale-98";
    }
    
    // Full animations for desktop
    return {
      "fade-up": "opacity-0 translate-y-12",
      "fade-in": "opacity-0",
      "slide-in": "opacity-0 -translate-x-10",
      "scale-in": "opacity-0 scale-95",
    }[animation];
  };

  const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100";

  useEffect(() => {
    // Skip animations completely for very low-end devices to ensure smooth experience
    if (typeof navigator !== 'undefined' && /Android [4-5]/.test(navigator.userAgent)) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, isMobile ? Math.min(delay, 100) : delay); // Reduce delay on mobile
        }
      },
      { threshold: isMobile ? Math.min(threshold, 0.05) : threshold } // Lower threshold for mobile
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay, threshold, isMobile]);

  // Adjust transition duration based on device
  const transitionDuration = isMobile ? "duration-700" : "duration-900";

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`${className} ${getAnimationClass()} ${
        isVisible ? visibleClass : ""
      } transition-all ${transitionDuration} ease-out will-change-transform`}
      style={{ willChange: isVisible ? "auto" : "transform, opacity" }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
