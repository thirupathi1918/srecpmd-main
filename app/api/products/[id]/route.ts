import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

// Fix: Define params as a Promise
type Props = {
  params: Promise<{ id: string }>;
};

// GET: Fetch a single product
export async function GET(req: Request, { params }: Props) {
  try {
    const { id } = await params; // await the params here
    await connectDB();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT: Update a product
export async function PUT(req: Request, { params }: Props) {
  try {
    const { id } = await params; // await the params here
    const body = await req.json();
    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE: Remove a product
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id } = await params; // await the params here
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}