import { useState, useCallback } from "react";

interface TiltOptions {
  maxTilt?: number;
  scale?: number;
}

interface TiltReturn {
  tiltStyle: React.CSSProperties;
  isHovered: boolean;
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onBlur: () => void;
  };
}

export function useTilt({ maxTilt = 25, scale = 1 }: TiltOptions = {}): TiltReturn {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(${scale})`,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isHovered) return;

      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / maxTilt;
      const rotateY = (centerX - x) / maxTilt;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      });
    },
    [isHovered, maxTilt, scale]
  );

  const resetTilt = useCallback(() => {
    setIsHovered(false);
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(${scale})`,
    });
  }, [scale]);

  return {
    tiltStyle,
    isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: resetTilt,
      onBlur: resetTilt,
    },
  };
}
