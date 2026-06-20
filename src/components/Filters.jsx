import React from "react";

export default function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl flex flex-col md:flex-row gap-3 items-center justify-between mb-4 border dark:border-gray-700">
      <div className="w-full md:w-1/2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Search products by name or SKU..."
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
        />
      </div>
      <div className="w-full md:w-auto flex items-center gap-2">
        <span className="text-sm text-gray-500 whitespace-nowrap">
          Filter By:
        </span>
        <select
          value={selectedCategory || ""}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full md:w-48 p-2 rounded-lg border bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
