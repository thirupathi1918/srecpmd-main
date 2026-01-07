"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductList({ products }: { products: any[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;

    await fetch(`/api/products/${deleteId}`, {
      method: "DELETE",
    });

    setDeleteId(null);
    router.refresh();
  };

  return (
    <>
      {/* INVENTORY CARD GRID – COMPLETELY NEW LOOK */}
      <div
        id="product-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {products.length === 0 ? (
          <div className="panel-card text-center col-span-full">
            <p className="text-[var(--color-muted)] text-sm">
              No inventory items found.
            </p>
          </div>
        ) : (
          products.map((product) => (
            <article
              key={product._id}
              className="panel-card hover:scale-[1.02] transition-all flex flex-col gap-2"
            >
              {/* IMAGE AREA */}
              <div className="panel-card h-32 flex items-center justify-center overflow-hidden text-2xl">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>📦</span>
                )}
              </div>

              {/* TEXT INFO – NEW TYPOGRAPHY */}
              <header className="text-center">
                <h2 className="font-extrabold text-base md:text-lg">
                  {product.name}
                </h2>
              </header>

              <ul className="space-y-1 text-sm text-[var(--color-muted)]">
                <li className="flex justify-between">
                  <span>Item Type</span>
                  <strong>{product.category || "Misc"}</strong>
                </li>

                <li className="flex justify-between">
                  <span>Price</span>
                  <strong className="text-black">
                    ${product.price}
                  </strong>
                </li>

                <li className="flex justify-between">
                  <span>Stock</span>

                  <span className="input-box text-xs font-semibold">
                    {product.stock} available
                  </span>
                </li>

                <li className="flex justify-between">
                  <span>Sales</span>
                  <strong>
                    {product.sales || 0}
                  </strong>
                </li>
              </ul>

              {/* ACTION AREA */}
              <div className="mt-2">
                <button
                  onClick={() => setDeleteId(product._id)}
                  className="btn-primary bg-rose-100 text-rose-700 w-full text-xs md:text-base"
                >
                  Remove Item
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* DELETE MODAL – NEW WORDING & STYLE */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="panel-card max-w-sm w-full mx-3 text-center">
            <h3 className="text-xl font-extrabold mb-1">
              Delete Inventory Item?
            </h3>

            <p className="text-xs text-[var(--color-muted)] mb-4">
              This action cannot be undone.
            </p>

            <div className="flex flex-row justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="input-box text-xs md:text-base"
              >
                Keep
              </button>

              <button
                onClick={handleDelete}
                className="btn-primary bg-black text-white text-xs md:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
