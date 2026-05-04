"use client";

import { handleLogin } from "./actions";
import { Lock, User, Watch, AlertCircle } from "lucide-react";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(handleLogin, null);

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
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-1 duration-300">
                <AlertCircle className="w-4 h-4" />
                {state.error}
              </div>
            )}

            <div>
              <label className="block text-white/60 text-xs uppercase tracking-widest mb-2 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  name="username" 
                  type="text" 
                  required 
                  disabled={isPending}
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all disabled:opacity-50"
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
                  disabled={isPending}
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all disabled:opacity-50"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-[#D4AF37] text-black py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing In..." : "Sign In"}
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
