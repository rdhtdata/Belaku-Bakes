import { useState } from "react";
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SafeImage } from "./SafeImage";
import { ParallaxImage } from "./ParallaxImage";
import { MaskHeading, StaggerCard } from "./RevealEffects";

const INSTAGRAM_POSTS = [
  {
    id: "post1",
    imgUrl: "menu-images/cakes/chocalate cake.png",
    alt: "Signature Belgian chocolate celebration cake dripping with rich ganache",
    likes: "148",
    comments: "24",
    type: "Signature Cake",
    fallbackType: "cake" as const
  },
  {
    id: "post2",
    imgUrl: "menu-images/brownies/brownie main.jpg",
    alt: "Triple-layer chocolate fudgy brownie squares with crinkle top",
    likes: "196",
    comments: "32",
    type: "Fudgy Brownies",
    fallbackType: "brownie" as const
  },
  {
    id: "post3",
    imgUrl: "menu-images/cupcakes/cupcakes_main.jpg",
    alt: "Gourmet freshly-piped boutique cupcakes with delicate frostings",
    likes: "165",
    comments: "19",
    type: "Boutique Cupcakes",
    fallbackType: "general" as const
  },
  {
    id: "post4",
    imgUrl: "menu-images/cheesecake/Cheeese cakes_main.png",
    alt: "Exquisite layered fruit baked cheesecake on a crisp biscuit crust",
    likes: "182",
    comments: "27",
    type: "Cheesecakes",
    fallbackType: "cake" as const
  },
  {
    id: "post5",
    imgUrl: "menu-images/tarts/Tarts.jpg",
    alt: "Handcrafted golden shortcrust bite-size and big dessert tarts",
    likes: "173",
    comments: "21",
    type: "Artisanal Tarts",
    fallbackType: "general" as const
  },
  {
    id: "post6",
    imgUrl: "menu-images/snacks/korean buns.jpeg",
    alt: "Freshly-baked oven-fresh Korean cream cheese garlic buns and savory snacks",
    likes: "139",
    comments: "18",
    type: "Warm Savouries",
    fallbackType: "savory" as const
  }
];

export default function InstagramShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden border-t border-brand-stone/40">
      {/* Soft ambient background bubble */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-linen/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-brand-stone/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-3 max-w-2xl">
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#4d2c19] font-bold">
              <Instagram className="w-3.5 h-3.5 text-[#4d2c19]" />
              <span>Behind The Scenes</span>
            </span>
            <MaskHeading className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight leading-tight">
              <span>Glance At Our Daily Bake Story</span>
              <span className="text-brand-caramel italic font-normal block mt-1">on Instagram</span>
            </MaskHeading>
            <p className="text-xs sm:text-sm text-brand-espresso/80 font-light leading-relaxed max-w-lg">
              We post fresh custom bakes, festive limited menus, and crusty baking logs straight from our Hennur cloud kitchen workspace. Come say hello!
            </p>
          </div>

          <div className="text-left md:text-right">
            <a
              href="https://www.instagram.com/belaku_bakes/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso py-3.5 px-6 rounded-full text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @belaku_bakes</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Visual Instagram Feed Grid with Staggered Cascades */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <StaggerCard key={post.id} index={idx} className="h-full">
              <motion.a
                href="https://www.instagram.com/belaku_bakes/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-stone cursor-pointer group border border-brand-stone/40 block shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Parallax Image */}
                <ParallaxImage
                  src={post.imgUrl}
                  alt={post.alt}
                  offset={8}
                  scale={1.12}
                  fallbackType={post.fallbackType}
                  containerClassName="w-full h-full absolute inset-0"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-espresso/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 sm:p-4 text-brand-cream z-10 pointer-events-none">
                  
                  {/* Category tag */}
                  <div className="text-left">
                    <span className="inline-block text-[9px] uppercase tracking-wider bg-brand-cream/20 px-2 py-0.5 rounded-md font-semibold text-brand-cream backdrop-blur-xs">
                      {post.type}
                    </span>
                  </div>

                  {/* Heart & Comments Counters */}
                  <div className="flex items-center justify-center space-x-3 py-2">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                      <span className="text-xs font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3.5 h-3.5 fill-brand-cream text-brand-cream" />
                      <span className="text-xs font-semibold">{post.comments}</span>
                    </div>
                  </div>

                  {/* Click action indicator */}
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold flex items-center justify-center space-x-1 select-none">
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>

                </div>
              </motion.a>
            </StaggerCard>
          ))}
        </div>

        {/* Small Bottom Quote banner */}
        <div className="mt-8 text-center bg-brand-linen/60 rounded-2xl border border-brand-stone/40 p-4 max-w-md mx-auto">
          <p className="text-xs text-brand-espresso/80 font-light flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-caramel shrink-0" />
            <span>Drop us a direct message on Instagram for fast bespoke inquiries!</span>
          </p>
        </div>

      </div>
    </section>
  );
}
