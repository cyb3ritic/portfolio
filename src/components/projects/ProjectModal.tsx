import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { XIcon, GithubIcon, ExternalLinkIcon } from "lucide-react";
import CyberButton from "../CyberButton";
import { useToast } from "@/hooks/use-toast";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  image: string;
  variant: "green" | "blue" | "purple";
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const variantButtonMap: Record<string, "default" | "blue" | "purple" | "ghost"> = {
  green: "default",
  blue: "blue",
  purple: "purple",
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  useEffect(() => {
    // if (!project) return;
    // // Prevent background scroll when modal is open
    // document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  const copyGithubUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "GitHub repository URL has been copied to clipboard",
    });
  };

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-400 overflow-hidden"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-cyber-dark/90 border border-cyber-green/30 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto transform transition-all duration-400 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <button 
              onClick={onClose}
              className="bg-cyber-dark/80 border border-cyber-green/30 rounded-full p-1 hover:bg-cyber-green/20 transition-colors"
              aria-label="Close"
            >
              <XIcon size={20} className="text-cyber-green" />
            </button>
          </div>
          <div className="h-64 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-cyber-dark border border-cyber-blue/30 rounded text-xs text-cyber-blue"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <CyberButton 
              variant={variantButtonMap[project.variant]}
              className="flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                copyGithubUrl(project.github);
              }}
            >
              <GithubIcon className="mr-2" size={16} />
              Copy GitHub URL
            </CyberButton>
            {project.demo && (
              <CyberButton 
                variant="ghost" 
                className="flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demo, '_blank');
                }}
              >
                <ExternalLinkIcon className="mr-2" size={16} />
                View Demo
              </CyberButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ProjectModal;
