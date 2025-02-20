"use client";
import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { apiRequest } from "@/middleware/errorInterceptor";
import { Store } from "@/types/types";
import { useUser } from "@/contexts/UserContext";


interface ProductRequestsProps {
    productId: string;
    soldTo: Store | null;
    setSoldTo: React.Dispatch<React.SetStateAction<Store | null>>;
    rewardPoints: number;
    setRewardPoints: React.Dispatch<React.SetStateAction<number>>; // Include setRewardPoints in the props
}

const ProductRequests: React.FC<ProductRequestsProps> = ({ productId, soldTo, setSoldTo, setRewardPoints, rewardPoints }) => {
    const [storeRequest, setStoreRequest] = useState<
        {
            _id: string;
            createdAt: string;
            proposedPrice: number;
            store: {
                _id: string;
                storeName: string;
                ownerName: string;
                email: string;
                storeAddress: string;
                phoneNumber: string;
                storeNumber: string;
                storeFrontImage: string;
            }
        }[]
    >([]);

    const [selectedRequest, setSelectedRequest] = useState<typeof storeRequest[0] | null>(null);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useUser();
    // const [soldTo, setSoldTo] = useState<string | null>(null);


    console.log("productId", productId);

    // Fetch KYC data on component mount
    useEffect(() => {
        const fetchKYCData = async () => {
            try {
                const response = await apiRequest(`/api/product/${productId}/requests`, 'GET');
                console.log("respone her requests ko", response)
                setStoreRequest(response.data); // Assuming the response contains the KYC data
            } catch (error) {
                console.log("Error fetching KYC data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchKYCData();
    }, []);

    const handleViewDetails = (data: typeof storeRequest[0]) => {
        setSelectedRequest(data);
        setViewModalOpen(true);
    };

    const handleApprove = async (requestId: any) => {
        try {
            const response = await apiRequest(`/api/product/${productId}/accept/${requestId}`, {
                method: 'POST'
            });
            console.log("response herrum ta", response);
            setSoldTo(response.data.store);
            setRewardPoints(response.data.points.productRewardPoints)
            if (user) {
                setUser({
                    ...user,
                    totalRewardPoints: response.data.points.sellerTotalRewardPoints,
                });
            }
            setStoreRequest(storeRequest.filter(req => req._id !== requestId));
            setStoreRequest([]); // Clear pending requests
        } catch (error) {
            console.error("Error approving request", error);
            alert("Failed to approve request.");
        }
    };

    return (
        <div className="pt-6 w-full">
            {loading ? (
                <p>Loading...</p>
            ) : soldTo ? (  // Show Sold status if the product is sold
                <div>
                    <p className="text-center font-bold text-green-600">Sold to {soldTo.storeName}</p>
                    <p className="text-center font-bold text-green-600">Earned Reward Points: {rewardPoints}</p>
                </div>
            ) : storeRequest.length === 0 ? (
                <div>
                    <h1 className="text-3xl font-bold mb-8 text-gray-800"> Store Requests</h1>
                    <p className="text-center">No request for buy yet.</p>
                </div>
            ) : (
                <div>

                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="table-auto w-full bg-white border border-gray-200">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-center">S.N</th>
                                    <th className="px-4 py-2 text-left">Store</th>
                                    <th className="px-4 py-2 text-left">Proposed Price</th>
                                    <th className="px-4 py-2 text-center">Date</th>
                                    <th className="px-4 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {storeRequest.map((data, index) => (
                                    <tr
                                        key={data._id}
                                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                        onClick={() => handleViewDetails(data)}
                                    >
                                        <td className="px-4 py-2 text-center">{index + 1}</td>

                                        <td className="px-4 py-2">
                                            <div className="flex items-center space-x-2">
                                                {data.store.storeFrontImage ? (
                                                    <img
                                                        src={data.store.storeFrontImage}
                                                        alt={`${data.store.storeName} logo`}
                                                        className="w-14 h-14 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-white">
                                                        {data.store.storeName.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <p>{data.store.storeName}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">Rs. {data.proposedPrice}</td>
                                        <td className="px-4 py-2 text-center">{new Date(data.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                                        <td className="px-4 py-2 text-center flex items-center justify-center space-x-4">
                                            {/* <button
                                        onClick={() => handleViewDetails(data)}
                                        className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                                    >
                                        <FaEye className="mr-2" /> View
                                    </button> */}
                                            <button
                                                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                                            >
                                                Chat
                                            </button>
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation(); // Stops the row click event
                                                    handleApprove(data._id);
                                                }} className="flex items-center justify-center z-10 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                                            >
                                                Sell
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                </div>
            )}

            {isViewModalOpen && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                            Store Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <p>
                                {/* <strong>Date Created:</strong> {new Date(storeRequest.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })} */}
                            </p>
                            <p>
                                <strong>Store Name:</strong> {selectedRequest.store.storeName}
                            </p>
                            <p>
                                <strong>Owner:</strong> {selectedRequest.store.ownerName}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedRequest.store.email}
                            </p>
                            <p>
                                <strong>Address:</strong> {selectedRequest.store.storeAddress}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selectedRequest.store.phoneNumber}
                            </p>
                            <p>
                                <strong>Store Number:</strong> {selectedRequest.store.storeNumber}
                            </p>


                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setViewModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductRequests



