
import React from "react";
import { cn } from "@/lib/utils";
import CyberButton from "./CyberButton";
import { GithubIcon, LinkIcon, ArrowRightIcon } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  variant?: "green" | "blue" | "purple";
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  github,
  demo,
  image,
  variant = "green",
  className,
}) => {
  const { tiltStyle, isHovered, handlers } = useTilt();

  const variantStyles = {
    green: "card-green border-cyber-green/20 hover:border-cyber-green/50",
    blue: "card-blue border-cyber-blue/20 hover:border-cyber-blue/50",
    purple: "card-purple border-cyber-purple/20 hover:border-cyber-purple/50",
  };

  return (
    <div
      className={cn(
        "cyber-card group cyber-card-3d transition-all duration-300 hover:scale-[1.02]",
        variantStyles[variant],
        isHovered && "shadow-lg",
        className
      )}
      style={tiltStyle}
      {...handlers}
    >
      {image && (
        <div className="mb-4 h-48 overflow-hidden rounded-sm relative">
          <img
            src={image}
            alt={title}
            className={cn(
              "w-full h-full object-cover transform transition-all duration-700",
              isHovered && "scale-110"
            )}
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-80",
            `from-${variant === 'green' ? 'cyber-green' : variant === 'blue' ? 'cyber-blue' : 'cyber-purple'}/20`
          )} />
        </div>
      )}

      <h3 className={cn(
        "text-xl font-bold mb-2 transition-transform",
        variant === "green" ? "text-cyber-green" : 
        variant === "blue" ? "text-cyber-blue" : "text-cyber-purple"
      )}>
        {title}
      </h3>

      <p className="text-gray-300 mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "bg-cyber-black/50 px-2 py-1 rounded text-xs font-mono border transition-colors",
              isHovered ? "border-opacity-50" : "border-opacity-20",
              variant === "green" ? "border-cyber-green" : 
              variant === "blue" ? "border-cyber-blue" : "border-cyber-purple"
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap justify-between items-center mt-auto">
        <div className="space-x-2">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <CyberButton
                variant={variant === "green" ? "default" : variant === "blue" ? "blue" : "purple"}
                size="sm"
                className={cn("inline-flex items-center gap-1", isHovered && "animate-pulse")}
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </CyberButton>
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer">
              <CyberButton
                variant={variant === "green" ? "default" : variant === "blue" ? "blue" : "purple"}
                size="sm"
                className="inline-flex items-center gap-1"
              >
                <LinkIcon size={14} />
                <span>Demo</span>
              </CyberButton>
            </a>
          )}
        </div>
        <span className={cn(
          "text-xs font-mono inline-flex items-center transition-all",
          variant === "green" ? "text-cyber-green" : 
          variant === "blue" ? "text-cyber-blue" : "text-cyber-purple",
          isHovered && "translate-x-1"
        )}>
          View Project <ArrowRightIcon size={12} className="ml-1" />
        </span>
      </div>

      {/* Matrix-like overlay effect when hovered */}
      <div className={cn(
        "absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300",
        isHovered && "opacity-10"
      )}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-20" />
      </div>
    </div>
  );
};

export default ProjectCard;
