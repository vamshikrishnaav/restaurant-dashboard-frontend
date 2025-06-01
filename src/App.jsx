import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./components/SideBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Tables from "./components/Tables.jsx";
import Analytics from "./components/Analytics.jsx";
import Menu from "./components/Menu.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // ✅ NEW
import "./App.css";

const Layout = ({ children }) => (
  <div className="app-container">
    <aside className="sidebar">
      <Sidebar />
    </aside>
    <div className="main-layout">
      <header className="header">
        <Header />
      </header>
      <main className="content">{children}</main>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Protected Layout Routes */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <Layout>
                <Tables />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Layout>
                <Menu />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
