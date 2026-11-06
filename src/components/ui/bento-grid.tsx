import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { YellowDotGrid } from "./decorative-shapes";

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
  badgeColor = "purple",
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: "purple" | "yellow";
  accentColor?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={cn(
        "relative rounded-3xl p-6 sm:p-7 bg-white border border-[#C9A5E8]/40 hover:border-[#6B18A8] shadow-sm hover:shadow-xl shadow-purple-950/5 hover:shadow-purple-950/10 transition-all duration-300 justify-between flex flex-col space-y-4 cursor-pointer overflow-hidden backdrop-blur-sm group/bento",
        className
      )}
    >
      {/* Decorative Yellow Dot Grid Accent */}
      <div className="absolute top-4 right-4 opacity-30 group-hover/bento:opacity-85 transition-opacity">
        <YellowDotGrid rows={3} cols={3} dotColor="#F5D32F" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          {badge && (
            <span
              className={cn(
                "px-3.5 py-1 rounded-full text-xs font-bold border tracking-wide uppercase shadow-2xs",
                badgeColor === "yellow"
                  ? "bg-[#FFF7D1] text-[#713f12] border-[#F5D32F]"
                  : "bg-[#F5EDFB] text-[#6B18A8] border-[#C9A5E8]/80"
              )}
            >
              {badge}
            </span>
          )}
          {header}
        </div>

        <div className="mb-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#F5EDFB] group-hover/bento:bg-[#FFF7D1] shadow-xs border border-[#C9A5E8]/60 flex items-center justify-center text-[#6B18A8] group-hover/bento:scale-110 group-hover/bento:rotate-2 transition-all duration-300">
            {icon}
          </div>
        </div>

        <div className="font-sans font-extrabold text-[#292333] text-lg sm:text-xl tracking-tight leading-snug group-hover/bento:text-[#6B18A8] transition-colors">
          {title}
        </div>

        <div className="font-sans font-medium text-[#756D7C] text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
          {description}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-[#6B18A8] pt-3 border-t border-[#F5EDFB]">
        <span className="group-hover/bento:text-[#4B0D78] transition-colors">Kunjungi Layanan</span>
        <div className="w-6 h-6 rounded-full bg-[#F5EDFB] group-hover/bento:bg-[#F5D32F] text-[#6B18A8] group-hover/bento:text-[#3B074A] flex items-center justify-center transition-all duration-200 group-hover/bento:translate-x-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
