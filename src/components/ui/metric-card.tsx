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
      badge: "bg-purple-50 text-[#6b1282] border-purple-200 font-bold",
      number: "text-[#6b1282]",
      glow: "shadow-lg shadow-purple-950/5 hover:shadow-purple-950/15",
    },
    emerald: {
      border: "border-emerald-200/80 hover:border-emerald-600",
      bg: "bg-white hover:bg-emerald-50/30",
      iconBg: "bg-emerald-100 text-emerald-800",
      badge: "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold",
      number: "text-emerald-700",
      glow: "shadow-lg shadow-emerald-950/5 hover:shadow-emerald-950/15",
    },
    blue: {
      border: "border-sky-200/80 hover:border-sky-600",
      bg: "bg-white hover:bg-sky-50/30",
      iconBg: "bg-sky-100 text-sky-800",
      badge: "bg-sky-50 text-sky-800 border-sky-200 font-bold",
      number: "text-sky-700",
      glow: "shadow-lg shadow-sky-950/5 hover:shadow-sky-950/15",
    },
    amber: {
      border: "border-amber-200/90 hover:border-amber-400",
      bg: "bg-white hover:bg-amber-50/20",
      iconBg: "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 border border-amber-300/70 shadow-xs",
      badge: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-900 border-amber-300 font-bold shadow-xs",
      number: "text-amber-600",
      glow: "shadow-lg shadow-amber-950/5 hover:shadow-amber-500/10",
    },
  };

  const currentTheme = colorConfig[accentColor];

  const formattedValue = numberTarget ? `${displayCount.toLocaleString("id-ID")}${suffix}` : value;
  const isLongValue = formattedValue.length > 5;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex flex-col justify-between p-6 rounded-3xl border shadow-lg backdrop-blur-md transition-all duration-300 min-h-[225px] sm:min-h-[235px]",
        currentTheme.border,
        currentTheme.bg,
        currentTheme.glow,
        className
      )}
    >
      {/* Top Header Label & Icon */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] sm:text-xs font-bold text-neutral-600 tracking-wider uppercase">
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-2xl shadow-xs transition-transform duration-300 shrink-0",
              currentTheme.iconBg
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Middle Value & Badge */}
      <div className="my-3 flex items-center justify-between gap-2 min-h-[48px]">
        <span
          className={cn(
            "font-black tracking-tight whitespace-nowrap",
            isLongValue
              ? "text-2xl sm:text-[28px] lg:text-[26px] xl:text-[30px]"
              : "text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px]",
            currentTheme.number
          )}
        >
          {formattedValue}
        </span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold border shrink-0 whitespace-nowrap",
              currentTheme.badge
            )}
          >
            {change}
          </span>
        )}
      </div>

      {/* Bottom Description */}
      {description && (
        <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal min-h-[42px] flex items-start">
          {description}
        </p>
      )}
    </motion.div>
  );
};
