import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote?: string;
    name?: string;
    title?: string;
    image?: string;
    alt?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      if (scrollerRef.current.getAttribute("data-animated")) return;
      scrollerRef.current.setAttribute("data-animated", "true");

      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getSpeed();
      setStart(true);
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "25s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "45s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const animClass = direction === "right" ? "animate-scroll-right" : "animate-scroll-left";

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4 items-center",
          start && animClass,
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative flex-shrink-0 rounded-2xl border border-[#C9A5E8]/35 bg-white/95 backdrop-blur-sm px-6 py-4 shadow-sm hover:shadow-md transition-all flex items-center justify-center min-w-[160px] sm:min-w-[180px] h-[80px]"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.alt || item.name || "Partner logo"}
                className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all opacity-85 hover:opacity-100"
              />
            ) : (
              <span className="font-semibold text-neutral-700 text-sm">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

