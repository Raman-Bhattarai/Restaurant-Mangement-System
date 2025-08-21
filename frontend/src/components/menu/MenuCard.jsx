import React from "react";

function MenuCard({ item }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition p-4 flex flex-col">
      <img
        src={item.image || "https://via.placeholder.com/150"}
        alt={item.name}
        className="h-40 w-full object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      <p className="text-gray-500 text-sm mb-2">{item.description}</p>
      <p className="text-rose-600 font-bold text-lg">${item.price}</p>
      <button
        onClick={item.addToCart}
        className="mt-auto bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default MenuCard;
