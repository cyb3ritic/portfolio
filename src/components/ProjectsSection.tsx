import React, { useState, useCallback } from "react";
import { GithubIcon } from "lucide-react";
import CyberButton from "./CyberButton";
import ProjectsHeader from "./projects/ProjectsHeader";
import ProjectsFilter from "./projects/ProjectsFilter";
import ProjectsList from "./projects/ProjectsList";
import ProjectModal from "./projects/ProjectModal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  variant: "green" | "blue" | "purple";
  image: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "PentestPal",
    description: "A modular Python CLI framework that streamlines penetration testing with automated tools, tab-completion, and detailed reporting for security professionals.",
    tags: ["Python", "Web Security", "OWASP"],
    github: "https://github.com/cyb3ritic/ComputerSecurityProject",
    variant: "green" as const,
    image: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/pentestpal_banner.png"
  },
  {
    title: "WebSleuth",
    description: "A modular bash based website reconnaissance tool that automates intelligence gathering and analysis for ethical hackers and security researchers.",
    tags: ["Bash", "Web Security", "OWASP", "Reconnaissance"],
    github: "https://github.com/cyb3ritic/websleuth",
    // demo: "https://demo.example.com",
    variant: "blue" as const,
    image: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/websleuth_banner.png"
  },
  {
    title: "PySniffer-X",
    description: "A professional-grade packet sniffer offering live capture, deep inspection, real-time analysis, and Wireshark integration for network analysis and cybersecurity education.",
    tags: ["Python", "Packet Sniffer", "Network Analysis", "DPI", "Wireshark"],
    github: "https://github.com/username/shadowc2",
    variant: "purple" as const,
    image: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/pysniffer_banner.png"
  },
  // {
  //   title: "CloudHunter",
  //   description: "Tool for auditing cloud misconfigurations across AWS, Azure, and GCP, identifying privilege escalation paths and data exposure risks.",
  //   tags: ["Python", "Cloud Security", "IAM", "S3"],
  //   github: "https://github.com/username/cloudhunter",
  //   demo: "https://demo.example.com",
  //   variant: "green" as const,
  //   image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
  // },
  // {
  //   title: "KernelExploit",
  //   description: "Research on kernel exploitation techniques with ready-to-use PoC for common Linux kernel vulnerabilities.",
  //   tags: ["C", "Kernel", "Exploitation", "Linux"],
  //   github: "https://github.com/username/kernelexploit",
  //   variant: "purple" as const,
  //   image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=400&q=80"
  // }
];

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
