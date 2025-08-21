import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-rose-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to RestoManage 🍽️</h1>
          <p className="text-lg md:text-xl mb-8">
            Experience the best dining experience from the comfort of your home. Browse our menu and place your order in just a few clicks.
          </p>
          <Link
            to="/menu"
            className="bg-white text-rose-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition"
          >
            View Menu
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About Our Restaurant</h2>
          <p className="text-gray-700 mb-4">
            RestoManage offers a variety of delicious meals, fresh ingredients, and a seamless ordering experience. Whether you are at home or on-the-go, enjoy your favorite dishes with just a few clicks.
          </p>
          <p className="text-gray-700">
            Our mission is to provide high-quality food and exceptional service to every customer. Join us today and explore our menu for a culinary delight.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
            alt="Delicious food"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gray-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
        <p className="text-gray-700 mb-6">
          Browse our menu and place your order online. Fast, convenient, and delicious!
        </p>
        <Link
          to="/menu"
          className="bg-rose-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-rose-700 transition"
        >
          Explore Menu
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
