import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 60 },
    category: { type: String, required: false }, // Optional
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    sales: { type: Number, default: 0 }, // New Sales Field
    description: { type: String, required: false }, // Optional
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);