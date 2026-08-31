import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface MaskHeadingProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

/**
 * High-end editorial text reveal that uncovers text smoothly from behind an overflow mask.
 */
export function MaskHeading({
  children,
  className = "",
  delay = 0.1,
  as: Component = "h2",
}: MaskHeadingProps) {
  return (
    <Component className={`overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "115%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="block"
      >
        {children}
      </motion.span>
    </Component>
  );
}

interface ClipPathRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * Editorial image reveal: Uncurtains photography from left to right using smooth clip-path inset.
 */
export function ClipPathReveal({
  children,
  className = "",
  delay = 0.15,
  duration = 0.95,
}: ClipPathRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface StaggerCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  baseDelay?: number;
}

/**
 * Cascading card reveal with subtle fade + translateY elevation.
 */
export function StaggerCard({
  children,
  className = "",
  index = 0,
  baseDelay = 0.1,
}: StaggerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: baseDelay + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
