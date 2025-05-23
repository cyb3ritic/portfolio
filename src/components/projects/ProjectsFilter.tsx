
import React, { useState, useEffect } from "react";
import { ListFilter } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AnimatedSection from "../AnimatedSection";

interface ProjectsFilterProps {
  selectedTag: string | null;
  projectTags: string[];
  onFilterChange: (tag: string | null) => void;
  onSearchChange: (query: string) => void;
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({
  selectedTag,
  projectTags,
  onFilterChange,
  onSearchChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <AnimatedSection animation="fade-in" delay={200} className="mb-8 mt-16"> 
      <div className="flex flex-col sm:flex-row gap-4 max-w-3xl">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-cyber-dark/50 border-cyber-green/30 text-cyber-green placeholder:text-cyber-green/50 focus-visible:ring-cyber-green/30 h-11 transition-all duration-300"
          />
        </div>
        
        <Select
          value={selectedTag || "all"}
          onValueChange={(value) => onFilterChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-[180px] bg-cyber-dark/50 border-cyber-blue/30 text-cyber-blue focus:ring-cyber-blue/30 h-11 transition-all duration-300">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-cyber-dark border-cyber-blue/30">
            <SelectItem value="all" className="text-cyber-blue hover:bg-cyber-blue/10 transition-colors duration-200">
              All Categories
            </SelectItem>
            {projectTags.map((tag) => (
              <SelectItem
                key={tag}
                value={tag}
                className="text-cyber-blue hover:bg-cyber-blue/10 transition-colors duration-200"
              >
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </AnimatedSection>
  );
};

export default ProjectsFilter;
