import React from "react";
import { Code, Shield, Terminal, Hammer } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SkillBadge from "./SkillBadge";
import AsciiArt, { ASCII_ART } from "./AsciiArt";
import { toolsAndFrameworks, languagesAndTech, securityExpertise } from "@/data/skills";

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
                    {toolsAndFrameworks.map((skill) => (
                      <SkillBadge key={skill.name} name={skill.name} level={skill.level} variant={skill.variant} />
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-cyber-green">
                    <Code size={18} className="mr-2" />
                    Languages & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {languagesAndTech.map((skill) => (
                      <SkillBadge key={skill.name} name={skill.name} level={skill.level} variant={skill.variant} />
                    ))}
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
                    {securityExpertise.map((skill) => (
                      <SkillBadge key={skill.name} name={skill.name} level={skill.level} variant={skill.variant} />
                    ))}
                  </div>
                </div>

                <div className="cyber-card card-purple p-6 border-cyber-purple/30">
                  <h3 className="text-xl font-bold mb-3 text-cyber-purple">Certifications & Achievements Summary</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-cyber-purple mr-2">▶</span>
                      <span>Maintainer - <a href='https://blog.samipshah.com.np' target="_blank" rel="noopener noreferrer" className="underline hover:text-cyber-green">blog.samipshah.com.np</a> | Technical Writeups & Research</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-purple mr-2">▶</span>
                      <span>Completed Web Application Penetration Testing (VAPT) professional course</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-purple mr-2">▶</span>
                      <span>Top 1000 Global rank on HackTheBox platform</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyber-purple mr-2">▶</span>
                      <span>Creator of PentestPal & WebSleuth offensive security toolkits</span>
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
