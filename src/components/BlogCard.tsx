
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import CyberButton from "./CyberButton";
import { ArrowRightIcon, FileTextIcon } from "lucide-react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface BlogCardProps {
  title: string;
  description: string;
  platform: "HackTheBox" | "TryHackMe";
  difficulty: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  variant?: "green" | "blue" | "purple";
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  platform,
  difficulty,
  date,
  readTime,
  tags,
  link,
  variant = "green",
  className,
  imageUrl,
  imageAlt = "Blog post thumbnail",
}) => {
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    green: "card-green border-cyber-green/20 hover:border-cyber-green/50",
    blue: "card-blue border-cyber-blue/20 hover:border-cyber-blue/50",
    purple: "card-purple border-cyber-purple/20 hover:border-cyber-purple/50",
  };

  const variantTextStyles = {
    green: "text-cyber-green",
    blue: "text-cyber-blue",
    purple: "text-cyber-purple",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const resetTilt = () => {
    setIsHovered(false);
    setTiltStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
  };

  return (
    <div
      className={cn(
        "cyber-card group transition-all duration-300 hover:scale-[1.02] flex flex-col h-full cyber-card-3d",
        variantStyles[variant],
        isHovered && "shadow-lg",
        className
      )}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      onBlur={resetTilt}
    >
      {imageUrl && (
        <div className="mb-4 overflow-hidden rounded-sm h-48 relative">
          <LazyLoadImage
            src={imageUrl}
            alt={imageAlt}
            effect="blur"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-80",
            `from-${variant === 'green' ? 'cyber-green' : variant === 'blue' ? 'cyber-blue' : 'cyber-purple'}/20 to-transparent`
          )} />
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={cn("text-xl font-bold mb-2 group-hover:scale-105 transition-transform", 
            variantTextStyles[variant])}>
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-mono bg-cyber-black/50 px-2 py-1 rounded">
              {platform}
            </span>
            <span className="text-xs font-mono bg-cyber-black/50 px-2 py-1 rounded">
              {difficulty}
            </span>
          </div>
        </div>
        <FileTextIcon className={cn("w-6 h-6 flex-shrink-0", variantTextStyles[variant])} />
      </div>

      <p className="text-gray-300 mb-4 line-clamp-2">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-cyber-black border border-gray-700 px-2 py-0.5 text-xs font-mono rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
        <div className="flex gap-4 text-sm text-gray-400">
          <span>{date}</span>
          <span>{readTime}</span>
        </div>
        
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 text-sm font-mono",
            variantTextStyles[variant],
            "group-hover:gap-3 transition-all"
          )}
        >
          Read Writeup
          <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
