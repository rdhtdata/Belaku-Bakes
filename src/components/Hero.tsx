import { ArrowRight, Sparkles, Sliders, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { BelakuLogoSymbol } from "./BelakuLogo";
import { SafeImage } from "./SafeImage";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
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
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-linen border border-brand-stone/50 rounded-full"
          >
            <BelakuLogoSymbol size={28} className="shrink-0" />
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-[#4d2c19] font-bold">
              Artisan Cloud Kitchen
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold text-brand-espresso tracking-tight leading-[1.08] sm:leading-[1.05]"
            >
              Artisanal bakes <br />
              <span className="text-brand-caramel italic font-normal">made with love,</span> <br />
              crafted for you.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-brand-espresso/80 text-base sm:text-lg max-w-lg leading-relaxed font-light"
            >
              There's no big factory here. Just me, a warm oven, and good ingredients. Everything is baked fresh to order in small batches, so what reaches you is exactly as it should be — soft, honest, and made with care.
            </motion.p>
          </div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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

          {/* Quick value tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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

        {/* Visual Showcase (Images layout) */}
        <div className="lg:col-span-6 relative mt-4 sm:mt-8 lg:mt-0 px-2 sm:px-4">
          <div className="relative w-full h-[320px] sm:h-[450px] xl:h-[500px]">
            {/* Background styled border offset */}
            <div className="absolute top-[12px] left-[12px] right-[-12px] bottom-[-12px] sm:top-[20px] sm:left-[20px] sm:right-[-20px] sm:bottom-[-20px] rounded-2xl border-2 border-brand-stone/60 pointer-events-none" />

            {/* Master Hero Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
            >
              <SafeImage
                src="menu-images/cakes/featured bake.jpg"
                alt="Belaku Bakes featured celebration cake"
                className="w-full h-full object-cover select-none scale-102 hover:scale-105 duration-700 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Luxury Detail Badge */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-brand-cream/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-brand-stone/60 shadow-lg text-left"
            >
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-caramel font-bold">Featured Bake</span>
              <span className="block text-xs sm:text-sm font-serif font-bold text-brand-espresso mt-0.5">Artisanal Cake</span>
            </motion.div>

            {/* Floating Pickup Guide Badge */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-brand-cream/95 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full border border-brand-stone/50 shadow-md flex items-center space-x-2 cursor-pointer hover:bg-brand-linen transition-colors"
              onClick={() => onScrollToSection("pickup")}
            >
              <MapPin className="w-3.5 h-3.5 text-brand-caramel animate-bounce" />
              <span className="text-[10.5px] sm:text-[11.5px] font-sans font-medium text-brand-espresso tracking-tight">Hennur, Bengaluru</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
