import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProductSchema = Yup.object({
  name: Yup.string().required("Required field"),
  sku: Yup.string(),
  category: Yup.string().required("Required field"),
  price: Yup.number().min(0, "Must be >= 0").required("Required field"),
  stock: Yup.number()
    .integer("Must be integer")
    .min(0, "Must be >= 0")
    .required("Required field"),
});

function genSKU() {
  return `PRD${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function ProductForm({
  onSubmit,
  editProduct,
  categories,
  clearEdit,
}) {
  const initial = {
    id: editProduct?.id || null,
    name: editProduct?.name || "",
    sku: editProduct?.sku || "",
    category: editProduct?.category || "",
    price: editProduct?.price ?? "",
    stock: editProduct?.stock ?? "",
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/60 p-5 rounded-xl border dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg dark:text-white">
          {editProduct ? "✏️ Edit Existing Product" : "📦 Add New Product"}
        </h3>
        {editProduct && (
          <button
            onClick={clearEdit}
            type="button"
            className="text-xs text-red-500 underline"
          >
            Cancel Modification
          </button>
        )}
      </div>

      <Formik
        enableReinitialize
        initialValues={initial}
        validationSchema={ProductSchema}
        onSubmit={(values, { resetForm }) => {
          const payload = {
            ...values,
            id: values.id || crypto.randomUUID(),
            sku: values.sku || genSKU(),
            price: Number(values.price),
            stock: Number(values.stock),
            createdAt: editProduct?.createdAt || new Date().toISOString(),
          };
          onSubmit(payload);
          resetForm();
          if (clearEdit) clearEdit();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-3">
            <div>
              <Field
                name="name"
                placeholder="Product Name"
                className="w-full border p-2 rounded-lg bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <Field
                  name="sku"
                  placeholder="Custom SKU (Optional)"
                  className="w-full border p-2 rounded-lg bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                />
              </div>
              <div>
                <select
                  name="category"
                  value={values.category}
                  onChange={(e) => setFieldValue("category", e.target.value)}
                  className="w-full border p-2 rounded-lg bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                >
                  <option value="">Select Category Name</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <Field
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Price (LKR)"
                  className="w-full border p-2 rounded-lg bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="w-1/2">
                <Field
                  name="stock"
                  type="number"
                  placeholder="Initial Inventory"
                  className="w-full border p-2 rounded-lg bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-2.5 rounded-lg transition shadow-sm"
            >
              {editProduct ? "Update Product Record" : "Save Item to Inventory"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
