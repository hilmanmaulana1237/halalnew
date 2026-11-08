import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: "purple" | "yellow" | "emerald" | "amber";
  title: string | React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  theme?: "light" | "dark";
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeColor = "purple",
  title,
  subtitle,
  align = "center",
  className,
  theme = "light",
  titleClassName,
  subtitleClassName,
}) => {
  const isDark = theme === "dark";

  const badgeStylesLight = {
    purple: "bg-[#F5EDFB] text-[#6B18A8] border-[#C9A5E8]/80 shadow-xs",
    yellow: "bg-[#FFF7D1] text-[#713f12] border-[#F5D32F] shadow-xs",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200 shadow-xs",
    amber: "bg-[#FFF7D1] text-[#854d0e] border-[#F5D32F] shadow-xs",
  };

  const badgeStylesDark = {
    purple: "bg-[#6B18A8]/20 text-purple-300 border-[#6B18A8]/40 shadow-xs backdrop-blur-md",
    yellow: "bg-[#F5D32F]/15 text-[#F5D32F] border-[#F5D32F]/40 shadow-xs backdrop-blur-md",
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-xs backdrop-blur-md",
    amber: "bg-[#F5D32F]/15 text-[#F5D32F] border-[#F5D32F]/40 shadow-xs backdrop-blur-md",
  };

  const badgeStyles = isDark ? badgeStylesDark : badgeStylesLight;

  const dotStyles = {
    purple: "bg-[#6B18A8]",
    yellow: "bg-[#F5D32F]",
    emerald: "bg-emerald-500",
    amber: "bg-[#F5D32F]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-3xl mb-12 sm:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border mb-4 tracking-wider uppercase",
            badgeStyles[badgeColor]
          )}
        >
          <span className={cn("w-2 h-2 rounded-full", dotStyles[badgeColor])} />
          <span>{badge}</span>
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]",
          isDark ? "text-white" : "text-[#292333]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed font-normal",
            isDark ? "text-neutral-300" : "text-[#756D7C]",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
