import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import CustomForm from "./components/CustomForm";
import PickupGuide from "./components/PickupGuide";
import InstagramShowcase from "./components/InstagramShowcase";
import { MenuItem } from "./types";
import { TESTIMONIALS, CONTACT_INFO, STORE_CHEF_STATEMENT } from "./data";
import { Star, MessageSquare, MapPin, Instagram, Mail, ShieldAlert, Sparkles, Sliders, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Hand } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedBakeFromMenu, setSelectedBakeFromMenu] = useState<MenuItem | null>(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsContainerRef.current) {
      const scrollAmount = reviewsContainerRef.current.clientWidth * 0.8;
      reviewsContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Event listener to monitor current scroll position and set Active Nav Link
  useEffect(() => {
    const handleScrollMonitor = () => {
      const sections = ["hero", "about", "menu", "custom", "pickup"];
      const scrollPosition = window.scrollY + 180;

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollMonitor);
    return () => window.removeEventListener("scroll", handleScrollMonitor);
  }, []);

  // Selection delegate from Menu card clicks to Order configuration
  const handleSelectItemForCustomOrder = (item: MenuItem) => {
    setSelectedBakeFromMenu(item);
    
    // Smoothly scroll to the Custom builder box
    setTimeout(() => {
      handleScrollToSection("custom");
    }, 150);
  };

  const handleClearSelectedItem = () => {
    setSelectedBakeFromMenu(null);
  };

  return (
    <div className="min-h-screen font-sans bg-brand-cream text-brand-espresso flex flex-col relative antialiased selection:bg-brand-caramel/20 selection:text-brand-espresso">
      
      {/* Styled Navbar with Integrated Announcement Bar */}
      <Navbar
        onNavClick={handleScrollToSection}
        activeSection={activeSection}
        showWelcomeBanner={showWelcomeBanner}
        onDismissBanner={() => setShowWelcomeBanner(false)}
      />

      {/* Master Main Body Wrapper */}
      <main className="flex-grow">
        
        {/* 1. Hero Showcase Area */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* 2. Brand story Statement quote block */}
        <About />

        {/* 3. The Interactive Menu Catalog Grid */}
        <Menu onSelectItemForCustomOrder={handleSelectItemForCustomOrder} />

        {/* 4. Luxury Custom Order WhatsApp Builder */}
        <CustomForm
          selectedItem={selectedBakeFromMenu}
          onClearSelectedItem={handleClearSelectedItem}
        />

        {/* 5. Pickup Guide / Map */}
        <PickupGuide />

        {/* 6. Customer Testimonials & Reviews */}
        <section className="py-24 bg-brand-linen relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div className="text-left space-y-2 max-w-2xl">
                <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-caramel font-bold">
                  <Star className="w-3.5 h-3.5 text-brand-caramel fill-brand-caramel" />
                  <span>Real Customer Love</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-espresso tracking-tight">
                  Sweet Words from Happy Hearts
                </h2>
                <p className="font-sans text-brand-espresso/70 text-xs sm:text-sm font-light">
                  Read genuine feedback from our beloved clients in Bangalore.
                </p>
              </div>

              {/* Horizontal Scroll Navigation Controls */}
              {TESTIMONIALS.length > 3 && (
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => scrollReviews("left")}
                    aria-label="Previous reviews"
                    className="w-10 h-10 rounded-full bg-brand-cream border border-brand-stone/60 hover:bg-brand-espresso hover:text-brand-cream hover:border-brand-espresso flex items-center justify-center text-brand-espresso transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollReviews("right")}
                    aria-label="Next reviews"
                    className="w-10 h-10 rounded-full bg-brand-cream border border-brand-stone/60 hover:bg-brand-espresso hover:text-brand-cream hover:border-brand-espresso flex items-center justify-center text-brand-espresso transition-colors shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Horizontal Scrolling Card Track: 3 cards visible at once on desktop */}
            <div
              ref={reviewsContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
            >
              {TESTIMONIALS.map((test) => (
                <div
                  key={test.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-brand-cream p-8 rounded-3xl border border-brand-stone/50 shadow-sm flex flex-col justify-between text-left group hover:shadow-lg transition-shadow duration-300 min-h-[220px]"
                >
                  <div className="space-y-4">
                    {/* Stars bar */}
                    <div className="flex items-center space-x-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                      ))}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-brand-espresso/80 italic font-light leading-relaxed whitespace-pre-line">
                      "{test.text}"
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-stone/30 flex items-center justify-between">
                    <div>
                      <span className="block font-serif text-sm font-bold text-brand-espresso">{test.name}</span>
                      <span className="block text-[10px] text-brand-caramel uppercase tracking-wider font-semibold mt-0.5">{test.role}</span>
                    </div>
                    
                    <span className="text-[10px] uppercase font-mono tracking-widest text-brand-espresso/40">Verified client</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Instagram Showcase feed */}
        <InstagramShowcase />

      </main>

      {/* Luxury Footer with Contact layout */}
      <footer className="bg-brand-espresso text-brand-cream pt-16 pb-12 relative overflow-hidden border-t-2 border-brand-gold/65">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-brand-cream/10">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-4 text-left space-y-4">
              <span className="font-serif text-2xl tracking-wider font-bold text-brand-cream block">
                Belaku Bakes
              </span>
              <p className="text-xs text-brand-cream/70 leading-relaxed font-light max-w-sm">
                An artisanal cloud kitchen dedicated to bringing joy and happiness through custom bakes, brownies, cookies, cheesecakes, and savory bites baked purely with care.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram handle link"
                  className="w-8 h-8 rounded-full border border-brand-cream/20 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors text-brand-cream/80"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Fast navigation */}
            <div className="md:col-span-3 text-left space-y-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-brand-gold block">
                Fast Navigation
              </span>
              <ul className="space-y-2.5 text-xs text-brand-cream/85 font-light">
                <li>
                  <button onClick={() => handleScrollToSection("about")} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                    The Belaku Story
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("menu")} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                    Explore Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("custom")} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                    Send WhatsApp Request
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("pickup")} className="hover:text-brand-gold transition-colors cursor-pointer text-left">
                    Self-Pickup Logistics
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Hours info */}
            <div className="md:col-span-5 text-left space-y-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-brand-gold block">
                Store Location &amp; Inquiries
              </span>
              
              <div className="space-y-3 text-xs text-brand-cream/85 font-light">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    #11, CMR Layout, Hennur Bande, opposite KCER Enclave, Bengaluru 560043
                  </p>
                </div>

                <div className="flex items-center space-x-2.5">
                  <MessageSquare className="w-4 h-4 text-brand-gold shrink-0" />
                  <p>Inquiries Phone/WhatsApp: <span className="font-semibold text-brand-gold">{CONTACT_INFO.formattedPhone}</span></p>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Instagram className="w-4 h-4 text-brand-gold shrink-0" />
                  <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">
                    Instagram: {CONTACT_INFO.instagramUsername}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright area */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-brand-cream/50 font-light space-y-3 sm:space-y-0 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} **Belaku Bakes**. All rights reserved. Baked freshly by hand in Bengaluru.
            </span>
            <div className="flex space-x-4">
              <span className="hover:text-brand-gold transition-colors">Pure Butter &amp; Organic Flour Purists</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
