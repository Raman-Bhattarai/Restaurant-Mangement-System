import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api/api";
import OrderDetails from "../components/orders/OrderDetails";
import OrderStatus from "../components/orders/OrderStatus";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-20">No orders found.</p>;

  return (
    <div className="p-6 space-y-6  pt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Orders
      </h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-4"
        >
          <OrderDetails order={order} />
          <OrderStatus
            status={order.status}
            onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
          />
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
