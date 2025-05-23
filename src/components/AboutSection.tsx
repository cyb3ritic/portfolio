
import React from "react";
import { UserIcon } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import CyberButton from "./CyberButton";
import AsciiArt, { ASCII_ART } from "./AsciiArt";

interface AboutSectionProps {
  onNavClick: (section: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onNavClick }) => {
  return (
    <section
      id="about"
      className="py-20 relative bg-gradient-to-b from-cyber-dark/80 to-transparent"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-1">
            <AsciiArt art={ASCII_ART.TERMINAL} className="mb-4" />

            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <UserIcon className="mr-2 text-cyber-green" size={24} />
                <span className="cyber-text-gradient">About Me</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection animation="fade-in" delay={200}>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      As a dedicated cybersecurity enthusiast, I specialize in penetration testing, 
                      vulnerability research, and security auditing. With a background in both offensive 
                      and defensive security, I bring a comprehensive approach to identifying and mitigating 
                      digital threats.
                    </p>
                    
                    <p className="text-gray-300">
                      My passion lies in uncovering complex vulnerabilities that others might miss, and responsibly 
                      disclosing them to help organizations strengthen their security posture. I believe that 
                      effective security requires both technical expertise and clear communication.
                    </p>
                    
                    <p className="text-gray-300">
                      When I'm not hacking (ethically, of course), I contribute to open source security tools 
                      and mentor aspiring security professionals. I'm constantly learning and adapting to stay 
                      ahead of evolving threats.
                    </p>
                    
                    <div className="pt-4">
                      <CyberButton onClick={() => onNavClick("skills")}>
                        Explore My Skills
                      </CyberButton>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="slide-in" delay={400}>
                  <div className="cyber-card card-green p-6 shadow-lg glow-green">
                    <h3 className="text-xl font-bold mb-4 text-cyber-green">
                      Security Philosophy
                    </h3>
                    
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="text-cyber-green mr-2">&#9654;</span>
                        <span>Thorough methodology over quick scanning</span>
                      </li>
                      <li className="flex">
                        <span className="text-cyber-green mr-2">&#9654;</span>
                        <span>Understanding systems, not just exploiting them</span>
                      </li>
                      <li className="flex">
                        <span className="text-cyber-green mr-2">&#9654;</span>
                        <span>Responsible disclosure and ethical practice</span>
                      </li>
                      <li className="flex">
                        <span className="text-cyber-green mr-2">&#9654;</span>
                        <span>Education and mentorship in security</span>
                      </li>
                      <li className="flex">
                        <span className="text-cyber-green mr-2">&#9654;</span>
                        <span>Continuous learning and adapting</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6 p-3 border border-cyber-green/20 rounded bg-cyber-black font-mono text-sm">
                      <div className="text-gray-400">// Security Mindset</div>
                      <div className="text-cyber-green">
                        function secureIt(system) {"{"}
                        <br />
                        &nbsp;&nbsp;return thinkLikeAnAttacker(system)
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;.then(findVulnerabilities)
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;.then(buildDefenses)
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;.then(validateSecurity);
                        <br />
                        {"}"}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
