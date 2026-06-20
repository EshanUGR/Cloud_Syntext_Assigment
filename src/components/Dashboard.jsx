import React from "react";
import { currency } from "../utils/storage";

export default function Dashboard({ products }) {
  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, p) => sum + Number(p.price) * Number(p.stock),
    0,
  );

  const lowStockItems = products.filter((p) => p.stock <= 5);

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-xl shadow-sm transition transform hover:scale-[1.01]">
          <h2 className="text-sm font-medium opacity-80">
            Total Registered Products
          </h2>
          <h1 className="text-3xl font-bold mt-1">{totalProducts}</h1>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-xl shadow-sm transition transform hover:scale-[1.01]">
          <h2 className="text-sm font-medium opacity-80">
            Total Inventory Net Value
          </h2>
          <h1 className="text-3xl font-bold mt-1">
            {currency.format(totalValue)}
          </h1>
        </div>

        <div
          className={`p-5 rounded-xl shadow-sm transition transform hover:scale-[1.01] ${
            lowStockItems.length > 0
              ? "bg-gradient-to-br from-red-500 to-orange-500 text-white animate-pulse"
              : "bg-gradient-to-br from-gray-700 to-gray-800 text-white"
          }`}
        >
          <h2 className="text-sm font-medium opacity-80">
            Low Stock Warnings (≤ 5)
          </h2>
          <h1 className="text-3xl font-bold mt-1">{lowStockItems.length}</h1>
        </div>
      </div>

      {/* Quick Action Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4 rounded-xl">
          <h3 className="text-red-800 dark:text-red-400 font-semibold mb-2">
            Attention Required:
          </h3>
          <ul className="max-h-40 overflow-y-auto space-y-1 text-sm text-red-700 dark:text-red-300">
            {lowStockItems.map((p) => (
              <li
                key={p.id}
                className="flex justify-between border-b border-red-100 dark:border-red-900/20 py-1"
              >
                <span>
                  {p.name} <span className="text-xs italic">({p.sku})</span>
                </span>
                <span className="font-bold">Only {p.stock} left!</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
