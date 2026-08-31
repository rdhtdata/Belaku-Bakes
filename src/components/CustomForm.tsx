import { useState, useEffect, FormEvent } from "react";
import { MenuItem } from "../types";
import { CONTACT_INFO } from "../data";
import { PARSED_SECTIONS, DYNAMIC_PRICE_CATALOG, CATEGORY_GALLERY } from "../menuDataLoader";
import { Send, Sliders, AlertCircle, Info, Sparkles, CheckCircle2, Clock, Calendar, ShieldCheck, Tag } from "lucide-react";
import { SafeImage } from "./SafeImage";

interface CustomFormProps {
  selectedItem: MenuItem | null;
  onClearSelectedItem: () => void;
}

export default function CustomForm({ selectedItem, onClearSelectedItem }: CustomFormProps) {
  const [category, setCategory] = useState<string>("cakes");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all-cakes");
  const [selectedFlavor, setSelectedFlavor] = useState<string>("Signature Chocolate");
  const [selectedSize, setSelectedSize] = useState<string>("500g");
  const [isEggless, setIsEggless] = useState<boolean>(false);
  const [writingOnCake, setWritingOnCake] = useState<string>("");
  const [specialInstructions, setSpecialInstructions] = useState<string>("");

  // Customer Contact State
  const [customerName, setCustomerName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("");

  // Helper to fetch exact price from CSV data structure
  const getPriceForOption = (cat: string, flavorStr: string, sizeStr: string): number => {
    const cleanFlavor = flavorStr.split(" (")[0].trim();
    
    // Direct key lookup
    const directKey = `${cleanFlavor}-${sizeStr}`;
    if (DYNAMIC_PRICE_CATALOG[directKey] !== undefined) {
      return DYNAMIC_PRICE_CATALOG[directKey];
    }

    // Lookup in parsed sections
    const section = PARSED_SECTIONS.find((s) => {
      if (cat === "brownies") {
        if (selectedSubcategory === "brownie-bites") return s.title.toLowerCase().includes("bites");
        if (selectedSubcategory === "brownie-medium") return s.title.toLowerCase().includes("medium");
        if (selectedSubcategory === "brownie-large") return s.title.toLowerCase().includes("large");
        return s.category === "brownies";
      }
      return s.category === cat;
    });

    if (section) {
      const row = section.rows.find((r) => r.flavor.toLowerCase() === cleanFlavor.toLowerCase());
      if (row && row.prices[sizeStr] !== undefined) {
        return row.prices[sizeStr];
      }
    }

    // Default cakes fallback
    if (cat === "cakes") {
      const base = DYNAMIC_PRICE_CATALOG[cleanFlavor] || 850;
      return sizeStr === "1000g" ? base * 2 : base;
    }

    if (cat === "savory") {
      return DYNAMIC_PRICE_CATALOG[cleanFlavor] || 150;
    }

    return DYNAMIC_PRICE_CATALOG[cleanFlavor] || 0;
  };

  // Populate form if item is passed through from Menu Component
  useEffect(() => {
    if (selectedItem) {
      setCategory(selectedItem.category);
      if (selectedItem.category === "brownies") {
        setSelectedSubcategory("brownie-bites");
      } else if (selectedItem.category === "cakes") {
        setSelectedSubcategory("all-cakes");
      } else {
        setSelectedSubcategory(selectedItem.id);
      }

      if (selectedItem.flavors && selectedItem.flavors.length > 0) {
        setSelectedFlavor(selectedItem.flavors[0].split(" (")[0]);
      }
      if (selectedItem.sizes && selectedItem.sizes.length > 0) {
        setSelectedSize(selectedItem.sizes[0]);
      }
    }
  }, [selectedItem]);

  // Derive Subcategories for the selected Category
  const getSubcategoriesForCategory = () => {
    if (category === "cakes") {
      return [
        { id: "all-cakes", name: "All Cake Flavors (13)" },
        { id: "chocolate-cakes", name: "Chocolate Cakes" },
        { id: "fruit-cakes", name: "Fruit & Gourmet Gateau" }
      ];
    }
    if (category === "brownies") {
      return [
        { id: "brownie-bites", name: "Brownie Bites (Mini Squares)" },
        { id: "brownie-medium", name: "Medium Brownie Slabs" },
        { id: "brownie-large", name: "Elite Large Brownie Blocks" }
      ];
    }
    const section = PARSED_SECTIONS.find((s) => s.category === category);
    return [{ id: section?.category || category, name: `${section?.title || category} Collection` }];
  };

  // Derive Flavors for the selected category & subcategory
  const getFlavorsForSelection = () => {
    if (category === "cakes") {
      const cakesSection = PARSED_SECTIONS.find((s) => s.category === "cakes");
      if (!cakesSection) return [];
      
      if (selectedSubcategory === "chocolate-cakes") {
        return cakesSection.rows
          .filter((r) => r.flavor.toLowerCase().includes("choco") || r.flavor.toLowerCase().includes("chocolate"))
          .map((r) => r.flavor);
      }
      if (selectedSubcategory === "fruit-cakes") {
        return cakesSection.rows
          .filter((r) => !r.flavor.toLowerCase().includes("choco") && !r.flavor.toLowerCase().includes("chocolate"))
          .map((r) => r.flavor);
      }
      return cakesSection.rows.map((r) => r.flavor);
    }

    if (category === "brownies") {
      let sectionName = "Brownie Bites";
      if (selectedSubcategory === "brownie-medium") sectionName = "Medium Brownies";
      if (selectedSubcategory === "brownie-large") sectionName = "Large Brownies";
      const section = PARSED_SECTIONS.find((s) => s.title.toLowerCase().includes(sectionName.toLowerCase()));
      return section ? section.rows.map((r) => r.flavor) : ["Fudgy", "Peanut Butter", "Nutella", "Biscoff"];
    }

    const section = PARSED_SECTIONS.find((s) => s.category === category);
    return section ? section.rows.map((r) => r.flavor) : [];
  };

  // Derive Sizes for the selected category & subcategory
  const getSizesForSelection = () => {
    if (category === "cakes") {
      return ["500g", "1000g"];
    }
    if (category === "brownies") {
      let sectionName = "Brownie Bites";
      if (selectedSubcategory === "brownie-medium") sectionName = "Medium Brownies";
      if (selectedSubcategory === "brownie-large") sectionName = "Large Brownies";
      const section = PARSED_SECTIONS.find((s) => s.title.toLowerCase().includes(sectionName.toLowerCase()));
      return section ? section.sizes : ["Box of 6", "Box of 8", "Box of 16"];
    }

    const section = PARSED_SECTIONS.find((s) => s.category === category);
    return section ? section.sizes : ["Standard Portion"];
  };

  // Category switch handler
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    if (cat === "cakes") {
      setSelectedSubcategory("all-cakes");
    } else if (cat === "brownies") {
      setSelectedSubcategory("brownie-bites");
    } else {
      setSelectedSubcategory(cat);
    }
  };

  // Refresh dependent flavors & sizes when category or subcategory changes
  useEffect(() => {
    const flavors = getFlavorsForSelection();
    if (flavors.length > 0) {
      // Keep existing flavor if it belongs to new list, else pick first
      const cleanExisting = selectedFlavor.split(" (")[0].trim();
      if (!flavors.includes(cleanExisting)) {
        setSelectedFlavor(flavors[0]);
      }
    }
    const sizes = getSizesForSelection();
    if (sizes.length > 0) {
      if (!sizes.includes(selectedSize)) {
        setSelectedSize(sizes[0]);
      }
    }
  }, [category, selectedSubcategory]);

  // Compute live price
  const calculatedBasePrice = getPriceForOption(category, selectedFlavor, selectedSize);
  const calculatedEgglessAddon = isEggless && category === "cakes" ? 50 : 0;
  const grandTotalEstimate = calculatedBasePrice + calculatedEgglessAddon;

  // Active preview image
  const getActivePreviewImage = () => {
    const cleanFlavor = selectedFlavor.split(" (")[0].trim();
    if (CATEGORY_GALLERY[category]?.flavorMap?.[cleanFlavor]) {
      return CATEGORY_GALLERY[category].flavorMap[cleanFlavor];
    }
    return CATEGORY_GALLERY[category]?.main || "menu-images/cakes/chocalate cake.png";
  };

  // Form Submission & WhatsApp linking
  const handleOnSendWhatsApp = (e: FormEvent) => {
    e.preventDefault();

    if (!customerName || !contactNumber || !pickupDate) {
      alert("Please provide your name, contact number, and desired pickup date to generate your custom request.");
      return;
    }

    const eggText = isEggless ? "🍃 YES (100% Pure Eggless)" : "🥚 Regular";
    const cakeDetails = category === "cakes" && writingOnCake ? `\n✍️ Text on Cake: "${writingOnCake}"` : "";

    const messageTemplate = `*✨ NEW CUSTOM ORDER REQUEST - BELAKU BAKES ✨*

Hello Vaishnavi, I would love to place a gourmet custom request from the Belaku Bakes website!

*👤 CUSTOMER INFO:*
- Name: ${customerName}
- Phone: ${contactNumber}

*🎂 ORDER DETAILS:*
- Category: ${category.toUpperCase()}
- Selection: ${selectedFlavor.split(" (")[0]}
- Portion / Size: ${selectedSize} (₹${calculatedBasePrice})
- Dietary Preference: ${eggText}${cakeDetails}

*📅 PICKUP LOGISTICS:*
- Desired Date: ${pickupDate}
- Preferred Time Window: ${pickupTime || "Flexible"}
- Delivery Method: Self-pickup arranged at Hennur gate

*✍️ SPECIAL INSTRUCTIONS:*
"${specialInstructions || "No additional notes. Please bake with utmost care!"}"

*💰 ESTIMATED TOTAL:*
- Base Rate from Menu: ₹${calculatedBasePrice}
${calculatedEgglessAddon > 0 ? `- Eggless Modifier: +₹${calculatedEgglessAddon}\n` : ""}- Total Estimate: *₹${grandTotalEstimate}* (Subject to additional custom art decor)

Looking forward to your confirmation and payment coordinates! Thank you.`;

    const encodedMessage = encodeURIComponent(messageTemplate);
    const cleanNumber = CONTACT_INFO.whatsappNumber.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const availableSubcategories = getSubcategoriesForCategory();
  const availableFlavors = getFlavorsForSelection();
  const availableSizes = getSizesForSelection();

  return (
    <section id="custom" className="py-24 bg-brand-linen relative">
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-stone/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-caramel font-bold">
            <Sliders className="w-3.5 h-3.5 text-brand-caramel" />
            <span>Direct WhatsApp Order Configurator</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight">
            Order Custom Delicacies
          </h2>
          <p className="font-sans text-brand-espresso/70 text-sm sm:text-base font-light leading-relaxed">
            Select your desired product, choose the subcategory and flavor, and pick your portion size. The exact official rate from our menu will be calculated instantly!
          </p>
        </div>

        {/* Builder Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Interactive Configuration Form */}
          <div className="lg:col-span-7 bg-brand-cream rounded-3xl p-5 sm:p-8 lg:p-10 border border-brand-stone shadow-sm">
            {selectedItem && (
              <div className="mb-6 bg-brand-linen/60 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between border border-brand-stone/40">
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-stone shrink-0">
                    <SafeImage src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-caramel tracking-wider block">Selected from Menu:</span>
                    <span className="text-sm font-serif font-bold text-brand-espresso">{selectedItem.name}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClearSelectedItem}
                  className="text-xs text-brand-espresso/60 hover:text-brand-espresso underline transition-colors cursor-pointer"
                >
                  Change Base
                </button>
              </div>
            )}

            <form onSubmit={handleOnSendWhatsApp} className="space-y-6 text-left">
              
              {/* Step 1: Category / Product */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                  1. Choose Product
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-2">
                  {["cakes", "brownies", "cheesecakes", "cupcakes", "cookies", "tarts", "savory"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`py-2.5 px-2 text-xs sm:text-[11px] font-sans font-bold uppercase rounded-xl border text-center cursor-pointer transition-all ${
                        category === cat
                          ? "bg-brand-espresso text-brand-cream border-brand-espresso shadow-xs"
                          : "bg-transparent text-brand-espresso border-brand-stone/80 hover:bg-brand-linen"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Subcategory & Flavor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    2. Sub Category
                  </label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso cursor-pointer"
                  >
                    {availableSubcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    3. Flavor / Option
                  </label>
                  <select
                    value={selectedFlavor}
                    onChange={(e) => setSelectedFlavor(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso cursor-pointer font-medium"
                  >
                    {availableFlavors.map((f) => {
                      const cleanF = f.split(" (")[0];
                      const priceFor500g = getPriceForOption(category, cleanF, availableSizes[0] || "500g");
                      return (
                        <option key={cleanF} value={cleanF}>
                          {cleanF} {priceFor500g > 0 ? `(From ₹${priceFor500g})` : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Step 3: Size & Live Rate Display */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    4. Portion / Size &amp; Official Price
                  </label>
                  <span className="font-mono text-xs font-bold text-brand-caramel bg-brand-linen px-2 py-0.5 rounded-md border border-brand-stone/40">
                    Live Rate: ₹{calculatedBasePrice}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableSizes.map((sz) => {
                    const priceForThisSize = getPriceForOption(category, selectedFlavor, sz);
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? "bg-brand-espresso text-brand-cream border-brand-espresso shadow-xs"
                            : "bg-brand-cream text-brand-espresso border-brand-stone/70 hover:bg-brand-linen"
                        }`}
                      >
                        <span className="text-xs font-bold font-sans">{sz}</span>
                        <span className={`text-[11px] font-mono mt-0.5 ${isSelected ? "text-brand-gold font-bold" : "text-brand-caramel font-semibold"}`}>
                          ₹{priceForThisSize > 0 ? priceForThisSize.toLocaleString("en-IN") : "-"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Eggless option for cakes */}
              {category === "cakes" && (
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    Dietary Customization
                  </label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl">
                    <input
                      type="checkbox"
                      id="eggless"
                      checked={isEggless}
                      onChange={(e) => setIsEggless(e.target.checked)}
                      className="w-4 h-4 accent-brand-caramel rounded focus:ring-0 focus:outline-hidden cursor-pointer"
                    />
                    <label htmlFor="eggless" className="text-xs text-brand-espresso/90 font-sans cursor-pointer select-none">
                      Yes, bake with 100% Pure Eggless sponge (+₹50)
                    </label>
                  </div>
                </div>
              )}

              {/* Interactive Writing on Cake if category is cakes */}
              {category === "cakes" && (
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    Writing on Celebration Cake (Max 35 Characters)
                  </label>
                  <input
                    type="text"
                    maxLength={35}
                    placeholder="E.g. 'Happy 30th Birthday Amit!'"
                    value={writingOnCake}
                    onChange={(e) => setWritingOnCake(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  />
                </div>
              )}

              {/* Day Logistics Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    Preferred Time Window
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. 4:00 PM - 6:00 PM"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                  Special Notes / Custom Deco Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="E.g. 'Please make it extra fudgy with roasted almonds on top' or 'Pastel pink floral accents'"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso resize-none"
                />
              </div>

              {/* Customer Contact Details */}
              <div className="pt-4 border-t border-brand-stone/40 space-y-4">
                <span className="block text-[11px] uppercase tracking-wider font-bold text-brand-caramel">
                  Your Details for WhatsApp Confirmation
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Number *"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  />
                </div>
              </div>

              {/* Submit triggers whatsapp */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-xl text-xs uppercase font-bold tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg cursor-pointer group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>Submit Request to WhatsApp</span>
              </button>

            </form>
          </div>

          {/* Right Side: Estimated Bill Card with Dynamic Image Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:sticky lg:top-24 mt-8 lg:mt-0">
            <div className="bg-brand-espresso text-brand-cream rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative overflow-hidden border border-brand-stone/30">
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" />
              
              {/* Flavor Photo Thumbnail Preview */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-brand-stone/40 border border-brand-cream/10">
                <SafeImage
                  src={getActivePreviewImage()}
                  alt="Flavor preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="text-sm font-serif font-bold text-brand-cream">
                    {selectedFlavor ? selectedFlavor.split(" (")[0] : category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-gold bg-brand-espresso/80 px-2 py-0.5 rounded-sm border border-brand-gold/30">
                    {selectedSize}
                  </span>
                </div>
              </div>

              <div className="space-y-1 border-b border-brand-cream/10 pb-4 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold block">Official Price Breakdown</span>
                <h3 className="font-serif text-xl font-bold">Calculation Sheet</h3>
                <span className="text-xs text-brand-cream/60 block font-light">Freshly calculated for your selection</span>
              </div>

              {/* Ledger list */}
              <div className="space-y-3 text-left font-sans text-xs font-light">
                <div className="flex justify-between items-start pb-2 border-b border-brand-cream/5">
                  <div>
                    <span className="block font-semibold text-brand-gold">Product &amp; Flavor:</span>
                    <span className="text-[11px] text-brand-cream/85 block mt-0.5 max-w-[200px]">
                      {selectedFlavor ? selectedFlavor.split(" (")[0] : "None Selected"}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-brand-gold font-bold">₹{calculatedBasePrice}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-brand-cream/5">
                  <div>
                    <span className="block font-semibold text-brand-gold">Selected Portion / Size:</span>
                    <span className="text-[11px] text-brand-cream/85">{selectedSize || "Standard"}</span>
                  </div>
                  <span className="text-[10px] text-brand-cream/50 font-mono">Standard Rate</span>
                </div>

                {category === "cakes" && (
                  <div className="flex justify-between items-center pb-2 border-b border-brand-cream/5">
                    <div>
                      <span className="block font-semibold text-brand-gold">Dietary Sponge:</span>
                      <span className="text-[11px] text-brand-cream/85">{isEggless ? "🍃 100% Pure Eggless" : "🥚 Regular Sponge"}</span>
                    </div>
                    <span className="font-mono text-sm text-brand-gold">+{calculatedEgglessAddon}</span>
                  </div>
                )}

                {category === "cakes" && writingOnCake && (
                  <div className="flex justify-between items-start pb-2 border-b border-brand-cream/5">
                    <div>
                      <span className="block font-semibold text-brand-gold">Writing on Cake:</span>
                      <span className="text-[11px] italic text-brand-cream/80">"{writingOnCake}"</span>
                    </div>
                    <span className="text-[10px] text-brand-cream/50">Complimentary</span>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="bg-brand-cream/5 p-4 rounded-xl flex justify-between items-center text-left border border-brand-cream/10">
                <div>
                  <span className="block text-xs uppercase font-semibold tracking-wider text-brand-gold">Total Estimated Price</span>
                  <span className="text-[10px] text-brand-cream/40">*Excluding custom decorations</span>
                </div>
                <span className="font-mono text-3xl font-bold text-brand-gold">
                  ₹{grandTotalEstimate}
                </span>
              </div>

              {/* Quality assurance bullets */}
              <div className="text-left space-y-2.5 pt-2 text-[11px] font-light text-brand-cream/80 border-t border-brand-cream/10">
                <div className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1 shrink-0" />
                  <p>100% honest and transparent pricing with no hidden charges.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1 shrink-0" />
                  <p>Baked fresh on order; pure dairy butter and Belgian chocolate couverture.</p>
                </div>
              </div>
            </div>

            {/* Quick Helper Tips area */}
            <div className="bg-brand-cream rounded-2xl p-6 border border-brand-stone/60 text-left space-y-3 shadow-xs">
              <span className="inline-flex items-center text-xs uppercase font-bold tracking-wide text-brand-caramel gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>How to place order?</span>
              </span>
              <p className="text-xs text-brand-espresso/80 leading-relaxed font-light">
                Simply click the <strong className="font-semibold">Submit Request to WhatsApp</strong> button. It will open WhatsApp with your chosen cake, flavor, size, and calculated price pre-filled!
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
