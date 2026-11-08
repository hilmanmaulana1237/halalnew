import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { YellowDotGrid } from "./decorative-shapes";

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
  description,
  icon,
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

  const formattedValue = numberTarget ? `${displayCount.toLocaleString("id-ID")}${suffix}` : value;
  const isLongValue = formattedValue.length > 5;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex flex-col justify-between p-4.5 sm:p-7 rounded-3xl bg-white border border-[#C9A5E8]/50 hover:border-[#6B18A8] shadow-md shadow-purple-950/5 hover:shadow-xl hover:shadow-purple-950/10 transition-all duration-300 min-h-[210px] sm:min-h-[235px] overflow-hidden group",
        className
      )}
    >
      {/* Decorative Yellow Dot Grid in top-right corner */}
      <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-90 transition-opacity">
        <YellowDotGrid rows={3} cols={3} dotColor="#F5D32F" />
      </div>

      {/* Top Bar: Icon and Change Badge */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F5EDFB] text-[#6B18A8] border border-[#C9A5E8]/60 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-110 group-hover:bg-[#FFF7D1] group-hover:text-[#6B18A8] transition-all duration-300">
          {icon}
        </div>

        {change && (
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] shadow-2xs shrink-0 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D32F]" />
            {change}
          </span>
        )}
      </div>

      {/* Main Metric Value & Label */}
      <div className="my-auto">
        <div className="text-[11px] font-extrabold text-[#756D7C] uppercase tracking-wider mb-1">
          {label}
        </div>
        <div
          className={cn(
            "font-extrabold text-[#4B0D78] tracking-tight group-hover:text-[#6B18A8] transition-colors",
            isLongValue ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl lg:text-5xl"
          )}
        >
          {formattedValue}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="pt-3 border-t border-[#F5EDFB]">
          <p className="text-xs text-[#756D7C] leading-relaxed font-medium">
            {description}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
