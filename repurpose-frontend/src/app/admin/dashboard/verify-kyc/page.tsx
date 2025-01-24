"use client";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const VerifyKYC = () => {
  const [kycData] = useState([
    {
      id: 1,
      dateCreated: "2025-01-20",
      storeName: "ABC Store",
      storeImage: "https://via.placeholder.com/50",
      ownerName: "John Doe",
      email: "john.doe@example.com",
      storeAddress: "123 Main Street, Cityville",
      phoneNumber: "+9779812345678",
      storeNumber: "ST12345",
      businessRegNumber: "BRN987654321",
      businessRegCert: "https://via.placeholder.com/100",
      storefrontImage: "https://via.placeholder.com/100",
      passportPhoto: "https://via.placeholder.com/100",
    },
  ]);

  const [selectedKYC, setSelectedKYC] = useState<typeof kycData[0] | null>(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [modificationReason, setModificationReason] = useState("");
  const [showModificationInput, setShowModificationInput] = useState(false);

  const handleViewDetails = (data: typeof kycData[0]) => {
    setSelectedKYC(data);
    setViewModalOpen(true);
    setShowModificationInput(false); // Reset modification state
    setModificationReason(""); // Clear the input field
  };

  const handleApprove = () => {
    if (selectedKYC) {
      console.log(`KYC Approved for ID: ${selectedKYC.id}`);
    }
    setViewModalOpen(false);
  };
    const handleReject = () => {
      if (selectedKYC) {
        console.log(`KYC Rejected for ID: ${selectedKYC.id}`);
      }
      setViewModalOpen(false);
    };

  const handleRequestModificationClick = () => {
    setShowModificationInput(true); // Show the input field
  };

  const handleSubmitModificationRequest = () => {
    if (!modificationReason.trim()) {
      return;
    }
    if (selectedKYC) {
      console.log("Modification Requested:", {
        id: selectedKYC.id,
        reason: modificationReason,
      });
    }
    setModificationReason("");
    setShowModificationInput(false); // Hide the input field
    setViewModalOpen(false); // Close the modal
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
                key={data.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{data.dateCreated}</td>
                <td className="px-4 py-2 flex items-center space-x-3">
                  <img
                    src={data.storeImage}
                    alt={`${data.storeName} logo`}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{data.storeName}</span>
                </td>
                <td className="px-4 py-2">{data.ownerName}</td>
                <td className="px-4 py-2">{data.businessRegNumber}</td>
                <td className="px-4 py-2 text-center">
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
                <strong>Date Created:</strong> {selectedKYC.dateCreated}
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
                  src={selectedKYC.businessRegCert}
                  alt="Business Registration Certificate"
                  className="w-32 h-32 mt-2 rounded shadow"
                />
              </div>
              <div>
                <strong>Storefront Image:</strong>
                <img
                  src={selectedKYC.storefrontImage}
                  alt="Storefront"
                  className="w-32 h-32 mt-2 rounded shadow"
                />
              </div>
              <div>
                <strong>Passport Size Photo:</strong>
                <img
                  src={selectedKYC.passportPhoto}
                  alt="Passport"
                  className="w-32 h-32 mt-2 rounded shadow"
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
    </div>
  );
};

export default VerifyKYC;
