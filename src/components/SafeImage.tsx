import React, { useState } from "react";
import { BelakuLogoSymbol } from "./BelakuLogo";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackType?: "cake" | "general" | "savory" | "cookie" | "brownie";
}

export function SafeImage({ src, alt, className = "", fallbackType = "general", ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-brand-linen via-brand-cream to-brand-linen text-center p-6 select-none border border-brand-star/20 ${className}`}>
        {/* Soft background outline pattern */}
        <div className="absolute inset-2 border border-brand-caramel/10 rounded-xl pointer-events-none" />
        <div className="absolute inset-4 border border-dashed border-brand-stone/30 rounded-lg pointer-events-none" />
        
        {/* Animated Brand Symbol Fallback */}
        <BelakuLogoSymbol size={64} className="opacity-90 transform hover:scale-105 transition-transform duration-300" />
        
        {/* Fallback elegant label with serif title */}
        <div className="mt-4 space-y-1 z-10 px-4">
          <span className="block font-serif text-sm font-semibold text-brand-espresso leading-tight">
            {alt || "Belaku Gourmet Delight"}
          </span>
          <span className="block text-[8px] uppercase tracking-widest text-brand-caramel font-bold">
            Artisanal Cloud Kitchen
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
}
