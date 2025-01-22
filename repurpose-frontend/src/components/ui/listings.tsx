"use client";

import React, { useEffect, useState } from "react";
import Items from './Items'; // Import the Items component

const MyListings = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!sellerId) {
      setError("Seller ID is missing. Please log in again.");
      return;
    }

    const fetchData = async () => {
      setLoading(true); // Set loading to true before making the API request
      setError(null); // Reset error state

      try {
        const response = await apiRequest(`/api/product/seller/${sellerId}`, 'GET');
        if (response.data) {
          setProducts(response.data); // Set products with the fetched data
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchData();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (selectedProduct?.images.length || 1)) % (selectedProduct?.images.length || 1));
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
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length);
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
          <Items
            key={product._id}
            imageUrl={product.images} // Use the images array from the product
            name={product.name}
            description={product.description}
            originalPrice={product.price}
            discount={product.discount}
            partName="Example Part" // Update with actual field if needed
            materialName="Example Material" // Update with actual field if needed
            ecoFriendly="Yes" // Update with actual field if needed
            onClick={() => openModal(product)} // Handle item click to open modal
          />
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <button onClick={closeModal} className="text-red-500 float-right">Close</button>
            <div className="flex justify-center items-center">
              <button onClick={prevImage} className="text-gray-500 hover:text-gray-700">Prev</button>
              <img
                src={selectedProduct.images[currentImageIndex]}
                alt={`Product Image ${currentImageIndex + 1}`}
                className="h-64 w-64 object-cover mx-4"
              />
              <button onClick={nextImage} className="text-gray-500 hover:text-gray-700">Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
