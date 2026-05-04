"use server";

import { login as authLogin, logout as authLogout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function handleLogin(prevState: { error: string } | null, formData: FormData) {
  const success = await authLogin(formData);
  if (success) {
    redirect("/admin");
  } else {
    return { error: "Invalid username or password" };
  }
}

export async function handleLogout() {
  await authLogout();
  redirect("/login");
}
