export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

// POST: Create product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, price, stock, description, imageUrl } = body;

    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: "Name, price and stock are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      description,
      imageUrl,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// GET: Fetch products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (err) {
    console.error("FETCH PRODUCTS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
