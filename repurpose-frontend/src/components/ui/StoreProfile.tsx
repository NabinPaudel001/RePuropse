"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faDribbble, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import { useUser } from "@/contexts/UserContext";
import { apiRequest } from '@/middleware/errorInterceptor';
import Icons from '../shared/icons';

const StoreProfilePage = () => {
  const { user, setUser } = useUser();
  const [serverError, setServerError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
  const [storeName, setStoreName] = useState(user?.storeName || "");
  const [status, setStatus] = useState(""); // Status can be 'verified', 'unverified', or 'pending'
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [ownerName, setOwnerName] = useState(user?.firstName || "");
  const [storeId, setStoreId] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [storeNumber, setStoreNumber] = useState("");
  const [businessRegNumber, setBusinessRegNumber] = useState("");
  const [storeAddress, setStoreAddress] = useState(user?.address || "");
  const [businessRegCertificate, setBusinessRegCert] = useState<File | null>(null);
  const [storeFrontImage, setStoreFrontImage] = useState<File | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);

  console.log("user", user);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleKYCModal = () => {
    setIsKYCModalOpen(!isKYCModalOpen);
  };

  const handleProfilePictureChange = async (file: File) => {
    if (!file) return;

    console.log("file ta xa", file);
    const formData = new FormData();
    formData.append("profilePicture", file);

    console.log("formDAta", formData);

    try {
      const response = await apiRequest("/api/user/profile-picture", {
        method: 'PATCH',
        body: formData
      });

      console.log("response", response);

      if (response.success) {
        console.log("profile picture changed");
        setUser(response.data);
      } else {
        console.log("Failed to upload profile picture");
        setServerError("An unexpected error occurred.");
      }
    } catch (error) {
      console.log("Error uploading profile picture:", error);
    }
  };

  useEffect(() => {
    const fetchKYCData = async () => {
      try {
        const response = await apiRequest("/api/store/my-kyc", {
          method: "GET",
        });

        if (response.success) {
          const {
            _id,
            storeName,
            ownerName,
            email,
            storeNumber,
            phoneNumber,
            businessRegNumber,
            storeAddress,
            status,
          } = response.data;

          setStoreName(storeName || "");
          setOwnerName(ownerName || "");
          setEmail(email || "");
          setStoreNumber(storeNumber || "");
          setPhoneNumber(phoneNumber || "");
          setBusinessRegNumber(businessRegNumber || "");
          setStoreAddress(storeAddress || "");
          setStatus(status || "");
          setStoreId(_id || "");

          console.log("REsp", response);
        } else {
          console.log("Failed to fetch KYC data:", response.message);
        }
      } catch (error) {
        console.log("Error fetching KYC data:", error);
      }
    };

    if (user?.storeStatus && !status) {
      fetchKYCData();
    }
  }, [user?.storeStatus, status]);

  console.log("storeid", storeId);

  const handleKYCSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("storeName", storeName);
      formData.append("ownerName", ownerName);
      formData.append("email", email);
      formData.append("storeNumber", storeNumber);
      formData.append("phoneNumber", phoneNumber);
      formData.append("businessRegNumber", businessRegNumber);
      formData.append("storeAddress", storeAddress);
      if (businessRegCertificate) formData.append("businessRegCertificate", businessRegCertificate);
      if (storeFrontImage) formData.append("storeFrontImage", storeFrontImage);
      if (passportPhoto) formData.append("passportPhoto", passportPhoto);

      let response;
      if (status) {
        response = await apiRequest(`/api/store/${storeId}`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        response = await apiRequest("/api/store/KYC", {
          method: "POST",
          body: formData,
        });
      }

      if (response.success) {
        console.log("KYC submission successful:", response.data);
        setStatus("pending");
        toggleKYCModal();
      } else {
        console.log("KYC submission failed:", response.message);
      }
    } catch (error) {
      console.log("Error submitting KYC data:", error);
    }
  };

  const handlePhoneChange = (phone: string) => {
    setPhoneNumber(phone);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-4xl w-full p-6">
        {/* Header Section */}
        <div className="bg-[hsl(var(--card))] shadow-md rounded-lg overflow-hidden">
          <div className="relative flex justify-center">
            <div className='relative w-32 h-32 rounded-full'>
              <div className="relative w-32 h-32 rounded-full border-4 border-[hsl(var(--card))] overflow-hidden">
                {user?.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                    onClick={toggleModal}
                    className="cursor-pointer"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-full h-full bg-gray-300 text-5xl font-bold cursor-pointer"
                  >
                    {user?.firstName?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
              <div
                className="absolute bottom-1 z-10 right-2 p-2 bg-gray-500 rounded-md w-8 h-8 flex items-center cursor-pointer"
                onClick={() => document.getElementById("profilePictureInput")?.click()}>
                <FontAwesomeIcon icon={faCamera} className="text-white text-sm" />
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  className='hidden'
                  title="Upload Profile Picture"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleProfilePictureChange(file);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="text-center p-4 mt-6">
            {/* Status Section */}
            <div className="mt-4 text-center">
              {status && (
                <p className={`text-sm font-bold ${status === "approved" ? "text-green-500" : status === "pending" ? "text-yellow-500" : "text-yellow-500"}`}>
                  Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                </p>
              )}
            </div>
            <div className="flex gap-2 items-center justify-center w-full">
              <p className="text-2xl text-center font-bold text-[hsl(var(--foreground))]">{storeName}</p>

              {status === 'approved' ? (
                <Icons type="verified"></Icons>
              ) : (
                <span> </span>
              )}
            </div>
            <p className="text-[hsl(var(--muted-foreground))]">{user?.role}</p>

            <div className="flex justify-center space-x-8 ">
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">259</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Products</p>
              </div>
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">2</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Sold</p>
              </div>
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">0</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Donations</p>
              </div>
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">200</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Followers</p>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] mr-2"
                onClick={toggleEditModal}
              >
                Edit Store
              </button>
              {status !== "approved" && (
                <button
                  className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
                  onClick={toggleKYCModal}
                >
                  {status === "pending" ? "Edit KYC" : "Fill KYC"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 bg-[hsl(var(--card))] shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">About Us</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            Welcome to our store! We offer a wide range of products to meet your needs. Our commitment is to provide quality products and excellent customer service.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-6 bg-[hsl(var(--card))] shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">Contact Information</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            Email: {email}
          </p>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            Phone: {phoneNumber}
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-6 bg-[hsl(var(--card))] shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Follow us on</h3>
          <div className="flex space-x-4 justify-center">
            <a href="#" title="Facebook" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
            </a>
            <a href="#" title="Twitter" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
            </a>
            <a href="#" title="Dribbble" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faDribbble} className="text-2xl" />
            </a>
            <a href="#" title="GitHub" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal for Editing Store */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-lg font-bold mb-4">Edit Store</h3>
            <div className="mb-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-2">Store Name</label>
                  <input
                    placeholder='Store Name'
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-2">Owner's Name</label>
                  <input
                    placeholder="Owner's Name"
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">About Us</label>
              <textarea
                placeholder='About Us'
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Phone Number</label>
              <PhoneInput
                country={'np'}
                value={phoneNumber}
                onChange={handlePhoneChange}
                inputClass="w-full px-3 py-2 border rounded-lg text-[hsl(var(--foreground))]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Store Address</label>
              <input
                placeholder='Store Address'
                type="text"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Social Links</label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="Facebook"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />

                <input
                  type="url"
                  placeholder="Instagram"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />

                <input
                  type="url"
                  placeholder="Twitter"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="Dribbble"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={toggleEditModal}
                className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
              >
                Save
              </button>
              <button
                onClick={toggleEditModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div> 
        </div>
      )}

      {/* Modal for KYC Information */}
      {isKYCModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">KYC Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Store Name</label>
                <input
                  type="text"
                  placeholder='Store Name'
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Owner's Name</label>
                <input
                  type="text"
                  placeholder="Owner's Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder='Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Store Address</label>
                <input
                  type="text"
                  placeholder='Store Address'
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Store Number</label>
                <input
                  type="text"
                  placeholder='Store Number'
                  value={storeNumber}
                  onChange={(e) => setStoreNumber(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex-1 mb-4">
                <PhoneInput
                  country={'np'} // Set default country code to Nepal
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  inputClass="w-full px-3 py-2 border rounded-lg text-[hsl(var(--foreground))]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Business Registration Number (PAN/VAT)</label>
                <input
                  type="text"
                  placeholder='Business Registration Number'
                  value={businessRegNumber}
                  onChange={(e) => setBusinessRegNumber(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Business Registration Certificate</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setBusinessRegCert(e.target.files[0]);
                    }
                  }}
                  className="w-full p-2 border rounded"
                  title="Upload Business Registration Certificate"
                  placeholder="Upload Business Registration Certificate"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Storefront Image</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setStoreFrontImage(e.target.files[0]);
                    }
                  }}
                  className="w-full p-2 border rounded"
                  title="Upload Storefront Image"
                  placeholder="Upload Storefront Image"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Passport Size Photo</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPassportPhoto(e.target.files[0]);
                    }
                  }}
                  className="w-full p-2 border rounded"
                  title="Upload Passport Size Photo"
                  placeholder="Upload Passport Size Photo"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleKYCSubmit}
                className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
              >
                Submit
              </button>
              <button
                onClick={toggleKYCModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreProfilePage;
