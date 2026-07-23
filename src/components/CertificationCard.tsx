import React from "react";
import { cn } from "@/lib/utils";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialLink?: string;
  logo?: string;
  className?: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  issuer,
  date,
  expiry,
  credentialLink,
  logo,
  className,
}) => {
  const { tiltStyle, isHovered, handlers } = useTilt({ maxTilt: 25 });

  return (
    <div
      className={cn(
        "cyber-card card-blue cyber-card-3d border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300",
        isHovered && "shadow-xl shadow-cyber-blue/20",
        className
      )}
      style={tiltStyle}
      {...handlers}
    >
      <div className={cn("flex items-start gap-4 transition-transform", isHovered && "scale-[1.02]")}>
        <div className="flex-shrink-0">
          {logo ? (
            <img 
              src={logo} 
              alt={issuer}
              className="w-12 h-12 object-contain bg-cyber-dark p-1 rounded"
              loading="lazy"
            />
          ) : (
            <div className="w-12 h-12 bg-cyber-dark flex items-center justify-center rounded">
              <Award className={cn("h-8 w-8 text-cyber-blue", isHovered && "animate-pulse")} />
            </div>
          )}
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold text-cyber-blue mb-1">{title}</h3>
          <p className="text-gray-300">{issuer}</p>
          
          <div className="flex flex-wrap items-center gap-x-4 mt-2 text-sm text-gray-400">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1.5" />
              <span>{date}{expiry ? ` - ${expiry}` : ''}</span>
            </div>
            
            {credentialLink && (
              <a 
                href={credentialLink}
                target="_blank"
                rel="noopener noreferrer" 
                className={cn(
                  "flex items-center text-cyber-blue hover:underline",
                  isHovered && "gap-2 transition-all"
                )}
              >
                <ExternalLink size={14} className={cn("mr-1.5", isHovered && "animate-pulse")} />
                <span>Verify</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={cn(
        "absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300",
        isHovered && "opacity-10"
      )}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-20" />
      </div>
    </div>
  );
};

export default CertificationCard;
