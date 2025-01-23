"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: 'Product 1', originalPrice: 100, discount: 10, imageUrl: ['/images/product1.jpg'], description: 'This is a great product.', seller: 'Seller A', partName: 'Part A', materialName: 'Cotton', ecoFriendly: 'Yes', inStock: true },
  { id: 2, name: 'Product 2', originalPrice: 200, discount: 20, imageUrl: ['/images/product2.jpg'], description: 'This is another great product.', seller: 'Seller B', partName: 'Part B', materialName: 'Wool', ecoFriendly: 'No', inStock: false },
  // Add more products as needed
];

interface ProductPageProps {
  productId?: number; // Make productId optional
}

export default function ProductPage({ productId }: ProductPageProps) {
  // Find the product by ID or use the first product as a default
  const product = products.find(p => p.id === productId) || products[0];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const discountedPrice = product.discount ? product.originalPrice * (1 - product.discount / 100) : product.originalPrice;
  const rewardPoints = (discountedPrice * 0.10).toFixed(2);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrl.length);
  };

  return (
    <div className="flex justify-center">
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-20">
          {/* Left Side */}
          <div className="flex flex-col mt-5 items-center lg:w-1/2">
            <div className="w-full h-96 bg-gray-400 relative cursor-pointer" onClick={handleNextImage}>
              <Image
                src={product.imageUrl[currentImageIndex]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
              <div className={`absolute top-2 right-2 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center ${product.discount ? 'bg-red-500' : 'bg-green-500'}`}>
                {product.discount ? `-${product.discount}%` : 'NEW'}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button className="px-4 py-2 bg-green-500 text-white">S</Button>
              <Button className="px-4 py-2 bg-transparent text-black border">M</Button>
              <Button className="px-4 py-2 bg-transparent text-black border">XL</Button>
              <Button className="px-4 py-2 bg-transparent text-black border">L</Button>
            </div>
            <div className="mt-7 w-full">
              <Button variant="outline" className="w-full px-4 py-2 bg-green-500 text-white">Add to Cart</Button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col lg:w-full">
            <div className="px-1 p-4 flex-grow flex flex-col justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
                <h4 className="text-xl lg:text-2xl mb-4 font-bold">{product.seller}</h4>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">{`Part: ${product.partName}`}</p>
                  <p className="text-sm text-gray-600">{`Material: ${product.materialName}`}</p>
                  <p className="text-sm text-gray-600">{`Eco-Friendly: ${product.ecoFriendly}`}</p>
                  <p className="text-base font-bold my-2">RP: {rewardPoints}</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start space-y-2 lg:space-y-0 lg:space-x-4 mb-4">
                  <p className="text-2xl lg:text-3xl font-semibold text-green-500">${discountedPrice.toFixed(2)}</p>
                  <span className="text-lg text-gray-700">({product.inStock ? 'In Stock' : 'Out of Stock'})</span>
                </div>
                <div className="mb-4">
                  <p className="text-lg lg:text-xl">Reviews: ★★★★☆</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-3">Gender Style:</p>
                  <Button className={`px-4 mr-5 py-2 ${'female' === 'female' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}`} variant="outline">
                    Male
                  </Button>
                  <Button variant="outline">
                    Female
                  </Button>
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="mb-2 text-lg">Enter your pincode</div>
                <div className="flex w-full items-center space-x-2">
                  <input type="text" placeholder="eg:44600" className="w-full lg:w-80 h-12 border rounded-lg p-2" />
                  <Button type="submit" className="w-full lg:w-32 h-12">Submit</Button>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Product Details</h2>
              <p className="text-lg lg:text-xl lg:w-full">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 p-4 border rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-1">Product Review</h2>
          <div className="flex flex-col space-y-2 w-full">
            <textarea
              placeholder="Write your review..."
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              rows={4}
            ></textarea>
            <div className="flex space-x-3">
              <Button variant="outline" className="bg-green-500 text-white">Post</Button>
              <Button variant="outline">Reset</Button>
            </div>
          </div>
          <div className="mt-4 p-4 border-t">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Username</span>
            </div>
            <p className="text-lg font-medium mt-2">Sample Review:</p>
            <p className="text-gray-700">This code snippet is well-structured and easy to read. The use of Tailwind CSS classes makes the styling concise and maintainable. Great job!</p>
            <div className="flex space-x-4 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
