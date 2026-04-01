# Zorvyan Finance Dashboard 🪙

A premium, state-of-the-art financial management dashboard for **Zorvyan Financial**. Built with React.js and a custom Vanilla CSS design system, this project focuses on high-performance data visualization, advanced transaction management, and a seamless mobile-first experience.

## 🌟 Key Features

- **Rebranded Experience**: Fully customized for **Zorvyan** with premium typography (Outfit/Inter) and a custom logo system.
- **Rupee-First (₹)**: Native support for Indian Rupee currency with standard `en-IN` number formatting.
- **Mobile-Optimized Layout**:
  - **2x2 Grid**: Summary cards automatically align into a clean 2x2 grid on mobile devices.
  - **Fixed Mobile Header**: A professional, glassmorphic top-bar for easy navigation and brand visibility.
  - **Zero-Overlap Design**: Categorical legends and trend indicators are optimized to prevent text collision on small screens.
- **Personal Profile Flow**: Integrated **Edit/Save** functionality in Account Settings with a stateful profile management interface.
- **Smart Insights**: Automated analysis of spending trends (e.g., Highest Spending Category, Comparison with previous month).
- **Transaction Engine**:
  - Full CRUD lifecycle (Add, Edit, Delete) with interactive Modals.
  - Advanced search, filtering by category/type, and multi-metric sorting.
  - Export functionality (CSV/JSON).
- **Production Stability**: Hardened state initialization with `localStorage` error-handling to prevent runtime crashes (White/Black Screen of Death).

## 🛠️ Tech Stack

- **Framework**: `React.js` (Vite)
- **Styling**: `Vanilla CSS` (Custom Design System)
- **Icons**: `Lucide React`
- **Charts**: `Recharts`
- **Animations**: `Framer Motion`
- **Date Utilities**: `date-fns`

## 📦 Getting Started

1. **Clone & Enter**:
   ```bash
   git clone https://github.com/Rachit246-art/Zorvyn_Assessment.git
   cd Zorvyn_Assessment
   ```

2. **Setup Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Dev Environment**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

## 🧠 Design Philosophy

The project utilizes a **Glassmorphism** design language, emphasizing depth, frosted-glass effects, and vibrant accent colors (`#6366f1` Indigo, `#10b981` Emerald). Every interactive element is refined with micro-animations and hover states using a "Responsive-First" approach to ensure premium aesthetics on any device.

## 🛡️ Role-Based Access Control (RBAC)

The sidebar includes a simulated RBAC toggle. Switching to **Viewer** mode restricts all write operations (Add/Edit/Delete), demonstrating a production-grade approach to permission-based UI rendering.

---
*Developed for the Zorvyan Assessment Task - 2026*
