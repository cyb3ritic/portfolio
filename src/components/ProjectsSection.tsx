import React, { useState, useCallback } from "react";
import { GithubIcon } from "lucide-react";
import CyberButton from "./CyberButton";
import ProjectsHeader from "./projects/ProjectsHeader";
import ProjectsFilter from "./projects/ProjectsFilter";
import ProjectsList from "./projects/ProjectsList";
import ProjectModal from "./projects/ProjectModal";

import { projects, Project } from "@/data/projects";

interface ProjectsSectionProps {
  onPreview?: () => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onPreview }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const projectTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const handleTagFilter = useCallback((tag: string | null) => {
    if (tag !== selectedTag) {
      setIsFiltering(true);
      setTimeout(() => {
        setSelectedTag(tag);
        setTimeout(() => {
          setIsFiltering(false);
        }, 120);
      }, 390);
    }
  }, [selectedTag]);

  const handleSearchChange = useCallback((query: string) => {
    setIsFiltering(true);
    setTimeout(() => {
      setSearchQuery(query);
      setTimeout(() => {
        setIsFiltering(false);
      }, 120);
    }, 300);
  }, []);

  const filteredProjects = projects.filter(project => {
    // Apply tag filter
    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
    
    // Apply search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchLower) || 
      project.description.toLowerCase().includes(searchLower) || 
      project.tags.some(tag => tag.toLowerCase().includes(searchLower));
    
    return matchesTag && matchesSearch;
  });

  const handlePreview = useCallback((project: Project) => {
    setPreviewProject(project);
    if (typeof onPreview === "function") onPreview();
  }, [onPreview]);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ProjectsHeader />
          <ProjectsFilter
            selectedTag={selectedTag}
            projectTags={projectTags}
            onFilterChange={handleTagFilter}
            onSearchChange={handleSearchChange}
          />
          <ProjectsList
            projects={filteredProjects}
            onPreview={handlePreview}
            isFiltering={isFiltering}
          />

          <div className="text-center mt-12">
            <CyberButton variant="ghost" className="group transition-all duration-300">
              <GithubIcon className="mr-2 group-hover:text-cyber-green transition-colors duration-300" size={18} />
              <span><a href="https://github.com/cyb3ritic" target="_blank" rel="noopener noreferrer">More on GitHub</a></span>
            </CyberButton>
          </div>
        </div>
      </div>

      <ProjectModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
