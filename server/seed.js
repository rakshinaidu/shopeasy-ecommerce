import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item.js";

dotenv.config();

const items = [
  { title: "Wireless Headphones", seller: "SoundHub", price: 2499, category: "Electronics", rating: 4.5, image: "https://picsum.photos/seed/headphones/400/300", description: "Over-ear Bluetooth headphones with 30-hour battery life." },
  { title: "Running Shoes", seller: "FitStep", price: 3199, category: "Footwear", rating: 4.2, image: "https://picsum.photos/seed/shoes/400/300", description: "Lightweight, breathable shoes for daily runs." },
  { title: "Steel Water Bottle", seller: "HydroCo", price: 699, category: "Home", rating: 4.7, image: "https://picsum.photos/seed/bottle/400/300", description: "Insulated 1L bottle, keeps drinks cold for 24 hours." },
  { title: "Mechanical Keyboard", seller: "KeyCraft", price: 4599, category: "Electronics", rating: 4.6, image: "https://picsum.photos/seed/keyboard/400/300", description: "Hot-swappable switches with RGB backlight." },
  { title: "Canvas Backpack", seller: "UrbanPack", price: 1299, category: "Bags", rating: 4.3, image: "https://picsum.photos/seed/backpack/400/300", description: "20L backpack with a padded laptop sleeve." },
  { title: "Desk Lamp", seller: "BrightLife", price: 899, category: "Home", rating: 4.1, image: "https://picsum.photos/seed/lamp/400/300", description: "LED lamp with adjustable brightness and color temperature." },
];

await mongoose.connect(process.env.MONGO_URI);
await Item.deleteMany();
await Item.insertMany(items);
console.log("Seeded " + items.length + " items");
process.exit();