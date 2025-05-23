
import React from "react";
import AnimatedSection from "@/components/AnimatedSection";
import AsciiArt, { ASCII_ART } from "@/components/AsciiArt";
import SkillBadge from "@/components/SkillBadge";
import { TerminalIcon, DatabaseIcon } from "lucide-react";

const SkillsSectionWrapper = () => {
  return (
    <section id="skills" className="py-20 bg-cyber-dark/50 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <AsciiArt art={ASCII_ART.TOOLS} className="mb-4" />

          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <TerminalIcon className="mr-2 text-cyber-green" size={24} />
              <span className="cyber-text-gradient">Skills & Arsenal</span>
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyber-green">
                  Penetration Testing
                </h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="Web Application Testing" level={5} variant="technique" />
                  <SkillBadge name="Network Penetration" level={4} variant="technique" />
                  <SkillBadge name="Mobile Application Security" level={4} variant="technique" />
                  <SkillBadge name="API Security Testing" level={5} variant="technique" />
                  <SkillBadge name="Cloud Security" level={2} variant="technique" />
                  <SkillBadge name="Social Engineering" level={4} variant="technique" />
                  <SkillBadge name="Red Team Operations" level={4} variant="technique" />
                  <SkillBadge name="Cryptanalysis" level={3} variant="technique" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyber-blue">
                  Security Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="Burp Suite" level={5} variant="tool" />
                  <SkillBadge name="Metasploit" level={4} variant="tool" />
                  <SkillBadge name="Nmap" level={5} variant="tool" />
                  <SkillBadge name="Wireshark" level={4} variant="tool" />
                  <SkillBadge name="OWASP ZAP" level={4} variant="tool" />
                  <SkillBadge name="Hashcat" level={3} variant="tool" />
                  <SkillBadge name="Aircrack-ng" level={3} variant="tool" />
                  <SkillBadge name="Nessus" level={4} variant="tool" />
                  {/* <SkillBadge name="Cobalt Strike" level={3} variant="tool" /> */}
                  <SkillBadge name="Hydra" level={4} variant="tool" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyber-purple">
                  Scripting & Programming
                </h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="Python" level={5} variant="language" />
                  <SkillBadge name="Bash" level={4} variant="language" />
                  <SkillBadge name="PowerShell" level={4} variant="language" />
                  <SkillBadge name="JavaScript" level={3} variant="language" />
                  {/* <SkillBadge name="SQL" level={4} variant="language" /> */}
                  <SkillBadge name="C" level={3} variant="language" />
                  {/* <SkillBadge name="Go" level={2} variant="language" />
                  <SkillBadge name="Ruby" level={3} variant="language" /> */}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyber-green">
                  <DatabaseIcon className="inline-block mr-2" size={20} />
                  OSINT
                </h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="Shodan" level={5} variant="tool" />
                  <SkillBadge name="TheHarvester" level={4} variant="tool" />
                  <SkillBadge name="Recon-ng" level={4} variant="tool" />
                  <SkillBadge name="Maltego" level={4} variant="tool" />
                  <SkillBadge name="OSINT Framework" level={5} variant="tool" />
                  <SkillBadge name="Google Dorking" level={5} variant="technique" />
                  <SkillBadge name="Social Media Analysis" level={4} variant="technique" />
                  <SkillBadge name="Dark Web Research" level={3} variant="technique" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default SkillsSectionWrapper;
