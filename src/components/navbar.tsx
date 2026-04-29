import Link from 'next/link';
import { Watch } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent text-white border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter uppercase italic">
          <Watch className="w-8 h-8 text-[#D4AF37]" />
          <span>House Of Time</span>
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <a href="#collection" className="hover:text-[#D4AF37] transition-colors tracking-widest">Collection</a>
        </div>
      </div>
    </nav>
  );
}
