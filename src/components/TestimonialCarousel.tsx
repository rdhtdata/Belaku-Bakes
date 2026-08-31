import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../data";

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const totalReviews = TESTIMONIALS.length;

  // Slow, gentle editorial autoplay (every 6 seconds)
  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prevReview = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, [nextReview, isPaused, isDragging]);

  // Mouse / Touch drag handling
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = clientX - startXRef.current;
    if (diff < -45) {
      nextReview();
    } else if (diff > 45) {
      prevReview();
    }
  };

  // Visible window: current, next, and 3rd on desktop
  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-brand-linen/40 border-t border-brand-stone/40 relative overflow-hidden">
      {/* Decorative ambient blurred backgrounds */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-stone/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-cream/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-2 max-w-xl">
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-caramel font-bold">
              <Star className="w-3.5 h-3.5 text-brand-caramel fill-brand-caramel" />
              <span>Real Customer Love</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight">
              Sweet Words from Happy Hearts
            </h2>
            <p className="font-sans text-brand-espresso/70 text-xs sm:text-sm font-light">
              Read genuine feedback from our beloved dessert lovers in Bengaluru.
            </p>
          </div>

          {/* Nav Arrows */}
          <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
            <button
              onClick={prevReview}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full bg-brand-cream border border-brand-stone/60 hover:bg-brand-espresso hover:text-brand-cream hover:border-brand-espresso flex items-center justify-center text-brand-espresso transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextReview}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-brand-cream border border-brand-stone/60 hover:bg-brand-espresso hover:text-brand-cream hover:border-brand-espresso flex items-center justify-center text-brand-espresso transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Interactive Carousel Track */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setIsDragging(false);
          }}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          className="cursor-grab active:cursor-grabbing select-none"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const itemIndex = (currentIndex + offset) % totalReviews;
              const test = TESTIMONIALS[itemIndex];
              const isLead = offset === 0;

              return (
                <motion.div
                  key={`${test.id}-${offset}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`bg-brand-cream p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between text-left relative ${
                    isLead
                      ? "border-brand-caramel/50 shadow-md ring-1 ring-brand-caramel/20 md:scale-[1.02]"
                      : "border-brand-stone/40 shadow-xs opacity-90 md:opacity-100"
                  } ${offset > 0 ? "hidden md:flex" : "flex"} min-h-[240px] sm:min-h-[260px]`}
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-stone/40 pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    {/* Golden Stars */}
                    <div className="flex items-center space-x-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold fill-brand-gold" />
                      ))}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-brand-espresso/85 italic font-serif leading-relaxed">
                      "{test.text}"
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-brand-stone/30 flex items-center justify-between relative z-10">
                    <div>
                      <span className="block font-serif text-sm font-bold text-brand-espresso">{test.name}</span>
                      <span className="block text-[10px] text-brand-caramel uppercase tracking-wider font-semibold mt-0.5">
                        {test.role}
                      </span>
                    </div>
                    
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-brand-espresso/45 bg-brand-linen/60 px-2 py-0.5 rounded-full border border-brand-stone/30">
                      Verified
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Slow Carousel Pagination Indicators */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {TESTIMONIALS.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "w-8 bg-brand-espresso"
                    : "w-2 bg-brand-stone/70 hover:bg-brand-caramel"
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
