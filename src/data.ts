import { MenuItem, Testimonial } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // 1. ARTISANAL CAKES
  {
    id: "cake-chocolate",
    name: "Artisanal Chocolate Celebration Cake",
    description: "Sponge layers of pure premium cocoa baked freshly, stacked with rich melt-in-mouth fillings. Crafted to sweet perfection using only pure butter and fresh dairy cream.",
    priceEstimate: "₹850 for 500g",
    category: "cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    tags: ["Signature Fudge", "Luxurious", "Eggless Option"],
    customizable: true,
    flavors: [
      "Signature chocolate (500g: ₹850 / 1kg: ₹1700)",
      "Choco oreo (500g: ₹850 / 1kg: ₹1700)",
      "Chocolate truffle (500g: ₹900 / 1kg: ₹1800)",
      "Choco hazelnut (500g: ₹950 / 1kg: ₹1900)",
      "Choco almond (500g: ₹950 / 1kg: ₹1900)",
      "Choco cranberry (500g: ₹950 / 1kg: ₹1900)"
    ],
    sizes: ["500g", "1000g"]
  },
  {
    id: "cake-gourmet-flavors",
    name: "Premium Fruit & Butterscotch Gateau",
    description: "Wholesome, moist specialty sponges prepared with fresh hand-crushed fruit pulps or premium butterscotch praline crunch, coated in velvet buttercream.",
    priceEstimate: "Starts at ₹750",
    category: "cakes",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    tags: ["Fruit Infused", "Creamy", "Delicate Floral"],
    customizable: true,
    flavors: [
      "Pineapple gateau (500g: ₹750 / 1kg: ₹1550)",
      "Butterscotch (500g: ₹800 / 1kg: ₹1600)",
      "Rasmalai (500g: ₹900 / 1kg: ₹1800)",
      "Strawberry (500g: ₹900 / 1kg: ₹1800)",
      "Blueberry (500g: ₹900 / 1kg: ₹1800)"
    ],
    sizes: ["500g", "1000g"]
  },

  // 2. BROWNIE MENU
  {
    id: "brownie-bites",
    name: "Artisanal Brownie Bites",
    description: "Bite-sized cubes of chocolatey bliss, crispy on the outer crinkle shell and soft-fudgy inside. Absolutely perfect for small cravings or sharing boxes.",
    priceEstimate: "₹280 (Box of 8)",
    category: "brownies",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    tags: ["One-bite Treats", "Kid Friendly", "Belgian Cocoa"],
    customizable: true,
    flavors: [
      "Fudgy Bites",
      "Peanut butter Bites",
      "Nutella Bites",
      "Biscoff Bites"
    ],
    sizes: ["Box of 8", "Box of 16", "Box of 24", "Box of 36"]
  },
  {
    id: "brownie-medium",
    name: "Medium Belgian Brownie Slabs",
    description: "Classic medium-cut squares with standard dense, rich chocolate crumb and signature toppings. Ideal for tea-time desserts or celebration platters.",
    priceEstimate: "₹270 (Box of 3)",
    category: "brownies",
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    tags: ["Bestseller", "Perfect Crumb", "Tea Companion"],
    customizable: true,
    flavors: [
      "Fudgy Medium",
      "Peanut butter Medium",
      "Nutella Medium",
      "Biscoff Medium"
    ],
    sizes: ["Box of 3", "Box of 6", "Box of 8", "Box of 16"]
  },
  {
    id: "brownie-large",
    name: "Elite Large Brownie Blocks",
    description: "Deep, thick artisanal blocks sliced generously. Baked using pure chocolate couverture, leaving a glossy crust and melted fudge layers.",
    priceEstimate: "₹600 (Box of 4)",
    category: "brownies",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    tags: ["Luxury Slabs", "Intense Dark Cocoa", "Gifting Pack"],
    customizable: true,
    flavors: [
      "Fudgy Large",
      "Peanut butter Large",
      "Nutella Large",
      "Biscoff Large"
    ],
    sizes: ["Box of 4", "Box of 6", "Box of 9"]
  },

  // 3. GOURMET CHEESECAKES
  {
    id: "cheesecake-premium",
    name: "Artisanal Cream Cheesecake",
    description: "Luxurious, dense cream cheese baked over a crunchy graham-style butter shortbread crust layout. Finished with hand-crushed real fruit compotes or gourmet nut spreads.",
    priceEstimate: "₹125 (100g Slice)",
    category: "cheesecakes",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    tags: ["Melt-in-mouth", "Cream Cheese", "Classic Desserts"],
    customizable: true,
    flavors: [
      "Blueberry Cheesecake",
      "Strawberry Cheesecake",
      "Nutella Cheesecake",
      "Biscoff Cheesecake"
    ],
    sizes: ["100g", "500g", "1000g"]
  },

  // 4. INTIMATE CUPCAKES
  {
    id: "cupcake-gourmet",
    name: "Artisan Whipped Cupcakes",
    description: "Delicately piped miniature cakes, baked freshly using high-quality grain flour and crowned with smooth, velvety whipped frosting swirl decorations.",
    priceEstimate: "₹35 (1 Mini)",
    category: "cupcakes",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    tags: ["Fluffy Sponges", "Gorgeous Frosting", "Catering Choice"],
    customizable: true,
    flavors: [
      "Chocolate truffle Cupcake",
      "Signature chocolate Cupcake",
      "Vanilla choco chip Cupcake",
      "Vanilla Cupcake"
    ],
    sizes: ["Mini (₹35)", "Medium (₹75-85)", "Large (₹90-100)"]
  },

  // 5. BOUTIQUE COOKIES
  {
    id: "cookies-buttery",
    name: "Pure Butter Boutique Cookies",
    description: "Rustic, melt-in-the-mouth crumbly golden-brown cookies prepared with high-grade butter, real dark chocolate chips, or juicy tart jams.",
    priceEstimate: "₹200 (Box of 8)",
    category: "cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    tags: ["Crispy Edges", "Chewy Center", "Preservative Free"],
    customizable: true,
    flavors: [
      "Choco chips Cookies",
      "Jam cookies"
    ],
    sizes: ["Box of 8 (mini)", "Box of 15 (mini)"]
  },

  // 6. SAVOURY CRUSTS & SNACKS
  {
    id: "savory-gourmet",
    name: "Artesian Warm Savouries & Snacks",
    description: "Handcrafted, piping-hot vegetarian delicacies from our oven. Crispy canapés with delicious garlic-balsamic herbed fillings, soft potato sliders, or herby loaves.",
    priceEstimate: "Starts at ₹60",
    category: "savory",
    image: "https://images.unsplash.com/photo-1622484211148-716598e0915a?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    tags: ["Warm Savoury", "Umami Boost", "Arrives Freshly Baked"],
    customizable: true,
    flavors: [
      "Sandwich (₹150)",
      "Burger (₹150)",
      "Canape with corn and tangy filling (₹150)",
      "Canape with pasta filling (₹150)",
      "Korean buns (₹90)",
      "Cutlets veg (₹80)",
      "Bread pizza (₹80)",
      "Potato buns (₹60)",
      "Garlic bread (₹60)"
    ],
    sizes: ["Single Portion"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Apoorva Nair",
    role: "Milestone Anniversary Custom Cake Client",
    text: "I ordered a custom Chocolate Hazelnut cake for my parents' anniversary! Vaishnavi was so understanding and meticulous. The buttercream was perfectly sweet, and the crumb was unbelievably light and moist. Everybody loved it! Truly the best cloud kitchen in Hennur, Bangalore.",
    rating: 5
  },
  {
    id: "t-2",
    name: "Karthik Subramanian",
    role: "Regular Brownie Box Switter",
    text: "The Biscoff-swirled brownie bites are magical. Absolutely fudgy, with a gorgeous crinkle shell. Since they are a cloud kitchen, I simply schedule a Swiggy Genie pickup from Hennur, and it arrives packed beautifully in elegant beige boxes. Quality of chocolate is premium!",
    rating: 5
  },
  {
    id: "t-3",
    name: "Meera Sen",
    role: "Sunday Savouries Lover",
    text: "We ordered the Garlic Bread and Korean Buns alongside the Strawberry Cheesecake 500g for a cozy family dinner gathering. Not only was the bread incredibly soft and fragrant with actual fresh rosemary, but the cheesecake was outstandingly dense. Clean ingredients make all the difference!",
    rating: 5
  }
];

