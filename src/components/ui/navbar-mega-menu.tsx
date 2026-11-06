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
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto"
          >
            {/* Popover Arrow */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0b0512] rotate-45 border-t border-l border-purple-500/30 rounded-xs -z-10 shadow-xs" />

            {/* Main Aceternity Mega Menu Obsidian Container */}
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/40 via-purple-900/15 to-purple-950/50 shadow-2xl shadow-purple-950/80 backdrop-blur-2xl">
              <div className="rounded-[23px] bg-[#0c0514]/98 backdrop-blur-2xl border border-white/10 p-3.5 sm:p-4 text-white overflow-hidden shadow-inner">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Aceternity Signature Blueprint Crosshair Badge (e.g. "[ new ]" from user screenshot) */
export interface BlueprintBadgeProps {
  text: string;
  variant?: 'sky' | 'purple' | 'emerald' | 'yellow';
}

export const BlueprintBadge: React.FC<BlueprintBadgeProps> = ({
  text,
  variant = 'sky',
}) => {
  const colorMap = {
    sky: 'text-sky-300 border-sky-400/50 bg-sky-950/30 border-corner-sky',
    purple: 'text-purple-300 border-purple-400/50 bg-purple-950/30 border-corner-purple',
    emerald: 'text-emerald-300 border-emerald-400/50 bg-emerald-950/30 border-corner-emerald',
    yellow: 'text-amber-300 border-amber-400/70 bg-amber-950/40 border-corner-yellow',
  };

  const cornerColor = variant === 'yellow' ? 'border-amber-400' : variant === 'purple' ? 'border-purple-400' : variant === 'emerald' ? 'border-emerald-400' : 'border-sky-400';

  return (
    <span className={cn(
      "relative inline-flex items-center px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-medium tracking-wide rounded-xs border shadow-2xs select-none",
      colorMap[variant]
    )}>
      {/* 4 Corner Crosshairs */}
      <span className={cn("absolute -top-[2px] -left-[2px] w-[3px] h-[3px] border-t-2 border-l-2", cornerColor)} />
      <span className={cn("absolute -top-[2px] -right-[2px] w-[3px] h-[3px] border-t-2 border-r-2", cornerColor)} />
      <span className={cn("absolute -bottom-[2px] -left-[2px] w-[3px] h-[3px] border-b-2 border-l-2", cornerColor)} />
      <span className={cn("absolute -bottom-[2px] -right-[2px] w-[3px] h-[3px] border-b-2 border-r-2", cornerColor)} />
      {text}
    </span>
  );
};

/* Rich Card Item (Screenshot 1: "Get started" style with icon in rounded square + title + subtitle) */
export interface MenuCardItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to?: string;
  href?: string;
  badge?: string;
  badgeVariant?: 'sky' | 'purple' | 'emerald' | 'yellow';
  onClick?: () => void;
}

export const MenuCardItem: React.FC<MenuCardItemProps> = ({
  icon,
  title,
  description,
  to,
  href,
  badge,
  badgeVariant = 'purple',
  onClick,
}) => {
  const content = (
    <div className="group flex items-start gap-3.5 p-2.5 sm:p-3 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-purple-500/25 transition-all duration-200 cursor-pointer">
      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-purple-300 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-purple-950/80 group-hover:text-purple-200 group-hover:border-purple-400/50 transition-all">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-white group-hover:text-purple-200 transition-colors leading-tight">
            {title}
          </span>
          {badge && <BlueprintBadge text={badge} variant={badgeVariant} />}
        </div>
        <p className="text-xs text-neutral-400 group-hover:text-neutral-300 leading-relaxed mt-1 line-clamp-2">
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

/* 3-Column Category Grid (Screenshot 2: "Blocks by section" style) */
export interface CategoryLink {
  label: string;
  to?: string;
  href?: string;
}

export interface MenuCategoryGridProps {
  title: string;
  items: CategoryLink[];
  actionText?: string;
  actionTo?: string;
  actionHref?: string;
  onClick?: () => void;
}

export const MenuCategoryGrid: React.FC<MenuCategoryGridProps> = ({
  title,
  items,
  actionText,
  actionTo,
  actionHref,
  onClick,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3.5">
          {title}
        </div>
        <div className="grid grid-cols-3 gap-x-5 gap-y-2.5">
          {items.map((item, idx) => {
            const itemContent = (
              <span className="text-xs sm:text-[13px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer py-1 block whitespace-nowrap">
                {item.label}
              </span>
            );

            if (item.href) {
              return (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClick}
                >
                  {itemContent}
                </a>
              );
            }

            if (item.to) {
              return (
                <Link key={idx} to={item.to} onClick={onClick}>
                  {itemContent}
                </Link>
              );
            }

            return <span key={idx}>{itemContent}</span>;
          })}
        </div>
      </div>

      {actionText && (
        <div className="mt-5 pt-3.5 border-t border-white/[0.08]">
          {actionHref ? (
            <a
              href={actionHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-white hover:text-purple-200 transition-colors group"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          ) : actionTo ? (
            <Link
              to={actionTo}
              onClick={onClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-white hover:text-purple-200 transition-colors group"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
};

/* Featured Showcase Card with Real Photo (Screenshot 2 right side) */
export interface FeaturedPreviewCardProps {
  image: string;
  title: string;
  badge?: string;
  badgeVariant?: 'sky' | 'purple' | 'emerald' | 'yellow';
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
  badgeVariant = 'sky',
  description,
  to,
  href,
  actionText = "Pelajari Selengkapnya",
  onClick,
}) => {
  const cardContent = (
    <div className="group flex flex-col justify-between h-full cursor-pointer">
      {/* High-res Image Preview */}
      <div className="relative w-full aspect-[16/10] sm:h-42 rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Info Details Under Photo */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors truncate">
              {title}
            </h4>
            {badge && <BlueprintBadge text={badge} variant={badgeVariant} />}
          </div>
          <p className="text-xs text-neutral-400 group-hover:text-neutral-300 leading-relaxed mt-1.5 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-purple-300 group-hover:text-white transition-colors">
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

/* Menu Bottom Bar / Utility Strip (Screenshot 1: "Community" bar) */
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
    <div className="pt-3 mt-3.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
      <span className="font-semibold text-neutral-400 tracking-wide text-xs">
        {label}
      </span>
      <div className="flex items-center gap-4 flex-wrap">
        {links.map((link, idx) => {
          const item = (
            <span className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
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
