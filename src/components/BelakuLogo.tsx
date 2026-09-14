import { motion } from "motion/react";
import { SafeImage } from "./SafeImage";

interface LogoProps {
  className?: string;
  size?: number; // width & height in px
}

// 1. Official Brand Icon Symbol / Badge
export function BelakuLogoSymbol({ className = "", size = 48 }: LogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 select-none shadow-xs ${className}`}
    >
      <SafeImage
        src="brand_icon.jpeg"
        alt="Belaku Bakes Official Logo"
        className="w-full h-full object-cover rounded-full scale-[1.32] transform-gpu"
      />
    </div>
  );
}

// 2. Full Brand Logo: Official Icon + "Belaku Bakes" brand title
export function BelakuLogoFull({ className = "", size = 48 }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2.5 sm:space-x-3.5 text-left ${className}`}>
      {/* Symbol Seal with a subtle float animation */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="shrink-0"
      >
        <BelakuLogoSymbol size={size} className="ring-2 ring-brand-caramel/25 ring-offset-2 ring-offset-brand-cream" />
      </motion.div>
      
      {/* Label Branding */}
      <div className="flex flex-col">
        <div className="relative">
          <span className="block font-serif text-xl sm:text-2xl lg:text-[26px] tracking-wide font-bold text-[#4d2c19] flex items-end leading-tight">
            Belaku Bakes
          </span>
        </div>
        
        <span className="block text-[8px] sm:text-[9.5px] uppercase tracking-wider sm:tracking-widest text-[#4d2c19]/80 font-bold mt-0.5 whitespace-nowrap">
          Gourmet Cloud Kitchen
        </span>
      </div>
    </div>
  );
}
