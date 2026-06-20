export const getProducts = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};

export const saveProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const getCategories = () => {
  return (
    JSON.parse(localStorage.getItem("categories")) || [
      "Electronics",
      "Clothing",
      "Groceries",
    ]
  );
};

export const saveCategories = (categories) => {
  localStorage.setItem("categories", JSON.stringify(categories));
};

export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};

export const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

export const currency = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
});
