import React from "react";
import { useCart } from "../../contexts/CartContext";
import Button from "../common/Button";

function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-80 h-full p-6 shadow-lg overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 border-t pt-4 font-bold flex justify-between">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={() => {
                alert("Checkout not implemented yet!");
              }}
            >
              Checkout
            </Button>

            <Button
              variant="secondary"
              className="w-full mt-2"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;
