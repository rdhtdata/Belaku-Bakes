import { useState, useTransition } from "react";
import { Star, ArrowUpRight, ArrowLeft, ArrowRight, MessageSquare, Info, Sparkles, BookOpen, LayoutGrid, CheckCircle2 } from "lucide-react";
import { MENU_ITEMS } from "../data";
import { MenuItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { BelakuLogoSymbol } from "./BelakuLogo";
import { SafeImage } from "./SafeImage";

interface MenuProps {
  onSelectItemForCustomOrder: (item: MenuItem) => void;
}

// Complete PDF Menu pages replication
const BOOK_PAGES = [
  {
    id: "chocolate_cakes",
    title: "Artis artisanal Chocolate Cakes",
    category: "cakes",
    baseId: "cake-chocolate",
    tagline: "Customisation will be additional • Baked with pure premium butter & chocolate",
    columns: ["Chocolate Flavour", "500g", "1000g"],
    rows: [
      { name: "Signature chocolate", p500: "₹850", p1000: "₹1700" },
      { name: "Choco oreo", p500: "₹850", p1000: "₹1700" },
      { name: "Chocolate truffle", p500: "₹900", p1000: "₹1800" },
      { name: "Choco hazelnut", p500: "₹950", p1000: "₹1900" },
      { name: "Choco almond", p500: "₹950", p1000: "₹1900" },
      { name: "Choco cranberry", p500: "₹950", p1000: "₹1900" },
    ]
  },
  {
    id: "fruit_cakes",
    title: "Premium Fruit & Butterscotch Cakes",
    category: "cakes",
    baseId: "cake-gourmet-flavors",
    tagline: "Customisation will be additional • Fresh real fruit pulps and praline",
    columns: ["Gourmet Sponges", "500g", "1000g"],
    rows: [
      { name: "Pineapple gateau", p500: "₹750", p1000: "₹1550" },
      { name: "Butterscotch", p500: "₹800", p1000: "₹1600" },
      { name: "Rasmalai", p500: "₹900", p1000: "₹1800" },
      { name: "Strawberry", p500: "₹900", p1000: "₹1800" },
      { name: "Blueberry", p500: "₹900", p1000: "₹1800" },
    ]
  },
  {
    id: "brownie_bites",
    title: "Artisanal Brownie Bites (Mini Squares)",
    category: "brownies",
    baseId: "brownie-bites",
    tagline: "Perfect miniature cubes of dense chocolatey goodness with crinkle top",
    columns: ["Bites Choice", "Box of 8", "Box of 16", "Box of 24", "Box of 36"],
    rows: [
      { name: "Fudgy", p8: "₹280", p16: "₹560", p24: "₹840", p36: "₹1260" },
      { name: "Peanut butter", p8: "₹300", p16: "₹600", p24: "₹900", p36: "₹1350" },
      { name: "Nutella", p8: "₹320", p16: "₹640", p24: "₹960", p36: "₹1440" },
      { name: "Biscoff", p8: "₹360", p16: "₹720", p24: "₹1080", p36: "₹1620" },
    ]
  },
  {
    id: "medium_brownies",
    title: "Classic Medium Brownie Slabs",
    category: "brownies",
    baseId: "brownie-medium",
    tagline: "Traditional cut slabs. Indulgent texture layered with premium toppings.",
    columns: ["Slab Choice", "Box of 3", "Box of 6", "Box of 8", "Box of 16"],
    rows: [
      { name: "Fudgy", p3: "₹270", p6: "₹540", p8: "₹720", p16: "₹1440" },
      { name: "Peanut butter", p3: "₹280", p6: "₹560", p8: "₹750", p16: "₹1500" },
      { name: "Nutella", p3: "₹290", p6: "₹580", p8: "₹770", p16: "₹1550" },
      { name: "Biscoff", p3: "₹300", p6: "₹600", p8: "₹800", p16: "₹1600" },
    ]
  },
  {
    id: "large_brownies",
    title: "Elite Large Brownie Blocks",
    category: "brownies",
    baseId: "brownie-large",
    tagline: "Deep thick blocks of luxurious Belgian chocolate. Ideal for dessert platters",
    columns: ["Block Choice", "Box of 4", "Box of 6", "Box of 9"],
    rows: [
      { name: "Fudgy", p4: "₹600", p6: "₹900", p9: "₹1350" },
      { name: "Peanut butter", p4: "₹610", p6: "₹920", p9: "₹1380" },
      { name: "Nutella", p4: "₹620", p6: "₹930", p9: "₹1400" },
      { name: "Biscoff", p4: "₹640", p6: "₹960", p9: "₹1500" },
    ]
  },
  {
    id: "cheesecakes",
    title: "Artisanal Cream Cheesecake",
    category: "cheesecakes",
    baseId: "cheesecake-premium",
    tagline: "Velvety smooth pure cheese baked on buttery biscuit base. Exquisite flavor.",
    columns: ["Cheesecake choice", "100g Slice", "500g Slab", "1Kg block"],
    rows: [
      { name: "Blueberry", p100: "₹125", p500: "₹600", p1000: "₹1200" },
      { name: "Strawberry", p100: "₹125", p500: "₹600", p1000: "₹1200" },
      { name: "Nutella", p100: "₹150", p500: "₹620", p1000: "₹1240" },
      { name: "Biscoff", p100: "₹150", p500: "₹650", p1000: "₹1300" },
    ]
  },
  {
    id: "cupcakes_cookies",
    title: "Gourmet Cupcakes & Butter Cookies",
    category: "cookies",
    baseId: "cookies-buttery",
    tagline: "Freshly-whipped frosted intimate cupcakes and pure boutique cookies.",
    columns: ["Bake Choice", "Portions / Packs", "Price Breakdown"],
    rows: [
      { name: "Cupcake: Chocolate truffle", info: "Mini / Medium / Large", price: "₹35 / ₹85 / ₹100" },
      { name: "Cupcake: Signature chocolate", info: "Mini / Medium / Large", price: "₹35 / ₹80 / ₹95" },
      { name: "Cupcake: Vanilla choco chip", info: "Mini / Medium / Large", price: "₹35 / ₹85 / ₹100" },
      { name: "Cupcake: Vanilla", info: "Mini / Medium / Large", price: "₹35 / ₹75 / ₹90" },
      { name: "Cookie: Choco chips", info: "Box of 8 (mini) / Box of 15 (mini)", price: "₹200 / ₹400" },
      { name: "Cookie: Jam cookies", info: "Box of 8 (mini) / Box of 15 (mini)", price: "₹250 / ₹512" },
    ]
  },
  {
    id: "savouries",
    title: "Artesian Warm Savouries & Snacks",
    category: "savory",
    baseId: "savory-gourmet",
    tagline: "Baked to golden crispy perfection with delicious herby vegetable fillings.",
    columns: ["Savoury Selection", "Portion size", "Price per unit"],
    rows: [
      { name: "Sandwich", info: "Single Portion", price: "₹150" },
      { name: "Burger", info: "Single Portion", price: "₹150" },
      { name: "Canape with corn and tangy filling", info: "Portion platter", price: "₹150" },
      { name: "Canape with pasta filling", info: "Portion platter", price: "₹150" },
      { name: "Korean buns", info: "Single Portion", price: "₹90" },
      { name: "Cutlets veg", info: "Single Portion", price: "₹80" },
      { name: "Bread pizza", info: "Single Portion", price: "₹80" },
      { name: "Potato buns", info: "Single Portion", price: "₹60" },
      { name: "Garlic bread", info: "Single Portion", price: "₹60" },
    ]
  }
];

export default function Menu({ onSelectItemForCustomOrder }: MenuProps) {
  const [viewMode, setViewMode] = useState<"booklet" | "grid">("grid");
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [, startTransition] = useTransition();

  const categories = [
    { label: "All Delights", value: "all" },
    { label: "Cakes", value: "cakes" },
    { label: "Fudgy Brownies", value: "brownies" },
    { label: "Cheesecakes", value: "cheesecakes" },
    { label: "Cupcakes & Cookies", value: "cookies_cupcakes" },
    { label: "Savory Crusts", value: "savory" }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    let matchesCategory = false;
    if (selectedCategory === "all") {
      matchesCategory = true;
    } else if (selectedCategory === "cookies_cupcakes") {
      matchesCategory = item.category === "cookies" || item.category === "cupcakes";
    } else {
      matchesCategory = item.category === selectedCategory;
    }

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleCustomOrderRequest = (item: MenuItem) => {
    onSelectItemForCustomOrder(item);
    setSelectedItem(null); // Close modal
  };

  // Helper to click listed row in booklets and auto resolve back to custom form
  const handleDirectSelectBake = (baseId: string) => {
    const matchedItem = MENU_ITEMS.find((m) => m.id === baseId);
    if (matchedItem) {
      onSelectItemForCustomOrder(matchedItem);
    }
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setActivePageIndex((prev) => (prev > 0 ? prev - 1 : BOOK_PAGES.length - 1));
    } else {
      setActivePageIndex((prev) => (prev < BOOK_PAGES.length - 1 ? prev + 1 : 0));
    }
  };

  const currentBookPage = BOOK_PAGES[activePageIndex];

  return (
    <section id="menu" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-stone/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#DF8CA3]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title Area */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#B5836C] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-caramel fill-brand-caramel/25" />
            <span>Official Price Catalog</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight leading-tight">
            Our Freshly Baked Menu
          </h2>
          <p className="font-sans text-brand-espresso/70 text-sm sm:text-base font-light leading-relaxed">
            Browse our delightful creations as a premium Card Album, or switch to the Booklet View to flip through pages styled exactly after our official brand menu sheets. Each slice, bite, and savory bun is freshly baked on receipt.
          </p>
        </div>

        {/* View Mode Selectors */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-brand-linen rounded-full border border-brand-stone/60 shadow-inner">
            <button
              onClick={() => startTransition(() => setViewMode("grid"))}
              className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider inline-flex items-center space-x-2 transition-all ${
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
              className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider inline-flex items-center space-x-2 transition-all ${
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
          {viewMode === "booklet" && (
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
                        : "bg-brand-cream/40 border-brand-stone/40 text-brand-espresso/60 hover:text-brand-espresso hover:bg-brand-linen"
                    }`}
                  >
                    {pg.title.split(" (")[0].replace("Artis artisanal ", "").replace("Gourmet ", "").replace("Classic ", "")}
                  </button>
                ))}
              </div>

              {/* Master Retro Menu Card Sheet (Matches PDF Booklet precisely) */}
              <div className="relative bg-[#FAF6F0] rounded-3xl p-6 sm:p-12 shadow-2xl border-4 border-[#DF8CA3]/35 flex flex-col justify-between overflow-hidden min-h-[560px]">
                
                {/* Vintage Double Line Border Accents */}
                <div className="absolute inset-2 border border-[#4E2E25]/10 pointer-events-none rounded-2xl" />
                <div className="absolute inset-4 border-2 border-dashed border-[#DF8CA3]/30 pointer-events-none rounded-xl" />

                {/* Corner Pink Floral/Laurel Leaf Vector Graphics Mock (SVG) */}
                <div className="absolute top-6 left-6 opacity-30 select-none pointer-events-none">
                  <BelakuLogoSymbol size={44} />
                </div>
                <div className="absolute bottom-6 right-6 opacity-30 select-none pointer-events-none transform rotate-180">
                  <BelakuLogoSymbol size={44} />
                </div>

                {/* Card Sheet Header */}
                <div className="text-center relative z-10 space-y-1.5 pb-6 border-b border-[#4E2E25]/15">
                  <div className="flex items-center justify-center space-x-1.5 text-xs text-[#DF8CA3] tracking-widest uppercase font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Belaku Bakes</span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  
                  <h3 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-[#4E2E25] tracking-tight py-1">
                    {currentBookPage.title}
                  </h3>
                  
                  <p className="text-xs text-[#8D5B4C] font-sans italic tracking-wide max-w-md mx-auto">
                    {currentBookPage.tagline}
                  </p>
                </div>

                {/* Printable Menu Table Listing (Pre-aligned column blocks) */}
                <div className="my-8 relative z-10 overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs">
                    <thead>
                      <tr className="border-b border-[#4E2E25]/15 text-[#4E2E25] font-bold text-[11px] uppercase tracking-wider">
                        {currentBookPage.columns.map((col, cIdx) => (
                          <th key={cIdx} className="py-2.5 px-4 first:pl-2 last:text-right font-black">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4E2E25]/5 text-brand-espresso/90">
                      {currentBookPage.rows.map((row: any, rIdx) => (
                        <tr
                          key={rIdx}
                          onClick={() => handleDirectSelectBake(currentBookPage.baseId)}
                          className="hover:bg-[#EAE1D4]/40 transition-colors group/row cursor-pointer"
                        >
                          {/* Col 1: Name */}
                          <td className="py-3 px-4 pl-2 font-medium">
                            <span className="flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#DF8CA3] opacity-40 shrink-0" />
                              <span className="group-hover/row:text-brand-caramel transition-colors font-serif text-sm font-bold text-[#4E2E25]">
                                {row.name}
                              </span>
                            </span>
                          </td>

                          {/* Col 2 */}
                          <td className="py-3 px-4 text-[#8D5B4C] font-mono font-medium">
                            {row.p500 || row.p8 || row.p3 || row.p4 || row.p100 || row.info || ""}
                          </td>

                          {/* Col 3 */}
                          {(row.p1000 || row.p16 || row.p6 || row.price || row.p500) && (
                            <td className="py-3 px-4 text-[#8D5B4C] font-mono font-medium last:text-right">
                              {row.p1000 || row.p16 || row.p6 || row.price || row.p500 || ""}
                            </td>
                          )}

                          {/* Render Col 4 & Col 5 if present (E.g. Brownies Box sizes) */}
                          {row.p24 !== undefined && (
                            <td className="py-3 px-4 text-[#8D5B4C] font-mono font-medium">
                              {row.p24}
                            </td>
                          )}
                          {row.p36 !== undefined && (
                            <td className="py-3 px-4 text-[#8D5B4C] font-mono font-medium">
                              {row.p36}
                            </td>
                          )}
                          {row.p8 !== undefined && row.p24 === undefined && (
                            <td className="py-3 px-4 text-[#8D5B4C] font-mono font-medium">
                              {row.p8}
                            </td>
                          )}
                          {row.p9 !== undefined && (
                            <td className="py-3 px-4 text-[#8D5B4C] font-mono font-medium last:text-right">
                              {row.p9}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom interactive config prompt callouts */}
                <div className="pt-6 border-t border-[#4E2E25]/15 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                  <div className="text-left space-y-0.5">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-[#B5836C]">Interactive Feature</span>
                    <p className="text-[11px] text-brand-espresso/70 font-light">
                      Click any row to configure its parameters and request directly on WhatsApp!
                    </p>
                  </div>

                  <button
                    onClick={() => handleDirectSelectBake(currentBookPage.baseId)}
                    className="py-3 px-6 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-xl text-xs uppercase font-bold tracking-widest transition-all shadow-md inline-flex items-center space-x-2"
                  >
                    <span>Request Custom {currentBookPage.title.replace("Artis artisanal ", "").split(" (")[0]}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slider Paging controls */}
              <div className="flex items-center justify-between px-2 pt-2 text-xs text-brand-espresso/60 font-sans">
                <button
                  onClick={() => handlePageChange("prev")}
                  className="inline-flex items-center space-x-1.5 py-2 px-4 hover:text-brand-espresso rounded-full hover:bg-brand-linen transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                <span className="font-mono font-semibold">
                  Page {activePageIndex + 1} of {BOOK_PAGES.length}
                </span>

                <button
                  onClick={() => handlePageChange("next")}
                  className="inline-flex items-center space-x-1.5 py-2 px-4 hover:text-brand-espresso rounded-full hover:bg-brand-linen transition-all"
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
                        className={`px-4 py-2 text-xs font-sans font-semibold tracking-wide uppercase rounded-full whitespace-nowrap transition-all duration-300 gap-1.5 inline-flex items-center cursor-pointer ${
                          isActive
                            ? "bg-brand-espresso text-brand-cream shadow-sm"
                            : "bg-transparent text-brand-espresso/60 hover:text-brand-espresso"
                        }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping animate-duration-1000" />}
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

              {/* Grid cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`menu-card-${item.id}`}
                    onClick={() => setSelectedItem(item)}
                    className="group flex flex-col h-full bg-brand-linen/20 rounded-2xl overflow-hidden border border-brand-stone/40 luxury-card-hover cursor-pointer text-left"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-brand-stone">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover select-none group-hover:scale-105 duration-700 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
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
                          {item.priceEstimate.split(" (")[0].split(" starts")[0]}
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
                          Price Sheet: {item.priceEstimate}
                        </span>
                        <span className="text-xs font-sans font-semibold text-brand-caramel flex items-center space-x-1 group-hover:underline">
                          <span>View Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
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

      {/* Detail Modal Component */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-brand-espresso/45 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-brand-cream rounded-3xl overflow-hidden shadow-2xl border border-brand-stone z-10 flex flex-col"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="sm:col-span-5 h-[200px] sm:h-auto relative bg-brand-stone">
                  <SafeImage
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">
                  <div className="space-y-3">
                    <span className="bg-brand-linen text-brand-caramel text-[9px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-full border border-brand-stone/40 inline-block">
                      {selectedItem.category}
                    </span>

                    <h3 className="font-serif text-2xl font-bold text-brand-espresso leading-tight">
                      {selectedItem.name}
                    </h3>

                    <p className="text-xs text-brand-espresso/80 leading-relaxed font-light">
                      {selectedItem.description}
                    </p>

                    <div className="flex items-center space-x-2 pt-1 border-t border-brand-stone/20">
                      <span className="text-xs font-sans font-semibold text-brand-espresso">Price range :</span>
                      <span className="font-mono text-sm font-bold text-brand-caramel bg-brand-linen/40 px-2 py-0.5 rounded-sm">
                        {selectedItem.priceEstimate}
                      </span>
                    </div>

                    {selectedItem.flavors && selectedItem.flavors.length > 0 && (
                      <div className="pt-2">
                        <span className="block text-[11px] text-brand-espresso/60 tracking-tight font-medium">Bespoke Flavor Options:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedItem.flavors.map((fl) => (
                            <span key={fl} className="text-[10px] bg-brand-cream border border-brand-stone px-2 py-0.5 rounded-full font-light text-brand-espresso/90">
                              {fl.split(" (")[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedItem.sizes && selectedItem.sizes.length > 0 && (
                      <div className="pt-1">
                        <span className="block text-[11px] text-brand-espresso/60 tracking-tight font-medium">Available Dimensions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedItem.sizes.map((sz) => (
                            <span key={sz} className="text-[10px] bg-brand-cream border border-brand-stone px-2 py-0.5 rounded-sm font-light text-brand-espresso/90">
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-brand-stone/20">
                    <button
                      onClick={() => handleCustomOrderRequest(selectedItem)}
                      className="w-full py-3 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                    >
                      <span>Configure in Custom Form</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedItem(null)}
                      className="w-full py-2 bg-transparent text-brand-espresso/80 hover:bg-brand-linen/55 rounded-xl text-xs font-medium transition-colors"
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
