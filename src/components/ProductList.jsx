import React from "react";
import { currency } from "../utils/storage";

export default function ProductList({
  products,
  deleteProduct,
  increaseStock,
  decreaseStock,
  onEditSelect,
}) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">
          No matching products found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-left bg-white dark:bg-gray-900 dark:text-white">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm uppercase">
            <tr>
              <th className="p-3">Product Details</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-center">Stock Availability</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
              >
                <td className="p-3">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    SKU: {product.sku || "-"} | ID: {product.id.slice(0, 8)}...
                  </div>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="p-3 text-right font-medium">
                  {currency.format(Number(product.price))}
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center disabled:opacity-40"
                      onClick={() =>
                        product.stock > 0 && decreaseStock(product.id)
                      }
                      disabled={product.stock <= 0}
                    >
                      -
                    </button>
                    <span
                      className={`w-12 font-bold ${product.stock <= 5 ? "text-red-500 animate-pulse" : ""}`}
                    >
                      {product.stock}
                    </span>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center"
                      onClick={() => increaseStock(product.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="text-xs px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                      onClick={() => onEditSelect(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                      onClick={() => {
                        if (confirm(`Delete ${product.name}?`))
                          deleteProduct(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive List Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {p.name}
                </h4>
                <p className="text-xs text-gray-500">
                  SKU: {p.sku || "-"} • {p.category}
                </p>
              </div>
              <div className="text-right">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {currency.format(Number(p.price))}
                </span>
                <p
                  className={`text-xs font-bold ${p.stock <= 5 ? "text-red-500" : "text-gray-500"}`}
                >
                  Stock: {p.stock}
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-2 border-t dark:border-gray-800">
              <button
                className="flex-1 text-xs py-2 bg-gray-100 dark:bg-gray-800 rounded font-medium dark:text-white"
                onClick={() => increaseStock(p.id)}
              >
                + Stock
              </button>
              <button
                className="flex-1 text-xs py-2 bg-gray-100 dark:bg-gray-800 rounded font-medium dark:text-white disabled:opacity-40"
                disabled={p.stock <= 0}
                onClick={() => decreaseStock(p.id)}
              >
                - Stock
              </button>
              <button
                className="flex-1 text-xs py-2 bg-blue-500 text-white rounded"
                onClick={() => onEditSelect(p)}
              >
                Edit
              </button>
              <button
                className="flex-1 text-xs py-2 bg-red-500 text-white rounded"
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
