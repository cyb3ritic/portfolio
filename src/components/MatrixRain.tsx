import React, { useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface MatrixRainProps {
  density?: number;
  speed?: number;
  glitchEffect?: boolean;
  colorVariation?: boolean;
  showOnlyInDark?: boolean;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ 
  density = 20, 
  speed = 20,
  glitchEffect = true,
  colorVariation = true,
  showOnlyInDark = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const { resolvedTheme } = useTheme();
  
  const cleanup = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Hide matrix rain in light mode if showOnlyInDark is true
    if (showOnlyInDark && resolvedTheme === "light") {
      cleanup();
      return;
    }
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas to be fullscreen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();
    
    // Enhanced Matrix characters - more comprehensive Japanese set
    const chars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    // Calculate columns based on density
    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize * (density / 15));
    
    // Initialize drops and properties
    const drops: number[] = Array(columns).fill(1);
    const dropSpeeds: number[] = Array(columns).fill(0).map(() => 
      Math.random() * 0.5 + 0.75
    );
    const trailLengths: number[] = Array(columns).fill(0).map(() =>
      Math.floor(Math.random() * 20) + 10
    );
    
    // Theme-based colors
    const getColors = () => {
      if (resolvedTheme === "dark") {
        return {
          primary: "#00ff41",
          variants: ["#00ff41", "#1EAEDB", "#3cff3c", "#ffffff"],
          trail: "rgba(0, 0, 0, 0.08)",
          glow: "#00ff41"
        };
      } else {
        return {
          primary: "rgba(0, 100, 0, 0.8)",
          variants: ["rgba(0, 100, 0, 0.8)", "rgba(0, 50, 150, 0.6)", "rgba(0, 150, 0, 0.7)", "rgba(50, 50, 50, 0.9)"],
          trail: "rgba(255, 255, 255, 0.12)",
          glow: "rgba(0, 100, 0, 0.5)"
        };
      }
    };
    
    const colors = getColors();
    
    // Performance optimizations
    let lastTime = 0;
    const targetFPS = Math.max(15, Math.min(60, speed));
    const frameInterval = 1000 / targetFPS;
    
    // Glitch system
    let glitchState = {
      active: false,
      startTime: 0,
      duration: 0,
      intensity: 0
    };
    
    // Pre-calculate some values for performance
    const sparkleThreshold = 0.975;
    const glitchTriggerThreshold = 0.998;
    
    const draw = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationIdRef.current = requestAnimationFrame(draw);
        return;
      }
      
      lastTime = currentTime;
      
      // Clear with trail effect
      ctx.fillStyle = colors.trail;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Glitch management
      if (glitchEffect) {
        if (!glitchState.active && Math.random() > glitchTriggerThreshold) {
          glitchState = {
            active: true,
            startTime: currentTime,
            duration: Math.random() * 300 + 100,
            intensity: Math.random() * 0.5 + 0.3
          };
        }
        
        if (glitchState.active && currentTime - glitchState.startTime > glitchState.duration) {
          glitchState.active = false;
        }
      }
      
      // Apply glitch effects
      if (glitchState.active) {
        const glitchOffset = glitchState.intensity * 3;
        ctx.save();
        ctx.shadowBlur = Math.random() * 6 + 2;
        ctx.shadowColor = colors.glow;
        
        if (Math.random() > 0.7) {
          ctx.translate(
            (Math.random() - 0.5) * glitchOffset,
            (Math.random() - 0.5) * glitchOffset
          );
        }
      }
      
      // Set font once for performance
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      
      // Draw matrix rain
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Determine character color
        let charColor = colors.primary;
        if (colorVariation && Math.random() > 0.85) {
          charColor = colors.variants[Math.floor(Math.random() * colors.variants.length)];
        }
        
        // Draw main character
        ctx.fillStyle = charColor;
        ctx.fillText(char, x, y);
        
        // Add leading bright character (head of trail)
        if (Math.random() > 0.95) {
          ctx.fillStyle = resolvedTheme === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.9)";
          ctx.fillText(char, x, y);
        }
        
        // Sparkle effect
        if (Math.random() > sparkleThreshold) {
          ctx.save();
          ctx.fillStyle = resolvedTheme === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.9)";
          ctx.shadowBlur = 8;
          ctx.shadowColor = colors.glow;
          ctx.fillText(char, x, y);
          ctx.restore();
        }
        
        // Reset drop position
        if (drops[i] * fontSize > canvas.height + 50) {
          if (Math.random() > 0.975) {
            drops[i] = -Math.random() * 50; // Start above screen
            dropSpeeds[i] = Math.random() * 0.5 + 0.75; // New speed
          }
        }
        
        // Move drop
        drops[i] += dropSpeeds[i];
      }
      
      // Restore context if glitch was applied
      if (glitchState.active) {
        ctx.restore();
      }
      
      // Continue animation
      animationIdRef.current = requestAnimationFrame(draw);
    };
    
    // Start animation
    animationIdRef.current = requestAnimationFrame(draw);
    
    // Cleanup function
    return () => {
      cleanup();
      window.removeEventListener("resize", resize);
    };
    
  }, [density, speed, resolvedTheme, glitchEffect, colorVariation, showOnlyInDark, cleanup]);
  
  // Don't render canvas if showOnlyInDark is true and theme is light
  if (showOnlyInDark && resolvedTheme === "light") {
    return null;
  }
  
  const getOpacity = () => {
    if (resolvedTheme === "dark") {
      return 0.25;
    } else {
      return 0.08; // Much more subtle in light mode
    }
  };
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: getOpacity(),
        zIndex: -1,
        mixBlendMode: resolvedTheme === "dark" ? "normal" : "multiply"
      }}
    />
  );
};

export default MatrixRain;