import React, { useEffect, useState } from "react";
import { getOrders, cancelOrder } from "../api/api";
import api from "../api/api";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      fetchOrders(); // refresh list
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <p className="text-center mt-20">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-20">No orders found.</p>;

  return (
    <div className="p-6 pt-16 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-200"
        >
          <div className="mb-2 flex flex-col gap-1">
            <p className="text-gray-700">
              <strong>Order ID:</strong> {order.id}
            </p>
            <p className="text-gray-700">
              <strong>Customer:</strong> {order.customer_name}
            </p>
            <p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
              {" "}
              <span className="ml-2 text-sm text-gray-600">
                Payment: {order.payment_status}
              </span>
            </p>
          </div>

          {/* Order Items */}
          <div className="border-t border-b py-3">
            {order.items.length === 0 ? (
              <p className="text-gray-500 italic">No items in this order.</p>
            ) : (
              order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-1 text-gray-700"
                >
                  <span>{item.product_name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>Nrs.{item.get_total_price}</span>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
            {/* Cancel Button */}
            {order.status !== "Cancelled" && order.status !== "Completed" && (
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
              >
                Cancel Order
              </button>
            )}

            <p className="font-semibold text-gray-700 text-lg">
              Total: Nrs.{order.total_price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
