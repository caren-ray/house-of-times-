"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File;

  let imageUrl = "";

  if (imageFile && imageFile.size > 0) {
    const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure directory exists (redundant but safe)
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  } else {
    // Fallback if no image is uploaded
    imageUrl = "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800";
  }

  await db.insert(products).values({
    name,
    description,
    price,
    category,
    imageUrl,
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
