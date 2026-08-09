import rawCsv from "../data/menu rates - menu rates.csv?raw";
import { MenuItem } from "./types";

export interface ParsedCsvSection {
  title: string;
  category: "cakes" | "brownies" | "cookies" | "cheesecakes" | "cupcakes" | "tarts" | "savory";
  sizes: string[];
  rows: {
    flavor: string;
    prices: Record<string, number>;
  }[];
}

// Map of category folder names to available gallery image paths in public/menu-images
export const CATEGORY_GALLERY: Record<string, { main: string; gallery: string[]; flavorMap: Record<string, string> }> = {
  cakes: {
    main: "menu-images/cakes/chocalate cake.png",
    gallery: [
      "menu-images/cakes/chocalate cake.png",
      "menu-images/cakes/Chocolate Truffle.webp",
      "menu-images/cakes/chooco mocha.png",
      "menu-images/cakes/Choco Strawberry.png",
      "menu-images/cakes/Pineapple Gateau.webp",
      "menu-images/cakes/butter scotch.png",
      "menu-images/cakes/Strawberry.png",
      "menu-images/cakes/Blueberry.webp",
      "menu-images/cakes/20260202_152943.png",
      "menu-images/cakes/Photoroom-20250325_100539949.png",
      "menu-images/cakes/Photoroom-20241230_160223.png",
      "menu-images/cakes/Photoroom-20241230_084056.png"
    ],
    flavorMap: {
      "Signature Chocolate": "menu-images/cakes/chocalate cake.png",
      "Chocolate Truffle": "menu-images/cakes/Chocolate Truffle.webp",
      "Choco Mocha": "menu-images/cakes/chooco mocha.png",
      "Choco Strawberry": "menu-images/cakes/Choco Strawberry.png",
      "Pineapple Gateau": "menu-images/cakes/Pineapple Gateau.webp",
      "Butterscotch": "menu-images/cakes/butter scotch.png",
      "Strawberry": "menu-images/cakes/Strawberry.png",
      "Blueberry": "menu-images/cakes/Blueberry.webp"
    }
  },
  brownies: {
    main: "menu-images/brownies/brownie main.jpg",
    gallery: [
      "menu-images/brownies/brownie main.jpg",
      "menu-images/brownies/PXL_20221222_101032767.jpg",
      "menu-images/brownies/PXL_20221225_102508316.jpg",
      "menu-images/brownies/PXL_20231110_110409061.jpg",
      "menu-images/brownies/PXL_20231110_111033489.jpg"
    ],
    flavorMap: {
      "Fudgy": "menu-images/brownies/brownie main.jpg",
      "Peanut Butter": "menu-images/brownies/PXL_20221222_101032767.jpg",
      "Nutella": "menu-images/brownies/PXL_20231110_110409061.jpg",
      "Biscoff": "menu-images/brownies/PXL_20231110_111033489.jpg"
    }
  },
  cheesecakes: {
    main: "menu-images/cheesecake/Cheeese cakes_main.png",
    gallery: [
      "menu-images/cheesecake/Cheeese cakes_main.png",
      "menu-images/cheesecake/Blueberry.jpg",
      "menu-images/cheesecake/Strawberry.jpg",
      "menu-images/cheesecake/Nutella.png",
      "menu-images/cheesecake/lotus biscoff cheese cake .png",
      "menu-images/cheesecake/Photoroom-20250306_103655.png",
      "menu-images/cheesecake/Photoroom-20250416_125029522.png"
    ],
    flavorMap: {
      "Blueberry": "menu-images/cheesecake/Blueberry.jpg",
      "Strawberry": "menu-images/cheesecake/Strawberry.jpg",
      "Nutella": "menu-images/cheesecake/Nutella.png",
      "Biscoff": "menu-images/cheesecake/lotus biscoff cheese cake .png"
    }
  },
  cupcakes: {
    main: "menu-images/cupcakes/cupcakes_main.jpg",
    gallery: [
      "menu-images/cupcakes/cupcakes_main.jpg",
      "menu-images/cupcakes/Chocolate Truffle.jpg",
      "menu-images/cupcakes/Signature Chocolate.png",
      "menu-images/cupcakes/Vanilla Chocochip.jpg",
      "menu-images/cupcakes/vanilla.jpg",
      "menu-images/cupcakes/Photoroom-20250228_132039.png"
    ],
    flavorMap: {
      "Chocolate Truffle": "menu-images/cupcakes/Chocolate Truffle.jpg",
      "Signature Chocolate": "menu-images/cupcakes/Signature Chocolate.png",
      "Vanilla Chocochip": "menu-images/cupcakes/Vanilla Chocochip.jpg",
      "Vanilla": "menu-images/cupcakes/vanilla.jpg"
    }
  },
  cookies: {
    main: "menu-images/cookies/cookies main.png",
    gallery: [
      "menu-images/cookies/cookies main.png",
      "menu-images/cookies/Choco Chips.jpg",
      "menu-images/cookies/jam cookies.png",
      "menu-images/cookies/PXL_20250103_095722255.jpg"
    ],
    flavorMap: {
      "Choco Chips": "menu-images/cookies/Choco Chips.jpg",
      "Jam Cookies": "menu-images/cookies/jam cookies.png",
      "Red Velvet": "menu-images/cookies/cookies main.png"
    }
  },
  tarts: {
    main: "menu-images/tarts/Tarts.jpg",
    gallery: [
      "menu-images/tarts/Tarts.jpg"
    ],
    flavorMap: {
      "Tarts": "menu-images/tarts/Tarts.jpg"
    }
  },
  savory: {
    main: "menu-images/snacks/snacks main.jpeg",
    gallery: [
      "menu-images/snacks/snacks main.jpeg",
      "menu-images/snacks/korean buns.jpeg",
      "menu-images/snacks/Garlic Bread.jpeg",
      "menu-images/snacks/Pizza Pasta Skewers.jpeg"
    ],
    flavorMap: {
      "Korean buns (2)": "menu-images/snacks/korean buns.jpeg",
      "Korean buns": "menu-images/snacks/korean buns.jpeg",
      "Garlic Bread": "menu-images/snacks/Garlic Bread.jpeg",
      "Pizza Pasta Skewers (5)": "menu-images/snacks/Pizza Pasta Skewers.jpeg",
      "Pizza Pasta Skewers": "menu-images/snacks/Pizza Pasta Skewers.jpeg"
    }
  }
};

