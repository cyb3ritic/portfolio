
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AccessTerminalProps {
  onComplete: () => void;
  className?: string;
}

const AccessTerminal: React.FC<AccessTerminalProps> = ({ onComplete, className }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authenticationStep, setAuthenticationStep] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);
  
  const authSteps = [
    { text: "> Establishing connection...", delay: 400 },
    { text: "> Scanning security systems...", delay: 600 },
    { text: "> Bypassing firewall...", delay: 500 },
    { text: "> Penetration successful.", delay: 400 },
  ];
  
  useEffect(() => {
    if (!isAuthenticating) return;

    if (authenticationStep < authSteps.length) {
      const timer = setTimeout(() => {
        setAuthenticationStep(prev => prev + 1);
      }, authSteps[authenticationStep].delay);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setIsAuthenticating(false);
        setAccessGranted(true);
        
        // Wait a moment before completing the intro
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 750);
        
        return () => clearTimeout(completeTimer);
      }, 500);
      
      return () => clearTimeout(finalTimer);
    }
  }, [authenticationStep, isAuthenticating, onComplete]);
  
  return (
    <div className={cn("font-mono text-cyber-green text-lg p-4", className)}>
      {isAuthenticating && (
        <div className="space-y-2">
          {authSteps.slice(0, authenticationStep + 1).map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "transition-opacity", 
                index === authenticationStep ? "animate-pulse" : "opacity-70"
              )}
            >
              {step.text}
            </div>
          ))}
        </div>
      )}
      
      {accessGranted && (
        <div className="text-center animate-access-granted">
          <div className="text-4xl font-bold mb-2">ACCESS GRANTED</div>
          <div className="text-xl">Welcome to the system</div>
        </div>
      )}
    </div>
  );
};

export default AccessTerminal;
