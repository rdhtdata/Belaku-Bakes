import { useState, useTransition } from "react";
import { Star, ArrowUpRight, ArrowLeft, ArrowRight, Sparkles, BookOpen, LayoutGrid, Info, Check, X } from "lucide-react";
import { MENU_ITEMS, BOOK_PAGES } from "../data";
import { MenuItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { BelakuLogoSymbol } from "./BelakuLogo";
import { SafeImage } from "./SafeImage";
import { ParallaxImage } from "./ParallaxImage";
import { MaskHeading, ClipPathReveal, StaggerCard } from "./RevealEffects";

interface MenuProps {
  onSelectItemForCustomOrder: (item: MenuItem) => void;
}

export default function Menu({ onSelectItemForCustomOrder }: MenuProps) {
  const [viewMode, setViewMode] = useState<"booklet" | "grid">("grid");
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string>("");
  const [selectedFlavorInModal, setSelectedFlavorInModal] = useState<string>("");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("");
  const [, startTransition] = useTransition();

  const categories = [
    { label: "All Delights", value: "all" },
    { label: "Cakes", value: "cakes" },
    { label: "Brownies", value: "brownies" },
    { label: "Cheesecakes", value: "cheesecakes" },
    { label: "Cupcakes", value: "cupcakes" },
    { label: "Cookies", value: "cookies" },
    { label: "Tarts", value: "tarts" },
    { label: "Savory Snacks", value: "savory" }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.flavors && item.flavors.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const handleOpenItemModal = (item: MenuItem) => {
    setSelectedItem(item);
    setActiveModalImage(item.image);
    setSelectedFlavorInModal("");
    if (item.subcategories && item.subcategories.length > 0) {
      setActiveSubcategory(item.subcategories[0].id);
    } else {
      setActiveSubcategory("");
    }
  };

  const handleSelectFlavorInModal = (flavorName: string) => {
    setSelectedFlavorInModal(flavorName);
    const cleanFlavor = flavorName.split(" (")[0].trim();
    if (selectedItem?.flavorImages && selectedItem.flavorImages[cleanFlavor]) {
      setActiveModalImage(selectedItem.flavorImages[cleanFlavor]);
    }
  };

  const handleCustomOrderRequest = (item: MenuItem) => {
    onSelectItemForCustomOrder(item);
    setSelectedItem(null); // Close modal
  };

  // Helper to click listed row in booklets and auto resolve back to custom form
  const handleDirectSelectBake = (baseCategory: string) => {
    const matchedItem = MENU_ITEMS.find((m) => m.category === baseCategory || m.id === baseCategory);
    if (matchedItem) {
      onSelectItemForCustomOrder(matchedItem);
    } else if (MENU_ITEMS.length > 0) {
      onSelectItemForCustomOrder(MENU_ITEMS[0]);
    }
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setActivePageIndex((prev) => (prev > 0 ? prev - 1 : BOOK_PAGES.length - 1));
    } else {
      setActivePageIndex((prev) => (prev < BOOK_PAGES.length - 1 ? prev + 1 : 0));
    }
  };

  const currentBookPage = BOOK_PAGES[activePageIndex] || BOOK_PAGES[0];

  return (
    <section id="menu" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-stone/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#DF8CA3]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title Area */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#4d2c19] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-caramel fill-brand-caramel/25" />
            <span>Official Price Catalog</span>
          </span>
          <MaskHeading className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight leading-tight">
            Our Freshly Baked Menu
          </MaskHeading>
          <p className="font-sans text-brand-espresso/70 text-sm sm:text-base font-light leading-relaxed">
            Browse our delightful creations as a premium Card Album, or switch to the Booklet View to flip through pages styled exactly after our official brand menu sheets. Each slice, bite, and savory bun is freshly baked on receipt.
          </p>
        </div>

        {/* View Mode Selectors */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-brand-linen rounded-full border border-brand-stone/60 shadow-inner">
            <button
              onClick={() => startTransition(() => setViewMode("grid"))}
              className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider inline-flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-brand-espresso text-brand-cream shadow-sm"
                  : "bg-transparent text-brand-espresso/60 hover:text-brand-espresso"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Card Album View</span>
            </button>
            <button
              onClick={() => startTransition(() => setViewMode("booklet"))}
              className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider inline-flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === "booklet"
                  ? "bg-brand-espresso text-brand-cream shadow-sm"
                  : "bg-transparent text-brand-espresso/60 hover:text-brand-espresso"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Booklet View</span>
            </button>
          </div>
        </div>

        {/* 1. DIGITAL BOOKLET PRESENTATION (SECONDARY VIEW) */}
        <AnimatePresence mode="wait">
          {viewMode === "booklet" && currentBookPage && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Quick Booklet Index tabs */}
              <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-4 scrollbar-none max-w-full">
                {BOOK_PAGES.map((pg, index) => (
                  <button
                    key={pg.id}
                    onClick={() => setActivePageIndex(index)}
                    className={`py-2 px-3.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                      activePageIndex === index
                        ? "bg-transparent border-[#DF8CA3] text-brand-espresso font-black"
                        : "bg-brand-cream border-brand-stone/80 text-brand-espresso font-semibold hover:bg-brand-linen"
                    }`}
                  >
                    {pg.title}
                  </button>
                ))}
              </div>

              {/* Master Retro Menu Card Sheet (Matches PDF Booklet precisely) */}
              <div className="relative bg-[#f2e0cc] rounded-3xl p-4 sm:p-8 lg:p-12 shadow-2xl border-2 sm:border-4 border-[#DF8CA3]/35 flex flex-col justify-between overflow-hidden min-h-[480px] sm:min-h-[560px]">
                
                {/* Vintage Double Line Border Accents */}
                <div className="absolute inset-1.5 sm:inset-2 border border-[#4d2c19]/15 pointer-events-none rounded-2xl" />
                <div className="absolute inset-3 sm:inset-4 border-2 border-dashed border-[#DF8CA3]/30 pointer-events-none rounded-xl" />

                {/* Corner Pink Floral/Laurel Leaf Vector Graphics Mock (SVG) */}
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 opacity-20 sm:opacity-30 select-none pointer-events-none">
                  <BelakuLogoSymbol size={36} />
                </div>
                <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 opacity-20 sm:opacity-30 select-none pointer-events-none transform rotate-180">
                  <BelakuLogoSymbol size={36} />
                </div>

                {/* Card Sheet Header */}
                <div className="text-center relative z-10 space-y-1.5 pb-4 sm:pb-6 border-b border-[#4d2c19]/20">
                  <div className="flex items-center justify-center space-x-1.5 text-xs text-[#4d2c19] tracking-widest uppercase font-bold">
                    <Star className="w-3.5 h-3.5 fill-brand-caramel text-brand-caramel" />
                    <span className="text-brand-caramel font-bold">Belaku Bakes</span>
                    <Star className="w-3.5 h-3.5 fill-brand-caramel text-brand-caramel" />
                  </div>
                  
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3.5xl font-extrabold text-[#4d2c19] tracking-tight py-1">
                    {currentBookPage.title}
                  </h3>
                  
                  <p className="text-xs text-[#4d2c19]/80 font-sans italic tracking-wide max-w-md mx-auto px-2">
                    {currentBookPage.tagline}
                  </p>
                </div>

                {/* Printable Menu Table Listing (with horizontal swipe on narrow phones) */}
                <div className="my-6 sm:my-8 relative z-10 overflow-x-auto scrollbar-thin touch-pan-x">
                  <table className="w-full text-left font-sans text-xs min-w-[420px] sm:min-w-full">
                    <thead>
                      <tr className="border-b border-[#4d2c19]/20 text-[#4d2c19] font-bold text-[11px] uppercase tracking-wider">
                        {currentBookPage.columns.map((col: string, cIdx: number) => (
                          <th key={cIdx} className={`py-2.5 px-3 sm:px-4 first:pl-2 font-black ${cIdx === currentBookPage.columns.length - 1 ? "last:text-right" : ""}`}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4d2c19]/10 text-brand-espresso/90">
                      {currentBookPage.rows.map((row: any, rIdx: number) => (
                        <tr
                          key={rIdx}
                          onClick={() => handleDirectSelectBake(currentBookPage.category)}
                          className="hover:bg-[#ebd5c1]/60 transition-colors group/row cursor-pointer"
                        >
                          {/* Col 1: Name */}
                          <td className="py-2.5 sm:py-3 px-3 sm:px-4 pl-2 font-medium">
                            <span className="flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#DF8CA3] opacity-40 shrink-0" />
                              <span className="group-hover/row:text-brand-caramel transition-colors font-serif text-xs sm:text-sm font-bold text-[#4d2c19]">
                                {row.name}
                              </span>
                            </span>
                          </td>

                          {/* Dynamic price columns */}
                          {currentBookPage.sizes && currentBookPage.sizes.length > 0 ? (
                            currentBookPage.sizes.map((sz: string, sIdx: number) => (
                              <td
                                key={sz}
                                className={`py-2.5 sm:py-3 px-3 sm:px-4 text-[#4d2c19] font-mono text-xs font-medium ${sIdx === currentBookPage.sizes.length - 1 ? "text-right" : ""}`}
                              >
                                {row[sz] || "-"}
                              </td>
                            ))
                          ) : (
                            <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[#4d2c19] font-mono text-xs font-medium text-right">
                              {row.price || "-"}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom easy order prompt callouts */}
                <div className="pt-4 sm:pt-6 border-t border-[#4d2c19]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 relative z-10">
                  <div className="text-left space-y-0.5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-[#4d2c19]">Easy WhatsApp Ordering</span>
                    <p className="text-[11px] text-brand-espresso/70 font-light">
                      Tap any bake to choose your flavor, portion size, and send your request directly to WhatsApp!
                    </p>
                  </div>

                  <button
                    onClick={() => handleDirectSelectBake(currentBookPage.category)}
                    className="w-full sm:w-auto py-2.5 sm:py-3 px-5 sm:px-6 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-xl text-xs uppercase font-bold tracking-widest transition-all shadow-md inline-flex items-center justify-center space-x-2 cursor-pointer shrink-0"
                  >
                    <span>Request Custom {currentBookPage.title}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slider Paging controls */}
              <div className="flex items-center justify-between px-2 pt-2 text-xs text-brand-espresso/60 font-sans">
                <button
                  onClick={() => handlePageChange("prev")}
                  className="inline-flex items-center space-x-1.5 py-2 px-4 hover:text-brand-espresso rounded-full hover:bg-brand-linen transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                <span className="font-mono font-semibold">
                  Page {activePageIndex + 1} of {BOOK_PAGES.length}
                </span>

                <button
                  onClick={() => handlePageChange("next")}
                  className="inline-flex items-center space-x-1.5 py-2 px-4 hover:text-brand-espresso rounded-full hover:bg-brand-linen transition-all cursor-pointer"
                >
                  <span>Next Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. CARD ALBUM VIEW (PRIMARY/DEFAULT VIEW) */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12"
            >
              {/* Category selector pills and search */}
              <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-brand-linen/40 p-4 rounded-2xl border border-brand-stone/40">
                <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`px-4 py-2 text-xs font-sans font-bold tracking-wide uppercase rounded-full whitespace-nowrap transition-all duration-300 gap-1.5 inline-flex items-center cursor-pointer ${
                          isActive
                            ? "bg-brand-espresso text-brand-cream shadow-sm"
                            : "bg-transparent text-brand-espresso/85 hover:text-brand-espresso hover:bg-brand-linen"
                        }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />}
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                <div className="w-full md:w-72">
                  <input
                    type="text"
                    placeholder="Search gourmet bakes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-brand-cream border border-brand-stone/80 rounded-full focus:outline-hidden focus:border-brand-caramel text-brand-espresso font-sans"
                  />
                </div>
              </div>

              {/* Grid cards with Staggered Cascading Reveals */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, idx) => (
                  <StaggerCard key={item.id} index={idx} className="h-full">
                    <motion.div
                      layoutId={`menu-card-${item.id}`}
                      onClick={() => handleOpenItemModal(item)}
                      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                      className="group flex flex-col h-full bg-brand-linen/25 rounded-2xl overflow-hidden border border-brand-stone/40 hover:border-brand-caramel/50 hover:shadow-xl transition-all duration-300 cursor-pointer text-left relative"
                    >
                      {/* Step 1 & Step 3: Image with Zoom and Hover Overlay */}
                      <div className="relative aspect-4/3 overflow-hidden bg-brand-stone">
                        <ParallaxImage
                          src={item.image}
                          alt={item.name}
                          offset={16}
                          scale={1.12}
                          className="select-none group-hover:scale-105 duration-700 transition-transform"
                        />
                        
                        {/* Step 3: Hover Overlay with animated "View details →" pill */}
                        <div className="absolute inset-0 bg-brand-espresso/35 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
                          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 bg-brand-cream/95 text-brand-espresso px-4 py-2 rounded-full text-xs font-serif font-bold tracking-wider shadow-lg border border-brand-stone/60 flex items-center space-x-2">
                            <span>View details</span>
                            {/* Step 4: Move arrow slightly to the right */}
                            <ArrowRight className="w-3.5 h-3.5 text-brand-caramel transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                        
                        <span className="absolute top-3 left-3 bg-brand-cream/95 backdrop-blur-md text-[10px] text-brand-caramel tracking-wider font-bold uppercase py-1 px-2.5 rounded-full border border-brand-stone/40">
                          {item.category}
                        </span>

                        {item.customizable && (
                          <span className="absolute top-3 right-3 bg-brand-espresso/95 text-brand-gold text-[10px] tracking-wider font-bold uppercase py-1 px-2.5 rounded-full flex items-center space-x-1 border border-brand-stone/25">
                            <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
                            <span>Customizable</span>
                          </span>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-grow space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif text-lg font-bold text-brand-espresso group-hover:text-brand-caramel transition-colors leading-tight">
                            {item.name}
                          </h3>
                          <span className="font-sans text-sm font-bold text-brand-caramel whitespace-nowrap bg-brand-cream/80 border border-brand-stone/20 py-0.5 px-2 rounded-md">
                            {item.priceEstimate}
                          </span>
                        </div>

                        <p className="text-xs text-brand-espresso/70 leading-relaxed font-light line-clamp-2 h-9">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-sans font-medium text-brand-espresso/60 bg-brand-linen py-0.5 px-2 rounded-md border border-brand-stone/10">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-brand-stone/20 mt-auto">
                          <span className="inline-flex items-center text-[10px] sm:text-[11px] text-brand-espresso/50 font-mono">
                            {item.subcategories ? "3 Cuts Available" : `${item.flavors?.length || 1} Flavor Choices`}
                          </span>
                          <span className="text-xs font-sans font-semibold text-brand-caramel flex items-center space-x-1 group-hover:text-brand-espresso transition-colors">
                            <span>View Details &amp; Photos</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerCard>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="py-16 text-center text-brand-espresso/60 bg-brand-linen/20 rounded-2xl border border-dashed border-brand-stone">
                  <Info className="w-8 h-8 text-brand-caramel mx-auto mb-2 opacity-65" />
                  <span className="block font-medium">No gourmet items found</span>
                  <span className="block text-xs font-light mt-1">Try toggling terms or switching to Booklet View.</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Detail Modal Component with Interactive Image Gallery & Flavor Selector */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-brand-espresso/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-brand-cream rounded-3xl overflow-hidden shadow-2xl border border-brand-stone z-10 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              {/* Explicit Floating Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-brand-cream/90 hover:bg-brand-cream text-brand-espresso flex items-center justify-center shadow-md border border-brand-stone/60 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12 items-stretch">
                
                {/* Image Section with Gallery */}
                <div className="sm:col-span-5 flex flex-col bg-brand-stone/30 border-b sm:border-b-0 sm:border-r border-brand-stone/40">
                  <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-brand-stone">
                    <SafeImage
                      src={activeModalImage || selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Scrollable Gallery Thumbnails */}
                  {selectedItem.galleryImages && selectedItem.galleryImages.length > 1 && (
                    <div className="p-3 bg-brand-linen/40 border-t border-brand-stone/30">
                      <span className="block text-[9px] uppercase tracking-wider font-bold text-brand-espresso/60 mb-2 text-left">
                        Category Gallery ({selectedItem.galleryImages.length} Photos)
                      </span>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
                        {selectedItem.galleryImages.map((imgSrc, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveModalImage(imgSrc)}
                            className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer transition-all ${
                              activeModalImage === imgSrc
                                ? "border-brand-caramel scale-105 shadow-sm"
                                : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                          >
                            <SafeImage src={imgSrc} alt="gallery thumbnail" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Information and Options Panel */}
                <div className="sm:col-span-7 p-5 sm:p-8 flex flex-col justify-between text-left space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start pr-8 sm:pr-0">
                      <span className="bg-brand-linen text-brand-caramel text-[9px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-full border border-brand-stone/40 inline-block">
                        {selectedItem.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-brand-caramel bg-brand-linen/60 px-2.5 py-1 rounded-lg">
                        {selectedItem.priceEstimate}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-brand-espresso leading-tight">
                        {selectedItem.name}
                      </h3>
                      <p className="text-xs text-brand-espresso/80 leading-relaxed font-light mt-1.5">
                        {selectedItem.description}
                      </p>
                    </div>

                    {/* Brownie Subcategories Switcher */}
                    {selectedItem.subcategories && selectedItem.subcategories.length > 0 && (
                      <div className="pt-2 border-t border-brand-stone/30 space-y-2">
                        <span className="block text-[11px] text-brand-espresso/70 tracking-tight font-semibold">
                          Choose Brownie Cut &amp; Size:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {selectedItem.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => setActiveSubcategory(sub.id)}
                              className={`py-2 px-2 rounded-xl text-[10px] font-sans font-bold text-center border transition-all cursor-pointer ${
                                activeSubcategory === sub.id
                                  ? "bg-brand-espresso text-brand-cream border-brand-espresso shadow-xs"
                                  : "bg-brand-cream text-brand-espresso/70 border-brand-stone/60 hover:bg-brand-linen"
                              }`}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interactive Flavor Pills linked to photo preview */}
                    {selectedItem.flavors && selectedItem.flavors.length > 0 && (
                      <div className="pt-2 border-t border-brand-stone/30 space-y-1.5">
                        <span className="block text-[11px] text-brand-espresso/70 tracking-tight font-semibold">
                          Click Flavor to View Specific Photo:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedItem.flavors.map((fl) => {
                            const cleanFl = fl.split(" (")[0].trim();
                            const isSelected = selectedFlavorInModal === fl;
                            return (
                              <button
                                key={fl}
                                type="button"
                                onClick={() => handleSelectFlavorInModal(fl)}
                                className={`text-[10px] px-2.5 py-1 rounded-full font-sans transition-all flex items-center space-x-1 cursor-pointer border ${
                                  isSelected
                                    ? "bg-brand-caramel text-brand-cream border-brand-caramel font-bold shadow-xs"
                                    : "bg-brand-cream/80 border-brand-stone/70 text-brand-espresso/85 hover:border-brand-caramel hover:text-brand-espresso"
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 mr-0.5 text-brand-cream" />}
                                <span>{cleanFl}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Sizes list */}
                    {selectedItem.sizes && selectedItem.sizes.length > 0 && (
                      <div className="pt-2">
                        <span className="block text-[11px] text-brand-espresso/70 tracking-tight font-semibold">
                          Available Sizes &amp; Portions:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedItem.sizes.map((sz) => (
                            <span key={sz} className="text-[10px] bg-brand-cream border border-brand-stone/60 px-2 py-0.5 rounded-md font-mono text-brand-espresso/80">
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-brand-stone/30">
                    <button
                      onClick={() => handleCustomOrderRequest(selectedItem)}
                      className="w-full py-3 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                    >
                      <span>Customize &amp; Order</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedItem(null)}
                      className="w-full py-2 bg-transparent text-brand-espresso/70 hover:text-brand-espresso hover:bg-brand-linen/50 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                    >
                      Keep Browsing
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
