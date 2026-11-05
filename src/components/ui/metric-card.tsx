import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface MetricCardProps {
  label: string;
  value: string;
  numberTarget?: number;
  suffix?: string;
  change?: string;
  isPositive?: boolean;
  description?: string;
  icon?: React.ReactNode;
  accentColor?: "purple" | "emerald" | "blue" | "amber";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  numberTarget,
  suffix = "+",
  change,
  isPositive = true,
  description,
  icon,
  accentColor = "purple",
  className,
}) => {
  const [displayCount, setDisplayCount] = useState<number>(0);

  useEffect(() => {
    if (!numberTarget) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = numberTarget / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numberTarget) {
        setDisplayCount(numberTarget);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numberTarget]);

  const colorConfig = {
    purple: {
      border: "border-purple-200/80 hover:border-[#6b1282]",
      bg: "bg-white hover:bg-purple-50/30",
      iconBg: "bg-purple-100 text-[#6b1282]",
      badge: "bg-purple-50 text-[#6b1282] border-purple-200",
      number: "text-[#6b1282]",
      glow: "shadow-lg shadow-purple-950/5 hover:shadow-purple-950/15",
    },
    emerald: {
      border: "border-purple-200/80 hover:border-[#86198f]",
      bg: "bg-white hover:bg-purple-50/30",
      iconBg: "bg-purple-50 text-[#86198f]",
      badge: "bg-purple-50 text-[#86198f] border-purple-200",
      number: "text-[#86198f]",
      glow: "shadow-lg shadow-purple-950/5 hover:shadow-purple-950/15",
    },
    blue: {
      border: "border-purple-200/80 hover:border-[#4a0d5c]",
      bg: "bg-white hover:bg-purple-50/30",
      iconBg: "bg-purple-100 text-[#4a0d5c]",
      badge: "bg-purple-50 text-[#4a0d5c] border-purple-200",
      number: "text-[#4a0d5c]",
      glow: "shadow-lg shadow-purple-950/5 hover:shadow-purple-950/15",
    },
    amber: {
      border: "border-purple-200/80 hover:border-[#6b1282]",
      bg: "bg-white hover:bg-purple-50/30",
      iconBg: "bg-purple-100 text-[#6b1282]",
      badge: "bg-purple-50 text-[#6b1282] border-purple-200",
      number: "text-[#6b1282]",
      glow: "shadow-lg shadow-purple-950/5 hover:shadow-purple-950/15",
    },
  };

  const currentTheme = colorConfig[accentColor];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border shadow-lg backdrop-blur-md transition-all duration-300",
        currentTheme.border,
        currentTheme.bg,
        currentTheme.glow,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-neutral-600 tracking-wider uppercase">
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center w-11 h-11 rounded-2xl shadow-xs transition-transform duration-300 hover:rotate-6",
              currentTheme.iconBg
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span
          className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight",
            currentTheme.number
          )}
        >
          {numberTarget ? `${displayCount.toLocaleString("id-ID")}${suffix}` : value}
        </span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border",
              currentTheme.badge
            )}
          >
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
};
