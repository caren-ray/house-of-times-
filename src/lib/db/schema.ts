import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  category: text("category").notNull(), // 'Watch' or 'Sunglasses'
  imageUrl: text("image_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
