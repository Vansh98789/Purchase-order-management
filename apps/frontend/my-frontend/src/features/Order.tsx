import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: string;
}

interface Order {
  id: number;
  units: number;
  totalPrice: string;
  fulfilled: boolean;
  createdAt: string;
  product: Product;
}

export default function Order() {

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      "http://localhost:3000/order/all",
      { withCredentials: true }
    );
    setOrders(res.data.orders);
  };

  const fulfillOrder = async (orderId: number) => {

    try {

      await axios.patch(
        `http://localhost:3000/order/fulfill/${orderId}`,
        {},
        { withCredentials: true }
      );

      // remove fulfilled order from UI
      setOrders(prev =>
        prev.filter(order => order.id !== orderId)
      );

    } catch (err) {
      console.error(err);
      alert("Failed to fulfill order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          No pending orders
        </p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {orders.map(order => (

            <div
              key={order.id}
              className="bg-white shadow-lg rounded-lg p-6"
            >

              <h2 className="text-xl font-semibold mb-2">
                {order.product.name}
              </h2>

              <p>Units: {order.units}</p>
              <p>Price: ${order.product.price}</p>

              <p className="font-bold mt-2">
                Total: ${order.totalPrice}
              </p>

              <button
                onClick={() => fulfillOrder(order.id)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Fulfill Order
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
