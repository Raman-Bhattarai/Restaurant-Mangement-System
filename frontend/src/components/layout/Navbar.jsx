import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import AuthContext from "../../contexts/AuthContext";

function Navbar() {
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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between h-10 items-start py-1">
  
            {/* Logo */}
            <div className="flex-shrink-0 flex items-start">
              <h1 className="text-sm font-medium text-rose-500">🍽️ RestoManage</h1>
            </div>
  
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link to="/" className="text-gray-700 hover:text-rose-600">Home</Link>
              <Link to="/menu" className="text-gray-700 hover:text-rose-600">Menu</Link>
              <Link to="/cart" className="text-gray-700 hover:text-rose-600">Cart</Link>

              <button
                onClick={handleOrdersClick}
                className="text-gray-700 hover:text-rose-600"
              >
                Orders
              </button>
  
              {isAuthenticated ? (
                <>
                  
                  <button
                    onClick={logout}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
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
  
              {/* <button
                onClick={openCart}
                className="bg-rose-600 text-white px-2 py-1 rounded hover:bg-rose-700"
              >
                Cart
              </button> */}
            </div>
  

  
            {/* Mobile Menu & Cart Button */}
            <div className="flex md:hidden space-x-4 items-center">
              
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
          <div className="px-[40%] md:hidden bg-white shadow-md">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart
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
          </div>
        )}
      </nav>
    );
  }
  
export default Navbar;
