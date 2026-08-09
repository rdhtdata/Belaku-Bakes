import { Testimonial } from "./types";
import { DYNAMIC_MENU_ITEMS, DYNAMIC_PRICE_CATALOG, DYNAMIC_BOOKLET_PAGES } from "./menuDataLoader";

// Dynamically exported menu items derived directly from the CSV
export const MENU_ITEMS = DYNAMIC_MENU_ITEMS;
export const PRICE_CATALOG = DYNAMIC_PRICE_CATALOG;
export const BOOK_PAGES = DYNAMIC_BOOKLET_PAGES;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Aparna Sharma",
    role: "Regular Hennur Resident",
    text: "Belaku Bakes made our daughter's birthday genuinely unforgettable. The Signature Chocolate Truffle was incredibly moist, decadent yet not overly sugary. You can immediately taste the pure butter and premium Belgian chocolate. Seamless pickup via Uber Package!",
    rating: 5
  },
  {
    id: "t-2",
    name: "Rohan & Sneha",
    role: "Milestone Celebration",
    text: "The customized floral buttercream cake was literally the centerpiece of our anniversary. Vaishnavi was so attentive on WhatsApp to every aesthetic detail. Highly recommend the Nutella Brownie Bites box too—disappeared within 10 minutes!",
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
  mapCoordinateGoogleMaps: "https://maps.app.goo.gl/43RSpB5Yz5DYQuFHA",
  operatingHours: "10:30 AM - 8:30 PM (Tuesday to Sunday, Closed Mondays)",
  deliveryNote: "Because we cook out of a dedicated pure artisanal cloud kitchen to guarantee peak freshness, we do not employ a proprietary delivery fleet. We extend full support to help you organize a convenient contactless pickup from our Hennur gate using local courier apps, such as Swiggy Genie, Uber Package/Auto, Porter, or a direct hand-pickup."
};
