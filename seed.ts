import { db } from './src/lib/db';
import { products } from './src/lib/db/schema';

async function seed() {
  console.log('Seeding database...');
  
  const initialProducts = [
    {
      name: 'Classic Gold Watch',
      description: 'A timeless piece for every occasion.',
      price: 150.00,
      category: 'Watch',
      imageUrl: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Aviator Sunglasses',
      description: 'Iconic style with full UV protection.',
      price: 85.00,
      category: 'Sunglasses',
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    },
  ];

  for (const product of initialProducts) {
    await db.insert(products).values(product);
  }

  console.log('Seeding completed.');
}

seed().catch(console.error);
