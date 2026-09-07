import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const totalReviews = TESTIMONIALS.length;

  // Responsive breakpoint detector for mobile (1 card) vs desktop (3 cards)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = isMobile ? Math.max(0, totalReviews - 1) : Math.max(0, totalReviews - 3);

  // Smooth next/prev handlers
  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevReview = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Adjust index if screen resized and currentIndex exceeds maxIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  // Slow, gentle editorial autoplay (every 6 seconds)
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, [nextReview, isPaused, maxIndex]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff < -45) {
      nextReview();
    } else if (diff > 45) {
      prevReview();
    }
    touchStartXRef.current = null;
  };

  // Safe active index
  const activeIndex = Math.min(currentIndex, maxIndex);

  // Precise CSS translation for mobile and desktop without layout reflows
  const transformValue = isMobile
    ? `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 24}px))`
    : `translateX(calc(-${activeIndex} * ((100% - 48px) / 3 + 24px)))`;

  return (
    <section className="py-24 bg-brand-linen/40 border-t border-brand-stone/40 relative overflow-hidden">
      {/* Decorative ambient blurred backgrounds */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-stone/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-cream/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-2 max-w-xl">
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#4d2c19] font-bold">
              <Star className="w-3.5 h-3.5 text-[#4d2c19] fill-[#4d2c19]" />
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

        {/* Carousel Viewport */}
        <div
          className="overflow-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Continuous Sliding Track */}
          <div
            className="flex gap-6 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{ transform: transformValue }}
          >
            {TESTIMONIALS.map((test, idx) => {
              const isHighlight = isMobile
                ? idx === activeIndex
                : idx >= activeIndex && idx < activeIndex + 3;

              return (
                <div
                  key={test.id || idx}
                  className={`shrink-0 ${
                    isMobile
                      ? "w-full"
                      : "w-[calc((100%-48px)/3)]"
                  }`}
                >
                  <div
                    className={`h-full min-h-[260px] sm:min-h-[280px] bg-brand-cream p-6 sm:p-8 rounded-3xl border flex flex-col justify-between text-left relative transition-all duration-300 shadow-xs hover:shadow-md ${
                      isHighlight
                        ? "border-brand-stone/60 ring-1 ring-brand-stone/30"
                        : "border-brand-stone/30 opacity-70"
                    }`}
                  >
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-stone/40 pointer-events-none" />

                    <div className="space-y-4 relative z-10">
                      {/* Golden Stars */}
                      <div className="flex items-center space-x-1">
                        {[...Array(test.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold fill-brand-gold"
                          />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-brand-espresso/85 italic font-serif leading-relaxed line-clamp-6">
                        "{test.text}"
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-brand-stone/30 flex items-center justify-between relative z-10">
                      <div>
                        <span className="block font-serif text-sm font-bold text-brand-espresso">
                          {test.name}
                        </span>
                        <span className="block text-[10px] text-brand-caramel uppercase tracking-wider font-semibold mt-0.5">
                          {test.role || "Verified Client"}
                        </span>
                      </div>

                      <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-brand-espresso/50 bg-brand-linen/70 px-2 py-0.5 rounded-full border border-brand-stone/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-brand-caramel" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Indicators */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Jump to review slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "w-8 bg-brand-espresso"
                      : "w-2 bg-brand-stone/70 hover:bg-brand-caramel"
                  }`}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
