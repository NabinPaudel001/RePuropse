"use client";
import React, { useEffect, useState } from "react";
import { FaStar, FaShoppingCart, FaClock, FaGift, FaLeaf } from 'react-icons/fa'; // Importing icons from Font Awesome

const DashboardHome = () => {
  const [rewardPoints, setRewardPoints] = useState(0);
  const [soldItems, setSoldItems] = useState(0);
  const [pendingItems, setPendingItems] = useState(0);
  const [donatedItems, setDonatedItems] = useState(0);
  const [environmentEarnings, setEnvironmentEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data with dummy data
    const fetchDashboardData = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy data
        const data = {
          rewardPoints: 1200,
          soldItems: 45,
          pendingItems: 10,
          donatedItems: 5,
          environmentEarnings: 300,
        };

        setRewardPoints(data.rewardPoints);
        setSoldItems(data.soldItems);
        setPendingItems(data.pendingItems);
        setDonatedItems(data.donatedItems);
        setEnvironmentEarnings(data.environmentEarnings);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="dashboard-home p-6  bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Dashboard</h1>
      <div className="dashboard-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaStar className="text-yellow-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Reward Points</h2>
              <p className="text-2xl text-gray-700">{rewardPoints}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaShoppingCart className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Sold Items</h2>
              <p className="text-2xl text-gray-700">{soldItems}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaClock className="text-red-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Pending Items</h2>
              <p className="text-2xl text-gray-700">{pendingItems}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaGift className="text-purple-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Donated Items</h2>
              <p className="text-2xl text-gray-700">{donatedItems}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaLeaf className="text-teal-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Earnings Contributed to Environment</h2>
              <p className="text-2xl text-gray-700">${environmentEarnings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
