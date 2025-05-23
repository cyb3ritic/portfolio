
import React from "react";
import AboutSection from "@/components/AboutSection";

interface AboutSectionWrapperProps {
  onNavClick?: (sectionId: string) => void;
}

const AboutSectionWrapper: React.FC<AboutSectionWrapperProps> = ({ onNavClick }) => {
  return <AboutSection onNavClick={onNavClick} />;
};

export default AboutSectionWrapper;
