import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  badge,
  accentColor = "purple",
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  accentColor?: "purple" | "emerald" | "blue" | "amber" | "rose" | "teal";
  onClick?: () => void;
}) => {
  const colorStyles = {
    purple: "border-purple-100/90 hover:border-[#6b1282] bg-white hover:bg-purple-50/20 shadow-sm hover:shadow-xl shadow-purple-950/5",
    emerald: "border-purple-100/90 hover:border-[#6b1282] bg-white hover:bg-purple-50/20 shadow-sm hover:shadow-xl shadow-purple-950/5",
    blue: "border-purple-100/90 hover:border-[#6b1282] bg-white hover:bg-purple-50/20 shadow-sm hover:shadow-xl shadow-purple-950/5",
    amber: "border-purple-100/90 hover:border-[#6b1282] bg-white hover:bg-purple-50/20 shadow-sm hover:shadow-xl shadow-purple-950/5",
    rose: "border-purple-100/90 hover:border-[#6b1282] bg-white hover:bg-purple-50/20 shadow-sm hover:shadow-xl shadow-purple-950/5",
    teal: "border-purple-100/90 hover:border-[#6b1282] bg-white hover:bg-purple-50/20 shadow-sm hover:shadow-xl shadow-purple-950/5",
  };

  const badgeStyles = {
    purple: "bg-purple-50 text-[#6b1282] border-purple-200",
    emerald: "bg-purple-50 text-[#6b1282] border-purple-200",
    blue: "bg-purple-50 text-[#6b1282] border-purple-200",
    amber: "bg-purple-50 text-[#6b1282] border-purple-200",
    rose: "bg-purple-50 text-[#6b1282] border-purple-200",
    teal: "bg-purple-50 text-[#6b1282] border-purple-200",
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={cn(
        "relative rounded-3xl p-6 sm:p-7 border transition-all duration-300 justify-between flex flex-col space-y-4 cursor-pointer overflow-hidden backdrop-blur-sm group/bento",
        colorStyles[accentColor],
        className
      )}
    >
      {/* Subtle iridescent glow on top right */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-current to-transparent opacity-[0.07] blur-2xl pointer-events-none group-hover/bento:opacity-20 transition-opacity" />

      <div>
        <div className="flex items-center justify-between mb-4">
          {badge && (
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase",
                badgeStyles[accentColor]
              )}
            >
              {badge}
            </span>
          )}
          {header}
        </div>

        <div className="mb-3">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-neutral-200/60 flex items-center justify-center group-hover/bento:scale-110 group-hover/bento:rotate-3 transition-transform duration-300">
            {icon}
          </div>
        </div>

        <div className="font-sans font-extrabold text-neutral-900 text-lg sm:text-xl tracking-tight leading-snug group-hover/bento:text-[#6b1282] transition-colors">
          {title}
        </div>

        <div className="font-sans font-normal text-neutral-600 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
          {description}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-bold text-[#6b1282] group-hover/bento:translate-x-1.5 transition-transform duration-200 pt-2 border-t border-neutral-100/80">
        <span>Kunjungi Layanan</span>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
};
