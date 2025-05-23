
import React from "react";
import AccessTerminal from "@/components/AccessTerminal";
import TypewriterText from "@/components/TypewriterText";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import CyberButton from "@/components/CyberButton";
import AnimatedSection from "@/components/AnimatedSection";

interface IntroSectionProps {
  onComplete: () => void;
  onNavClick: (section: string) => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onComplete, onNavClick }) => {
  return (
    <section id="home" className="min-h-screen pt-16 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-cyber-dark via-cyber-blue/5 to-cyber-purple/10 animate-fade-in">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="cyber-text-gradient">cyb3ritic</span>
            </h1>
          </AnimatedSection>

          <div className="text-xl md:text-2xl mb-8 text-gray-300">
            <TypewriterText text="👾 Human by birth, hacker by choice." />
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <a
              href="https://github.com/cyb3ritic"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-300 hover:border-cyber-green hover:text-cyber-green transition-all duration-300 hover:rotate-[360deg]"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/cyb3ritic"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-300 hover:border-cyber-blue hover:text-cyber-blue transition-all duration-300 hover:rotate-[360deg]"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://blog.samipshah.com.np"
              target="_blank"
              rel="noopener noreferrer"
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
              <CyberButton onClick={() => onNavClick("about")}>
                Learn More
              </CyberButton>
              <CyberButton variant="blue" onClick={() => onNavClick("contact")}>
                Get In Touch
              </CyberButton>
              <CyberButton variant="purple" onClick={() => onNavClick("blog")}>
                Read Writeups
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
