"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Variants } from "framer-motion";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  children: React.ReactNode;
  className?: string;
}

export function MotionWrapper({
  variants,
  children,
  className,
  ...props
}: MotionWrapperProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
