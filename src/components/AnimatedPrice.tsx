import { useEffect, useState } from "react";
import { useMotionValue, useSpring, motion } from "motion/react";

interface AnimatedPriceProps {
  value: number;
  className?: string;
  prefix?: string;
}

export function AnimatedPrice({ value, className = "", prefix = "₹" }: AnimatedPriceProps) {
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, {
    stiffness: 90,
    damping: 20,
    mass: 0.8,
  });

  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${value.toLocaleString("en-IN")}`
  );

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const rounded = Math.round(latest);
      setDisplayValue(`${prefix}${rounded.toLocaleString("en-IN")}`);
    });
    return () => unsubscribe();
  }, [springValue, prefix]);

  return (
    <motion.span
      key={value}
      initial={{ scale: 1.05, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`inline-block tabular-nums font-mono ${className}`}
    >
      {displayValue}
    </motion.span>
  );
}
