# StockFlow Pro 📊

StockFlow Pro is a modern, fast, and fully responsive **Inventory Management Dashboard** web application. Designed to simplify retail operations, it features real-time financial tracking metrics, visual low-stock alarms, multi-layer search filters, dynamic category cascading updates, and persistent state storage using browser LocalStorage. The app is built with a utility-first CSS framework and supports a manual light/dark interface theme toggle.

---

## 🌟 Key Features

* **Interactive Multi-Tab Navigation:** Fluid, instant navigation between the Dashboard, Product Records, and Category Management spaces without a single page refresh.
* **Live Business Analytics Summary:** Real-time metrics calculations tracking Total Registered Unique Items, Total Net Inventory Values in LKR, and Low Stock counts.
* **Proactive Low-Stock Safety Net:** Eye-catching flashing warning blocks and list highlights alert operators instantly when items fall to or below critical limits ($\le 5$ units).
* **Dual-Layer Search & Filters:** Run parallel text queries against Product Names or unique SKU identifiers alongside dropdown category selection lists.
* **Data Integrity Validations:** Powered by Formik and Yup schema validation architectures to block floating-point inconsistencies, negative values, or blank submissions.
* **Universal Dark Mode State:** Full script architecture synchronization handling manual layout overrides and color updates dynamically.
* **All-Device Responsive Formats:** Seamless structural breakdown converting rigid desktop tables into native touch-friendly layout cards for mobile screens and small viewports.

---

## 📸 Interface Screen Presentations

### Desktop Light Interface View
![Desktop Dashboard View](https://via.placeholder.com/800x450.png?text=Place+Your+Desktop+Light+Mode+Screenshot+Here)
*Suggested file placement path: `./screenshots/desktop-light.png`*

### Desktop Dark Interface View
![Desktop Dark Mode View](https://via.placeholder.com/800x450.png?text=Place+Your+Desktop+Dark+Mode+Screenshot+Here)
*Suggested file placement path: `./screenshots/desktop-dark.png`*

### Mobile Card View Presentation
<p align="center">
  <img src="https://via.placeholder.com/350x650.png?text=Place+Mobile+Card+View+Screenshot" width="350" alt="Mobile Responsive Card Layout" />
</p>
*Suggested file placement path: `./screenshots/mobile-view.png`*

---

## 📖 How the Application Works (User Guide)

StockFlow Pro operates using a modular React state management pipeline combined with local storage synchronization. Here is a breakdown of how the application processes data and updates the user interface dynamically:

### 1. Unified Application Shell (`App.jsx`)
The main root layout acts as the central control room for your inventory. It maintains the master arrays for `products` and `categories`. 
* Whenever you change tabs using the navigation bar, React simply swaps the active view sub-component instantly without triggering a browser refresh.
* The application runs an effect hook (`useEffect`) upon loading to pull down previous records from the browser. It also directly references your stored UI preference to apply the styling classes seamlessly to the core `<html>` node.

### 2. Live Insights & Low-Stock Rules Engine (`Dashboard.jsx`)
The dashboard aggregates calculations instantly based on the state array numbers:
* **Valuation Calculations:** The system reduces the array using the structural formula: $\text{Total Value} = \sum (\text{Price} \times \text{Stock})$ to output the live monetary worth of your store inventory.
* **Low-Stock Triggers:** An internal filter evaluates your parameters against a threshold rule ($\le 5$ units). If any items match, the dashboard alerts shift into a red flashing notification card matrix to show exactly which items need immediate re-ordering.

### 3. Smart Validations Form (`ProductForm.jsx`)
When adding or editing items, the entry workflow passes through strict data criteria:
* Form fields are governed by validation constraints ensuring names and categories are provided, while ensuring values are non-negative.
* If you do not assign a custom SKU tag, the utility logic automatically constructs a unique standard inventory identifier formatted as `PRD######`.

### 4. Interactive Adjustments & Cascading Updates (`ProductList.jsx` & `CategoriesPage.jsx`)
* **Inline Quick-Adjustments:** The stock column features direct quick-action modification buttons. Clicking `+` or `-` instantly mutates the specific quantity tracker, stores the array back to disk, and triggers a real-time analytics recalculation visible on the metrics dashboard tab.
* **Cascading System Deletions:** If you select a custom category designation text value string on the management screen and update it (e.g., renaming "Groceries" to "Fresh Foods"), the controller captures the text change and executes a cascading sweep across all connected items inside the primary product registry array—seamlessly updating all data dependencies simultaneously.

---

## 🛠️ Tech Stack & Architecture

This application leverages standard modern frontend toolkits:
* **Core View Engine Library:** [React 18+](https://react.dev/)
* **Form State Lifecycle Handlers:** [Formik Engine](https://formik.org/)
* **Schema Validation Engine:** [Yup Object Validator](https://github.com/jquense/yup)
* **Design & Layout Grid Styling:** [Tailwind CSS](https://tailwindcss.com/)

---

## 📂 Project Directory Architecture

```text
├── src/
│   ├── components/
│   │   ├── CategoriesPage.jsx   # Category Creation & Inline Edit View
│   │   ├── Dashboard.jsx        # Business Metrics Grid & Alert Banners
│   │   ├── Filters.jsx          # Search Field & Selection Filter Bar
│   │   ├── ProductForm.jsx      # Formik Form Panel for Add/Modify Items
│   │   └── ProductList.jsx      # Fluid Table (Desktop) & Card View (Mobile)
│   ├── utils/
│   │   └── storage.js           # Browser LocalStorage Helpers & Formatter
│   ├── App.jsx                  # Root Context Hub & State Orchestrator
│   ├── index.css                # Global Tailwind Directives & Root Layout Fixes
│   └── main.jsx                 # Document Object Model (DOM) Mount Entrypoint
├── tailwind.config.js           # Layout Styling Core Config Matrix
└── README.md                    # Project System Manual Document



# App WORK Guide


Step 1: Clone and Prepare your Project Directory

Step 2: Install Code Package Dependencies
npm install

Step 3: Launch the Local Development Web Server
npm run dev

Step 4: Access the Dashboard in your Browser

VITE v5.x.x  ready in 280 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
<img width="1920" height="954" alt="inventory-management-system - Google Chrome 20_06_2026 13_28_18" src="https://github.com/user-attachments/assets/3d88db41-e0ba-4df9-8a48-f68ac2b4a19c" />
<img width="1920" height="944" alt="inventory-management-system - Google Chrome 20_06_2026 13_28_11" src="https://github.com/user-attachments/assets/f8fd8a2a-a472-4165-be36-1cc67928991b" />
<img width="1920" height="938" alt="inventory-management-system - Google Chrome 20_06_2026 13_28_07" src="https://github.com/user-attachments/assets/9a6adee6-514d-454b-ac51-57a19915fe4a" />


