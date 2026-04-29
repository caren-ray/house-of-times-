"use client";

import { handleLogin } from "./actions";
import { Lock, User, Watch } from "lucide-react";

export default function LoginPage() {
  const clientAction = async (formData: FormData) => {
    const result = await handleLogin(formData);
    if (result?.error) {
      alert(result.error);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Watch className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h1 className="text-3xl font-serif text-white mb-2 tracking-tight">House Of Time</h1>
          <p className="text-gray-500 uppercase tracking-[0.2em] text-xs">Admin Access</p>
        </div>

        <div className="bg-[#111] border border-white/5 p-8 rounded-xl shadow-2xl">
          <form action={clientAction} className="space-y-6">
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  name="username" 
                  type="text" 
                  required 
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  name="password" 
                  type="password" 
                  required 
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#D4AF37] text-black py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-white/20 hover:text-[#D4AF37] text-xs uppercase tracking-widest transition-colors">
            Return to Store
          </a>
        </div>
      </div>
    </main>
  );
}
