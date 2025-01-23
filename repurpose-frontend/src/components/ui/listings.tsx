"use client";

import React, { useEffect, useState } from "react";
import Items from './Items'; // Import the Items component
import { apiRequest } from '../../middleware/errorInterceptor'; // Assuming apiRequest is your helper function for making requests
import { getUserId } from "@/utils/tokens";
import ProductPage from "@/components/ui/singleProduct"
import Link from "next/link";
import { useUser } from '@/contexts/UserContext';


// Define types for the product and the props of the MyListings component
interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  status: string;
  discount: number;
}

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
          if (response.data) {
            setProducts(response.data); // Set products with the fetched data
          }
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchData();
  }, [sellerId]); // Fetch products whenever the sellerId changes

  // const openModal = (product: Product) => {
  //   setSelectedProduct(product);
  //   setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (selectedProduct?.images.length || 1)) % (selectedProduct?.images.length || 1));
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedProduct(null);
  // };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/${user?.role}/dashboard/product/${product._id}`} key={product._id}>
            <Items
              imageUrl={product?.images} // Use the images array from the product
              name={product.name}
              description={product.description}
              originalPrice={product.price}
              discount={product.discount}
              partName="Example Part" // Update with actual field if needed
              materialName="Example Material" // Update with actual field if needed
              ecoFriendly="Yes" // Update with actual field if needed
              onClick={() => openModal(product)} // Handle item click to open modal
            />
          </Link>
        ))}
      </div>


      {/* {isModalOpen && selectedProduct && ( */}
      {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"> */}
      {/* <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-[80vh]"> */}
      {/* <button onClick={closeModal} className="text-red-500 float-right">Close</button> */}
      {/* Assuming ProductPage is a component that takes productId as a prop */}
      {/* <ProductPage productId={selectedProduct._id} /> */}
      {/* <Link href=""></Link> */}
      {/* </div> */}
      {/* </div> */}
      {/* // )} */}
    </div>
  );
};

export default MyListings;
