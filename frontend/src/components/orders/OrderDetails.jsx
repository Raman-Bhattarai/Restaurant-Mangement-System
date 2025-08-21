import React from "react";

function OrderDetails({ order }) {
  const totalPrice = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg mx-auto mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order #{order.id}</h2>
      
      {/* Customer Info */}
      <div className="mb-4">
        <p><span className="font-semibold">Customer:</span> {order.customerName}</p>
        <p><span className="font-semibold">Phone:</span> {order.customerPhone}</p>
        <p><span className="font-semibold">Address:</span> {order.customerAddress}</p>
      </div>

      {/* Items */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Items:</h3>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between border-b pb-1">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default OrderDetails;
