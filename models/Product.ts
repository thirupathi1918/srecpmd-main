import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 60 },

    category: { type: String, required: false },

    price: { type: Number, required: true, min: 0 },

    stock: { type: Number, required: true, min: 0 },

    sales: { type: Number, default: 0 },

    description: { type: String, required: false },

    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
