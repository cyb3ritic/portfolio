
import React, { memo, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import ProjectCard from "../ProjectCard";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  image: string;
  variant: "green" | "blue" | "purple";
}

interface ProjectsListProps {
  projects: Project[];
  onPreview: (project: Project) => void;
  isFiltering: boolean;
}

const ProjectsList: React.FC<ProjectsListProps> = memo(({ projects, onPreview, isFiltering }) => {
  // Memoize the filtered projects to prevent unnecessary re-renders
  const renderedProjects = useMemo(() => 
    projects.map((project, i) => (
      <AnimatedSection 
        key={project.title}
        animation="scale-in" 
        delay={150 + i * 75}
        className="transform transition-all duration-300 hover:scale-[1.01]"
      >
        <div 
          onClick={() => onPreview(project)} 
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label={`View details for ${project.title}`}
        >
          <ProjectCard {...project} />
        </div>
      </AnimatedSection>
    )), [projects, onPreview]);

  return (
    <div 
      role="region"
      aria-label="Projects grid"
      className={`grid md:grid-cols-2 gap-6 transition-all duration-300 ease-in-out ${
        isFiltering ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      {renderedProjects}
      {projects.length === 0 && (
        <div className="col-span-2 text-center py-10 text-cyber-blue opacity-80">
          <p className="text-lg">No projects match your filters</p>
          <p className="text-sm mt-2">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
});

ProjectsList.displayName = "ProjectsList";

export default ProjectsList;
