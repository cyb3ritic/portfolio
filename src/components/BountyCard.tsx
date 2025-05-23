import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { BugIcon, TrophyIcon, DollarSignIcon } from "lucide-react";

interface BountyCardProps {
  company: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  reward?: string;
  date: string;
  className?: string;
}

const BountyCard: React.FC<BountyCardProps> = ({
  company,
  description,
  severity,
  reward,
  date,
  className,
}) => {
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
  const [isHovered, setIsHovered] = useState(false);

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

  const getSeverityColor = () => {
    switch (severity) {
      case "critical":
        return "text-red-500 border-red-500";
      case "high":
        return "text-orange-500 border-orange-500";
      case "medium":
        return "text-yellow-500 border-yellow-500";
      case "low":
        return "text-blue-500 border-blue-500";
      case "info":
        return "text-gray-500 border-gray-500";
      default:
        return "text-gray-500 border-gray-500";
    }
  };

  return (
    <div
      className={cn(
        "cyber-card cyber-card-3d border-cyber-purple/20 hover:border-cyber-purple/60 transition-all duration-300",
        isHovered && "shadow-lg shadow-cyber-purple/20",
        className
      )}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      onBlur={resetTilt}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-cyber-purple">{company}</h3>
        <span className="text-xs text-gray-400 font-mono">{date}</span>
      </div>

      <p className="text-gray-300 my-3">{description}</p>

      <div className="flex flex-wrap justify-between items-center mt-4">
        <div className="flex items-center">
          <BugIcon size={16} className="mr-1 text-cyber-purple" />
          <span
            className={cn(
              "text-sm font-medium border px-2 rounded capitalize",
              getSeverityColor()
            )}
          >
            {severity}
          </span>
        </div>

        {reward && (
          <div className="flex items-center">
            <DollarSignIcon size={16} className="mr-1 text-cyber-green" />
            <span className="text-cyber-green font-mono">{reward}</span>
          </div>
        )}
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

export default BountyCard;
