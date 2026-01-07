export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

// POST: Create a new product
export async function POST(req: Request) {
  try {
    // 1. Parse the incoming data
    const body = await req.json();
    const { name, category, price, stock, description, imageUrl } = body;

    // 2. Validate data (Simple check)
    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: "Name, Price, and Stock are required" },
        { status: 400 }
      );
    }

    // 3. Connect to Database
    await connectDB();

    // 4. Create the Product
    const newProduct = await Product.create({
      name,
      category,
      price,
      stock,
      description,
      imageUrl,
    });

    // 5. Return success
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// GET: Fetch all products (API version)
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
