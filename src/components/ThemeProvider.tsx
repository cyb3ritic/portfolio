import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback, 
  useMemo
} from "react";
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";
const TRANSITION_DURATION = 300;

// Utility functions
const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme;
    return ["dark", "light", "system"].includes(stored) ? stored : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme: "dark" | "light") => {
  if (typeof window === "undefined") return;
  
  const root = document.documentElement;
  
  // Remove existing theme classes
  root.classList.remove("dark", "light");
  
  // Add new theme
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Compute resolved theme
  const resolvedTheme = useMemo(() => {
    return theme === "system" ? systemTheme : theme;
  }, [theme, systemTheme]);

  // Initialize theme on mount
  useEffect(() => {
    const stored = getStoredTheme();
    const system = getSystemTheme();
    
    setSystemTheme(system);
    
    if (stored) {
      setThemeState(stored);
    }
    // Default is already "dark", so no need to set it explicitly
    
    setIsHydrated(true);
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!isHydrated) return;
    
    setIsTransitioning(true);
    applyTheme(resolvedTheme);
    
    // Store theme preference
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      console.warn("Failed to save theme preference");
    }
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
    
    return () => clearTimeout(timer);
  }, [resolvedTheme, isHydrated, theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const themeOrder: Theme[] = ["dark", "light", "system"];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  }, [theme, setTheme]);

  const contextValue = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isTransitioning
  }), [theme, resolvedTheme, setTheme, toggleTheme, isTransitioning]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
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

export const ThemeToggle: React.FC<{ 
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}> = ({ 
  className, 
  size = "md",
  showLabel = false
}) => {
  const { theme, resolvedTheme, toggleTheme, isTransitioning } = useTheme();

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2", 
    lg: "p-3"
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon size={iconSizes[size]} className="transition-transform hover:rotate-180 duration-700" />;
      case "dark":
        return <MoonIcon size={iconSizes[size]} className="transition-transform hover:rotate-12 duration-300" />;
      case "system":
        return <MonitorIcon size={iconSizes[size]} className="transition-transform hover:scale-110 duration-200" />;
      default:
        return <MoonIcon size={iconSizes[size]} />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light": return "Light";
      case "dark": return "Dark";
      case "system": return "System";
      default: return "Dark";
    }
  };

  const baseClasses = cn(
    "relative overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full",
    "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    sizeClasses[size],
    isTransitioning && "animate-pulse"
  );

  const themeClasses = cn(
    resolvedTheme === "dark" 
      ? "bg-gray-800 text-blue-400 hover:bg-gray-700 focus:ring-blue-400/50" 
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400/50"
  );

  if (showLabel) {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          baseClasses.replace("rounded-full", "rounded-lg px-4"),
          themeClasses,
          "flex items-center gap-2",
          className
        )}
        aria-label={`Switch theme. Current: ${getThemeLabel()}`}
        type="button"
      >
        {getThemeIcon()}
        <span className="text-sm font-medium">{getThemeLabel()}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(baseClasses, themeClasses, className)}
      aria-label={`Switch theme. Current: ${getThemeLabel()}`}
      type="button"
      title={`${getThemeLabel()} theme`}
    >
      {getThemeIcon()}
      {isTransitioning && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
    </button>
  );
};

// Simple hook for theme-aware styling
export const useThemeClasses = () => {
  const { resolvedTheme } = useTheme();
  
  return useMemo(() => ({
    bg: resolvedTheme === "dark" ? "bg-gray-900" : "bg-white",
    text: resolvedTheme === "dark" ? "text-white" : "text-gray-900",
    border: resolvedTheme === "dark" ? "border-gray-700" : "border-gray-200",
    accent: resolvedTheme === "dark" ? "text-blue-400" : "text-blue-600"
  }), [resolvedTheme]);
};