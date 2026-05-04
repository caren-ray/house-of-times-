"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;

  await db.insert(products).values({
    name,
    description,
    price,
    category,
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800",
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProduct(id: number) {
  // Optional: Delete the physical file from public/uploads if needed
  // For now, just remove from DB
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}
