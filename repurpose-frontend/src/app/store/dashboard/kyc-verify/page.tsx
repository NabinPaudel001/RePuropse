"use client";
import Layout_store from "@/components/ui/layout_store";
import React, { useState } from "react";

export default function KYCVerify() {
  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    phoneNumber: "",
    password: "",
    businessRegNumber: "",
    storeAddress: "",
    ownerId: null,
    businessCert: null,
    storefrontImage: null,
    passportPhoto: null,
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    let updatedValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: updatedValue });

    // Send updated value to backend
    try {
      const response = await fetch('/api/updateField', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [name]: updatedValue }),
      });
      if (!response.ok) {
        throw new Error('Failed to update field');
      }
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Layout_store>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4">KYC Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-medium text-gray-700">
              Store Name
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Owner's Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Business Registration Number
            </label>
            <input
              type="text"
              name="businessRegNumber"
              value={formData.businessRegNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Store Address
            </label>
            <input
              type="text"
              name="storeAddress"
              value={formData.storeAddress}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Owner's Government ID
            </label>
            <input
              type="file"
              name="ownerId"
              onChange={handleChange}
              className="mt-1 block w-full text-base text-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Business Registration Certificate
            </label>
            <input
              type="file"
              name="businessCert"
              onChange={handleChange}
              className="mt-1 block w-full text-base text-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Storefront Image
            </label>
            <input
              type="file"
              name="storefrontImage"
              onChange={handleChange}
              className="mt-1 block w-full text-base text-gray-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">
              Passport Size Photo
            </label>
            <input
              type="file"
              name="passportPhoto"
              onChange={handleChange}
              className="mt-1 block w-full text-base text-gray-500"
              required
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout_store>
  );
}
