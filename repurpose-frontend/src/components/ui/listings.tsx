"use client";
import React, { useEffect, useState } from "react";

/**
 * A React functional component that represents the "My Listings" section of the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the product listings in a table format.
 */
const MyListings = () => {
  // State to hold product data
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simulate fetching data from a backend
  useEffect(() => {
    // Mock data for demonstration purposes
    const fetchData = async () => {
      const mockData = [
        { id: 1, name: "Product 1", description: "Description 1", price: "$10", images: ["/path/to/image1.jpg", "/path/to/image2.jpg"], status: "Sold" },
        { id: 2, name: "Product 2", description: "Description 2", price: "$20", images: ["/path/to/image3.jpg"], status: "Pending" },
        // Add more products with multiple images as needed
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
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">S.N</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-16 w-16 object-cover cursor-pointer"
                  onClick={() => openModal(product)}
                />
              </td>
              <td className="py-2 px-4 border-b">{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
