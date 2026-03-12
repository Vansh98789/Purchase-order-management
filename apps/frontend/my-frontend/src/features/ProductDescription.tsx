import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar3";
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

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/getProduct/product/${id}`);
        setProduct(res.data.product);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error || !product) return <p className="text-center mt-10 text-red-500">{error || "Product not found"}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline"
        >
          &larr; Back
        </button>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description || "No description available."}</p>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-800 font-semibold text-lg">Price: ${product.price}</p>
            <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
          </div>
          <p className="text-gray-400 text-sm">Vendor ID: {product.vendorId}</p>
          
        </div>
      </div>
    </>
  );
}