
import React from "react";
import AccessTerminal from "@/components/AccessTerminal";

interface LoadingOverlayProps {
  onComplete: () => void;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-black">
      <AccessTerminal onComplete={onComplete} />
    </div>
  );
};

export default LoadingOverlay;
