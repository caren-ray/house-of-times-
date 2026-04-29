"use client";

import { useState, useRef } from "react";
import { PlusCircle, Image as ImageIcon, X } from "lucide-react";
import { addProduct } from "@/app/admin/actions";

export default function AddProductForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await addProduct(formData);
      formRef.current?.reset();
      setPreview(null);
      alert("Product added successfully!");
    } catch (error) {
      alert("Failed to add product.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <PlusCircle className="w-5 h-5 text-[#D4AF37]" />
        Add New Product
      </h2>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Area */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Product Image</label>
          <div 
            className={`relative group border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] ${
              preview ? "border-solid border-[#D4AF37]" : "border-gray-200 hover:border-[#D4AF37]/50 bg-gray-50"
            }`}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover max-h-[300px]" />
                <button 
                  type="button"
                  onClick={() => setPreview(null)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="p-8 text-center">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-500 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (max. 5MB)</p>
              </div>
            )}
            <input 
              name="image" 
              type="file" 
              accept="image/*" 
              required 
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name</label>
            <input name="name" type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all" placeholder="e.g. Rolex Submariner" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <select name="category" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all appearance-none">
              <option value="Watch">Watch</option>
              <option value="Sunglasses">Sunglasses</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (KSh)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">KSh</span>
            <input name="price" type="number" step="1" required className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all" placeholder="0" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
          <textarea name="description" required rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all resize-none" placeholder="Enter product details..."></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className={`w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-[#D4AF37] hover:text-black"
          }`}
        >
          {isPending ? "Adding Product..." : "Post Product"}
        </button>
      </form>
    </div>
  );
}
