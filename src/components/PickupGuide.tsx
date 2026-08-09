import { useState } from "react";
import { MapPin, Copy, Check, ExternalLink, Clock, Compass, ShieldCheck } from "lucide-react";
import { CONTACT_INFO } from "../data";

export default function PickupGuide() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CONTACT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pickup" className="py-24 bg-brand-cream relative">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-linen/50 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-left mb-12 max-w-2xl space-y-3">
          <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brand-caramel font-bold">
            <MapPin className="w-3.5 h-3.5 text-brand-caramel" />
            <span>Our Location</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-espresso tracking-tight leading-tight">
            Find Our Kitchen <br />
            <span className="text-brand-caramel italic font-normal">in the heart of Hennur</span>
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Location & Action Details */}
          <div className="lg:col-span-5 bg-brand-linen rounded-3xl p-8 sm:p-10 border border-brand-stone/60 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="block text-xs uppercase tracking-widest font-bold text-brand-caramel">
                  Kitchen Address
                </span>
                <p className="font-serif text-lg font-bold text-brand-espresso leading-snug">
                  Hennur Bande, Bengaluru
                </p>
                <p className="text-xs sm:text-sm text-brand-espresso/80 font-light leading-relaxed">
                  {CONTACT_INFO.address}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center space-x-2 py-3 px-5 bg-brand-espresso text-brand-cream hover:bg-brand-caramel hover:text-brand-espresso rounded-xl text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer w-full sm:w-auto"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Copied Address!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={CONTACT_INFO.mapCoordinateGoogleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 py-3 px-5 bg-transparent border border-brand-stone text-brand-espresso hover:bg-brand-cream rounded-xl text-xs uppercase font-bold tracking-wider transition-colors w-full sm:w-auto text-center font-semibold"
                >
                  <span>Google Maps link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-brand-stone/40 my-4" />

              {/* Cloud Kitchen Info */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-xs">
                  <ShieldCheck className="w-4 h-4 text-brand-caramel shrink-0 mt-0.5" />
                  <p className="text-brand-espresso/85 font-light leading-relaxed">
                    We operate as a <strong className="font-semibold text-brand-espresso">pure artisanal cloud kitchen</strong> ensuring unmatched cleanliness, premium ingredients, and fresh custom baking.
                  </p>
                </div>
                <div className="flex items-start space-x-3 text-xs">
                  <Compass className="w-4 h-4 text-brand-caramel shrink-0 mt-0.5" />
                  <p className="text-brand-espresso/85 font-light leading-relaxed">
                    We do not have a proprietary delivery team. You can pick up your delicacies directly or book a courier (such as <strong className="font-semibold text-brand-espresso">Swiggy Genie, Uber Package/Auto, or Porter courier fleets</strong>) with our gate coordinate as the pickup point!
                  </p>
                </div>
              </div>
            </div>

            {/* Operating hours indicator */}
            <div className="pt-4 border-t border-brand-stone/40">
              <span className="block text-[10px] uppercase tracking-wider font-bold text-brand-espresso/65 mb-2">Operating Window</span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                <div className="flex items-center space-x-1.5 bg-brand-cream px-3 py-1.5 rounded-full border border-brand-stone/40">
                  <Clock className="w-3.5 h-3.5 text-brand-caramel" />
                  <span>Tue-Sun: {CONTACT_INFO.operatingHours.split(" (")[0]}</span>
                </div>
                <div className="bg-brand-espresso text-brand-cream px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                  Closed Mondays
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Large Map Section */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-brand-stone/60 shadow-xl bg-brand-stone min-h-[400px] lg:min-h-[500px] flex">
            <iframe
              title="Interactive Hennur Bande Map Location"
              className="w-full h-full grayscale-20 border-0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              loading="lazy"
            />
            <a
              href={CONTACT_INFO.mapCoordinateGoogleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-brand-espresso/90 hover:bg-brand-espresso text-brand-cream text-xs font-medium px-3.5 py-2 rounded-lg backdrop-blur-md shadow-md border border-brand-stone/20 transition-all flex items-center space-x-1.5 group cursor-pointer"
            >
              <span>📍 Hennur Bande, Bengaluru</span>
              <ExternalLink className="w-3 h-3 text-brand-gold group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