export const STORE_CHEF_STATEMENT = {
  brandName: "Belaku Bakes",
  philosophy: "We believe good food creates happy, eternal memories. Each dessert must carry a spark of light and delight.",
  founderName: "Vaishnavi K.S.",
  fullQuote: `Belaku Bakes, a cloud kitchen created from my passion for baking and bringing joy through desserts.
At Belaku Bakes, I craft a wide variety of sweet treats, including brownies, cookies, cheesecakes, cupcakes, customized cakes, and savory bakes. Every item is made with care, attention to detail, and a genuine love for creating something special.

For me, baking is more than just a profession—it's what makes me happy. The greatest reward is seeing my customers and clients enjoy what I create. Knowing that my desserts can be a part of someone's celebration, special moment, or simple craving brings me immense satisfaction and motivates me to keep baking with passion every day.

Belaku Bakes was built on the belief that good food creates happy memories. Whether it's a customized cake for a milestone event or a box of brownies to brighten someone's day, my goal is to make every order memorable and bring a smile to every customer's face.`
};

export const CONTACT_INFO = {
  whatsappNumber: "+919663307314",
  formattedPhone: "+919663307314",
  instagramUsername: "@belaku_bakes",
  instagramUrl: "https://instagram.com/belaku_bakes",
  address: "#11, cmr layout hennur bande opposite KCER Enclave bengaluru 560043",
  mapCoordinateGoogleMaps: "https://www.google.com/maps/search/?api=1&query=%2311%2C+cmr+layout+hennur+bande+opposite+KCER+Enclave+bengaluru+560043",
  operatingHours: "10:30 AM - 8:30 PM (Tuesday to Sunday, Closed Mondays)",
  deliveryNote: "Because we cook out of a dedicated pure artisanal cloud kitchen to guarantee peak freshness, we do not employ a proprietary delivery fleet. We extend full support to help you organize a convenient contactless pickup from our Hennur gate using local courier apps, such as Swiggy Genie, Uber Package/Auto, Porter, or a direct hand-pickup."
};

