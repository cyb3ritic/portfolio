
import React, { Suspense, lazy } from "react";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedSection from "./AnimatedSection";
import CyberButton from "./CyberButton";
import AsciiArt, { ASCII_ART } from "./AsciiArt";

const HackerAvatar = lazy(() => import("./HackerAvatar"));

interface AboutSectionProps {
  onNavClick: (section: string) => void;
}

const quickStats = [
  { label: "HTB Top 1000", className: "border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10" },
  { label: "THM Top 1%", className: "border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10" },
  { label: "PentestPal Creator", className: "border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10" },
  { label: "Blog Maintainer", className: "border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10" },
];

const AboutSection: React.FC<AboutSectionProps> = ({ onNavClick }) => {
  return (
    <section
      id="about"
      className="py-20 relative bg-gradient-to-b from-cyber-dark/80 to-transparent"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <UserIcon className="mr-2 text-cyber-green" size={24} />
              <span className="cyber-text-gradient">About Me</span>
            </h2>

            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:items-center">
              <AnimatedSection animation="fade-in" delay={200}>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    I'm <span className="text-cyber-green font-bold">cyb3ritic</span> — an ethical hacker who
                    hunts vulnerabilities, builds offensive security tooling, and turns findings into fixes.
                  </p>

                  <p className="text-gray-300">
                    Penetration testing, web exploitation, and CTFs. I break systems so they can't be broken.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {quickStats.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => onNavClick("achievements")}
                        className={cn(
                          "text-xs font-mono px-2.5 py-1 rounded border bg-cyber-black/50 transition-colors cursor-pointer",
                          chip.className
                        )}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <CyberButton onClick={() => onNavClick("skills")}>
                      Explore My Skills
                    </CyberButton>
                    <CyberButton variant="blue" onClick={() => {
                      const link = document.createElement("a");
                      link.href = "/resume.pdf";
                      link.download = "Samip_Shah_Resume.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}>
                      Download CV
                    </CyberButton>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-in" delay={400}>
                <Suspense
                  fallback={
                    <div className="w-full max-w-[400px] mx-auto aspect-square rounded-sm border border-cyber-green/20 bg-cyber-black/40 animate-pulse" />
                  }
                >
                  <HackerAvatar
                    className="w-full max-w-[400px] mx-auto"
                    style={{
                      boxShadow:
                        "0 0 45px rgba(57, 255, 138, 0.12), 0 0 90px rgba(57, 255, 138, 0.06)",
                    }}
                  />
                </Suspense>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
