import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div className={cn("relative p-[3px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-90 blur-xl transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#6b1282,transparent),radial-gradient(circle_farthest-side_at_100%_0,#86198f,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#c084fc,transparent),radial-gradient(circle_farthest-side_at_0_0,#4a0d5c,#1a0726)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#6b1282,transparent),radial-gradient(circle_farthest-side_at_100%_0,#86198f,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#c084fc,transparent),radial-gradient(circle_farthest-side_at_0_0,#4a0d5c,#1a0726)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

