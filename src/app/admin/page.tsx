import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import AddProductForm from "@/components/admin/product-form";
import { deleteProduct } from "./actions";
import { handleLogout } from "@/app/login/actions";
import { Trash2, Package, Watch, Sun, Search, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const allProducts = await db.select().from(products).execute();
  
  const totalProducts = allProducts.length;
  const watchCount = allProducts.filter(p => p.category === 'Watch').length;
  const sunglassesCount = allProducts.filter(p => p.category === 'Sunglasses').length;

  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      {/* Custom Admin Navbar */}
      <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3 font-bold text-xl italic tracking-tighter">
          <LayoutDashboard className="text-[#D4AF37]" />
          House Of Time <span className="text-[#D4AF37] font-light not-italic text-sm ml-2">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xs uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
            View Store
          </Link>
          <form action={handleLogout}>
            <button className="text-xs uppercase tracking-widest bg-[#D4AF37] text-black px-4 py-2 hover:bg-white transition-all">
              Log Out
            </button>
          </form>
        </div>
      </nav>
      
      <div className="container mx-auto px-6 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Total Stock</p>
              <h4 className="text-2xl font-bold text-gray-800">{totalProducts} Items</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5">
            <div className="bg-orange-50 p-4 rounded-lg">
              <Watch className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Watches</p>
              <h4 className="text-2xl font-bold text-gray-800">{watchCount} Units</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <Sun className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Sunglasses</p>
              <h4 className="text-2xl font-bold text-gray-800">{sunglassesCount} Units</h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Add Product Sidebar */}
          <div className="lg:col-span-4">
            <AddProductForm />
          </div>

          {/* Product Management Table */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">Inventory Management</h2>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search products..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <tr>
                      <th className="px-6 py-4">Product Details</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {allProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-100 bg-gray-100 flex-shrink-0">
                              <img src={product.imageUrl} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-800 text-sm">{product.name}</div>
                              <div className="text-xs text-gray-400 line-clamp-1 max-w-[200px] mt-0.5">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                            product.category === 'Watch' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                          KSh {product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <form action={deleteProduct.bind(null, product.id)}>
                            <button className="bg-red-50 text-red-500 p-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                    {allProducts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center">
                          <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                          <p className="text-gray-400 font-medium italic">Your inventory is empty.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
