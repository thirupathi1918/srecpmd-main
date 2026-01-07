"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, "Name too short"),
  category: z.string().min(3, "Category too short"),
  price: z.coerce.number().min(1, "Min price $1"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
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

  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = productSchema.safeParse(formData);

    if (!result.success) {
      const formatted: any = {};
      result.error.issues.forEach((issue) => {
        formatted[issue.path[0]] = issue.message;
      });
      setErrors(formatted);
      return;
    }

    setErrors({});
    setStatus("saving");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });

    if (res.ok) {
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
      const err = await res.json();
      setErrors({ api: err.error || "Save failed" });
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
              className="input-box w-full"
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
              className="input-box w-full"
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
              className="input-box w-full"
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
              className="input-box w-full"
            />
            {errors.stock && (
              <p className="text-red-400 text-xs">{errors.stock}</p>
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
            className="input-box w-full h-24"
          />
        </div>

        <CldUploadWidget
          uploadPreset="ml_default"
          onSuccess={(result: any) =>
            setFormData((prev) => ({
              ...prev,
              imageUrl: result.info.secure_url,
            }))
          }
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="btn-primary bg-slate-100 w-full text-xs md:text-base"
            >
              Upload Item Image
            </button>
          )}
        </CldUploadWidget>

        <button
          type="submit"
          disabled={status === "saving"}
          className="btn-primary bg-black text-white w-full"
        >
          {status === "saving" ? "Saving..." : "Submit Item"}
        </button>

        {errors.api && (
          <p className="text-red-500 text-xs text-center">
            {errors.api}
          </p>
        )}

        {errors.api && (
          <p className="text-red-500 text-xs text-center">
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
