import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SafeImage } from "./SafeImage";

interface ParallaxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  offset?: number;
  scale?: number;
  fallbackType?: "cake" | "general" | "savory" | "cookie" | "brownie";
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  offset = 18,
  scale = 1.14,
  fallbackType = "general",
  ...props
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress through viewport to vertical translation (between -offset and +offset)
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <motion.div
        style={{ y, scale }}
        className="w-full h-full will-change-transform transform-gpu"
      >
        <SafeImage
          src={src}
          alt={alt}
          fallbackType={fallbackType}
          className={`w-full h-full object-cover ${className}`}
          {...props}
        />
      </motion.div>
    </div>
  );
}
