"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faDribbble,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import { useUser } from "@/contexts/UserContext";
import { apiRequest } from '@/middleware/errorInterceptor';
import { headers } from 'next/headers';

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);

  const [profilePicture] = useState("/profile-picture.jpg");
  const [status, setStatus] = useState("unverified");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState(user?.about || "");
  const [facebook, setFacebook] = useState(user?.socialMediaHandles?.facebook || "");
  const [instagram, setInstagram] = useState(user?.socialMediaHandles?.instagram || "");
  const [tiktok, setTiktok] = useState(user?.socialMediaHandles?.tiktok || "");
  const [twitter, setTwitter] = useState(user?.socialMediaHandles?.twitter || "");
  const [legalDocument, setLegalDocument] = useState<File | null>(null);

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);
  const toggleKYCModal = () => setIsKYCModalOpen((prev) => !prev);

  console.log("User:", user);

  const handleProfilePictureChange = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePicture", file);
    try {
      const response = await apiRequest("/api/user/profile-picture", {
        method: 'PATCH',
        body: formData,
      });
      if (response.success) {
        setUser(response.data);
      } else {
        console.log("Failed to upload profile picture");
      }
    } catch (error) {
      console.log("Error uploading profile picture:", error);
    }
  };

  // const handleKYCSubmit = () => {
  //   // console.log("KYC Submitted:", { phoneNumber, fullName, address, legalDocument });
  //   toggleKYCModal();
  // };

  const handleEditProfile = async () => {
    const data = {
      firstName,
      lastName,
      about,
      phoneNumber,
      address,
      facebook,
      instagram,
      tiktok,
      twitter,
    };

    console.log("Updating Profile:", data);
    try {
      const response = await apiRequest("/api/user/edit", {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Response:", response);
      if (response.success) {
        console.log("Profile Updated:", response.data);
        setUser(response.data);
        console.log("User:", user);
      } else {
        console.log("Failed to update profile");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    }
    toggleEditModal();
  };

  const handlePhoneChange = (phone: string) => setPhoneNumber(phone);

  // Manually set the role to 'seller' for styling purposes
  const userWithRole = { ...user, role: 'seller' };
  const isSeller = userWithRole?.role === 'seller';
  const textColor = isSeller ? 'text-blue-600' : 'text-[hsl(var(--foreground))]';
  const iconColor = isSeller ? 'text-blue-800' : 'text-[hsl(var(--primary))]';

  return (
    <div className="flex justify-center items-center min-h-screen w-full h-full">
      <div className="max-w-4xl w-full p-6">
        {/* Header Section */}
        <div className="bg-[hsl(var(--card))] shadow-md rounded-lg overflow-hidden">
          <div className="relative flex justify-center">
            <div className="relative w-32 h-32 rounded-full">
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
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 text-5xl font-bold cursor-pointer">
                    {user?.firstName?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
              <div
                className="absolute bottom-1 right-2 p-2 bg-gray-500 rounded-md z-10 w-8 h-8 flex items-center justify-center cursor-pointer"
                onClick={() => document.getElementById("profilePictureInput")?.click()}
              >
                <FontAwesomeIcon icon={faCamera} className="text-white text-sm" />
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  className="hidden"
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

          {/* Profile Info */}
          <div className="text-center p-4 mt-6">
            {user?.role === "store" && (
              <p
                className={`text-sm font-bold ${status === "verified"
                  ? "text-green-500"
                  : status === "unverified"
                    ? "text-red-500"
                    : "text-yellow-500"
                  }`}
              >
                Status: {status.charAt(0).toUpperCase() + status.slice(1)}
              </p>
            )}
            <h2 className={`text-2xl font-bold ${textColor}`}>
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-[hsl(var(--muted-foreground))]">{user?.role}</p>
            <div className="flex justify-center space-x-8 mt-4">
              <div>
                <p className={`font-bold ${textColor}`}>259</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Posts</p>
              </div>
              <div>
                <p className={`font-bold ${textColor}`}>129</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Sold</p>
              </div>
              <div>
                <p className={`font-bold ${textColor}`}>0</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Donations</p>
              </div>
              <div>
                <p className={`font-bold ${textColor}`}>{user?.totalRewardPoints || 0}</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Reward Points</p>
              </div>

            </div>
            <div className="mt-4">
              <button
                className={`px-4 py-2 ${iconColor} ${textColor} rounded-lg shadow hover:bg-gray-200 hover:text-gray-800 mr-2`}
                onClick={toggleEditModal}
              >
                Edit Profile
              </button>
              {user?.role === "store" && status !== "verified" && (
                <button
                  className={`px-4 py-2 ${iconColor} ${textColor} rounded-lg shadow hover:bg-gray-200 hover:text-gray-800`}
                  onClick={toggleKYCModal}
                >
                  {status === "unverified" ? "Fill KYC" : "Edit KYC"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 bg-[hsl(var(--card))] shadow-md rounded-lg p-6">
          <h3 className={`text-lg font-bold ${textColor} mb-2`}>About Me</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">{about}</p>
        </div>

        {/* Contact Information */}
        <div className="mt-6 bg-[hsl(var(--card))] shadow-md rounded-lg p-6">
          <h3 className={`text-lg font-bold ${textColor} mb-2`}>Contact Information</h3>

          <p className="text-[hsl(var(--muted-foreground))] text-sm">Phone: {user?.phoneNumber}</p>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">Email: {user?.email}</p>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">Location: {user?.address}</p>
        </div>

        {/* Social Links */}
        <div className="mt-6 bg-[hsl(var(--card))] shadow-md rounded-lg p-6">
          <h3 className={`text-lg font-bold ${textColor} mb-4`}>Follow me on</h3>
          <div className="flex space-x-4 justify-center">
            <a
              href={user?.socialMediaHandles?.facebook || "#"}
              title="Facebook"
              target={user?.socialMediaHandles?.facebook ? "_blank" : ""}
              rel='noreferrer'
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
            </a>
            <a
              href={user?.socialMediaHandles?.instagram || "#"}
              target={user?.socialMediaHandles?.instagram ? "_blank" : ""}
              rel='noreferrer'
              title="Instagram"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              <FontAwesomeIcon icon={faDribbble} className="text-2xl" />
            </a>
            <a
              href={user?.socialMediaHandles?.tiktok || "#"}
              title="Tiktok"
              target={user?.socialMediaHandles?.tiktok ? "_blank" : ""}
              rel='noreferrer'
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            </a>
            <a
              href={user?.socialMediaHandles?.twitter || "#"}
              target={user?.socialMediaHandles?.twitter ? "_blank" : ""}
              rel='noreferrer'
              title="Twitter"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Profile Picture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src={user?.profilePicture || profilePicture}
              alt="Profile"
              width={300}
              height={300}
              className="rounded-full"
            />
            <button
              onClick={toggleModal}
              className={`mt-4 px-4 py-2 ${iconColor} text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Editing Profile */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
            <div className="mb-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-2">First Name</label>
                  <input
                    placeholder='First Name'
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-2">Last Name</label>
                  <input
                    placeholder='Last Name'
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">About Me</label>
              <textarea
                placeholder='About Me'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
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
              <label className="block text-sm font-bold mb-2">Address</label>
              <input
                placeholder='Address'
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Social Links</label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="Facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />

                <input
                  type="url"
                  placeholder="Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />

                <input
                  type="url"
                  value={tiktok}
                  placeholder="Tiktok"
                  onChange={(e) => setTiktok(e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="Twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleEditProfile}
                className={`px-4 py-2 ${iconColor} text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]`}
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

      {/* Modal for KYC Information
      {isKYCModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-lg font-bold mb-4">KYC Information</h3>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <PhoneInput
                country={'np'}
                value={phoneNumber}
                onChange={handlePhoneChange}
                inputClass="w-full px-3 py-2 border rounded-lg text-[hsl(var(--foreground))]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Address</label>
              <input
                type="text"
                placeholder="Kathmandu, Nepal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Legal Document</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setLegalDocument(e.target.files[0]);
                  }
                }}
                className="w-full p-2 border rounded"
                title="Upload Legal Document"
                placeholder="Upload Legal Document"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleKYCSubmit}
                className={`px-4 py-2 ${iconColor} text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]`}
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
      )} */}
    </div>
  );
};

export default ProfilePage;
