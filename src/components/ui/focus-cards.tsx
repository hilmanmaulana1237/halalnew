import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface FocusCardItem {
  id: string | number;
  title: string;
  category: string;
  src: string;
  date?: string;
  location?: string;
  description?: string;
  auditor?: string;
  tags?: string[];
}

/**
 * Aceternity UI - Focus Cards Component
 * Hovering on a card highlights it while gracefully blurring and softening surrounding cards.
 */
export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onSelect,
  }: {
    card: FocusCardItem;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onSelect?: (card: FocusCardItem) => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => onSelect?.(card)}
      className={cn(
        "rounded-3xl relative bg-neutral-100 overflow-hidden h-72 sm:h-80 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer group border border-[#C9A5E8]/30 hover:border-[#6B18A8]/60 shadow-md hover:shadow-2xl hover:shadow-purple-950/20",
        hovered !== null && hovered !== index && "blur-xs scale-[0.98] opacity-60"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        loading="lazy"
        className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-[#240638]/95 via-[#240638]/40 to-transparent flex flex-col justify-end p-5 sm:p-6 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-90 md:opacity-75"
        )}
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF7D1] text-[#713f12] border border-[#F5D32F] shadow-2xs">
            {card.category}
          </span>
          {card.date && (
            <span className="text-[11px] text-purple-200 font-medium">
              {card.date}
            </span>
          )}
        </div>
        <div className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug drop-shadow-xs">
          {card.title}
        </div>
        {card.description && (
          <p className="text-xs text-purple-100/90 mt-1.5 line-clamp-2 font-normal leading-relaxed">
            {card.description}
          </p>
        )}
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({
  cards,
  onSelectCard,
  className,
}: {
  cards: FocusCardItem[];
  onSelectCard?: (card: FocusCardItem) => void;
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full", className)}>
      {cards.map((card, index) => (
        <Card
          key={`${card.id}-${card.title}-${index}`}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onSelect={onSelectCard}
        />
      ))}
    </div>
  );
}
