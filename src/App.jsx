import React, { useState, useEffect } from "react";
import * as storage from "./utils/storage";
import Dashboard from "./components/Dashboard";
import Filters from "./components/Filters";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import CategoriesPage from "./components/CategoriesPage";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("dashboard"); // Tabs: dashboard, products, categories

  // Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  // Initialize and load persistence data
  useEffect(() => {
    setProducts(storage.getProducts());
    setCategories(storage.getCategories());
    const savedTheme = storage.getTheme();
    setTheme(savedTheme);

    // Explicitly check the string value from localStorage directly
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    storage.saveTheme(nextTheme);

    // FIXED: Toggle using the freshly calculated 'nextTheme' variable instead of stagnant state
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Product Logic State Modifiers
  const handleProductSubmit = (productPayload) => {
    let updated;
    const exists = products.find((p) => p.id === productPayload.id);
    if (exists) {
      updated = products.map((p) =>
        p.id === productPayload.id ? productPayload : p,
      );
    } else {
      updated = [productPayload, ...products];
    }
    setProducts(updated);
    storage.saveProducts(updated);
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    storage.saveProducts(updated);
  };

  const adjustStock = (id, change) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const calculated = p.stock + change;
        return { ...p, stock: calculated < 0 ? 0 : calculated };
      }
      return p;
    });
    setProducts(updated);
    storage.saveProducts(updated);
  };

  // Category Logic Modifiers
  const addCategory = (name) => {
    if (categories.includes(name)) return;
    const updated = [...categories, name];
    setCategories(updated);
    storage.saveCategories(updated);
  };

  const editCategory = (oldName, newName) => {
    const updatedCats = categories.map((c) => (c === oldName ? newName : c));
    setCategories(updatedCats);
    storage.saveCategories(updatedCats);

    const updatedProducts = products.map((p) =>
      p.category === oldName ? { ...p, category: newName } : p,
    );
    setProducts(updatedProducts);
    storage.saveProducts(updatedProducts);
  };

  const deleteCategory = (catName) => {
    const updatedCats = categories.filter((c) => c !== catName);
    setCategories(updatedCats);
    storage.saveCategories(updatedCats);
  };

  // Dynamic Content Query Search Pipeline
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Top Universal Navbar Shell */}
      <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
              StockFlow Pro
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg text-sm font-medium">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-3 py-1.5 rounded-md ${activeTab === "dashboard" ? "bg-white dark:bg-gray-700 shadow dark:text-white" : "text-gray-500"}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`px-3 py-1.5 rounded-md ${activeTab === "products" ? "bg-white dark:bg-gray-700 shadow dark:text-white" : "text-gray-500"}`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`px-3 py-1.5 rounded-md ${activeTab === "categories" ? "bg-white dark:bg-gray-700 shadow dark:text-white" : "text-gray-500"}`}
              >
                Categories
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border dark:border-gray-700"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container Workspace */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <Dashboard products={products} />
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border dark:border-gray-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Live Inventory Check
              </h3>
              <Filters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <ProductList
                products={filteredProducts}
                deleteProduct={deleteProduct}
                increaseStock={(id) => adjustStock(id, 1)}
                decreaseStock={(id) => adjustStock(id, -1)}
                onEditSelect={(p) => {
                  setEditingProduct(p);
                  setActiveTab("products");
                }}
              />
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProductForm
                onSubmit={handleProductSubmit}
                editProduct={editingProduct}
                categories={categories}
                clearEdit={() => setEditingProduct(null)}
              />
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-5 rounded-xl border dark:border-gray-800 shadow-sm">
              <Filters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <ProductList
                products={filteredProducts}
                deleteProduct={deleteProduct}
                increaseStock={(id) => adjustStock(id, 1)}
                decreaseStock={(id) => adjustStock(id, -1)}
                onEditSelect={setEditingProduct}
              />
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="max-w-2xl mx-auto">
            <CategoriesPage
              categories={categories}
              onAdd={addCategory}
              onEdit={editCategory}
              onDelete={deleteCategory}
            />
          </div>
        )}
      </main>
    </div>
  );
}