// Clean price string to number e.g. "₹1,700" -> 1700
function parsePrice(val: string): number {
  if (!val) return 0;
  const cleaned = val.replace(/[^0-9]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

// Parse CSV text into sections
export function parseMenuCsv(csvText: string): ParsedCsvSection[] {
  const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const sections: ParsedCsvSection[] = [];
  let currentSection: ParsedCsvSection | null = null;
  let currentSizes: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    
    // Split CSV respecting quoted values e.g. "₹1,700"
    const parts: string[] = [];
    let inQuotes = false;
    let currentPart = "";
    
    for (let c = 0; c < rawLine.length; c++) {
      const char = rawLine[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(currentPart.trim());
        currentPart = "";
      } else {
        currentPart += char;
      }
    }
    parts.push(currentPart.trim());

    const firstCol = parts[0] || "";
    const secondCol = parts[1] || "";

    // Check for Section Header (e.g. "Cakes,Size,,,")
    if (secondCol.toLowerCase() === "size" || (firstCol && (firstCol === "Tarts" || firstCol === "Snacks"))) {
      let cat: ParsedCsvSection["category"] = "cakes";
      const titleLower = firstCol.toLowerCase();
      if (titleLower.includes("cake") && !titleLower.includes("cupcake") && !titleLower.includes("cheese")) {
        cat = "cakes";
      } else if (titleLower.includes("brownie")) {
        cat = "brownies";
      } else if (titleLower.includes("cupcake")) {
        cat = "cupcakes";
      } else if (titleLower.includes("cookie")) {
        cat = "cookies";
      } else if (titleLower.includes("cheese")) {
        cat = "cheesecakes";
      } else if (titleLower.includes("tart")) {
        cat = "tarts";
      } else if (titleLower.includes("snack") || secondCol.toLowerCase() === "price") {
        cat = "savory";
      }

      currentSection = {
        title: firstCol,
        category: cat,
        sizes: [],
        rows: []
      };
      sections.push(currentSection);
      continue;
    }

    // Check for column headers (e.g. "Flavours,500g,1000g,,")
    if (firstCol.toLowerCase() === "flavours" && currentSection) {
      currentSizes = parts.slice(1).filter((s) => s.length > 0);
      currentSection.sizes = currentSizes;
      continue;
    }

    // Check for snack rows where firstCol is item name and secondCol is price
    if (currentSection && currentSection.category === "savory" && firstCol && !firstCol.toLowerCase().startsWith("flavours")) {
      const price = parsePrice(secondCol || parts[1] || "0");
      currentSection.rows.push({
        flavor: firstCol,
        prices: { "Standard": price }
      });
      continue;
    }

    // Standard flavor row
    if (currentSection && firstCol && firstCol.toLowerCase() !== "flavours") {
      const prices: Record<string, number> = {};
      currentSizes.forEach((sz, idx) => {
        const pStr = parts[idx + 1] || "";
        prices[sz] = parsePrice(pStr);
      });
      currentSection.rows.push({
        flavor: firstCol,
        prices
      });
    }
  }

  return sections;
}

// Build dynamic Price Catalog from sections
export function buildPriceCatalog(sections: ParsedCsvSection[]): Record<string, number> {
  const catalog: Record<string, number> = {};

  sections.forEach((sect) => {
    sect.rows.forEach((row) => {
      // 1. Direct key lookups for flavor-size combinations
      Object.entries(row.prices).forEach(([size, price]) => {
        catalog[`${row.flavor}-${size}`] = price;
        catalog[`${row.flavor} (${size})`] = price;
        catalog[`${row.flavor} (${size}: ₹${price})`] = price;
      });

      // 2. Specific compound formats for Cakes
      if (sect.category === "cakes") {
        const p500 = row.prices["500g"] || 0;
        const p1000 = row.prices["1000g"] || p500 * 2;
        catalog[`${row.flavor} (500g: ₹${p500} / 1kg: ₹${p1000})`] = p500;
        catalog[row.flavor] = p500;
      }

      // 3. Savory snacks
      if (sect.category === "savory") {
        const pr = row.prices["Standard"] || 0;
        catalog[row.flavor] = pr;
        catalog[`${row.flavor} (₹${pr})`] = pr;
      }
    });
  });

  return catalog;
}

// Helper to calculate minimum starting price in a section
function getMinPrice(section?: ParsedCsvSection): number {
  if (!section) return 0;
  let min = Infinity;
  section.rows.forEach((r) => {
    Object.values(r.prices).forEach((p) => {
      if (p > 0 && p < min) min = p;
    });
  });
  return min === Infinity ? 0 : min;
}

// Dynamically generate Menu Items for Card Album view
export function buildMenuItems(sections: ParsedCsvSection[]): MenuItem[] {
  const items: MenuItem[] = [];

  // 1. ARTISANAL CAKES
  const cakesSection = sections.find((s) => s.category === "cakes");
  if (cakesSection) {
    const minCake = getMinPrice(cakesSection);
    const flavors = cakesSection.rows.map((r) => {
      const p500 = r.prices["500g"] || 0;
      const p1000 = r.prices["1000g"] || 0;
      return `${r.flavor} (500g: ₹${p500} / 1kg: ₹${p1000})`;
    });

    items.push({
      id: "cake-artisanal",
      name: "Artisanal Celebration Cakes",
      description: "Sponge layers of pure premium cocoa and gourmet fruit gateau baked freshly on order. Stacked with velvet creams and crafted using only pure dairy butter.",
      priceEstimate: `Starts at ₹${minCake || 750}`,
      category: "cakes",
      image: CATEGORY_GALLERY.cakes.main,
      galleryImages: CATEGORY_GALLERY.cakes.gallery,
      flavorImages: CATEGORY_GALLERY.cakes.flavorMap,
      rating: 5.0,
      tags: ["Pure Butter", "13 Signature Flavors", "Eggless Option"],
      customizable: true,
      flavors,
      sizes: ["500g", "1000g"]
    });
  }

  // 2. BROWNIES (Combined into a single master item with subcategories)
  const brownieBites = sections.find((s) => s.title.toLowerCase().includes("bites"));
  const mediumBrownies = sections.find((s) => s.title.toLowerCase().includes("medium"));
  const largeBrownies = sections.find((s) => s.title.toLowerCase().includes("large"));

  const minBites = getMinPrice(brownieBites);
  const minMedium = getMinPrice(mediumBrownies);
  const minLarge = getMinPrice(largeBrownies);
  const minBrownieOverall = Math.min(minBites || 9999, minMedium || 9999, minLarge || 9999);

  const brownieSubcategories = [];
  if (brownieBites) {
    brownieSubcategories.push({
      id: "brownie-bites",
      name: "Brownie Bites",
      description: "Bite-sized cubes of chocolatey bliss, crispy on the outer shell and soft-fudgy inside.",
      sizes: brownieBites.sizes,
      flavors: brownieBites.rows.map((r) => r.flavor),
      priceEstimate: `Starts at ₹${minBites} (${brownieBites.sizes[0] || 'Box of 8'})`
    });
  }
  if (mediumBrownies) {
    brownieSubcategories.push({
      id: "brownie-medium",
      name: "Medium Brownies",
      description: "Classic medium-cut slabs with dense, rich Belgian chocolate crumb and indulgent toppings.",
      sizes: mediumBrownies.sizes,
      flavors: mediumBrownies.rows.map((r) => r.flavor),
      priceEstimate: `Starts at ₹${minMedium} (${mediumBrownies.sizes[0] || 'Box of 6'})`
    });
  }
  if (largeBrownies) {
    brownieSubcategories.push({
      id: "brownie-large",
      name: "Large Brownies",
      description: "Deep, thick artisanal blocks sliced generously from pure chocolate couverture.",
      sizes: largeBrownies.sizes,
      flavors: largeBrownies.rows.map((r) => r.flavor),
      priceEstimate: `Starts at ₹${minLarge} (${largeBrownies.sizes[0] || 'Box of 6'})`
    });
  }

  items.push({
    id: "brownies-unified",
    name: "Artisanal Belgian Brownies",
    description: "Our signature Belgian chocolate brownies with crinkle tops and rich fudgy centers. Available in three distinct cuts: Brownie Bites, Medium Slabs, and Large Blocks.",
    priceEstimate: `Starts at ₹${minBrownieOverall === 9999 ? 280 : minBrownieOverall}`,
    category: "brownies",
    image: CATEGORY_GALLERY.brownies.main,
    galleryImages: CATEGORY_GALLERY.brownies.gallery,
    flavorImages: CATEGORY_GALLERY.brownies.flavorMap,
    subcategories: brownieSubcategories,
    rating: 5.0,
    tags: ["Bestseller", "Belgian Chocolate", "Crinkle Top"],
    customizable: true,
    flavors: ["Fudgy", "Peanut Butter", "Nutella", "Biscoff"],
    sizes: ["Box of 6", "Box of 8", "Box of 16", "Box of 24", "Box of 36"]
  });

  // 3. CHEESECAKES
  const cheeseSection = sections.find((s) => s.category === "cheesecakes");
  if (cheeseSection) {
    const minCheese = getMinPrice(cheeseSection);
    items.push({
      id: "cheesecake-artisanal",
      name: "Artisanal Cream Cheesecakes",
      description: "Velvety smooth pure Philadelphia-style cream cheese baked on a crunchy buttery biscuit crust with fresh gourmet fruit and caramel toppings.",
      priceEstimate: `Starts at ₹${minCheese || 125} (${cheeseSection.sizes[0] || '100g'})`,
      category: "cheesecakes",
      image: CATEGORY_GALLERY.cheesecakes.main,
      galleryImages: CATEGORY_GALLERY.cheesecakes.gallery,
      flavorImages: CATEGORY_GALLERY.cheesecakes.flavorMap,
      rating: 4.9,
      tags: ["Real Cream Cheese", "Buttery Biscuit Base", "Gourmet Topping"],
      customizable: true,
      flavors: cheeseSection.rows.map((r) => r.flavor),
      sizes: cheeseSection.sizes
    });
  }

  // 4. CUPCAKES
  const cupcakesSection = sections.find((s) => s.category === "cupcakes");
  if (cupcakesSection) {
    const minCupcake = getMinPrice(cupcakesSection);
    items.push({
      id: "cupcakes-gourmet",
      name: "Gourmet Artisanal Cupcakes",
      description: "Fluffy, freshly whipped boutique cupcakes with hand-piped frostings and delicate toppings. Perfect for parties, gifting, and sweet cravings.",
      priceEstimate: `Starts at ₹${minCupcake || 35} (${cupcakesSection.sizes[0] || 'Mini'})`,
      category: "cupcakes",
      image: CATEGORY_GALLERY.cupcakes.main,
      galleryImages: CATEGORY_GALLERY.cupcakes.gallery,
      flavorImages: CATEGORY_GALLERY.cupcakes.flavorMap,
      rating: 4.9,
      tags: ["Hand-piped", "Mini & Regular", "Pure Buttercream"],
      customizable: true,
      flavors: cupcakesSection.rows.map((r) => r.flavor),
      sizes: cupcakesSection.sizes
    });
  }

  // 5. COOKIES
  const cookiesSection = sections.find((s) => s.category === "cookies");
  if (cookiesSection) {
    const minCookie = getMinPrice(cookiesSection);
    items.push({
      id: "cookies-buttery",
      name: "Handmade Butter Cookies",
      description: "Crispy, buttery cookies packed with premium chocolate chunks, gourmet red velvet dough, and artisanal fruit jams.",
      priceEstimate: `Starts at ₹${minCookie || 200} (${cookiesSection.sizes[0] || 'Box of 8'})`,
      category: "cookies",
      image: CATEGORY_GALLERY.cookies.main,
      galleryImages: CATEGORY_GALLERY.cookies.gallery,
      flavorImages: CATEGORY_GALLERY.cookies.flavorMap,
      rating: 4.8,
      tags: ["Melt-in-mouth", "Pure Butter", "Gift Boxes"],
      customizable: true,
      flavors: cookiesSection.rows.map((r) => r.flavor),
      sizes: cookiesSection.sizes
    });
  }

  // 6. TARTS
  const tartsSection = sections.find((s) => s.category === "tarts");
  if (tartsSection) {
    const minTart = getMinPrice(tartsSection);
    items.push({
      id: "tarts-artisanal",
      name: "Artisanal Dessert Tarts",
      description: "Crispy golden shortcrust pastry shells filled with luscious creams, dark chocolate ganache, and seasonal garnishes.",
      priceEstimate: `Starts at ₹${minTart || 35} (${tartsSection.sizes[0] || 'Mini'})`,
      category: "tarts",
      image: CATEGORY_GALLERY.tarts.main,
      galleryImages: CATEGORY_GALLERY.tarts.gallery,
      flavorImages: CATEGORY_GALLERY.tarts.flavorMap,
      rating: 4.9,
      tags: ["Crispy Shortcrust", "Velvet Ganache", "Boutique"],
      customizable: true,
      flavors: ["Artisanal Tart"],
      sizes: tartsSection.sizes
    });
  }

  // 7. SAVORY SNACKS
  const snacksSection = sections.find((s) => s.category === "savory");
  if (snacksSection) {
    const minSnack = getMinPrice(snacksSection);
    items.push({
      id: "savory-snacks",
      name: "Artisanal Warm Snacks & Buns",
      description: "Baked to golden perfection with rich cheese, herby garlic butter, and savoury toppings. Oven-fresh Korean cream cheese buns, garlic bread, and skewers.",
      priceEstimate: `Starts at ₹${minSnack || 150}`,
      category: "savory",
      image: CATEGORY_GALLERY.savory.main,
      galleryImages: CATEGORY_GALLERY.savory.gallery,
      flavorImages: CATEGORY_GALLERY.savory.flavorMap,
      rating: 4.9,
      tags: ["Freshly Baked", "Warm Savory", "Authentic Herbs"],
      customizable: true,
      flavors: snacksSection.rows.map((r) => r.flavor),
      sizes: ["Single Portion"]
    });
  }

  return items;
}

// Generate Booklet pages matching the CSV
export function buildBookletPages(sections: ParsedCsvSection[]) {
  return sections.map((sect) => {
    let id = sect.title.toLowerCase().replace(/[^a-z0-9]/g, "_");
    let columns = ["Flavour / Item", ...sect.sizes];
    if (sect.category === "savory") {
      columns = ["Snack Selection", "Price"];
    }

    return {
      id,
      title: sect.title,
      category: sect.category,
      baseId: sect.category,
      tagline: `Artisanal freshly baked ${sect.title} • Clean ingredients with zero preservatives`,
      columns,
      sizes: sect.sizes,
      rows: sect.rows.map((r) => {
        const rowObj: any = { name: r.flavor };
        if (sect.category === "savory") {
          rowObj["price"] = `₹${r.prices["Standard"] || 0}`;
        } else {
          sect.sizes.forEach((sz) => {
            const p = r.prices[sz] || 0;
            rowObj[sz] = p > 0 ? `₹${p.toLocaleString("en-IN")}` : "-";
          });
        }
        return rowObj;
      })
    };
  });
}

// Parse once and export computed datasets
export const PARSED_SECTIONS = parseMenuCsv(rawCsv);
export const DYNAMIC_PRICE_CATALOG = buildPriceCatalog(PARSED_SECTIONS);
export const DYNAMIC_MENU_ITEMS = buildMenuItems(PARSED_SECTIONS);
export const DYNAMIC_BOOKLET_PAGES = buildBookletPages(PARSED_SECTIONS);
