import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    sales: { type: Number, default: 0 },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

// ✅ VERY IMPORTANT FOR VERCEL
const Product = models.Product || model("Product", ProductSchema);

export default Product;
