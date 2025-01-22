"use client";
import React, { useEffect, useState } from "react";
import { FaStar, FaShoppingCart, FaClock, FaGift, FaLeaf, FaCloud } from 'react-icons/fa'; // Importing icons from Font Awesome

const DashboardHome = () => {
  const [rewardPoints, setRewardPoints] = useState(0);
  const [carbonCredits, setCarbonCredits] = useState(0); // New state for carbon credits
  const [soldItems, setSoldItems] = useState(0);
  const [pendingItems, setPendingItems] = useState(0);
  const [donatedItems, setDonatedItems] = useState(0);
  const [environmentEarnings, setEnvironmentEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data with dummy data
    const fetchDashboardData = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy data
        const data = {
          rewardPoints: 1200,
          carbonCredits: 150, // New dummy data for carbon credits
          soldItems: 45,
          pendingItems: 10,
          donatedItems: 5,
          environmentEarnings: 300,
        };

        setRewardPoints(data.rewardPoints);
        setCarbonCredits(data.carbonCredits); // Set carbon credits
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
    <div className="dashboard-home p-6 bg-[hsl(var(--background))] min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 mt-0 text-[hsl(var(--primary))]">Dashboard</h1>
      <div className="dashboard-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-item bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaStar className="text-[hsl(var(--primary))] text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Reward Points</h2>
              <p className="text-2xl text-[hsl(var(--foreground))]">{rewardPoints}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaCloud className="text-[hsl(var(--primary))] text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Carbon Credits</h2>
              <p className="text-2xl text-[hsl(var(--foreground))]">{carbonCredits}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaShoppingCart className="text-[hsl(var(--primary))] text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Sold Items</h2>
              <p className="text-2xl text-[hsl(var(--foreground))]">{soldItems}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaClock className="text-[hsl(var(--destructive))] text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Pending Items</h2>
              <p className="text-2xl text-[hsl(var(--foreground))]">{pendingItems}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaGift className="text-[hsl(var(--primary))] text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Donated Items</h2>
              <p className="text-2xl text-[hsl(var(--foreground))]">{donatedItems}</p>
            </div>
          </div>
        </div>
        <div className="stat-item bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center">
            <FaLeaf className="text-[hsl(var(--primary))] text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Earnings Contributed to Environment</h2>
              <p className="text-2xl text-[hsl(var(--foreground))]">${environmentEarnings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
