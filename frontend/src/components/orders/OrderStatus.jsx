import React from "react";

function OrderStatus({ status, onChange }) {
  const statuses = ["Pending", "Preparing", "Delivered", "Cancelled"];

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm mx-auto">
      <h3 className="text-lg font-semibold mb-2">Order Status</h3>
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OrderStatus;
