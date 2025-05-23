
import React from "react";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  level?: 1 | 2 | 3 | 4 | 5;
  variant?: "default" | "tool" | "language" | "technique";
  className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  level = 3,
  variant = "default",
  className,
}) => {
  const getBadgeVariantClasses = () => {
    switch (variant) {
      case "tool":
        return "border-cyber-green text-cyber-green";
      case "language":
        return "border-cyber-blue text-cyber-blue";
      case "technique":
        return "border-cyber-purple text-cyber-purple";
      default:
        return "border-gray-400 text-gray-400";
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border rounded-md px-3 py-1 text-sm font-mono",
        getBadgeVariantClasses(),
        className
      )}
    >
      <span>{name}</span>
      <div className="ml-2 flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              star <= level ? "bg-current" : "bg-current/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillBadge;
