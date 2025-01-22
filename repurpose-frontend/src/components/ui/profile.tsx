"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faDribbble, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-4xl w-full p-6">
        {/* Header Section */}
        <div className="bg-[hsl(var(--card))] shadow-md rounded-lg overflow-hidden">
          <div className="relative flex justify-center">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 rounded-full border-4 border-[hsl(var(--card))] overflow-hidden mt-8">
              <Image
                src="/profile-picture.jpg" // Placeholder path, replace with actual image path
                alt="Profile"
                layout="fill"
                objectFit="cover"
                onClick={toggleModal}
                className="cursor-pointer"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center cursor-pointer">
                <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
              </div>
            </div>

          </div>

          {/* Profile Info */}
          <div className="text-center mt-16 p-4">
            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Nabin Paudel</h2>
            <p className="text-[hsl(var(--muted-foreground))]">Cloth Seller</p>

            <div className="flex justify-center space-x-8 ">
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">{userData?.postsCount || 259}</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Posts</p>
              </div>
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">{userData?.soldCount || 129}</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Sold</p>
              </div>
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">200</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Follow</p>
              </div>
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">1500</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Donations</p>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] mr-2"
                onClick={toggleEditModal}
              >
                Edit Profile
              </button>
              {status !== "verified" && (
                <button
                  className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
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
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">About Me</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            {userData?.about || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.'}
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-6 bg-[hsl(var(--card))] shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">Contact Information</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            Email: {userData?.email || 'contact@store.com'}
          </p>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            Phone: {userData?.phone || '+123 456 7890'}
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-6 bg-[hsl(var(--card))] shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Follow me on</h3>
          <div className="flex space-x-4 justify-center">
            <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
            </a>
            <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
            </a>
            <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faDribbble} className="text-2xl" />
            </a>
            <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Profile Picture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src="/profile-picture.jpg" // Placeholder path, replace with actual image path
              alt="Profile"
              width={300}
              height={300}
              className="rounded-full"
            />
            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Editing Profile */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Username</label>
              <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Profile Picture</label>
              <input
                placeholder='Citizenship Card'
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="w-full p-2 border rounded"
              />
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">KYC Information</h3>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                placeholder='Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex-1">
    <PhoneInput
      country={'np'} // Set default country code to Nepal
      value={phoneNumber}
      onChange={handlePhoneChange}
      inputClass="w-full px-3 py-2 border rounded-lg  text-[hsl(var(--foreground))]"
    />
  </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Address</label>
              <input
                type="text"
                placeholder='Kathmandu,Nepal'
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

export default ProfilePage;
