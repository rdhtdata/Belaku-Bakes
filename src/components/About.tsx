import { useRef } from "react";
import { Compass, Sparkles, Heart, ShieldCheck } from "lucide-react";
import { STORE_CHEF_STATEMENT } from "../data";
import { motion, useScroll, useTransform } from "motion/react";
import { SafeImage } from "./SafeImage";

export default function About() {
  const quoteParagraphs = STORE_CHEF_STATEMENT.fullQuote.split("\n\n").filter(Boolean);
  const founderImageContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: founderImageContainerRef,
    offset: ["start end", "end start"],
  });
  const founderParallaxY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section id="about" className="py-24 bg-brand-linen relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-stone/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Stage 1: Left Column - Image Enters from Left on Scroll */}
          <div className="lg:col-span-5 relative order-last lg:order-first px-2 sm:px-0 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: -60, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-2/3 max-w-[340px] sm:max-w-[400px] mx-auto"
            >
              {/* Background frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full border border-brand-caramel/40 rounded-2xl pointer-events-none"
              />
              
              {/* Image box with Parallax */}
              <div ref={founderImageContainerRef} className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-brand-stone">
                <motion.div style={{ y: founderParallaxY }} className="w-full h-full scale-110 will-change-transform">
                  <SafeImage
                    src="our_story.png"
                    alt="Belaku Bakes Our Story & Vision"
                    className="w-full h-full object-cover select-none scale-102 hover:scale-105 duration-700 transition-transform"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Quality overlay pill badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-3 right-3 sm:-bottom-5 sm:-right-4 bg-brand-espresso text-brand-gold py-2 px-4 sm:py-2.5 sm:px-5 rounded-full shadow-xl border border-brand-stone/30 flex items-center space-x-2 backdrop-blur-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span className="font-serif text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
                  100% Honest Bakes
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Progressive Scroll Storytelling */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Stage 2: Eyebrow and Staggered Headline */}
            <div className="space-y-3">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-caramel font-bold"
              >
                <Heart className="w-3.5 h-3.5 text-brand-caramel fill-brand-caramel/25" />
                <span>Our Story &amp; Vision</span>
              </motion.span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight leading-[1.12]">
                <motion.span
                  className="block overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  Crafting joy, one sweet
                </motion.span>
                <motion.span
                  className="block overflow-hidden text-brand-caramel italic font-normal"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  treat at a time.
                </motion.span>
              </h2>
            </div>

            {/* Stage 3: Progressive Paragraphs Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-l-2 border-brand-caramel pl-6 py-2 bg-brand-cream/50 rounded-r-2xl max-w-3xl shadow-xs space-y-3"
            >
              {quoteParagraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.55 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-sm sm:text-base italic text-brand-espresso/90 leading-relaxed font-light"
                >
                  "{para}"
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="pt-2 flex items-center space-x-2"
              >
                <div className="w-6 h-px bg-brand-caramel" />
                <span className="font-sans text-xs tracking-widest uppercase font-bold text-brand-espresso">
                  {STORE_CHEF_STATEMENT.founderName} — Founder &amp; Head Baker
                </span>
              </motion.div>
            </motion.div>

            {/* Stage 4: Feature Cards Revealed One-by-One */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-brand-cream/70 p-4 rounded-2xl border border-brand-stone/50 space-y-2 shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-brand-linen flex items-center justify-center text-brand-caramel shadow-xs border border-brand-stone/40">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-sans text-sm font-semibold text-brand-espresso">Unmatched Care</h4>
                <p className="text-xs text-brand-espresso/70 leading-relaxed font-light">
                  Every order is custom-baked on receipt. There are no pre-made, frozen sponges here.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.98, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-brand-cream/70 p-4 rounded-2xl border border-brand-stone/50 space-y-2 shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-brand-linen flex items-center justify-center text-brand-caramel shadow-xs border border-brand-stone/40">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-sans text-sm font-semibold text-brand-espresso">True Premium Grains</h4>
                <p className="text-xs text-brand-espresso/70 leading-relaxed font-light">
                  Fine-milled grade organic flours, dark cocoa double-buttered chunks, and natural raw honey.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 1.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-brand-cream/70 p-4 rounded-2xl border border-brand-stone/50 space-y-2 shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-brand-linen flex items-center justify-center text-brand-caramel shadow-xs border border-brand-stone/40">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-sans text-sm font-semibold text-brand-espresso">Custom Designs</h4>
                <p className="text-xs text-brand-espresso/70 leading-relaxed font-light">
                  Share a photo or color scheme and we'll sculpt matching buttercreams and edible garnishes.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
