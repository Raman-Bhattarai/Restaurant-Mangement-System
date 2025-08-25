import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CartSidebar from "../components/layout/CartSidebar";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Orders from "../pages/Orders";
import Report from "../pages/Report";
import Customer from "../pages/Customer";
import Staff from "../pages/Staff";
import Cart from "../pages/Cart";
import StaffOrdersPage from "../pages/StaffOrderPage";

function AppRoutes() {
  // State to manage cart sidebar visibility
  const [cartOpen, setCartOpen] = useState(false);
  // State to manage the current location for conditional rendering
  const location = useLocation();

  // paths where navbar should not be shown
  const noNavbarPaths = ["/login", "/register"];
  // Determine if the navbar should be hidden based on the current path
  // This can be extended to include more paths as needed
  const hideNavbar = noNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar openCart={() => setCartOpen(true)} />}
      {!hideNavbar && <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <Staff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/orders"
          element={
            <ProtectedRoute>
              <StaffOrdersPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<p className="text-center mt-20">Page Not Found</p>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