// Precise price catalog mapped from the booklet to compute exact estimated cost transparently
export const PRICE_CATALOG: { [key: string]: number } = {
  // Chocolate Cakes
  "Signature chocolate (500g: ₹850 / 1kg: ₹1700)": 850,
  "Choco oreo (500g: ₹850 / 1kg: ₹1700)": 850,
  "Chocolate truffle (500g: ₹900 / 1kg: ₹1800)": 900,
  "Choco hazelnut (500g: ₹950 / 1kg: ₹1900)": 950,
  "Choco almond (500g: ₹950 / 1kg: ₹1900)": 950,
  "Choco cranberry (500g: ₹950 / 1kg: ₹1900)": 950,

  // Gourmet Cakes
  "Pineapple gateau (500g: ₹750 / 1kg: ₹1550)": 750,
  "Butterscotch (500g: ₹800 / 1kg: ₹1600)": 800,
  "Rasmalai (500g: ₹900 / 1kg: ₹1800)": 900,
  "Strawberry (500g: ₹900 / 1kg: ₹1800)": 900,
  "Blueberry (500g: ₹900 / 1kg: ₹1800)": 900,

  // Brownie Bites Boxes
  "Fudgy Bites-Box of 8": 280,
  "Fudgy Bites-Box of 16": 560,
  "Fudgy Bites-Box of 24": 840,
  "Fudgy Bites-Box of 36": 1260,
  "Peanut butter Bites-Box of 8": 300,
  "Peanut butter Bites-Box of 16": 600,
  "Peanut butter Bites-Box of 24": 900,
  "Peanut butter Bites-Box of 36": 1350,
  "Nutella Bites-Box of 8": 320,
  "Nutella Bites-Box of 16": 640,
  "Nutella Bites-Box of 24": 960,
  "Nutella Bites-Box of 36": 1440,
  "Biscoff Bites-Box of 8": 360,
  "Biscoff Bites-Box of 16": 720,
  "Biscoff Bites-Box of 24": 1080,
  "Biscoff Bites-Box of 36": 1620,

  // Medium Brownies Boxes
  "Fudgy Medium-Box of 3": 270,
  "Fudgy Medium-Box of 6": 540,
  "Fudgy Medium-Box of 8": 720,
  "Fudgy Medium-Box of 16": 1440,
  "Peanut butter Medium-Box of 3": 280,
  "Peanut butter Medium-Box of 6": 560,
  "Peanut butter Medium-Box of 8": 750,
  "Peanut butter Medium-Box of 16": 1500,
  "Nutella Medium-Box of 3": 290,
  "Nutella Medium-Box of 6": 580,
  "Nutella Medium-Box of 8": 770,
  "Nutella Medium-Box of 16": 1550,
  "Biscoff Medium-Box of 3": 300,
  "Biscoff Medium-Box of 6": 600,
  "Biscoff Medium-Box of 8": 800,
  "Biscoff Medium-Box of 16": 1600,

  // Large Brownies Boxes
  "Fudgy Large-Box of 4": 600,
  "Fudgy Large-Box of 6": 900,
  "Fudgy Large-Box of 9": 1350,
  "Peanut butter Large-Box of 4": 610,
  "Peanut butter Large-Box of 6": 920,
  "Peanut butter Large-Box of 9": 1380,
  "Nutella Large-Box of 4": 620,
  "Nutella Large-Box of 6": 930,
  "Nutella Large-Box of 9": 1400,
  "Biscoff Large-Box of 4": 640,
  "Biscoff Large-Box of 6": 960,
  "Biscoff Large-Box of 9": 1500,

  // Cheesecake flavors and sizes
  "Blueberry Cheesecake-100g": 125,
  "Blueberry Cheesecake-500g": 600,
  "Blueberry Cheesecake-1000g": 1200,
  "Strawberry Cheesecake-100g": 125,
  "Strawberry Cheesecake-500g": 600,
  "Strawberry Cheesecake-1000g": 1200,
  "Nutella Cheesecake-100g": 150,
  "Nutella Cheesecake-500g": 620,
  "Nutella Cheesecake-1000g": 1240,
  "Biscoff Cheesecake-100g": 150,
  "Biscoff Cheesecake-500g": 650,
  "Biscoff Cheesecake-1000g": 1300,

  // Cupcakes
  "Chocolate truffle Cupcake-Mini (text)": 35,
  "Chocolate truffle Cupcake": 35, // base Mini
  "Chocolate truffle Cupcake-Mini": 35,
  "Chocolate truffle Cupcake-Medium": 85,
  "Chocolate truffle Cupcake-Large": 100,
  
  "Signature chocolate Cupcake-Mini": 35,
  "Signature chocolate Cupcake-Medium": 80,
  "Signature chocolate Cupcake-Large": 95,
  
  "Vanilla choco chip Cupcake-Mini": 35,
  "Vanilla choco chip Cupcake-Medium": 85,
  "Vanilla choco chip Cupcake-Large": 100,
  
  "Vanilla Cupcake-Mini": 35,
  "Vanilla Cupcake-Medium": 75,
  "Vanilla Cupcake-Large": 90,

  // Cookies
  "Choco chips Cookies-Box of 8 (mini)": 200,
  "Choco chips Cookies-Box of 15 (mini)": 400,
  "Jam cookies-Box of 8 (mini)": 250,
  "Jam cookies-Box of 15 (mini)": 512,

  // Savouries list
  "Sandwich (₹150)": 150,
  "Burger (₹150)": 150,
  "Canape with corn and tangy filling (₹150)": 150,
  "Canape with pasta filling (₹150)": 150,
  "Korean buns (₹90)": 90,
  "Cutlets veg (₹80)": 80,
  "Bread pizza (₹80)": 80,
  "Potato buns (₹60)": 60,
  "Garlic bread (₹60)": 60
};
