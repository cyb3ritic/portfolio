import React from "react";
import { Code, Shield, Terminal, Hammer } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SkillBadge from "./SkillBadge";
import SkillRadar from "./SkillRadar";
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

            {/* Two columns from lg (1024px) up; stacked top/bottom on mobile + tablet */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 lg:items-center">
              {/* Left: all textual / badge content */}
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

                <div>
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
              </AnimatedSection>

              {/* Right: radar chart, vertically centered against the left column's height */}
              <AnimatedSection animation="fade-in" delay={400}>
                <div className="w-full max-w-md mx-auto">
                  <SkillRadar />
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