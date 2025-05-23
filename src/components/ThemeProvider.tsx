
import React, { createContext, useContext, useEffect, useState } from "react";
import { SunIcon, MoonIcon, ZapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light" | "matrix";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && ["dark", "light", "matrix"].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      
      setIsTransitioning(true);
      
      // Remove all theme classes
      root.classList.remove("dark", "light", "matrix");
      
      // Add the current theme class
      root.classList.add(theme);
      
      localStorage.setItem("theme", theme);
      
      // Add transition class for fancy effect
      root.classList.add("theme-transition");
      
      // Remove transition class after animation completes
      const timer = setTimeout(() => {
        root.classList.remove("theme-transition");
        setIsTransitioning(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      // Cycle through themes: dark -> light -> matrix -> dark
      if (prev === "dark") return "light";
      if (prev === "light") return "matrix";
      return "dark";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
      {isTransitioning}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-all duration-300 relative overflow-hidden", 
        theme === "dark" 
          ? "bg-cyber-dark text-cyber-blue hover:bg-cyber-dark/80" 
          : theme === "light"
            ? "bg-gray-200 text-cyber-dark hover:bg-gray-300"
            : "bg-cyber-black text-cyber-green hover:bg-cyber-black/80 digital-interference",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" && <SunIcon size={20} className="animate-glow" />}
      {theme === "light" && <MoonIcon size={20} />}
      {theme === "matrix" && <ZapIcon size={20} className="neon-text-green" />}
    </button>
  );
};
