import React from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { placeOrder } from "../api/api";

function CartPage() {
  const { cartItems, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { user } = useAuth();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
      };

      await placeOrder(orderData); // backend adds customer
      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("Error placing order:", err.response?.data || err.message);

      // Show first error in response
      const firstError = err.response?.data
        ? Object.entries(err.response.data)[0]
        : null;

      alert(
        "Failed to place order: " +
          (firstError ? `${firstError[0]}: ${firstError[1][0]}` : err.message)
      );
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-center mt-16 text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="px-[10%] pt-16 mt-16">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-2">
            <span className="flex-1">{item.name}</span>

            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              className="w-16 border rounded p-1 mx-2 text-center"
            />

            <span className="text-rose-600 font-bold">
              Nrs.{item.price * item.quantity}
            </span>

            <button
              className="text-red-500 ml-4 hover:underline"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold text-lg text-right">Total: Nrs.{totalPrice}</p>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 transition"
      >
        Place Order
      </button>
    </div>
  );
}

export default CartPage;
