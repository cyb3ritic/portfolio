
import React from "react";
import { cn } from "@/lib/utils";

interface AsciiArtProps {
  art: string;
  className?: string;
}

const AsciiArt: React.FC<AsciiArtProps> = ({ art, className }) => {
  return (
    <pre className={cn("ascii-art font-mono text-cyber-green", className)}>
      {art}
    </pre>
  );
};

// Predefined ASCII art headers
export const ASCII_ART = {
  TERMINAL: `
 ______________________________
|  _________________________   |
| |                         |  |
| |    > Access Granted     |  |
| |                         |  |
| |_________________________|  |
|______________________________|
  `,

  TOOLS: `
  _____           _     
 |_   _|__   ___ | |___ 
   | |/ _ \\ / _ \\| / __|
   | | (_) | (_) | \\__ \\
   |_|\\___/ \\___/|_|___/                                            
  `,
  PROJECTS: `
  ____           _           _       
 |  _ \\ _ __ ___ (_) ___  ___| |_ ___ 
 | |_) | '__/ _ \\| |/ _ \\/ __| __/ __|
 |  __/| | | (_) | |  __/ (__| |_\\__ \\
 |_|   |_|  \\___// |\\___|\\___|\\__|___/
               |__/  
  `,
  BLOG: `
   _     _                 
  | |   | |                
  | |__ | | ___   __ _ ___ 
  | '_ \\| |/ _ \\ / _\` / __|
  | |_)|| | (_) | (_| \\__ \\
  |_.__/|_|\\___/ \\__, |___/
                  __/ |    
                 |___/
  `,
  CONTACT: `
   _____            _             _   
  / ____|          | |           | |  
 | |     ___  _ __ | |_ __ _  ___| |_ 
 | |    / _ \\| '_ \\| __/ _\` |/ __| __|
 | |___| (_) | | | | || (_| | (__| |_ 
  \\_____\\___/|_| |_|\\__\\__,_|\\___|\\__|
  `,
};

export default AsciiArt;
