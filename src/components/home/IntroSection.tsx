import React from "react";
import TypewriterText from "@/components/TypewriterText";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Download, Terminal as TerminalIcon } from "lucide-react";
import CyberButton from "@/components/CyberButton";
import AnimatedSection from "@/components/AnimatedSection";

interface IntroSectionProps {
  onComplete?: () => void;
  onNavClick: (section: string) => void;
  onOpenTerminal?: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onNavClick, onOpenTerminal }) => {
  const handleDownloadCv = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Samip_Shah_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen pt-16 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-cyber-dark via-cyber-blue/5 to-cyber-purple/10 animate-fade-in">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Live Status HUD Badge */}
          <AnimatedSection animation="fade-down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-black/80 border border-cyber-green/40 shadow-glow-green text-xs font-mono mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-green"></span>
              </span>
              <span className="text-gray-300">STATUS:</span>
              <span className="text-cyber-green font-bold">OPEN FOR PENTESTING & FREELANCE</span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="cyber-text-gradient">cyb3ritic</span>
            </h1>
          </AnimatedSection>

          <div className="text-xl md:text-2xl mb-8 text-gray-300">
            <TypewriterText text="👾 Human by birth, hacker by choice." />
          </div>

          <div className="flex justify-center gap-6 mt-6 mb-8">
            <a
              href="https://github.com/cyb3ritic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="group relative w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-300 hover:border-cyber-green hover:text-cyber-green transition-all duration-300 hover:rotate-[360deg]"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/cyb3ritic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group relative w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-300 hover:border-cyber-blue hover:text-cyber-blue transition-all duration-300 hover:rotate-[360deg]"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://blog.samipshah.com.np"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blog"
              className="group relative w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-300 hover:border-cyber-purple hover:text-cyber-purple transition-all duration-300 hover:rotate-[360deg]"
            >
              <FaGlobe size={20} />
            </a>
          </div>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Penetration Testing Enthusiast and Ethical Hacker with a passion for responsible disclosure and technical excellence. Securing the digital world, one vulnerability at a time.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <CyberButton onClick={handleDownloadCv} variant="default" className="flex items-center gap-2">
                <Download size={16} />
                Download CV
              </CyberButton>

              {onOpenTerminal && (
                <CyberButton onClick={onOpenTerminal} variant="purple" className="flex items-center gap-2">
                  <TerminalIcon size={16} />
                  Launch Terminal
                </CyberButton>
              )}

              <CyberButton variant="blue" onClick={() => onNavClick("projects")}>
                Explore Projects
              </CyberButton>

              <CyberButton variant="ghost" onClick={() => onNavClick("contact")}>
                Get In Touch
              </CyberButton>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-4 md:left-12 flex items-center">
          <div className="h-40 w-[1px] bg-gradient-to-b from-transparent via-cyber-green to-transparent"></div>
        </div>
        <div className="absolute inset-y-0 right-4 md:right-12 flex items-center">
          <div className="h-40 w-[1px] bg-gradient-to-b from-transparent via-cyber-blue to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
