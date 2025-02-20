"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/middleware/errorInterceptor";
import { useUser } from '@/contexts/UserContext';
import ProductRequests from "./ProductRequests";
import ChatButton from "../chat/ChatButton";
import { Store } from "@/types/types";

interface ProductPageProps {
  params: { id: string };
}

interface Seller {
  _id: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  seller: Seller;
  partName: string;
  materialName: string;
  ecoFriendly: string;
  inStock: boolean;
  rewardPoints: number;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { user } = useUser();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [hasRequested, setHasRequested] = useState<boolean>(false);
  const [proposedPrice, setProposedPrice] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [soldTo, setSoldTo] = useState<Store | null>(null);
  const [rewardPoints, setRewardPoints] = useState<number>(0);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log("product id", params)
  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await apiRequest(`/api/product/${id}`, "GET");
        setProduct(response.data); // Assuming API response structure matches Product
        setProposedPrice(response.data.price);
        setSoldTo(response.data?.soldTo || null);
        console.log("response: ", response.data)
      } catch (error) {
        console.log("Failed to fetch product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Check if the store has already requested this product
  useEffect(() => {
    if (!id || !user?.id) return;

    const checkExistingRequest = async () => {
      try {
        const response = await apiRequest(`/api/product/purchase-requests/${id}/${user.id}`, "GET");
        if (response.data.length > 0) {
          setHasRequested(true);
        }
      } catch (error) {
        console.log("Error checking existing request:", error);
      }
    };

    checkExistingRequest();
  }, [id, user]);

  if (!product) {
    return <div>Loading product data...</div>;
  }

  console.log("sold to ko data", soldTo);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const response = await apiRequest(`/api/product/${id}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proposedPrice }),
      });

      if (response.success) {
        alert('Request sent!');
        setHasRequested(true);

      } else {
        alert('Error sending request');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  };

  const openModal = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <div className="flex justify-center md:w-3/4 w-[70%]">
      <div className="container mx-auto p-4">
        <div className="flex flex-col w-full lg:flex-row space-y-4 lg:space-y-0 lg:space-x-20">
          {/* Left Side */}
          <div className="flex flex-col mt-5 items-center lg:w-1/2">
            <div className="w-full h-96 relative cursor-pointer">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-full rounded-lg"
                onClick={() => openModal(0)}
              />
              {/* <div className={`absolute top-2 right-2 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center ${product.discount ? 'bg-red-500' : 'bg-green-500'}`}>
                {product.discount ? `-${product.discount}%` : 'NEW'}
              </div> */}
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-gray-300 p-6 rounded-lg shadow-lg max-w-4xl w-full">
                  <button
                    onClick={closeModal}
                    className="text-red-500 float-right"
                  >
                    Close
                  </button>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      onClick={prevImage}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Prev
                    </button>
                    <img
                      src={product.images[currentImageIndex]}
                      alt={`Product Image ${currentImageIndex + 1}`}
                      className="h-[500px] w-[500px] object-contain mx-4"
                    />
                    <button
                      onClick={nextImage}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}


            <div className="flex mt-2 gap-4">
              <Button
                onClick={prevImage}
                variant="outline"
                className="px-4 py-2"
              >
                Previous
              </Button>
              <Button
                onClick={nextImage}
                variant="outline"
                className="px-4 py-2"
              >
                Next
              </Button>
            </div>
            {user?.role === 'store' && (
              <>
                {soldTo ? (
                  soldTo.userID === user.id ? (
                    <Button className="w-full px-4 py-2 mt-4 bg-green-500 text-white cursor-default">
                      Bought
                    </Button>
                  ) : (
                    <Button className="w-full px-4 py-2 mt-4 bg-gray-400 text-white cursor-not-allowed" disabled>
                      NOT AVAILABLE
                    </Button>
                  )
                ) : (
                  <Button
                    variant="outline"
                    className={`w-full px-4 py-2 mt-4 ${hasRequested ? 'bg-gray-600' : 'bg-green-500'} text-white`}
                    onClick={() => setShowModal(true)}
                    disabled={hasRequested}
                  >
                    {hasRequested ? "Requested" : "Request for Buy"}
                  </Button>
                )}

                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                      <h2 className="text-lg font-semibold mb-4">Confirm Purchase</h2>
                      <p className="text-gray-600 mb-2">Listed Price: Rs. {product.price}</p>
                      <input
                        type="number"
                        value={proposedPrice}
                        onChange={(e) => setProposedPrice(Number(e.target.value))}
                        className="border p-2 w-full mb-4"
                      />
                      <div className="flex justify-end gap-2">
                        <Button onClick={handleRequest} disabled={loading} className="bg-green-500 text-white">
                          {loading ? 'Requesting...' : 'Confirm Request'}
                        </Button>
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

              </>
            )}

          </div>

          {/* Right Side */}
          <div className="flex flex-col lg:w-full">
            <div className="px-1 p-4 flex-grow flex flex-col justify-between">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-2 text-gray-800">{product.name}</h1>
                {/* <h4 className="text-xl lg:text-2xl mb-4 font-bold">{product.seller}</h4> */}
                <div className="mb-4">
                  <p className="text-lg text-gray-600">{`Part: ${product.partName}`}</p>
                  <p className="text-lg text-gray-600">{`Material: ${product.materialName}`}</p>
                  <p className="text-lg text-gray-600">{`Eco-Friendly: ${product.ecoFriendly}`}</p>
                  <p className="text-lg font-bold my-2">Rs: {product.price}</p>
                </div>
                {/* <div className="flex flex-col lg:flex-row items-start space-y-2 lg:space-y-0 lg:space-x-4 mb-4">
                  <p className="text-2xl lg:text-3xl font-semibold text-green-500">${discountedPrice.toFixed(2)}</p>
                  <span className="text-lg text-gray-700">({product.inStock ? 'In Stock' : 'Out of Stock'})</span>
                </div> */}
                {/* <div className="mb-4">
                  <p className="text-lg lg:text-xl">Reviews: ★★★★☆</p>
                </div> */}
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
              {user?.role === "store" && product.seller && (
                <div>
                  <div className="mb-2 mt-4 text-lg">Contact With Seller:</div>

                  <div className="mt-2 p-4 rounded-lg bg-blue-100 shadow-md">
                    <div className="flex items-center space-x-4">
                      {/* Profile Picture */}
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 font-bold text-2xl">
                        {product.seller.profilePicture ? (
                          <Image
                            src={product.seller.profilePicture}
                            alt={`${product.seller.firstName}'s profile picture`}
                            className="rounded-full"
                            width={64}
                            height={64}
                          />
                        ) : (
                          product.seller.firstName?.charAt(0).toUpperCase()
                        )}
                      </div>

                      {/* Seller Details */}
                      <div className="flex-grow">
                        <p className="text-lg font-semibold">{`${product.seller.firstName} ${product.seller.lastName}`}</p>
                        <p className="text-sm text-gray-600">{product.seller.email}</p>
                      </div>

                      {/* Chat Button */}
                      <div className="ml-auto">
                        <ChatButton userId={product.seller._id} />
                        {/* <Button type="submit" className="lg:w-32 h-12">
                          Chat
                        </Button> */}
                      </div>
                    </div>
                  </div>

                </div>

              )}

            </div>
          </div>

        </div>
        <div className="w-full mt-10">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-800">Product Description</h2>
          <p className="text-lg lg:text-xl lg:w-full">{product.description}</p>
        </div>
        {/* <div className="flex flex-col space-y-4 p-4 border rounded-lg shadow-md mt-8">
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
        </div> */}
        {user?.role === 'seller' && (
          <ProductRequests
            productId={id}
            soldTo={soldTo}
            setSoldTo={setSoldTo}
            setRewardPoints={setRewardPoints}
            rewardPoints={rewardPoints}
          />
        )}

      </div>
    </div>
  );
}
