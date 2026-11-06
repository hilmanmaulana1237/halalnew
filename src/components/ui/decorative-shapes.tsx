import React from 'react';
import { cn } from '@/lib/utils';

interface OrganicWaveProps {
  position?: 'top' | 'bottom';
  fillColor?: string; // Hex or Tailwind class
  className?: string;
  flip?: boolean;
}

/**
 * Smooth organic wave curve matching the Pngtree visual reference
 */
export const OrganicWave: React.FC<OrganicWaveProps> = ({
  position = 'bottom',
  fillColor = '#ffffff',
  className,
  flip = false,
}) => {
  return (
    <div
      className={cn(
        'w-full overflow-hidden leading-none pointer-events-none select-none z-10',
        position === 'top' ? 'rotate-180 -mb-1' : '-mt-1',
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-full h-12 sm:h-16 lg:h-20 block', flip && 'scale-x-[-1]')}
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 C320,84 480,12 720,44 C960,76 1120,20 1440,52 L1440,96 L0,96 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

/**
 * Dripping / Fluid Organic Wave (inspired directly by the reference pamflet)
 */
export const LiquidDripWave: React.FC<{
  fillColor?: string;
  className?: string;
  flip?: boolean;
}> = ({ fillColor = '#6B18A8', className, flip = false }) => {
  return (
    <div
      className={cn('w-full overflow-hidden pointer-events-none select-none', className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-full h-14 sm:h-20 block', flip && 'scale-y-[-1]')}
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1440,0 L1440,55 C1380,75 1320,20 1250,55 C1190,85 1140,40 1080,70 C1010,105 960,35 890,65 C820,95 770,25 700,55 C630,85 580,30 510,65 C440,100 390,35 320,65 C250,95 200,20 130,55 C70,85 30,45 0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

/**
 * Yellow Dot Grid accent matching the reference image (4x5 or 5x5 subtle dots)
 */
export const YellowDotGrid: React.FC<{
  rows?: number;
  cols?: number;
  className?: string;
  dotColor?: string;
}> = ({ rows = 4, cols = 5, className, dotColor = '#F5D32F' }) => {
  const dots = Array.from({ length: rows * cols });
  return (
    <div
      className={cn(
        'grid gap-2 sm:gap-2.5 pointer-events-none select-none opacity-75',
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      aria-hidden="true"
    >
      {dots.map((_, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-transform"
          style={{ backgroundColor: dotColor }}
        />
      ))}
    </div>
  );
};

/**
 * Inline Yellow Keyword Highlight marker
 */
export const YellowHighlight: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <span className={cn('relative inline-block font-extrabold text-[#6B18A8]', className)}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#F5D32F]/80 -rotate-1 rounded-sm -z-0"
        aria-hidden="true"
      />
    </span>
  );
};

/**
 * Subtle Organic Blob for section backgrounds
 */
export const OrganicBlob: React.FC<{
  className?: string;
  color?: 'purple' | 'yellow' | 'lightPurple';
}> = ({ className, color = 'purple' }) => {
  const colorMap = {
    purple: 'bg-[#6B18A8]/10',
    yellow: 'bg-[#F5D32F]/20',
    lightPurple: 'bg-[#C9A5E8]/25',
  };

  return (
    <div
      className={cn(
        'absolute rounded-full blur-3xl pointer-events-none -z-0 animate-pulse',
        colorMap[color],
        className
      )}
      aria-hidden="true"
    />
  );
};
