"use client";
import React, { useEffect, useState } from "react";
import Items from './Items'; // Import the Items component

const MyListings = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const mockData = [
        { id: 1, name: "Product 1", description: "Description 1", price: 10, images: ["/path/to/image1.jpg", "/path/to/image2.jpg"], status: "Sold", discount: 10 },
        { id: 2, name: "Product 2", description: "Description 2", price: 20, images: ["/path/to/image3.jpg"], status: "Pending", discount: 5 },
        // Add more products as needed
      ];
      setProducts(mockData);
    };

    fetchData();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{props.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Items
            key={product.id}
            imageUrl={product.images[0]}
            name={product.name}
            originalPrice={product.price}
            discount={product.discount}
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
