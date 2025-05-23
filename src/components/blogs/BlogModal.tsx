import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { XIcon, ExternalLinkIcon } from "lucide-react";
import CyberButton from "../CyberButton";

interface BlogPost {
  title: string;
  description: string;
  platform: "HackTheBox" | "TryHackMe";
  difficulty: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  variant: "green" | "blue" | "purple";
  imageUrl?: string;
  imageAlt?: string;
  content?: string;
}

interface BlogModalProps {
  blog: BlogPost | null;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  if (!blog) return null;

  const variantTextStyles = {
    green: "text-cyber-green",
    blue: "text-cyber-blue",
    purple: "text-cyber-purple",
  };

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-400 overflow-hidden"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-cyber-dark/90 border border-cyber-green/30 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto transform transition-all duration-400 animate-scale-in"
        onClick={e => e.stopPropagation()}
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
          {blog.imageUrl && (
            <div className="h-64 overflow-hidden">
              <img 
                src={blog.imageUrl} 
                alt={blog.imageAlt || blog.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{blog.title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
            <span className="bg-cyber-black/50 px-2 py-1 rounded">{blog.platform}</span>
            <span>{blog.difficulty}</span>
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>
          <p className="text-gray-300 mb-6">{blog.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-cyber-dark border border-cyber-blue/30 rounded text-xs text-cyber-blue"
              >
                {tag}
              </span>
            ))}
          </div>
          {blog.content && (
            <div className="prose prose-invert max-w-none mb-6">
              <pre className="font-mono text-sm whitespace-pre-wrap bg-cyber-black/50 p-4 rounded border border-gray-700">
                {blog.content}
              </pre>
            </div>
          )}
          <div className="mt-6">
            <CyberButton 
              variant="default" 
              className="flex items-center justify-center"
              onClick={e => {
                e.stopPropagation();
                window.open(blog.link, '_blank');
              }}
            >
              <ExternalLinkIcon className="mr-2" size={16} />
              View Full Writeup
            </CyberButton>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default BlogModal;
