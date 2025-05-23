import React from "react";
import { Code, Shield, Terminal, Hammer } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SkillBadge from "./SkillBadge";
import AsciiArt, { ASCII_ART } from "./AsciiArt";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <AsciiArt art={ASCII_ART.TOOLS} className="mb-4" />

          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Hammer className="mr-2 text-cyber-blue" size={24} />
              <span className="cyber-text-gradient">Skillsets & Arsenal</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              <AnimatedSection animation="fade-in" delay={200}>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-cyber-blue">
                    <Terminal size={18} className="mr-2" />
                    Tools & Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="Burp Suite" level={5} variant="tool" />
                    <SkillBadge name="Metasploit" level={4} variant="tool" />
                    <SkillBadge name="Nmap" level={5} variant="tool" />
                    <SkillBadge name="Wireshark" level={4} variant="tool" />
                    <SkillBadge name="Hydra" level={4} variant="tool" />
                    <SkillBadge name="John the Ripper" level={3} variant="tool" />
                    <SkillBadge name="Hashcat" level={3} variant="tool" />
                    <SkillBadge name="SearchSploit" level={4} variant="tool" />
                    <SkillBadge name="Gobuster/Feroxbuster" level={5} variant="tool" />
                    <SkillBadge name="Sublist3r/Amass" level={4} variant="tool" />
                    <SkillBadge name="BeautifulSoup" level={5} variant="tool" />
                    <SkillBadge name="Selenium" level={4} variant="tool" />
                    <SkillBadge name="Scapy" level={4} variant="tool" />
                    <SkillBadge name="Docker" level={3} variant="tool" />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-cyber-green">
                    <Code size={18} className="mr-2" />
                    Languages & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="Python" level={5} variant="language" />
                    <SkillBadge name="Bash" level={4} variant="language" />
                    <SkillBadge name="PowerShell" level={3} variant="language" />
                    <SkillBadge name="JavaScript" level={3} variant="language" />
                    <SkillBadge name="SQL" level={4} variant="language" />
                    <SkillBadge name="C/C++" level={3} variant="language" />
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" delay={400}>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-cyber-purple">
                    <Shield size={18} className="mr-2" />
                    Security Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="Web App Pentesting" level={5} variant="technique" />
                    <SkillBadge name="CTF (Web Exploitation)" level={5} variant="technique" />
                    <SkillBadge name="API Security" level={4} variant="technique" />
                    <SkillBadge name="Network Security" level={4} variant="technique" />
                    <SkillBadge name="OSINT" level={4} variant="technique" />
                    <SkillBadge name="Cryptography" level={3} variant="technique" />
                  </div>
                </div>

                <div className="cyber-card card-purple p-6 border-cyber-purple/30">
                  <h3 className="text-xl font-bold mb-3 text-cyber-purple">Certifications & Achievements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-cyber-purple mr-2">▶</span>
                      <span>Maintainer - <a href='https://blog.samipshah.com.np'>blog.samipshah.com.np</a> | Technical Writeups & Research</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-purple mr-2">▶</span>
                      <span>Completed Web Application Penetration Testing course from Udemy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-purple mr-2">▶</span>
                      <span>Top 1000 on HackTheBox platform</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-purple mr-2">▶</span>
                      <span>Developed PentestPal – Modular Web App Pentesting Toolkit (Recon, XSS, SQLi, CSRF, SSRF)</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
