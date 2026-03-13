import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function CreateOrder() {

  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [units, setUnits] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        "http://localhost:3000/getProduct/all-vendor-product",
        { withCredentials: true }
      );

      setProducts(res.data.products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const calculated = price * units + (0.05 * price * units);
    setTotal(calculated);
  }, [price, units]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setProductId(id);

    const selected = products.find((p) => p.id === id);
    if (selected) {
      setPrice(Number(selected.price));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3000/order/create",
        {
          productId,
          units
        },
        { withCredentials: true }
      );

      alert(res.data.msg);

    } catch (err: any) {
      alert(err.response?.data?.msg || "Order failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Order
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            className="w-full border p-3 rounded-lg"
            onChange={handleProductChange}
            required
          >
            <option value="">Select Product</option>

            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (${p.price})
              </option>
            ))}

          </select>

          <input
            type="number"
            placeholder="Units"
            value={units}
            min={1}
            onChange={(e) => setUnits(Number(e.target.value))}
            className="w-full border p-3 rounded-lg"
          />

          <div className="bg-gray-100 p-4 rounded-lg">

            <p>Price per unit: ${price}</p>
            <p>Units: {units}</p>

            <p className="font-bold text-lg mt-2">
              Estimated Total: ${total.toFixed(2)}
            </p>

          </div>

          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-semibold rounded-lg
                   bg-gradient-to-r from-indigo-500 to-purple-600
                   text-white shadow-md   w-[24rem]
                   hover:shadow-xl hover:scale-105
                   transition-all duration-300"
          >
            Place Order
          </button>

        </form>

      </div>

    </div>
  );
}
