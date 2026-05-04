interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col bg-[#111] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/30">
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden bg-black">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-black/80 backdrop-blur-md text-[#D4AF37] text-[10px] px-3 py-1 uppercase tracking-[0.2em] border border-[#D4AF37]/20">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-white font-serif text-xl group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#D4AF37] font-light text-lg">
            KSh {product.price.toLocaleString()}
          </p>
        </div>
        
        <p className="text-gray-400 text-sm font-light line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <button className="mt-auto w-full border border-white/10 text-white py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
          View Details
        </button>
      </div>
    </div>
  );
}
