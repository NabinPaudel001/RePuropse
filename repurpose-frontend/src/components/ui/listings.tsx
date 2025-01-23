"use client";
import React, { useEffect, useState } from "react";
import Items from './Items'; // Import the Items component
import ProductPage from '../../app/seller/dashboard/single/page'; // Import the ProductPage component

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  status: string;
  discount: number;
}

interface MyListingsProps {
  name: string;
}

const MyListings: React.FC<MyListingsProps> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{props.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} onClick={() => openModal(product)}>
            <Items
              imageUrl={product.images}
              name={product.name}
              description={product.description}
              originalPrice={product.price}
              discount={product.discount}
              partName="Part Name" // Example placeholder
              materialName="Material Name" // Example placeholder
              ecoFriendly="Yes" // Example placeholder
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-[80vh]">
            <button onClick={closeModal} className="text-red-500 float-right">Close</button>
            <ProductPage productId={selectedProduct.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
