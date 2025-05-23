
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CyberButton from "./CyberButton";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeProvider";

interface NavBarProps {
  onNavClick: (section: string) => void;
  className?: string;
  activeSection?: string;
}

const NavBar: React.FC<NavBarProps> = ({ 
  onNavClick, 
  className,
  activeSection = ""
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Blog", id: "blog" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (scrollPosition > lastScrollY && scrollPosition > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(scrollPosition);
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(id);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-cyber-black/90 dark:backdrop-blur-md shadow-lg py-2 light:bg-white/90 light:backdrop-blur-md" 
          : "py-4",
        isVisible ? "translate-y-0" : "-translate-y-full",
        className
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-cyber-green font-mono mr-1 dark:text-cyber-green light:text-cyber-dark">&gt;</span>
          <span className="font-bold text-lg text-white dark:text-white light:text-cyber-dark">
            <span className="cyber-text-gradient"><a href="#">cyb3ritic</a></span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          {navItems.map((item) => (
            <CyberButton
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "text-sm relative group overflow-hidden",
                activeSection === item.id && "after:content-[''] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-cyber-green"
              )}
            >
              {item.label}
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyber-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  activeSection === item.id ? 'opacity-0' : 'opacity-100'
                }`} 
              />
            </CyberButton>
          ))}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <CyberButton
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu />
          </CyberButton>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cyber-dark border-t border-cyber-green/20 py-2 dark:bg-cyber-dark light:bg-gray-100">
          <div className="container mx-auto px-4">
            {navItems.map((item) => (
              <CyberButton
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left my-2"
              >
                {item.label}
              </CyberButton>
            ))}
            <div className="my-2 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
