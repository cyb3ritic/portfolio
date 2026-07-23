import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/home/Footer";
import MatrixRain from "@/components/MatrixRain";
import CyberScroll from "@/components/CyberScroll";
import EasterEgg from "@/components/EasterEgg";

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onNavClick: (section: string) => void;
  onOpenTerminal?: () => void;
  showEasterEgg: boolean;
  setShowEasterEgg: (show: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeSection, 
  onNavClick,
  onOpenTerminal,
  showEasterEgg,
  setShowEasterEgg
}) => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Matrix rain background */}
      <MatrixRain density={15} speed={15} />
      <CyberScroll />
      
      <NavBar onNavClick={onNavClick} onOpenTerminal={onOpenTerminal} activeSection={activeSection} />
      
      <main className="relative z-10">
        {children}
      </main>

      <Footer onEasterEggClick={() => setShowEasterEgg(false)} />
      
      {showEasterEgg && (
        <EasterEgg onClose={() => setShowEasterEgg(false)} />
      )}
    </div>
  );
};

export default Layout;
