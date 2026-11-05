import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: "purple" | "emerald" | "blue" | "amber";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeColor = "purple",
  title,
  subtitle,
  align = "center",
  className,
}) => {
  const badgeStyles = {
    purple: "bg-purple-50 text-[#6b1282] border-purple-200/80",
    emerald: "bg-purple-50 text-[#6b1282] border-purple-200/80",
    blue: "bg-purple-50 text-[#6b1282] border-purple-200/80",
    amber: "bg-purple-50 text-[#6b1282] border-purple-200/80",
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
            "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border mb-3 tracking-wider uppercase shadow-xs",
            badgeStyles[badgeColor]
          )}
        >
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a0726] tracking-tight leading-[1.2]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
