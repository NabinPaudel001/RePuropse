"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faDribbble, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { apiRequest } from '@/middleware/errorInterceptor';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null); // State to store user data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest('/api/user/me', 'GET');
        setUserData(response.data); // Update state with user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData();
  }, []);

  console.log("userData", userData);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-4xl w-full p-6">
        {/* Header Section */}
        <div className="bg-[hsl(var(--card))] shadow-md rounded-lg overflow-hidden">
          <div className="relative flex justify-center">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 rounded-full border-4 border-[hsl(var(--card))] overflow-hidden mt-8">
              {userData?.profilePicture ? (
                <Image
                  src={userData?.profilePicture}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  onClick={toggleModal}
                  className="cursor-pointer"
                />
              ) : (
                <div className="flex justify-center items-center bg-[hsl(var(--muted-foreground))] text-white text-xl font-bold">
                  {userData?.firstName?.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center cursor-pointer">
                <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
              </div>
            </div>

          </div>

          {/* Profile Info */}
          <div className="text-center mt-16 p-4">
            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">{userData?.firstName} {userData?.lastName}</h2>
            <p className="text-[hsl(var(--muted-foreground))]">{userData?.role || 'Cloth Seller'}</p>

            <div className="flex justify-center space-x-8 mt-4">
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">{userData?.postsCount || 259}</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Posts</p>
              </div>
              <div>
                <p className="text-[hsl(var(--foreground))] font-bold">{userData?.soldCount || 129}</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">Sold</p>
              </div>
            </div>

            <button className="mt-6 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
              Edit
            </button>
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
            <a href={userData?.socialLinks?.facebook || "#"} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
            </a>
            <a href={userData?.socialLinks?.twitter || "#"} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
            </a>
            <a href={userData?.socialLinks?.dribbble || "#"} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <FontAwesomeIcon icon={faDribbble} className="text-2xl" />
            </a>
            <a href={userData?.socialLinks?.github || "#"} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
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
              src={userData?.profilePicture || "/profile-picture.jpg"} // Placeholder path, replace with actual image path
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
    </div>
  );
};

export default ProfilePage;
