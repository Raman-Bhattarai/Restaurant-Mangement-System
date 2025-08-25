import React, { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../api/api";

function StaffOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Only allow forward status changes
  const statusFlow = {
    PENDING: ["PREPARING"],
    PREPARING: ["COMPLETED"],
    COMPLETED: [],
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        // Filter orders: only PENDING or PREPARING
        const staffOrders = res.data.filter(
          (o) => o.status === "PENDING" || o.status === "PREPARING"
        );
        setOrders(staffOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status.");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-black">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-20 text-black">No pending orders.</p>;

  return (
    <div className="p-6 mt-16 pt-16">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">
        Staff Order Management
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-xl shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left text-black">Order ID</th>
              <th className="p-3 text-left text-black">Customer</th>
              <th className="p-3 text-left text-black">Total</th>
              <th className="p-3 text-left text-black">Status</th>
              <th className="p-3 text-left text-black">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100">
                <td className="p-3 text-black">{order.id}</td>
                <td className="p-3 text-black">{order.customer?.username}</td>
                <td className="p-3 text-black">
                  Nrs.{Number(order.total_price).toFixed(2)}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      order.status === "COMPLETED"
                        ? "bg-green-600"
                        : order.status === "PENDING"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  {statusFlow[order.status].length > 0 ? (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      {statusFlow[order.status].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-gray-500">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffOrdersPage;
