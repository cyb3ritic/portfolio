
import React, { useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface MatrixRainProps {
  density?: number;
  speed?: number;
  glitchEffect?: boolean;
  colorVariation?: boolean;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ 
  density = 20, 
  speed = 20,
  glitchEffect = true,
  colorVariation = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas to be fullscreen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();
    
    // Matrix characters - expanded set with more Japanese characters
    const chars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯ";
    
    // Calculate how many columns we need
    const fontSize = 16; // Font size for characters
    const columns = Math.ceil(canvas.width / fontSize * (density / 15));
    
    // Create drops for each column
    const drops: number[] = Array(columns).fill(1);
    
    // Character speed variation for more natural look
    const speedVariation: number[] = Array(columns).fill(0).map(() => 
      Math.random() * 0.5 + 0.75 // 0.75 to 1.25 speed multiplier
    );
    
    // Base colors for different themes
    let baseColor = "#00ff41"; // Default green for dark theme
    if (theme === "light") {
      baseColor = "rgba(0, 100, 0, 0.7)"; // Darker green for light theme
    } else if (theme === "matrix") {
      baseColor = "#02f902"; // Bright matrix green
    }
    
    // Character color variations
    const colorVariants = [
      baseColor,
      theme === "matrix" ? "#00ffff" : "#1EAEDB", // Blue variation
      theme === "matrix" ? "#88ff88" : "#3cff3c", // Light green variation
      theme === "matrix" ? "#ffffff" : "#f0f0f0"  // White/bright variation
    ];
    
    // Glitch timers
    let lastGlitchTime = Date.now();
    let isGlitching = false;
    let glitchDuration = 0;
    
    // Drawing function
    function draw() {
      // Set transparency for trailing effect
      ctx.fillStyle = theme === "light" 
        ? "rgba(255, 255, 255, 0.08)" 
        : "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Occasionally create glitch effect
      if (glitchEffect && Math.random() > 0.997) {
        isGlitching = true;
        glitchDuration = Math.random() * 500 + 100; // 100-600ms glitch
        lastGlitchTime = Date.now();
      }
      
      // Check if glitch should end
      if (isGlitching && Date.now() - lastGlitchTime > glitchDuration) {
        isGlitching = false;
      }
      
      // Apply glitch effect to ctx
      if (isGlitching) {
        ctx.shadowBlur = Math.random() * 8 + 2;
        ctx.shadowColor = colorVariants[Math.floor(Math.random() * colorVariants.length)];
        if (Math.random() > 0.7) {
          ctx.translate(Math.random() * 4 - 2, Math.random() * 4 - 2);
        }
      } else {
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
      }
      
      // For each column, draw a character
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Color variation for more depth
        if (colorVariation && Math.random() > 0.85) {
          ctx.fillStyle = colorVariants[Math.floor(Math.random() * colorVariants.length)];
        } else {
          ctx.fillStyle = baseColor;
        }
        
        // Setup text style
        ctx.font = fontSize + "px monospace";
        
        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);
        
        // Random sparkly effect - increased probability for matrix theme
        const sparkleThreshold = theme === "matrix" ? 0.96 : 0.975;
        if (Math.random() > sparkleThreshold) {
          ctx.fillStyle = "#fff"; // White flash
          ctx.fillText(char, x, y);
          
          // Add a glow effect to some sparkles
          if (Math.random() > 0.5) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = theme === "matrix" ? "#00ff41" : "#ffffff";
            ctx.fillText(char, x, y);
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
          }
          
          ctx.fillStyle = baseColor; // Reset color
        }
        
        // Reset drops if they reach bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment drop position with speed variation
        drops[i] += speedVariation[i];
      }
      
      // Reset any glitch transformations
      if (isGlitching) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
    
    // Animation speed based on the speed prop
    const msPerFrame = Math.max(10, 50 - speed);
    
    // Start animation loop
    const interval = setInterval(draw, msPerFrame);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [density, speed, theme, glitchEffect, colorVariation]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ 
        opacity: theme === "matrix" ? 0.25 : 0.15
      }}
    />
  );
};

export default MatrixRain;
