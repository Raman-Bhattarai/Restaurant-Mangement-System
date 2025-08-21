import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import AuthContext from "../../contexts/AuthContext";

function Navbar({ openCart }) {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Orders click
  const handleOrdersClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-rose-600">🍽️ RestoManage</h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-rose-600">Dashboard</Link>
            <Link to="/menu" className="text-gray-700 hover:text-rose-600">Menu</Link>

            {isAuthenticated ? (
              <>
                <button
                  onClick={handleOrdersClick}
                  className="text-gray-700 hover:text-rose-600"
                >
                  Orders
                </button>
                <button
                  onClick={logout}
                  className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-rose-600">Login</Link>
                <Link to="/register" className="text-gray-700 hover:text-rose-600">Register</Link>
              </>
            )}

            <button
              onClick={openCart}
              className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
            >
              Cart
            </button>
          </div>

          {/* Mobile Menu & Cart Button */}
          <div className="flex md:hidden space-x-4 items-center">
            <button onClick={openCart} className="bg-rose-600 text-white p-2 rounded hover:bg-rose-700">
              Cart
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-rose-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/menu"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Menu
          </Link>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOrdersClick({ preventDefault: () => {} });
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Orders
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-2 text-white bg-rose-600 hover:bg-rose-700"
          >
            Cart
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
