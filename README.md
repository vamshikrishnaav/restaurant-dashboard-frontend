# 🍕 Pizza Order & Management System (React.js)

A responsive web application for pizza restaurant management. It includes user authentication, an interactive menu for placing orders, real-time table management, and visual analytics to track revenue and orders.

---

## 📌 Features

- ✅ **User Authentication**
  - Login and Registration pages using `localStorage` for session simulation
  - Protected routes to prevent unauthorized access

- 🍕 **Interactive Menu**
  - Browse pizzas with images and prices
  - Add/remove items and track quantities (cart state)

- 📊 **Dashboard Analytics**
  - Order summary (Served, Dine In, Take Away) with donut chart and progress bars
  - Revenue line + bar chart by day (or period filter)

- 🪑 **Table Management**
  - Visual table grid with status indicators (reserved / available)
  - Dynamic table creation and deletion with chair count

- 🧭 **Navigation & UI**
  - Sidebar navigation with icons
  - Top bar with search filter and logout functionality

---





## ## 📁 Project Structure

src/
│
├── assets/ # Images/icons like pizza, chair, delete
├── components/ # Reusable components
│ ├── Header.jsx
│ ├── SideBar.jsx
│ ├── ProtectedRoute.jsx
│
├── pages/ # Main pages
│ ├── LoginPage.jsx
│ ├── RegistrationPage.jsx
│ ├── Menu.jsx
│ ├── Tables.jsx
│ ├── TableGrid.jsx
│ ├── RevenueChart.jsx
│ └── OrderSummaryCard.jsx
│
├── App.js
└── index.js
## 🧩 Component Summary

| Component              | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `LoginPage.jsx`        | Login form with phone and password; saves user in `localStorage`.        |
| `RegistrationPage.jsx` | Registration form for new users; navigates to login on success.          |
| `ProtectedRoute.jsx`   | Wrapper for private routes; redirects to login if user is not logged in. |
| `Header.jsx`           | Top bar with search input, dropdown filter, and logout button.           |
| `SideBar.jsx`          | Sidebar navigation with icons for Dashboard, Tables, Menu, Analytics.    |
| `Menu.jsx`             | Pizza menu display with quantity control for each item.                  |
| `OrderSummaryCard.jsx` | Shows a donut chart and progress bars for order types by time period.    |
| `RevenueChart.jsx`     | Line and bar chart visualization of revenue data.                        |
| `Tables.jsx`           | Allows table creation, deletion, and shows chair count per table.        |
| `TableGrid.jsx`        | Visual grid of 30 tables with reserved/available status.                 |


## 🔧 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vamshikrishnaav/restaurant-dashboard-frontend
   cd restaurant-dashboard-frontend
  

## Dependencies
npm install

npm run dev

Visit http://localhost:5173/ (if using Vite) or check your terminal for the local server URL.

## 🚀 Tech Stack

- **Frontend**: React.js, JSX, CSS
- **Routing**: `react-router-dom`
- **Charts**: `echarts-for-react`
- **Icons**: `react-icons`, `lucide-react`
- **State Management**: `useState`, `localStorage`


## Demo credentials.
login ID
phone:3334343434
password:password

