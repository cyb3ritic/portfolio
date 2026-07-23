
import React from "react";
import AccessTerminal from "@/components/AccessTerminal";
import CyberButton from "./CyberButton";

interface LoadingOverlayProps {
  onComplete: () => void;
}

const STORAGE_KEY = "portfolio_intro_seen";

export const hasSeenIntro = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ onComplete }) => {
  const handleSkip = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch { /* ignore */ }
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-black">
      <AccessTerminal onComplete={() => {
        try {
          localStorage.setItem(STORAGE_KEY, "true");
        } catch { /* ignore */ }
        onComplete();
      }} />
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-sm font-mono text-gray-500 hover:text-cyber-green transition-colors"
      >
        Skip [ESC]
      </button>
    </div>
  );
};

export default LoadingOverlay;
