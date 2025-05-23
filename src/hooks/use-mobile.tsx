
import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Initial check for mobile
    const checkMobile = () => {
      // Check for touch capability as well as screen size
      const isTouchDevice = 'ontouchstart' in window || 
                             navigator.maxTouchPoints > 0 ||
                             window.matchMedia("(pointer: coarse)").matches;
      
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
      
      // Consider Android & iOS mobile browsers specifically
      const isMobileBrowser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Combine factors - if it's a touch device AND (small screen OR mobile browser)
      setIsMobile((isTouchDevice && (isSmallScreen || isMobileBrowser)));
    };

    checkMobile();
    
    // Listen for resize events
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleResize = () => checkMobile();
    
    // Use modern event listener if available
    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize);
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize);
    }
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return !!isMobile;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT);
    };
    
    checkTablet();
    
    const mql = window.matchMedia(
      `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`
    );
    
    const handleResize = () => checkTablet();
    
    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize);
    } else {
      window.addEventListener("resize", handleResize);
    }
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  
  return isTablet;
}

export function useDeviceDetection() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = !isMobile && !isTablet;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
  };
}
