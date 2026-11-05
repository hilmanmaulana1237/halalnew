import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MegaMenuItemProps {
  title: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
  children: React.ReactNode;
}

export const MegaMenuItem: React.FC<MegaMenuItemProps> = ({
  title,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none",
          isActive
            ? "text-[#6b1282] bg-purple-50 shadow-xs"
            : "text-neutral-700 hover:text-[#6b1282] hover:bg-purple-50/50"
        )}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center"
        >
          <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#6b1282]" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 pointer-events-auto"
          >
            {/* Popover Arrow */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#160620] rotate-45 border-t border-l border-purple-500/30 rounded-xs -z-10" />

            {/* Main Aceternity Mega Menu Container */}
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-b from-purple-500/30 via-purple-900/20 to-purple-950/40 shadow-2xl shadow-purple-950/60 backdrop-blur-2xl">
              <div className="rounded-[22px] bg-[#160620]/95 backdrop-blur-2xl border border-white/10 p-5 sm:p-6 text-white overflow-hidden shadow-inner">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Rich Card Item (Icon in Rounded Square + Title + Subtitle - Image 1 style) */
export interface MenuCardItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to?: string;
  href?: string;
  badge?: string;
  onClick?: () => void;
}

export const MenuCardItem: React.FC<MenuCardItemProps> = ({
  icon,
  title,
  description,
  to,
  href,
  badge,
  onClick,
}) => {
  const content = (
    <div className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-purple-500/20 transition-all duration-200 cursor-pointer">
      <div className="w-9 h-9 rounded-lg bg-purple-950/90 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-purple-900 group-hover:text-purple-200 group-hover:border-purple-400 transition-all">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-white group-hover:text-purple-200 transition-colors leading-tight">
            {title}
          </span>
          {badge && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/25 text-purple-300 border border-purple-400/30 shrink-0">
              {badge}
            </span>
          )}
        </div>
        <p className="text-[11px] sm:text-xs text-neutral-400 group-hover:text-neutral-300 leading-snug mt-1 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="block"
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="block">
        {content}
      </Link>
    );
  }

  return <div onClick={onClick} className="cursor-pointer">{content}</div>;
};

/* Simple Link Item (Icon + Title - Image 1/2 style) */
export interface MenuLinkItemProps {
  icon?: React.ReactNode;
  title: string;
  to?: string;
  href?: string;
  badge?: string;
  onClick?: () => void;
}

export const MenuLinkItem: React.FC<MenuLinkItemProps> = ({
  icon,
  title,
  to,
  href,
  badge,
  onClick,
}) => {
  const content = (
    <div className="group flex items-center gap-2.5 py-1.5 px-2.5 -mx-1.5 rounded-xl hover:bg-white/10 transition-colors">
      {icon && (
        <span className="text-purple-400 group-hover:text-purple-300 transition-colors shrink-0">
          {icon}
        </span>
      )}
      <span className="text-xs sm:text-[13px] font-semibold text-neutral-300 group-hover:text-white transition-colors truncate">
        {title}
      </span>
      {badge && (
        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30 ml-auto">
          {badge}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="block"
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="block">
        {content}
      </Link>
    );
  }

  return <div onClick={onClick} className="cursor-pointer">{content}</div>;
};

/* Featured Visual Preview Card with Real Photo (Image 2 style) */
export interface FeaturedPreviewCardProps {
  image: string;
  title: string;
  badge?: string;
  description: string;
  to?: string;
  href?: string;
  actionText?: string;
  onClick?: () => void;
}

export const FeaturedPreviewCard: React.FC<FeaturedPreviewCardProps> = ({
  image,
  title,
  badge = "Baru",
  description,
  to,
  href,
  actionText = "Pelajari Selengkapnya",
  onClick,
}) => {
  const cardContent = (
    <div className="group flex flex-col justify-between h-full rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-purple-400/40 p-3 transition-all duration-300 shadow-md">
      {/* Photo Preview Container */}
      <div className="relative h-32 w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        {badge && (
          <div className="absolute top-2.5 right-2.5">
            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-600/90 text-white shadow-md border border-purple-300/40 backdrop-blur-md">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="mt-2.5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-[13px] font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1">
            {title}
          </h4>
          <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-purple-300 group-hover:text-white transition-colors">
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="block h-full"
      >
        {cardContent}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return <div onClick={onClick} className="h-full">{cardContent}</div>;
};

/* Menu Bottom Bar / Utility Strip (Image 1 style) */
export interface MenuFooterLink {
  label: string;
  href?: string;
  to?: string;
  icon?: React.ReactNode;
}

export interface MenuFooterProps {
  label?: string;
  links: MenuFooterLink[];
  onClick?: () => void;
}

export const MenuFooter: React.FC<MenuFooterProps> = ({
  label = "Jaringan & Layanan",
  links,
  onClick,
}) => {
  return (
    <div className="pt-3.5 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px]">
      <span className="font-bold text-neutral-400 tracking-wider uppercase text-[10px]">
        {label}
      </span>
      <div className="flex items-center gap-3 flex-wrap">
        {links.map((link, idx) => {
          const item = (
            <span className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white font-medium transition-colors">
              {link.icon && <span className="text-purple-400">{link.icon}</span>}
              <span>{link.label}</span>
            </span>
          );

          if (link.href) {
            return (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                className="hover:underline"
              >
                {item}
              </a>
            );
          }

          if (link.to) {
            return (
              <Link key={idx} to={link.to} onClick={onClick} className="hover:underline">
                {item}
              </Link>
            );
          }

          return <span key={idx}>{item}</span>;
        })}
      </div>
    </div>
  );
};

