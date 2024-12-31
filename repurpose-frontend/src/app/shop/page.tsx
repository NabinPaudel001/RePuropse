"use client";
import React, { useState } from "react";
import Image from "next/image";
import Items from "../../components/ui/Items";

const ShopPage: React.FC = () => {
  const sampleProducts = [
    { id: 1, name: "Product 1", price: 50, category: "Electronics", imageUrl: "/assets/bg.png" },
    { id: 2, name: "Product 2", price: 150, category: "Fashion", imageUrl: "/assets/bg.png" },
    { id: 3, name: "Product 3", price: 300, category: "Home", imageUrl: "/assets/bg.png" },
    { id: 4, name: "Product 4", price: 20, category: "Toys", imageUrl: "/assets/bg.png" },
    { id: 5, name: "Product 5", price: 400, category: "Men", imageUrl: "/assets/bg.png" },
    { id: 6, name: "Product 6", price: 90, category: "Women", imageUrl: "/assets/bg.png" },
    { id: 7, name: "Product 7", price: 200, category: "Toys", imageUrl: "/assets/bg.png" },
    { id: 8, name: "Product 8", price: 250, category: "Fashion", imageUrl: "/assets/bg.png" },
    { id: 9, name: "Product 8", price: 250, category: "Fashion", imageUrl: "/assets/bg.png" },
    { id: 10, name: "Product 8", price: 250, category: "Fashion", imageUrl: "/assets/bg.png" },
    { id: 11, name: "Product 1", price: 50, category: "Electronics", imageUrl: "/assets/bg.png" },
    { id: 12, name: "Product 2", price: 150, category: "Fashion", imageUrl: "/assets/bg.png" },
    { id: 13, name: "Product 3", price: 300, category: "Home", imageUrl: "/assets/bg.png" },
    { id: 14, name: "Product 4", price: 20, category: "Toys", imageUrl: "/assets/bg.png" },
    { id: 15, name: "Product 5", price: 400, category: "Men", imageUrl: "/assets/bg.png" },
    { id: 16, name: "Product 6", price: 90, category: "Women", imageUrl: "/assets/bg.png" },
    { id: 17, name: "Product 7", price: 200, category: "Toys", imageUrl: "/assets/bg.png" },
    { id: 18, name: "Product 8", price: 250, category: "Fashion", imageUrl: "/assets/bg.png" },
    // Add more products as needed...
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const productsPerPage = 16;

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number(e.target.value);
    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = value;
      // Ensure minimum and maximum constraints
      if (newRange[0] > newRange[1]) {
        newRange[index === 0 ? 1 : 0] = newRange[index];
      }
      return newRange as [number, number];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="relative w-full h-[316px]">
        <Image
          src="/assets/shopbg.png"
          alt="Shop Background"
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
          <h1 className="text-4xl font-bold">Shop</h1>
          <nav className="mt-2">
            <ol className="flex space-x-2 text-sm">
              <li>Home</li>
              <li>{">"}</li>
              <li className="font-bold">Shop</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Filter and Page Info */}
        <div className="flex items-center justify-between mb-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </button>
          <span>
            Showing Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <Items
                key={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                description="This is a sample product description."
                originalPrice={product.price}
                discount={0}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              No products found.
            </div>
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Filter Options</h2>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="font-semibold">Category:</label>
              <select
                className="w-full px-4 py-2 bg-gray-200 rounded-md mt-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Toys">Toys</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="mb-4">
              <label className="font-semibold">Price Range:</label>
              <div className="relative mt-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) => handleSliderChange(e, 0)}
                  className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none pointer-events-auto"
                />
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => handleSliderChange(e, 1)}
                  className="absolute w-full h-2 bg-transparent pointer-events-auto"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span>Min: ${priceRange[0]}</span>
                <span>Max: ${priceRange[1]}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => setIsFilterOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
