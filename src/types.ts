export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceEstimate: string; // e.g., "₹1,200 / Kg" or "₹280 (Box of 8)"
  category: "cakes" | "brownies" | "cookies" | "cheesecakes" | "cupcakes" | "tarts" | "savory";
  image: string;
  galleryImages?: string[];
  flavorImages?: Record<string, string>;
  subcategories?: {
    name: string;
    id: string;
    description?: string;
    sizes: string[];
    flavors: string[];
    priceEstimate?: string;
  }[];
  rating: number;
  tags: string[];
  customizable: boolean;
  flavors?: string[];
  sizes?: string[];
}

export interface CustomOrder {
  customerName: string;
  contactNumber: string;
  category: string;
  subCategory?: string;
  flavor: string;
  size: string;
  eggless: boolean;
  date: string;
  time: string;
  writingOnCake: string;
  instructions: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}
