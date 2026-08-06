import { motion } from "motion/react";
import { Truck, Sparkles, Instagram } from "lucide-react";
import { CONTACT_INFO } from "../data";
import { SafeImage } from "./SafeImage";

export default function FoodCartBanner() {
  return (
    <section id="food-cart" className="py-16 bg-brand-cream relative overflow-hidden">
      {/* Decorative ornaments */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-brand-linen/40 blur-2xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-brand-linen rounded-3xl overflow-hidden border border-brand-stone/60 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          {/* Text/Content Panel */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-cream px-3 py-1.5 rounded-full border border-brand-stone/40 w-fit">
              <Truck className="w-4 h-4 text-brand-caramel" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#B5836C] font-bold">
                Upcoming Launch
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight leading-tight">
                To the Streets of Bangalore
              </h2>
              <p className="font-serif text-lg sm:text-xl italic text-brand-caramel font-normal">
                Belaku Bakes on Wheels is coming soon!
              </p>
            </div>

            <p className="font-sans text-brand-espresso/80 text-sm sm:text-base leading-relaxed font-light">
              We are expanding our artisanal cloud kitchen into a boutique mobile experience. Soon, you will be able to catch us live on the streets of Bengaluru, serving our signature melt-in-mouth fudgy brownies, warm custom pastries, and artisanal cakes directly from our beautiful mobile food cart.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 py-3 px-6 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-xl text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow Instagram Updates</span>
              </a>
            </div>
          </div>

          {/* Visual Panel */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-auto overflow-hidden bg-brand-stone flex">
            <SafeImage
              src="/belaku_food_cart.jpg"
              alt="Belaku Bakes Upcoming Food Cart"
              className="w-full h-full object-cover select-none scale-102 hover:scale-105 duration-700 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-brand-espresso/35 via-transparent to-transparent pointer-events-none" />
            
            {/* Sparkle Tag */}
            <div className="absolute top-4 right-4 bg-brand-cream/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-stone/40 text-[10px] font-bold text-brand-caramel uppercase tracking-widest flex items-center space-x-1">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Launching Q3 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
