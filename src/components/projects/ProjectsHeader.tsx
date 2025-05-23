
import React from "react";
import { CodeIcon } from "lucide-react";
import AsciiArt, { ASCII_ART } from "../AsciiArt";
import AnimatedSection from "../AnimatedSection";

const ProjectsHeader = () => {
  return (
    <AnimatedSection animation="fade-up">
      <AsciiArt art={ASCII_ART.PROJECTS} className="mb-4" />
      <h2 className="text-3xl font-bold mb-8 flex items-center">
        <CodeIcon className="mr-2 text-cyber-green" size={24} />
        <span className="cyber-text-gradient">Red Team Projects</span>
      </h2>
    </AnimatedSection>
  );
};

export default ProjectsHeader;
