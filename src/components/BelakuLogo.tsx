import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  size?: number; // width & height in px
}

// 1. Just the symbol/badge: circular pink leaf wreath, chocolate cake, lit striped candle
export function BelakuLogoSymbol({ className = "", size = 64 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      {/* Background soft glow */}
      <circle cx="60" cy="60" r="50" fill="#f2e0cc" />
      
      {/* 2. Symmetrical Pink Leaf Wreath / Laurel (Soft Pink Rose #E39BB0) */}
      <g stroke="#DF8CA3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Left Laurel Branch */}
        <path d="M52 98 C36 94, 22 78, 22 60 C22 40, 36 24, 52 20" />
        {/* Left Laurel leaf pairs */}
        <path d="M22 60 Q14 56, 17 50 Q23 52, 22 60" fill="#DF8CA3" fillOpacity="0.4" />
        <path d="M24 45 Q16 38, 21 33 Q27 38, 24 45" fill="#DF8CA3" fillOpacity="0.4" />
        <path d="M30 32 Q24 23, 30 19 Q35 25, 30 32" fill="#DF8CA3" fillOpacity="0.4" />
        <path d="M40 23 Q35 14, 42 12 Q45 18, 40 23" fill="#DF8CA3" fillOpacity="0.4" />
        
        <path d="M24 74 Q15 76, 16 83 Q22 83, 24 74" fill="#DF8CA3" fillOpacity="0.4" />
        <path d="M30 87 Q23 92, 27 98 Q33 94, 30 87" fill="#DF8CA3" fillOpacity="0.4" />
        
        {/* Right Laurel Branch */}
        <path d="M68 98 C84 94, 98 78, 98 60 C98 40, 84 24, 68 20" />
        {/* Right Laurel leaf pairs */}
        <path d="M98 60 Q106 56, 103 50 Q97 52, 98 60" fill="#DF8CA3" fillOpacity="0.4" />
        <path d="M96 45 Q104 38, 99 33 Q93 38, 96 45" fill="#DF8CA3" fillOpacity="0.4" />
        <path d="M90 32 Q96 23, 90 19 Q85 25, 90 32" fill="#DF8CA3" fillOpacity="0.4" />
        <path d="M80 23 Q85 14, 78 12 Q75 18, 80 23" fill="#DF8CA3" fillOpacity="0.4" />
        
        <path d="M96 74 Q105 76, 104 83 Q98 83, 96 74" fill="#DF8CA3" fillOpacity="0.4" />
        <path d="M90 87 Q97 92, 93 98 Q87 94, 90 87" fill="#DF8CA3" fillOpacity="0.4" />
      </g>

      {/* 3. Chocolate Drip Celebration Cake */}
      {/* Cake Body Base (Light Warm Chocolate #8D5B4C) */}
      <path d="M40 62 C40 59, 80 59, 80 62 L80 82 C80 85, 40 85, 40 82 Z" fill="#8D5B4C" />
      {/* Cake Shadow Depth */}
      <path d="M40 82 C50 85, 70 85, 80 82 C80 82, 80 82.5, 80 82.5 C70 85.5, 50 85.5, 40 82.5 Z" fill="#5F3C32" />
      
      {/* Dark Fudge Cake Drip Layer (Dark Velvet Truffle #4E2E25) */}
      <path d="M40 62 C40 59, 80 59, 80 62 L80 68 C76 71, 74 65, 70 69 C67 72, 64 66, 60 70 C57 66, 54 72, 50 67 C47 69, 44 71, 40 68 Z" fill="#4E2E25" />
      <ellipse cx="60" cy="62" rx="20" ry="3" fill="#4E2E25" />

      {/* 4. Single Striped Birthday Candle (Cream base with Chocolate Stripes) */}
      <rect x="58.5" y="44" width="3" height="15" fill="#f2e0cc" rx="1" />
      <path d="M58.5 46 L61.5 48 M58.5 50 L61.5 52 M58.5 54 L61.5 56" stroke="#4E2E25" strokeWidth="1" />

      {/* Warm Golden Flame (Lit & Burning) */}
      <path d="M60 42 C58.5 42, 57 39, 60 33 C63 39, 61.5 42, 60 42 Z" fill="#FFB03A" />
      <path d="M60 41 C59 41, 58 39.5, 60 36 C62 39.5, 61 41, 60 41 Z" fill="#FFE082" />
    </svg>
  );
}

// 2. Full Brand Logo: SVG Symbol + "Belaku Bakes" cursive brand title + trailing cursive pink heart loop
export function BelakuLogoFull({ className = "", size = 48 }: LogoProps) {
  return (
    <div className={`flex items-center space-x-3 text-left ${className}`}>
      {/* Symbol Seal with a subtle float animation */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <BelakuLogoSymbol size={size} />
      </motion.div>
      
      {/* Label Branding */}
      <div className="flex flex-col">
        {/* Styled Typography to mimic the custom handwriting script perfectly */}
        <div className="relative">
          <span className="block font-serif text-2xl tracking-wide font-bold text-[#4d2c19] flex items-end">
            Belaku Bakes
            {/* Elegant vector swirling heart trailing from 's' */}
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block ml-1 mb-1"
            >
              <path
                d="M2 13 C4 11, 8 4, 11 4 C15 4, 18 8, 14 12 C10 16, 6 15, 8 10 C9 7, 13 5, 17 8 C21 11, 23 15, 23 15"
                stroke="#DF8CA3"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M14 12 Q11 15, 14 17 Q17 15, 14 12"
                fill="#DF8CA3"
                fillOpacity="0.4"
              />
            </svg>
          </span>
        </div>
        
        <span className="block text-[9px] uppercase tracking-widest text-[#4d2c19]/80 font-bold -mt-0.5">
          Gourmet Cloud Kitchen • Hennur
        </span>
      </div>
    </div>
  );
}
