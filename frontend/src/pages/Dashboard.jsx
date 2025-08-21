import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api";
import api from "../api/api";

function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getOrders();
        const customersData = await api.get("users/customers/");
        const staffData = await api.get("users/staff/");

        setOrders(ordersData);
        setCustomers(customersData.data);
        setStaff(staffData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;

  return (
    <div className="p-6 mt-16 pt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">{orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold mt-2">${totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Customers</h2>
          <p className="text-2xl font-bold mt-2">{customers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Staff</h2>
          <p className="text-2xl font-bold mt-2">{staff.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer.username}</td>
                  <td className="p-3">${order.total.toFixed(2)}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
