import React, { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../api/api";
import OrderDetails from "../components/orders/OrderDetails";
import OrderStatus from "../components/orders/OrderStatus";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data); // <--- axios response
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update order status (and optionally payment_status)
  const handleStatusChange = async (orderId, newStatus, newPaymentStatus) => {
    try {
      const data = { status: newStatus };
      if (newPaymentStatus) data.payment_status = newPaymentStatus;

      await updateOrder(orderId, data); // general update API

      // Update state locally
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus, payment_status: newPaymentStatus || order.payment_status }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-20">No orders found.</p>;

  return (
    <div className="p-6 pt-16 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-4"
        >
          <OrderDetails order={order} />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <OrderStatus
              status={order.status}
              onChange={(newStatus) =>
                handleStatusChange(order.id, newStatus)
              }
            />
            <p className="font-semibold text-gray-700">
              Total: Nrs.{order.total_price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
