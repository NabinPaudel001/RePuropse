"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Items from "@/components/ui/Items";
import TitleSection from "@/components/ui/TitleSection";

const Product = () => {
  const [visibleRows, setVisibleRows] = useState(1); // State to control visible rows
  const [showMore, setShowMore] = useState(true); // State to toggle show more/less

  // Constants for related products
  const relatedProducts = [
    {
      imageUrl: "/images/OIP.jpeg",
      name: "Syltherine",
      description: "Stylish cafe chair",
      originalPrice: 3500000,
      discount: 30,
    },
    {
      imageUrl: "/images/OIP.jpeg",
      name: "Leviosa",
      description: "Stylish cafe chair",
      originalPrice: 2500000,
      discount: 0,
    },
  ];

  // Constants for data
  const mainImage = "/images/OIP.jpeg";
  const thumbnails = [
    "/images/OIP.jpeg",
    "/images/OIP.jpeg",
    "/images/OIP.jpeg",
  ];
  const sizes = ["L", "XL", "XS"];
  const genders = ["Male", "Female", "Unisex"];
  const productDetails = {
    name: "Asgaard Sofa",
    price: "Rs. 250,000.00",
    sku: "SS001",
    category: "Sofas",
    tags: ["Sofa", "Chair", "Home", "Shop"],
    description:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    reviews: 5,
    rating: 4,
  };

  // Show "Show More" or "Show Less" items
  const handleToggleShow = () => {
    if (showMore) {
      setVisibleRows(visibleRows + 1); // Increase the number of visible rows
    } else {
      setVisibleRows(1); // Reset to initial visible rows
    }
    setShowMore(!showMore); // Toggle show more/less
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 ">
        {/* Navbar Component */}

        {/* Main Product Section */}
        <div className="w-full max-w-8xl rounded-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Image Section */}
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4 mr-4">
                {thumbnails.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 bg-gray-100 rounded-md object-cover flex-shrink-0 cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>

              <div className="rounded-md overflow-hidden flex-grow mt-4 sm:mt-0">
                <img
                  src={mainImage}
                  alt={productDetails.name}
                  className="w-full h-3/4 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right Details Section */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {productDetails.name}
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-gray-600 mt-2">
                {productDetails.price}
              </p>

              <div className="mt-4 flex items-center">
                <div className="flex space-x-1">
                  {[...Array(productDetails.rating)].map((_, index) => (
                    <span key={index} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - productDetails.rating)].map((_, index) => (
                    <span key={index} className="text-gray-300 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">
                  ({productDetails.reviews} Customer Reviews)
                </p>
              </div>

              <p className="mt-4 text-gray-600">{productDetails.description}</p>

              <div className="mt-6">
                <p className="font-medium">Size</p>
                <div className="flex space-x-4 mt-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="font-medium">Gender</p>
                <div className="flex space-x-4 mt-2">
                  {genders.map((gender) => (
                    <button
                      key={gender}
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <Button>Add to Cart</Button>
              </div>

              <div className="mt-8 text-gray-600">
                <p>
                  <strong>SKU:</strong> {productDetails.sku}
                </p>
                <p>
                  <strong>Category:</strong> {productDetails.category}
                </p>
                <p>
                  <strong>Tags:</strong> {productDetails.tags.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="bg-gray-50 flex min-h-screen">
          <div>
            <TitleSection title="Related Products" subtitle={undefined} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
              {relatedProducts
                .slice(0, visibleRows * 5)
                .map((product, index) => (
                  <div key={index} className="relative">
                    <Items
                      imageUrl={product.imageUrl}
                      name={product.name}
                      description={product.description}
                      originalPrice={product.originalPrice}
                      discount={
                        product.discount === 0 ? undefined : product.discount
                      } // Use undefined if discount is 0
                    />
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button onClick={handleToggleShow}>
                {showMore ? "Show More" : "Show Less"}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Component */}
      </div>
      <Footer />
    </div>
  );
};

export default Product;