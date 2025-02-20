"use client";

import React, { useEffect, useState } from "react";
import Items from './Items'; // Import the Items component
import { apiRequest } from '../../middleware/errorInterceptor'; // Assuming apiRequest is your helper function for making requests
import { getUserId } from "@/utils/tokens";
import ProductPage from "@/components/ui/singleProduct"
import Link from "next/link";
import { useUser } from '@/contexts/UserContext';
import { Product } from "@/types/types";


// Define types for the product and the props of the MyListings component


const MyListings: React.FC = () => {
  const { user, setUser } = useUser();
  const sellerId = getUserId(); // Get the sellerId from a utility function (JWT or other storage)

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sellerId) {
      setError("Seller ID is missing. Please log in again.");
      return;
    }

    const fetchData = async () => {
      setLoading(true); // Set loading to true before making the API request
      setError(null); // Reset error state

      console.log("user ko role", user?.role)

      try {
        if (user?.role === "store") {
          const response = await apiRequest('/api/product/', 'GET');
          if (response.data) {
            setProducts(response.data); // Set products with the fetched data
          }
        }
        if (user?.role === "seller") {
          const response = await apiRequest(`/api/product/seller/${sellerId}`, 'GET');
          console.log("response", response)
          if (response.data) {
            setProducts(response.data); // Set products with the fetched data
          }
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchData();
  }, [sellerId]); // Fetch products whenever the sellerId changes

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  console.log("products", products)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/${user?.role}/dashboard/product/${product._id}`} key={product._id}>
            <Items
              _id={product._id}
              imageUrl={product?.images}
              name={product.name}
              description={product.description}
              originalPrice={product.price}
              discount={product.discount}
              partName={product.partName}
              materialName="Example Material"
              ecoFriendly="Yes"
              setProducts={setProducts} // Pass setProducts directly
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
