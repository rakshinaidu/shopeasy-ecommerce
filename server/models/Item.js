import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  seller: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  image: String,
  description: String,
  rating: Number,
});

export default mongoose.model("Item", itemSchema);