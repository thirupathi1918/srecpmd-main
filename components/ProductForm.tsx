"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, "Name too short"),
  category: z.string().min(3, "Category too short"),
  price: z.coerce.number().min(0, "Price must not be negative"),
  stock: z.coerce.number().min(0, "Stock must be ≥ 0"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export default function ProductForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🟢 Validate the SAME payload you send to API
    const payload = {
      name: formData.name,
      category: formData.category,
      price: formData.price,
      stock: formData.stock,
      description: formData.description,
      imageUrl: formData.imageUrl,
    };

    const result = productSchema.safeParse(payload);

    if (!result.success) {
      const formatted: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        formatted[String(issue.path[0])] = issue.message;
      });

      setErrors(formatted);
      return;
    }

    setErrors({});
    setStatus("saving");

    try {
      const res = await fetch("/api/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // optional UI update
        router.refresh();

        setFormData({
          name: "",
          category: "",
          price: "",
          stock: "",
          description: "",
          imageUrl: "",
        });

        setStatus("success");
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        // expect API error text/json
        const text = await res.text();
        setErrors({ api: text || "Failed to create product" });
      }
    } catch (err: any) {
      setErrors({ api: err.message || "Network error" });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="panel-card w-full">
      <header className="mb-3 text-center">
        <h3 className="text-2xl font-extrabold">Create Item</h3>
        <p className="text-xs text-[var(--color-muted)]">
          Add inventory details
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              placeholder="Item Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input-box w-full text-xs md:text-base"
            />

            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Item Type"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="input-box w-full text-xs md:text-base"
            />

            {errors.category && (
              <p className="text-red-400 text-xs">
                {errors.category}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              placeholder="Cost"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="input-box w-full text-xs md:text-base"
            />

            {errors.price && (
              <p className="text-red-400 text-xs">{errors.price}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Quantity"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="input-box w-full text-xs md:text-base"
            />

            {errors.stock && (
              <p className="text-red-400 text-xs">
                {errors.stock}
              </p>
            )}
          </div>
        </div>

        <div>
          <textarea
            placeholder="Notes (optional)"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="input-box w-full h-24 text-xs md:text-base"
          />

          {errors.description && (
            <p className="text-red-400 text-xs">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <input
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({
                ...formData,
                imageUrl: e.target.value,
              })
            }
            className="input-box w-full text-xs md:text-base"
          />
        </div>

        <button
          type="submit"
          disabled={status === "saving"}
          className="btn-primary w-full bg-black text-white text-xs md:text-base"
        >
          {status === "saving" ? "Saving..." : "Submit Item"}
        </button>

        {errors.api && (
          <p className="text-red-400 text-xs text-center">
            {errors.api}
          </p>
        )}
      </form>

      {status === "success" && (
        <div className="mt-3 text-center">
          <p className="text-green-400 font-extrabold text-sm">
            Item Saved Successfully
          </p>
        </div>
      )}
    </div>
  );
}
