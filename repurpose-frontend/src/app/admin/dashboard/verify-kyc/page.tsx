"use client";
import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { apiRequest } from "@/middleware/errorInterceptor";

const VerifyKYC = () => {
  const [kycData, setKycData] = useState<
    {
      _id: string;
      createdAt: string;
      storeName: string;
      storeImage: string;
      ownerName: string;
      email: string;
      storeAddress: string;
      phoneNumber: string;
      storeNumber: string;
      businessRegNumber: string;
      businessRegCertificate: string;
      storeFrontImage: string;
      passportPhoto: string;
    }[]
  >([]);

  const [selectedKYC, setSelectedKYC] = useState<typeof kycData[0] | null>(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [modificationReason, setModificationReason] = useState("");
  const [showModificationInput, setShowModificationInput] = useState(false);

  const [currentImages, setCurrentImages] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);


  const openImageModal = (images: string) => {
    setCurrentImages(images);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // Fetch KYC data on component mount
  useEffect(() => {
    const fetchKYCData = async () => {
      try {
        const response = await apiRequest("/api/store/pending", 'GET');
        console.log("respone her", response)
        setKycData(response.data); // Assuming the response contains the KYC data
      } catch (error) {
        console.error("Error fetching KYC data:", error);
      }
    };

    fetchKYCData();
  }, []);

  const handleViewDetails = (data: typeof kycData[0]) => {
    setSelectedKYC(data);
    setViewModalOpen(true);
    setShowModificationInput(false); // Reset modification state
    setModificationReason(""); // Clear the input field
  };

  const handleApprove = async () => {
    if (selectedKYC) {
      try {
        const response = await apiRequest(`/api/store/${selectedKYC._id}/approve`, {
          method: 'PATCH'
        });
        console.log(`KYC Approved for ID: ${selectedKYC._id}`, response);
        alert("KYC Approved successfully!");
        setKycData((prev) => prev.filter((data) => data._id !== selectedKYC._id));
      } catch (error) {
        console.error("Error approving KYC:", error);
        alert("Failed to approve KYC. Please try again.");
      }
    }
    setViewModalOpen(false);
  };

  const handleReject = async () => {
    if (selectedKYC) {
      try {
        const response = await apiRequest(`/api/store/${selectedKYC._id}/reject`, "DELETE");
        console.log(`KYC Rejected for ID: ${selectedKYC._id}`, response);
        alert("KYC Rejected and deleted successfully!");
        setKycData((prev) => prev.filter((data) => data._id !== selectedKYC._id));
      } catch (error) {
        console.error("Error rejecting KYC:", error);
        alert("Failed to reject KYC. Please try again.");
      }
    }
    setViewModalOpen(false);
  };

  const handleRequestModificationClick = () => {
    setShowModificationInput(true); // Show the input field
  };

  const handleSubmitModificationRequest = async () => {

    if (!modificationReason.trim()) {
      alert("Modification reason is required.");
      return;
    }
    console.log("modification reason", modificationReason)

    if (selectedKYC) {
      try {
        const response = await apiRequest(
          `/api/store/${selectedKYC._id}/pending`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ modificationReason }), // Send as JSON
          }
        );
        console.log("Modification Requested:", response);
        alert("Modification request sent successfully!");
      } catch (error) {
        console.error("Error requesting modification:", error);
        alert("Failed to request modification. Please try again.");
      }
    }

    setModificationReason("");
    setShowModificationInput(false);
    setViewModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Verify KYC
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full bg-white border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-center">S.N</th>
              <th className="px-4 py-2 text-center">Date Created</th>
              <th className="px-4 py-2 text-left">Store Name</th>
              <th className="px-4 py-2 text-left">Owner Name</th>
              <th className="px-4 py-2 text-left">Business Reg. No</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {kycData.map((data, index) => (
              <tr
                key={data._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{new Date(data.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</td>

                <td className="px-4 py-2 flex items-center space-x-3">
                  {data.storeFrontImage ? (
                    <img
                      src={data.storeFrontImage}
                      alt={`${data.storeName} logo`}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-white">
                      {data.storeName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>{data.storeName}</span>
                </td>
                <td className="px-4 py-2">{data.ownerName}</td>
                <td className="px-4 py-2">{data.businessRegNumber}</td>
                <td className="px-4 py-2 text-center flex items-center justify-center">
                  <button
                    onClick={() => handleViewDetails(data)}
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                  >
                    <FaEye className="mr-2" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isViewModalOpen && selectedKYC && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              KYC Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Date Created:</strong> {new Date(selectedKYC.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
              </p>
              <p>
                <strong>Store Name:</strong> {selectedKYC.storeName}
              </p>
              <p>
                <strong>Owner:</strong> {selectedKYC.ownerName}
              </p>
              <p>
                <strong>Email:</strong> {selectedKYC.email}
              </p>
              <p>
                <strong>Address:</strong> {selectedKYC.storeAddress}
              </p>
              <p>
                <strong>Phone:</strong> {selectedKYC.phoneNumber}
              </p>
              <p>
                <strong>Store Number:</strong> {selectedKYC.storeNumber}
              </p>
              <p>
                <strong>Business Reg. No:</strong> {selectedKYC.businessRegNumber}
              </p>
              <div>
                <strong>Business Registration Certificate:</strong>
                <img
                  src={selectedKYC.businessRegCertificate}
                  alt="Business Registration Certificate"
                  className="w-48 h-48 mt-2 rounded shadow"
                  onClick={() => openImageModal(selectedKYC.businessRegCertificate)}
                />
              </div>
              <div>
                <strong>Storefront Image:</strong>
                <img
                  src={selectedKYC.storeFrontImage}
                  alt="Storefront"
                  className="w-48 h-48 mt-2 rounded shadow"
                  onClick={() => openImageModal(selectedKYC.storeFrontImage)}

                />
              </div>
              <div>
                <strong>Passport Size Photo:</strong>
                <img
                  src={selectedKYC.passportPhoto}
                  alt="Passport"
                  className="w-48 h-48 mt-2 rounded shadow"
                  onClick={() => openImageModal(selectedKYC.passportPhoto)}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mt-6 space-y-4 md:space-y-0">
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
              >
                Accept
              </button>

              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              >
                Reject
              </button>

              {showModificationInput ? (
                <div className="w-full">
                  <textarea
                    value={modificationReason}
                    onChange={(e) => setModificationReason(e.target.value)}
                    placeholder="Enter reason for modification..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-300"
                  />
                  <button
                    onClick={handleSubmitModificationRequest}
                    className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                  >
                    Submit Request
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRequestModificationClick}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                >
                  Request Modification
                </button>
              )}
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

      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative rounded shadow-lg p-4 w-3/4 lg:w-2/5">
            <img
              src={currentImages}
              alt="Modal Image"
              className="w-full rounded"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyKYC;
