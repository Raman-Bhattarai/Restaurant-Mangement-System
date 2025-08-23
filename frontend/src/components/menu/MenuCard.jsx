import React from "react";

function MenuCard({ item }) {
  return (
    <div className="rounded-xl overflow-hidden hover:shadow-xl transition p-2 flex items-center justify-between shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 flex-1">{item.name}</h3>
      <p className="text-rose-600 font-bold text-lg mx-8">Nrs.{item.price}</p>
      <button
        onClick={item.addToCart}
        className="bg-rose-600 mt-auto text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default MenuCard;

  
