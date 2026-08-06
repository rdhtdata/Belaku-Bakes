export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceEstimate: string; // e.g., "₹1,200 / Kg" or "₹450 (Box of 6)"
  category: "cakes" | "brownies" | "cookies" | "cheesecakes" | "cupcakes" | "savory";
  image: string;
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
