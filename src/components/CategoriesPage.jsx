import React, { useState } from "react";

export default function CategoriesPage({
  categories,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [newCat, setNewCat] = useState("");
  const [editingCat, setEditingCat] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    onAdd(newCat.trim());
    setNewCat("");
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editValue.trim() || !editingCat) return;
    onEdit(editingCat, editValue.trim());
    setEditingCat(null);
    setEditValue("");
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-800 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-3 dark:text-white">
          Create New Category
        </h2>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Type new category designation..."
            className="flex-1 border p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-5 rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </form>
      </div>

      <hr className="dark:border-gray-800" />

      <div>
        <h3 className="text-md font-semibold text-gray-500 dark:text-gray-400 mb-3">
          Existing System Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((c) => (
            <li
              key={c}
              className="flex items-center justify-between border dark:border-gray-800 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40"
            >
              {editingCat === c ? (
                <form onSubmit={handleSaveEdit} className="flex gap-2 w-full">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 border p-1.5 rounded bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 text-xs rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCat(null)}
                    className="bg-gray-300 dark:bg-gray-700 text-xs px-3 rounded dark:text-white"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {c}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="text-xs px-2.5 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
                      onClick={() => {
                        setEditingCat(c);
                        setEditValue(c);
                      }}
                    >
                      Modify
                    </button>
                    <button
                      className="text-xs px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                      onClick={() => {
                        if (confirm(`Delete category "${c}"?`)) onDelete(c);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
