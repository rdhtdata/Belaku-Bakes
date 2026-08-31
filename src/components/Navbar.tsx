import { useState, useEffect } from "react";
import { Sparkles, Menu, X, Clock, UtensilsCrossed, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BelakuLogoFull } from "./BelakuLogo";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  showWelcomeBanner?: boolean;
  onDismissBanner?: () => void;
}

export default function Navbar({
  onNavClick,
  activeSection,
  showWelcomeBanner = true,
  onDismissBanner,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "The Story", id: "about" },
    { label: "Our Bakes", id: "menu" },
    { label: "Bespoke Requests", id: "custom" },
    { label: "Our Location", id: "pickup" },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-brand-cream/95 backdrop-blur-md border-b border-brand-stone/50 shadow-xs"
          : "bg-brand-cream border-b border-brand-stone/30"
      }`}
    >
        {/* Top Welcome Notification Bar (Embedded in flow, never overlapping headlines) */}
        <AnimatePresence>
          {showWelcomeBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-brand-espresso text-brand-cream py-2 px-4 sm:px-6 relative overflow-hidden border-b border-brand-stone/20"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between text-left text-[11px] sm:text-xs tracking-wide">
                <span className="font-light flex items-center gap-2 pr-2">
                  <Sparkles
                    className="w-3.5 h-3.5 text-brand-gold shrink-0 animate-spin"
                    style={{ animationDuration: "12s" }}
                  />
                  <span className="truncate sm:overflow-visible sm:whitespace-normal">
                    Oven-fresh custom bakes by{" "}
                    <strong className="font-semibold text-brand-gold">
                      Vaishnavi K.S.
                    </strong>{" "}
                    in Hennur, Bangalore.
                  </span>
                </span>
                {onDismissBanner && (
                  <button
                    onClick={onDismissBanner}
                    className="text-brand-cream/80 hover:text-brand-gold text-[10px] uppercase font-bold tracking-widest pl-3 shrink-0 transition-colors cursor-pointer"
                    aria-label="Dismiss banner"
                  >
                    ✕
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex justify-between items-center">
          {/* Logo Brand area */}
          <button
            onClick={() => handleItemClick("hero")}
            className="group flex items-center text-left cursor-pointer focus:outline-hidden"
          >
            <BelakuLogoFull size={42} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative font-sans text-sm tracking-wide transition-colors duration-300 py-1.5 focus:outline-hidden cursor-pointer ${
                    active
                      ? "text-brand-espresso font-semibold"
                      : "text-brand-espresso/70 hover:text-brand-espresso"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-caramel rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-3.5">
            <a
              href="https://www.instagram.com/belaku_bakes/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-brand-linen text-brand-espresso hover:text-brand-caramel rounded-full transition-colors duration-300 border border-brand-stone/40 inline-flex items-center justify-center cursor-pointer shadow-xs"
              title="Follow us on Instagram @belaku_bakes"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={() => handleItemClick("custom")}
              className="px-5 py-2.5 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-500 shadow-sm cursor-pointer border border-transparent hover:border-brand-stone"
            >
              Custom Request
            </button>
          </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2.5 text-brand-espresso focus:outline-hidden cursor-pointer rounded-full hover:bg-brand-linen/60 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu Drawer (Anchored directly under header) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 z-40 bg-brand-cream border-b border-brand-stone shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto block md:hidden"
            >
              <div className="p-5 sm:p-6 space-y-6">
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`text-left text-lg font-serif py-3 px-2 border-b border-brand-stone/30 focus:outline-hidden cursor-pointer transition-colors ${
                        activeSection === item.id
                          ? "text-brand-caramel font-bold bg-brand-linen/40 rounded-lg"
                          : "text-brand-espresso/85 hover:text-brand-espresso"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="pt-2 flex flex-col space-y-3.5">
                  <button
                    onClick={() => handleItemClick("custom")}
                    className="w-full text-center py-3.5 px-4 bg-brand-espresso text-brand-cream hover:bg-brand-caramel rounded-full text-xs uppercase tracking-wider font-bold transition-colors duration-300 cursor-pointer shadow-md"
                  >
                    Begin Custom Creation
                  </button>

                  <a
                    href="https://www.instagram.com/belaku_bakes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-3 px-4 bg-transparent text-brand-espresso hover:bg-brand-linen rounded-full text-xs uppercase tracking-wider font-bold transition-colors duration-300 cursor-pointer border border-brand-stone/60 inline-flex items-center justify-center space-x-2"
                  >
                    <Instagram className="w-4 h-4 text-brand-caramel" />
                    <span>Follow @belaku_bakes</span>
                  </a>

                  <div className="flex items-center justify-between text-xs text-brand-espresso/70 pt-4 border-t border-brand-stone/40">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-brand-caramel" /> 10:30 AM - 8:30 PM
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <UtensilsCrossed className="w-3.5 h-3.5 text-brand-caramel" /> Cloud Kitchen
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
