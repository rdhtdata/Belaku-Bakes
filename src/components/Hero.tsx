import { useRef } from "react";
import { ArrowRight, Sparkles, Sliders, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { BelakuLogoSymbol } from "./BelakuLogo";
import { SafeImage } from "./SafeImage";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroImageContainerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-80px)] bg-brand-cream overflow-hidden pt-6 sm:pt-10 lg:pt-14 pb-14 sm:pb-16 flex flex-col justify-center px-4 sm:px-6"
    >
      {/* Absolute luxury aesthetic background ornaments */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-linen/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-15%] w-[600px] h-[600px] rounded-full bg-brand-stone/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        {/* Text Content Area */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
          {/* 0.2s Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-linen border border-brand-stone/50 rounded-full"
          >
            <BelakuLogoSymbol size={28} className="shrink-0" />
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-[#4d2c19] font-bold">
              Artisan Cloud Kitchen
            </span>
          </motion.div>

          {/* Staggered Line-by-Line Headline */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold text-brand-espresso tracking-tight leading-[1.08] sm:leading-[1.05]">
              {/* 0.35s Line 1 */}
              <motion.span
                className="block overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                Artisanal bakes
              </motion.span>
              {/* 0.45s Line 2 */}
              <motion.span
                className="block text-brand-caramel italic font-normal overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                made with love,
              </motion.span>
              {/* 0.55s Line 3 */}
              <motion.span
                className="block overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                crafted for you.
              </motion.span>
            </h1>

            {/* 0.8s Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-brand-espresso/80 text-base sm:text-lg max-w-lg leading-relaxed font-light"
            >
              There's no big factory here. Just me, a warm oven, and good ingredients. Everything is baked fresh to order in small batches, so what reaches you is exactly as it should be — soft, honest, and made with care.
            </motion.p>
          </div>

          {/* 1.0s Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
          >
            <button
              onClick={() => onScrollToSection("menu")}
              className="group inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-500 shadow-sm cursor-pointer border border-transparent hover:border-brand-stone w-full sm:w-auto"
            >
              <span>Explore our Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onScrollToSection("custom")}
              className="group inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-brand-espresso hover:bg-brand-linen rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-brand-stone transition-all duration-500 cursor-pointer w-full sm:w-auto"
            >
              <Sliders className="w-4 h-4 text-brand-caramel" />
              <span>Design Custom Pastry</span>
            </button>
          </motion.div>

          {/* 1.15s Quick value tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8 border-t border-brand-stone/40 max-w-md"
          >
            <div className="text-left">
              <span className="block text-lg sm:text-xl font-serif font-bold text-brand-espresso">100%</span>
              <span className="text-[10px] sm:text-xs text-brand-espresso/70 tracking-tight block">Pure Butter &amp; Care</span>
            </div>
            <div className="text-left">
              <span className="block text-lg sm:text-xl font-serif font-bold text-brand-espresso">Bespoke</span>
              <span className="text-[10px] sm:text-xs text-brand-espresso/70 tracking-tight block">Tailored Flavors</span>
            </div>
            <div className="text-left">
              <span className="block text-lg sm:text-xl font-serif font-bold text-brand-espresso">Self-Pick</span>
              <span className="text-[10px] sm:text-xs text-brand-espresso/70 tracking-tight block">Swiggy/Uber/Genie</span>
            </div>
          </motion.div>
        </div>

        {/* Visual Showcase with Continuous Floating Motion */}
        <div className="lg:col-span-6 relative mt-4 sm:mt-8 lg:mt-0 px-2 sm:px-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.9,
            }}
            className="relative w-full h-[320px] sm:h-[450px] xl:h-[500px]"
          >
            {/* Background styled border offset */}
            <div className="absolute top-[12px] left-[12px] right-[-12px] bottom-[-12px] sm:top-[20px] sm:left-[20px] sm:right-[-20px] sm:bottom-[-20px] rounded-2xl border-2 border-brand-stone/60 pointer-events-none" />

            {/* 0.7s - 1.9s: Hero Image Scales In from 1.08 to 1 over 1.2s + Parallax */}
            <motion.div
              ref={heroImageContainerRef}
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
            >
              <motion.div style={{ y: parallaxY }} className="w-full h-full scale-110 will-change-transform">
                <SafeImage
                  src="menu-images/cakes/featured bake.jpg"
                  alt="Belaku Bakes featured celebration cake"
                  className="w-full h-full object-cover select-none scale-102 hover:scale-105 duration-700 transition-transform"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* 1.2s Floating Luxury Detail Badge */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-brand-cream/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-brand-stone/60 shadow-lg text-left"
            >
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-caramel font-bold">Featured Bake</span>
              <span className="block text-xs sm:text-sm font-serif font-bold text-brand-espresso mt-0.5">Artisanal Cake</span>
            </motion.div>

            {/* 1.35s Floating Pickup Guide Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-brand-cream/95 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full border border-brand-stone/50 shadow-md flex items-center space-x-2 cursor-pointer hover:bg-brand-linen transition-colors"
              onClick={() => onScrollToSection("pickup")}
            >
              <MapPin className="w-3.5 h-3.5 text-brand-caramel animate-bounce" />
              <span className="text-[10.5px] sm:text-[11.5px] font-sans font-medium text-brand-espresso tracking-tight">Hennur, Bengaluru</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
