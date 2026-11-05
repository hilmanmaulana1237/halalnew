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
      border: "border-purple-200/80 hover:border-purple-500",
      bg: "bg-gradient-to-br from-white via-purple-50/30 to-white",
      iconBg: "bg-purple-100 text-[#6b1282]",
      badge: "bg-purple-100 text-purple-800 border-purple-200",
      number: "text-[#6b1282]",
      glow: "shadow-purple-500/10 hover:shadow-purple-500/20",
    },
    emerald: {
      border: "border-emerald-200/80 hover:border-emerald-500",
      bg: "bg-gradient-to-br from-white via-emerald-50/30 to-white",
      iconBg: "bg-emerald-100 text-[#005a36]",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      number: "text-[#005a36]",
      glow: "shadow-emerald-500/10 hover:shadow-emerald-500/20",
    },
    blue: {
      border: "border-sky-200/80 hover:border-sky-500",
      bg: "bg-gradient-to-br from-white via-sky-50/30 to-white",
      iconBg: "bg-sky-100 text-[#0284c7]",
      badge: "bg-sky-100 text-sky-800 border-sky-200",
      number: "text-[#0284c7]",
      glow: "shadow-sky-500/10 hover:shadow-sky-500/20",
    },
    amber: {
      border: "border-amber-200/80 hover:border-amber-500",
      bg: "bg-gradient-to-br from-white via-amber-50/30 to-white",
      iconBg: "bg-amber-100 text-amber-800",
      badge: "bg-amber-100 text-amber-900 border-amber-200",
      number: "text-amber-800",
      glow: "shadow-amber-500/10 hover:shadow-amber-500/20",
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
