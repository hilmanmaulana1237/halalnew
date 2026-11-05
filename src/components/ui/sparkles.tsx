import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string[];
}

/**
 * Aceternity UI - SparklesCore
 * Lightweight canvas-based ambient floating jewel stars and particles.
 */
export const SparklesCore: React.FC<SparklesProps> = ({
  id = "sparkles-canvas",
  className,
  background = "transparent",
  minSize = 0.6,
  maxSize = 2.4,
  particleDensity = 60,
  particleColor = ["#6b1282", "#10b981", "#0284c7", "#f59e0b", "#ffffff"],
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const count = Math.floor((width * height) / (100000 / particleDensity));
    const particles = Array.from({ length: Math.min(count, 120) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      color: particleColor[Math.floor(Math.random() * particleColor.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.pulseSpeed;

        if (p.opacity > 0.95 || p.opacity < 0.2) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxSize, minSize, particleDensity, particleColor]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 z-10 w-full h-full", className)}
      style={{ background }}
    />
  );
};

