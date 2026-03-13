import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string; 
  stock: number;
  createdAt: string;
  vendorId: number;
}

export default function MyProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getProduct/all-vendor-product",{
            withCredentials: true 
        });
        setProducts(res.data.products);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  const goToDescription = (productId: number) => {
    navigate(`/product/${productId}`); 
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                 
                  <p className="text-gray-800 font-bold mb-2">Price: ${product.price}</p>
                  <button
                    onClick={() => goToDescription(product.id)}
                    className="px-5 py-2.5 text-sm font-semibold rounded-lg
                   bg-gradient-to-r from-indigo-500 to-purple-600
                   text-white shadow-md
                   hover:shadow-xl hover:scale-105
                   transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}