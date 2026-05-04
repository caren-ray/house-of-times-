import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import ProductCard from "@/components/product-card";
import Navbar from "@/components/navbar";
import { ChevronDown, MessageCircle, Mail, Clock, Phone, Camera } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await db.select().from(products).execute();

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] mb-4 animate-fade-in">Est. 2026</h2>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tight">
            The Essence of <br />
            <span className="italic font-light">Timeless Elegance</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide">
            Curating the world&apos;s finest watches and premium eyewear for those who appreciate the art of precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#collection" className="bg-[#D4AF37] text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300">
              Explore Collection
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Product Section */}
      <section id="collection" className="container mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.5em]">Inventory</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">Latest Arrivals</h2>
          <div className="w-20 h-[1px] bg-[#D4AF37] mx-auto mt-6" />
        </div>

        {allProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-light">Our vault is currently empty. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Contact & Hours Section */}
      <section className="bg-black py-32 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-[#D4AF37] mb-6" />
              <h3 className="text-white font-serif text-2xl mb-4">Business Hours</h3>
              <p className="text-gray-400 font-light uppercase tracking-widest text-sm">Mon - Fri</p>
              <p className="text-white text-lg mt-1">8:00 AM - 7:00 PM</p>
            </div>

            {/* Quote */}
            <div className="flex items-center justify-center md:border-x border-white/10 px-8">
              <p className="text-xl font-serif text-white/60 italic leading-relaxed">
                &quot;Time is the only luxury that cannot be bought, but it can be beautifully measured.&quot;
              </p>
            </div>

            {/* Connect */}
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-[#D4AF37] mb-6" />
              <h3 className="text-white font-serif text-2xl mb-4">Get In Touch</h3>
              <div className="flex flex-col gap-3">
                <a href="https://wa.me/254729945959" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-sm uppercase tracking-widest">
                  <MessageCircle className="w-4 h-4" /> 0729945959
                </a>
                <a href="mailto:rayoncaren@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-sm uppercase tracking-widest">
                  <Mail className="w-4 h-4" /> rayoncaren@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-20">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="text-white font-bold text-2xl tracking-tighter uppercase italic mb-8">
            House Of Time
          </div>
          
          {/* Social Links */}
          <div className="flex gap-10 mb-12">
            <a href="https://instagram.com/luv_4_time" target="_blank" className="text-white/40 hover:text-[#D4AF37] transition-all transform hover:scale-110">
              <Camera className="w-6 h-6" />
            </a>
            <a href="https://wa.me/254729945959" target="_blank" className="text-white/40 hover:text-[#D4AF37] transition-all transform hover:scale-110">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="mailto:rayoncaren@gmail.com" className="text-white/40 hover:text-[#D4AF37] transition-all transform hover:scale-110">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-[0.2em] mb-8 border-t border-white/5 pt-8 w-full justify-center">
            <span>Kenya</span>
            <span>Est. 2026</span>
            <span>&copy; {new Date().getFullYear()} House Of Time</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
