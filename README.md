# Vortex Finance Dashboard

A premium, interactive finance dashboard built with React.js and Vanilla CSS. This project demonstrates modern UI/UX principles, glassmorphism design, role-based access control (RBAC), and real-time data visualization.

## 🚀 Features

- **Dashboard Overview**: Dynamic summary cards for Total Balance, Income, and Expenses.
- **Data Visualization**: 
  - **Balance Trend**: Interactive Area chart showing the last 7 days of activity.
  - **Spending Breakdown**: Categorical donut chart for expense analysis.
- **Transaction Management**:
  - Full CRUD functionality (Add, Edit, Delete) for Admin users.
  - Advanced filtering (Category, Type).
  - Sorting (Date, Amount).
  - Real-time search.
- **Role-Based UI**:
  - **Admin Mode**: Full control over transactions.
  - **Viewer Mode**: Read-only access to data and charts.
- **Premium Aesthetics**:
  - Glassmorphism design system.
  - Smooth animations with Framer Motion.
  - Responsive layout for mobile and desktop.
  - Data persistence via LocalStorage.
- **Export Functionality**: Export transaction data to JSON/CSV.

## 🛠️ Tech Stack

- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS (Custom Design System)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd zorvyn-assessment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🧠 Design Philosophy

The project focuses on a **"Glassmorphism"** aesthetic, using semi-transparent backgrounds and back-drop blurs to create depth and a modern "Apple-like" feel. 

- **Color Palette**: Dark-mode primary with Indigo (#6366f1) and Emerald (#10b981) accents.
- **Typography**: Uses 'Outfit' for headings (premium feel) and 'Inter' for body text (readability).
- **Interactivity**: Every card and button features hover states and micro-animations to feel "alive".

## 🛡️ Role-Based Access Control

A simulated RBAC system is implemented in the sidebar. Switching to **Viewer** mode will hide all destructive or creative actions (Add/Edit/Delete), demonstrating how the UI adapts to different user permissions.

---
*Created for the Zorvyn Assessment Task.*
