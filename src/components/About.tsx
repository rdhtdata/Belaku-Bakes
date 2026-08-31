import { Compass, Sparkles, Heart, ShieldCheck } from "lucide-react";
import { STORE_CHEF_STATEMENT } from "../data";
import { motion } from "motion/react";
import { SafeImage } from "./SafeImage";

export default function About() {
  return (
    <section id="about" className="py-24 bg-brand-linen relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-stone/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Beautiful image of artisan baker process */}
          <div className="lg:col-span-5 relative order-last lg:order-first px-2 sm:px-0 mt-6 sm:mt-0">
            <div className="relative w-full aspect-2/3 max-w-[340px] sm:max-w-[400px] mx-auto">
              {/* Background frame */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full border border-brand-caramel/40 rounded-xl pointer-events-none" />
              
              {/* Image box */}
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg bg-brand-stone">
                <SafeImage
                  src="our_story.png"
                  alt="Belaku Bakes Our Story & Vision"
                  className="w-full h-full object-cover select-none scale-102 hover:scale-105 duration-700 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Quality overlay pill badge */}
              <div className="absolute -bottom-3 right-3 sm:-bottom-5 sm:-right-4 bg-brand-espresso text-brand-gold py-2 px-4 sm:py-2.5 sm:px-5 rounded-full shadow-xl border border-brand-stone/30 flex items-center space-x-2 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span className="font-serif text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
                  100% Honest Bakes
                </span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Story and Statement */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-caramel font-bold">
                <Heart className="w-3.5 h-3.5 text-brand-caramel fill-brand-caramel/25" />
                <span>Our Story &amp; Vision</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight">
                Crafting joy, one sweet <br />
                treat at a time.
              </h2>
            </div>

            {/* Custom stylized Blockquote */}
            <div className="relative border-l-2 border-brand-caramel pl-6 py-1 bg-brand-cream/40 rounded-r-lg max-w-3xl">
              <p className="font-serif text-base sm:text-lg italic text-brand-espresso/95 leading-relaxed font-light whitespace-pre-line">
                "{STORE_CHEF_STATEMENT.fullQuote}"
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-6 h-px bg-brand-caramel" />
                <span className="font-sans text-xs tracking-widest uppercase font-bold text-brand-espresso">
                  The Founder &amp; Head Baker
                </span>
              </div>
            </div>

            {/* Brand pillars (emphasis on quality and bakes) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-caramel shadow-xs border border-brand-stone/40">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-sans text-sm font-semibold text-brand-espresso">Unmatched Care</h4>
                <p className="text-xs text-brand-espresso/70 leading-relaxed font-light">
                  Every order is custom-baked on receipt. There are no pre-made, frozen sponges here.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-caramel shadow-xs border border-brand-stone/40">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-sans text-sm font-semibold text-brand-espresso">True Premium Grains</h4>
                <p className="text-xs text-brand-espresso/70 leading-relaxed font-light">
                  Fine-milled grade organic flours, dark cocoa double-buttered chunks, and natural raw honey.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-caramel shadow-xs border border-brand-stone/40">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-sans text-sm font-semibold text-brand-espresso">Custom Designs</h4>
                <p className="text-xs text-brand-espresso/70 leading-relaxed font-light">
                  Share a photo or color scheme and we'll sculpt matching buttercreams and edible garnishes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
