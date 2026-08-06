import { useState, useEffect, FormEvent } from "react";
import { MenuItem } from "../types";
import { CONTACT_INFO, PRICE_CATALOG } from "../data";
import { MessageSquare, Sparkles, AlertCircle, Copy, Check, Cake, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CustomFormProps {
  selectedItem: MenuItem | null;
  onClearSelectedItem: () => void;
}

export default function CustomForm({ selectedItem, onClearSelectedItem }: CustomFormProps) {
  // Client state
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [category, setCategory] = useState("cakes");
  const [selectedBakeType, setSelectedBakeType] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isEggless, setIsEggless] = useState(false);
  const [writingOnCake, setWritingOnCake] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Auto-populate when user clicks "Configure in Custom Form" from menu
  useEffect(() => {
    if (selectedItem) {
      setCategory(selectedItem.category);
      setSelectedBakeType(selectedItem.id);
      
      if (selectedItem.flavors && selectedItem.flavors.length > 0) {
        setSelectedFlavor(selectedItem.flavors[0]);
      } else {
        setSelectedFlavor("");
      }

      if (selectedItem.sizes && selectedItem.sizes.length > 0) {
        setSelectedSize(selectedItem.sizes[0]);
      } else {
        setSelectedSize("");
      }
    }
  }, [selectedItem]);

  // Determine sub option listings based on Category
  const getBakeTypesForCategory = () => {
    switch (category) {
      case "cakes":
        return [
          { id: "cake-chocolate", name: "Artisanal Chocolate Cakes" },
          { id: "cake-gourmet-flavors", name: "Premium Fruit & Butterscotch Cakes" }
        ];
      case "brownies":
        return [
          { id: "brownie-bites", name: "Artisanal Brownie Bites (Mini Squares)" },
          { id: "brownie-medium", name: "Medium Brownie Slabs" },
          { id: "brownie-large", name: "Elite Large Brownie Blocks" }
        ];
      case "cheesecakes":
        return [{ id: "cheesecake-premium", name: "Artisanal Cream Cheesecake" }];
      case "cupcakes":
        return [{ id: "cupcake-gourmet", name: "Artisan Whipped Cupcakes" }];
      case "cookies":
        return [{ id: "cookies-buttery", name: "Pure Butter Boutique Cookies" }];
      case "savory":
        return [{ id: "savory-gourmet", name: "Artesian Warm Savouries & Snacks" }];
      default:
        return [];
    }
  };

  const getFlavorsForBakeType = () => {
    if (category === "cakes") {
      if (selectedBakeType === "cake-chocolate") {
        return [
          "Signature chocolate (500g: ₹850 / 1kg: ₹1700)",
          "Choco oreo (500g: ₹850 / 1kg: ₹1700)",
          "Chocolate truffle (500g: ₹900 / 1kg: ₹1800)",
          "Choco hazelnut (500g: ₹950 / 1kg: ₹1900)",
          "Choco almond (500g: ₹950 / 1kg: ₹1900)",
          "Choco cranberry (500g: ₹950 / 1kg: ₹1900)"
        ];
      } else {
        return [
          "Pineapple gateau (500g: ₹750 / 1kg: ₹1550)",
          "Butterscotch (500g: ₹800 / 1kg: ₹1600)",
          "Rasmalai (500g: ₹900 / 1kg: ₹1800)",
          "Strawberry (500g: ₹900 / 1kg: ₹1800)",
          "Blueberry (500g: ₹900 / 1kg: ₹1800)"
        ];
      }
    } else if (category === "brownies") {
      const isBites = selectedBakeType === "brownie-bites";
      const isMedium = selectedBakeType === "brownie-medium";
      const label = isBites ? "Bites" : isMedium ? "Medium" : "Large";
      return [
        `Fudgy ${label}`,
        `Peanut butter ${label}`,
        `Nutella ${label}`,
        `Biscoff ${label}`
      ];
    } else if (category === "cheesecakes") {
      return [
        "Blueberry Cheesecake",
        "Strawberry Cheesecake",
        "Nutella Cheesecake",
        "Biscoff Cheesecake"
      ];
    } else if (category === "cupcakes") {
      return [
        "Chocolate truffle Cupcake",
        "Signature chocolate Cupcake",
        "Vanilla choco chip Cupcake",
        "Vanilla Cupcake"
      ];
    } else if (category === "cookies") {
      return ["Choco chips Cookies", "Jam cookies"];
    } else if (category === "savory") {
      return [
        "Sandwich (₹150)",
        "Burger (₹150)",
        "Canape with corn and tangy filling (₹150)",
        "Canape with pasta filling (₹150)",
        "Korean buns (₹90)",
        "Cutlets veg (₹80)",
        "Bread pizza (₹80)",
        "Potato buns (₹60)",
        "Garlic bread (₹60)"
      ];
    }
    return [];
  };

  const getSizesForBakeType = () => {
    if (category === "cakes") {
      return ["500g", "1000g"];
    } else if (category === "brownies") {
      if (selectedBakeType === "brownie-bites") {
        return ["Box of 8", "Box of 16", "Box of 24", "Box of 36"];
      } else if (selectedBakeType === "brownie-medium") {
        return ["Box of 3", "Box of 6", "Box of 8", "Box of 16"];
      } else {
        return ["Box of 4", "Box of 6", "Box of 9"];
      }
    } else if (category === "cheesecakes") {
      return ["100g", "500g", "1000g"];
    } else if (category === "cupcakes") {
      return ["Mini", "Medium", "Large"];
    } else if (category === "cookies") {
      return ["Box of 8 (mini)", "Box of 15 (mini)"];
    } else if (category === "savory") {
      return ["Single Portion"];
    }
    return [];
  };

  // Switch category updates defaults
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const types = getBakeTypesForCategory();
    const defaultType = types[0]?.id || "";
    setSelectedBakeType(defaultType);

    // Update flavor corresponding to category change
    setTimeout(() => {
      setSelectedBakeType(defaultType);
    }, 10);
  };

  // Track dependencies when bake type updates to refresh default selections
  useEffect(() => {
    const flavors = getFlavorsForBakeType();
    if (flavors.length > 0) {
      setSelectedFlavor(flavors[0]);
    }
    const sizes = getSizesForBakeType();
    if (sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [category, selectedBakeType]);

  // Pricing Estimator Live Calculator
  const computeEstimatedPrice = () => {
    if (category === "cakes") {
      const rawPrice = PRICE_CATALOG[selectedFlavor] || 850;
      // standard catalog is for 500g, if 1000g we double or take catalog offset
      if (selectedSize === "1000g") {
        // Find if we have 1kg price in flavor text
        if (selectedFlavor.includes("1kg: ₹")) {
          const match = selectedFlavor.match(/1kg: ₹(\d+)/);
          if (match) return parseInt(match[1], 10);
        }
        return rawPrice * 2;
      }
      return rawPrice;
    }

    if (category === "brownies") {
      // Key format: "Fudgy Bites-Box of 8"
      const lookupKey = `${selectedFlavor}-${selectedSize}`;
      return PRICE_CATALOG[lookupKey] || 0;
    }

    if (category === "cheesecakes") {
      const lookupKey = `${selectedFlavor}-${selectedSize}`;
      return PRICE_CATALOG[lookupKey] || 0;
    }

    if (category === "cupcakes") {
      const lookupKey = `${selectedFlavor}-${selectedSize}`;
      return PRICE_CATALOG[lookupKey] || PRICE_CATALOG[`${selectedFlavor}-Mini`] || 35;
    }

    if (category === "cookies") {
      const lookupKey = `${selectedFlavor}-${selectedSize}`;
      return PRICE_CATALOG[lookupKey] || 200;
    }

    if (category === "savory") {
      return PRICE_CATALOG[selectedFlavor] || 150;
    }

    return 0;
  };

  const calculatedBasePrice = computeEstimatedPrice();
  const calculatedEgglessAddon = isEggless && category === "cakes" ? 50 : 0;
  const grandTotalEstimate = calculatedBasePrice + calculatedEgglessAddon;

  // Form Submission & Whatsapp linking
  const handleOnSendWhatsApp = (e: FormEvent) => {
    e.preventDefault();

    if (!customerName || !contactNumber || !pickupDate) {
      alert("Please provide your name, contact number, and desired pickup date to generate request.");
      return;
    }

    // Compose high-end professional message format
    const eggText = isEggless ? "🍃 YES (100% Pure Eggless)" : "🥚 Normal (Contains egg)";
    const cakeDetails = category === "cakes" && writingOnCake 
      ? `\n✍️ Text on Cake: "${writingOnCake}"` 
      : "";

    const messageTemplate = `*✨ NEW CUSTOM ORDER REQUEST - BELAKU BAKES ✨*

Hello Vaishnavi, I would love to place a gourmet custom request from the Belaku Bakes website!

*👤 CUSTOMER INFO:*
- Name: ${customerName}
- Phone: ${contactNumber}

*🎂 ORDER DETAILS:*
- Category: ${category.toUpperCase()}
- Bake Style: ${selectedFlavor.split(" (")[0]}
- Portion/Dimension: ${selectedSize}
- Dietary Preference: ${eggText}${cakeDetails}

*📅 PICKUP LOGISTICS:*
- Desired Date: ${pickupDate}
- Preferred Time Window: ${pickupTime || "Flexible"}
- Delivery Method: Self-pickup arranged at gate (Hennur)

*✍️ SPECIAL INSTRUCTIONS / FLAVOUR CHOICE:*
"${specialInstructions || "No additional notes. Please bake with utmost care!"}"

*💰 ESTIMATED TOTAL:*
- Base Selection: ₹${calculatedBasePrice}
- Eggless Modifier: +₹${calculatedEgglessAddon}
- Estimated Total: *₹${grandTotalEstimate}* (Subject to additional custom art decor)

Looking forward to your conformation and payment coordinates! Thank you.`;

    // Encode URL and redirect safely
    const encodedMessage = encodeURIComponent(messageTemplate);
    const cleanNumber = CONTACT_INFO.whatsappNumber.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="custom" className="py-24 bg-brand-linen relative">
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-stone/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title area */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-caramel font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-caramel animate-bounce" />
            <span>Artisanal Customizer</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight">
            Order Your Bespoke Creation
          </h2>
          <p className="font-sans text-brand-espresso/70 text-sm sm:text-base font-light">
            Need a gorgeous custom cake or a tailored assortment box of fudgy brownies? Tell us your preference below. Our form computes transparent pricing before redirecting you directly to owner <span className="font-semibold text-brand-espresso">Vaishnavi K.S.</span> over WhatsApp.
          </p>
        </div>

        {/* Master Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Side: Interactive Configurator */}
          <div className="lg:col-span-7 bg-brand-cream rounded-3xl p-6 sm:p-10 shadow-lg border border-brand-stone/60">
            
            {selectedItem && (
              <div className="mb-6 p-4 bg-brand-linen/60 rounded-2xl border border-brand-stone flex items-center justify-between">
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-brand-cream flex items-center justify-center text-brand-caramel">
                    <Cake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-brand-caramel">Configuring Selection</span>
                    <span className="block text-sm font-serif font-bold text-brand-espresso">{selectedItem.name}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClearSelectedItem}
                  className="text-xs text-brand-espresso/50 hover:text-brand-espresso underline transition-colors cursor-pointer"
                >
                  Change Base
                </button>
              </div>
            )}

            <form onSubmit={handleOnSendWhatsApp} className="space-y-6 text-left">
              
              {/* Category Select tabs */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                  1. Choose Category
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {["cakes", "brownies", "cheesecakes", "cupcakes", "cookies", "savory"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`py-2 px-1 text-[10px] font-sans font-bold uppercase rounded-lg border text-center cursor-pointer transition-all ${
                        category === cat
                          ? "bg-brand-espresso text-brand-cream border-brand-espresso"
                          : "bg-transparent text-brand-espresso/60 border-brand-stone/50 hover:bg-brand-linen"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Bake Type & Flavor dropdown combinations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    2. Select Style
                  </label>
                  <select
                    value={selectedBakeType}
                    onChange={(e) => setSelectedBakeType(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  >
                    {getBakeTypesForCategory().map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
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
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  >
                    {getFlavorsForBakeType().map((f) => (
                      <option key={f} value={f}>{f.split(" (")[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sizes and dietary combinations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                    4. Pack / Size
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  >
                    {getSizesForBakeType().map((sz) => (
                      <option key={sz} value={sz}>{sz}</option>
                    ))}
                  </select>
                </div>

                {category === "cakes" && (
                  <div className="space-y-2">
                    <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                      Eggless Option? (+₹50)
                    </label>
                    <div className="flex items-center space-x-3 px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl">
                      <input
                        type="checkbox"
                        id="eggless"
                        checked={isEggless}
                        onChange={(e) => setIsEggless(e.target.checked)}
                        className="w-4 h-4 accent-brand-caramel rounded focus:ring-0 focus:outline-hidden"
                      />
                      <label htmlFor="eggless" className="text-xs text-brand-espresso/80 font-sans cursor-pointer select-none">
                        Yes, make it 100% Eggless
                      </label>
                    </div>
                  </div>
                )}
              </div>

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
                    Preferred Time (10:30 AM - 8:30 PM)
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso"
                  >
                    <option value="">Choose window...</option>
                    <option value="Morning (10:30 AM - 1:00 PM)">Morning (10:30 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    <option value="Late Hour (7:00 PM - 8:30 PM)">Late Hour (7:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Special instructions */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                  Special Notes &amp; Customization ideas
                </label>
                <textarea
                  placeholder="Need high-end decor? Specify color themes, raw fruit garnishes, chocolate type, toppings, or Uber instructions here..."
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-cream border border-brand-stone/80 rounded-xl focus:outline-hidden focus:border-brand-caramel font-sans text-xs text-brand-espresso resize-none"
                />
              </div>

              {/* Customer information details */}
              <div className="border-t border-brand-stone/30 pt-6 space-y-4">
                <span className="block text-xs uppercase font-bold tracking-wider text-brand-espresso">
                  5. Sender Details
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
                className="w-full py-4 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-xl text-xs uppercase font-bold tracking-widest transition-all duration-500 flex items-center justify-center space-x-2 cursor-pointer shadow-lg active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Submit Request to WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Right Side: Estimated Bill Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-brand-espresso text-brand-cream rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden border border-brand-stone/30">
              {/* Golden line element */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" />
              
              <div className="space-y-2 border-b border-brand-cream/10 pb-4 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold block">Belaku Estimator</span>
                <h3 className="font-serif text-xl font-bold">Calculation Sheet</h3>
                <span className="text-xs text-brand-cream/60 block font-light">Freshly computed estimate</span>
              </div>

              {/* Ledger list */}
              <div className="space-y-4 text-left font-sans text-sm font-light">
                <div className="flex justify-between items-start pb-2 border-b border-brand-cream/5">
                  <div>
                    <span className="block font-semibold text-brand-gold">Base Selection:</span>
                    <span className="text-xs text-brand-cream/75 block mt-0.5 max-w-[200px]">
                      {selectedFlavor ? selectedFlavor.split(" (")[0] : "None Selected"}
                    </span>
                  </div>
                  <span className="font-mono text-brand-gold">₹{calculatedBasePrice}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-brand-cream/5">
                  <div>
                    <span className="block font-semibold text-brand-gold">Size/Dimensions:</span>
                    <span className="text-xs text-brand-cream/75">{selectedSize || "Standard"}</span>
                  </div>
                  <span className="text-xs text-brand-cream/50">Incl.</span>
                </div>

                {category === "cakes" && (
                  <div className="flex justify-between items-center pb-2 border-b border-brand-cream/5">
                    <div>
                      <span className="block font-semibold text-brand-gold">Dietary modifier:</span>
                      <span className="text-xs text-brand-cream/75">{isEggless ? "🍃 100% Pure Eggless sponge" : "🥚 Regular Sponge"}</span>
                    </div>
                    <span className="font-mono text-brand-gold">+{calculatedEgglessAddon}</span>
                  </div>
                )}

                {category === "cakes" && writingOnCake && (
                  <div className="flex justify-between items-start pb-2 border-b border-brand-cream/5">
                    <div>
                      <span className="block font-semibold text-brand-gold">Writing script:</span>
                      <span className="text-xs italic text-brand-cream/80">"{writingOnCake}"</span>
                    </div>
                    <span className="text-xs text-brand-cream/50">Free</span>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="bg-brand-cream/5 p-4 rounded-xl flex justify-between items-center text-left">
                <div>
                  <span className="block text-xs uppercase font-semibold tracking-wider text-brand-gold">Estimated Total</span>
                  <span className="text-[10px] text-brand-cream/40">*Excluding custom decorations</span>
                </div>
                <span className="font-mono text-3xl font-bold text-brand-gold">
                  ₹{grandTotalEstimate}
                </span>
              </div>

              {/* Quality assurance bullets */}
              <div className="text-left space-y-3 pt-2 text-xs font-light text-brand-cream/80 border-t border-brand-cream/10">
                <div className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5" />
                  <p>Baked **freshly on receipt** of actual confirmed orders; guaranteed premium butter quality.</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5" />
                  <p>Custom designs are verified and custom-priced with owner Vaishnavi K.S. over chat.</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5" />
                  <p>Arranging self-pickup from **Hennur** using Swiggy Genie/Uber/Porter courier fleet.</p>
                </div>
              </div>
            </div>

            {/* Quick Helper Tips area */}
            <div className="mt-6 bg-brand-cream rounded-2xl p-6 border border-brand-stone/60 text-left space-y-3">
              <span className="inline-flex items-center text-xs uppercase font-bold tracking-wide text-brand-caramel gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>How to place order?</span>
              </span>
              <p className="text-xs text-brand-espresso/80 leading-relaxed font-light">
                Simply click the <strong className="font-semibold">Submit Request</strong> button. The website will automatically pre-compile an elegant card summary message containing all selected specifications, and open WhatsApp directly. Your order can be locked after selecting final design accents and baking hours over chat!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
