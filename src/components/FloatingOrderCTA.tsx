import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Cake } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingOrderCTAProps {
  onOrderClick: () => void;
}

export default function FloatingOrderCTA({ onOrderClick }: FloatingOrderCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once scrolled past the hero (~450px)
      const heroThreshold = 450;
      setIsVisible(window.scrollY > heroThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-40 bottom-0 left-0 right-0 p-3 sm:p-0 sm:bottom-6 sm:right-6 sm:left-auto pointer-events-none"
        >
          {/* Desktop Floating Pill (Bottom-Right) */}
          <div className="hidden sm:block pointer-events-auto">
            <button
              onClick={onOrderClick}
              className="group flex items-center space-x-3 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso px-5 py-3.5 rounded-full shadow-2xl hover:shadow-brand-caramel/20 transition-all duration-300 border border-brand-gold/30 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:text-brand-espresso group-hover:bg-brand-cream transition-colors">
                <Cake className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-sm tracking-wide">
                Place an Order
              </span>
              <ArrowRight className="w-4 h-4 text-brand-gold group-hover:text-brand-espresso group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>

          {/* Mobile Sticky Full-Width Bar */}
          <div className="block sm:hidden pointer-events-auto">
            <div className="bg-brand-cream/95 backdrop-blur-md p-2 rounded-2xl border border-brand-stone/60 shadow-2xl">
              <button
                onClick={onOrderClick}
                className="w-full flex items-center justify-center space-x-2.5 bg-brand-espresso text-brand-cream py-3 px-6 rounded-xl font-serif font-bold text-sm shadow-md active:scale-[0.98] transition-transform cursor-pointer border border-brand-gold/30"
              >
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Place an Order</span>
                <ArrowRight className="w-4 h-4 text-brand-gold ml-1" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
