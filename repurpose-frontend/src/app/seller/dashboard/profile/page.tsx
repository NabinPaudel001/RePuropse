"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faDribbble, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '@/components/ui/Sidebar';

const ProfilePage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
    <Sidebar />
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          {/* Breadcrumb */}
          <div className="text-gray-500 text-sm mb-4">
            <Link href="/dashboard" className="hover:text-gray-700">
              Dashboard
            </Link>{" "}
            / <span className="font-bold text-gray-700">Profile</span>
          </div>

          {/* Header Section */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative">
              {/* Cover Image */}
              <div className="h-40 bg-gray-300">
                <Image
                  src="/cover-image.jpg" // Placeholder path, replace with actual image path
                  alt="Cover"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Profile Picture */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                  <Image
                    src="/profile-picture.jpg" // Placeholder path, replace with actual image path
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center mt-14 p-4">
              <h2 className="text-xl font-bold text-gray-800">Nabin Paudel</h2>
              <p className="text-gray-500">Cloth Seller</p>

              <div className="flex justify-center space-x-8 mt-4">
                <div>
                  <p className="text-gray-800 font-bold">259</p>
                  <p className="text-gray-500 text-sm">Posts</p>
                </div>
                <div>
                  <p className="text-gray-800 font-bold">129</p>
                  <p className="text-gray-500 text-sm">Sold</p>
                </div>
              </div>

              <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                Edit
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">About Me</h3>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Follow me on</h3>
            <div className="flex space-x-4 justify-center">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faDribbble} className="text-2xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faGithub} className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
