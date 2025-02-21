"use client";
import React, { useState, useEffect } from "react";
import { apiRequest } from "@/middleware/errorInterceptor";
import { FaEye } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define the type for KYC data
interface KYC {
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
}

export default function VerifyKYC() {
  // Define state with proper typing
  // const [pendingKYC, setPendingKYC] = useState<KYC[]>([
  //   {
  //     id: 1,
  //     dateCreated: "2025-02-15",
  //     storeName: "Tech Haven",
  //     ownerName: "John Doe",
  //     businessRegNo: "1234567890",
  //     documents: ["/doc1.jpg", "/doc2.jpg"],
  //   },
  // ]);

  const [pendingKYCData, setPendingKYCData] = useState<
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

  // const [verifiedKYC, setVerifiedKYC] = useState<KYC[]>([
  //   {
  //     id: 2,
  //     dateCreated: "2025-02-10",
  //     storeName: "Gadget World",
  //     ownerName: "Jane Smith",
  //     businessRegNo: "9876543210",
  //     documents: ["/doc3.jpg", "/doc4.jpg"],
  //   },
  // ]);

  const [verifiedKYCData, setVerifiedKYCData] = useState<
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


  const [selectedKYC, setSelectedKYC] = useState<typeof pendingKYCData[0] | null>(null);
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

  // Fetch Pending KYC data on component mount
  useEffect(() => {
    const fetchKYCData = async () => {
      try {
        const response = await apiRequest("/api/store/pending", 'GET');
        console.log("respone her pending data ko", response)
        setPendingKYCData(response.data);
      } catch (error) {
        console.log("Error fetching KYC data:", error);
      }
    };

    fetchKYCData();
  }, []);

  // Fetch Verified KYC data on component mount
  useEffect(() => {
    const fetchKYCData = async () => {
      try {
        const response = await apiRequest("/api/store/verified", 'GET');
        console.log("respone her verified data ko", response)
        setVerifiedKYCData(response.data);
      } catch (error) {
        console.log("Error fetching KYC data:", error);
      }
    };

    fetchKYCData();
  }, []);

  // Function to handle verification
  const handleVerify = (kyc: KYC) => {
    setPendingKYCData((prev) => prev.filter((item) => item._id !== kyc._id));
    setVerifiedKYCData((prev) => [...prev, { ...kyc, id: Date.now() }]);
  };

  const handleViewDetails = (data: typeof pendingKYCData[0]) => {
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
        setPendingKYCData((prev) => prev.filter((data) => data._id !== selectedKYC._id));
        setVerifiedKYCData((prev) => [...prev, selectedKYC]);      } catch (error) {
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
        setPendingKYCData((prev) => prev.filter((item) => item._id !== selectedKYC._id));
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
    <>
      <Card className="p-5 shadow-lg">
        <Tabs defaultValue="pending">
          <TabsList className="mb-5">
            <TabsTrigger value="pending">Pending KYC</TabsTrigger>
            <TabsTrigger value="verified">Verified KYC</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="pending">
          <KYCList data={pendingKYCData} showActions={true} onVerify={handleVerify} />
        </TabsContent>
        <TabsContent value="verified">
          <KYCList data={verifiedKYCData} showActions={true} />
        </TabsContent> */}

          <TabsContent value="pending">
            <KYCList
              data={pendingKYCData}
              showActions={true}
              onVerify={handleVerify}
              handleViewDetails={handleViewDetails} // Pass function here
            />
          </TabsContent>

          <TabsContent value="verified">
            <KYCList
              data={verifiedKYCData}
              showActions={true}
              handleViewDetails={handleViewDetails} // Pass function here
            />
          </TabsContent>

        </Tabs>
      </Card>
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
            {verifiedKYCData.some((kyc) => kyc._id === selectedKYC._id) ? (
              <p className="text-green-600 text-center font-semibold mt-4"></p>
            ) : (

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
                      className="w-full px-4 py-2 my-4 rounded-lg focus:ring focus:ring-yellow-300 focus:outline-none"
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
            )}


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
    </>
  );
}

// Define props type for KYCList
interface KYCListProps {
  data: KYC[];
  showActions: boolean;
  onVerify?: (kyc: KYC) => void;
  handleViewDetails?: (kyc: KYC) => void; // Add this
}

function KYCList({ data, showActions, onVerify, handleViewDetails }: KYCListProps) {
  return (
    <Table className="w-full border rounded-lg overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>SN</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead>Store Name</TableHead>
          <TableHead>Owner Name</TableHead>
          <TableHead>Business Reg. No</TableHead>
          {/* <TableHead>Documents</TableHead> */}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((kyc, index) => (
            <TableRow key={kyc._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{kyc.createdAt}</TableCell>
              <TableCell>{kyc.storeName}</TableCell>
              <TableCell>{kyc.ownerName}</TableCell>
              <TableCell>{kyc.businessRegNumber}</TableCell>
              {/* <TableCell>
                <div className="flex gap-2">
                  {kyc.documents.map((doc, idx) => (
                    <Image
                      key={idx}
                      src={doc}
                      alt="Document"
                      width={50}
                      height={50}
                      className="rounded border"
                    />
                  ))}
                </div>
              </TableCell> */}
              {/* {showActions && onVerify && ( */}
              <TableCell>
                <button
                  onClick={() => handleViewDetails && handleViewDetails(kyc)}
                  className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                  <FaEye className="mr-2" /> View
                </button>
              </TableCell>
              {/* )} */}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={showActions ? 7 : 6} className="text-center text-gray-500">
              No records found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
