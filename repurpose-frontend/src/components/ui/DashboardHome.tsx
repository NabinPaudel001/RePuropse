"use client";
import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaShoppingCart,
  FaClock,
  FaGift,
  FaLeaf,
  FaCloud,
} from "react-icons/fa"; // Importing icons from Font Awesome
import { useUser } from "@/contexts/UserContext";

const DashboardHome = () => {
  const { user } = useUser();

  const [rewardPoints, setRewardPoints] = useState(0);
  const [carbonCredits, setCarbonCredits] = useState(0); 
  const [soldItems, setSoldItems] = useState(0);
  const [pendingItems, setPendingItems] = useState(0);
  const [donatedItems, setDonatedItems] = useState(0);
  const [environmentEarnings, setEnvironmentEarnings] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data; replace with real API call if needed
    const fetchDashboardData = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy data
        const data = {
          rewardPoints: 1200,
          carbonCredits: 150,
          soldItems: 45,
          pendingItems: 10,
          donatedItems: 5,
          environmentEarnings: 300,
        };

        setRewardPoints(data.rewardPoints);
        setCarbonCredits(data.carbonCredits);
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

  useEffect(() => {
    // Apply different CSS variables based on user role
    if (user?.role === "seller") {
      document.documentElement.style.setProperty("--primary", "217 91% 60%");
      document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%");
    } else if (user?.role) {
      // Could customize for other roles
      document.documentElement.style.setProperty("--primary", "140.1 75.2% 30.3%");
      document.documentElement.style.setProperty("--primary-foreground", "355.7 100% 97.3%");
    } else {
      // Default fallback
      document.documentElement.style.setProperty("--primary", "217 91% 60%");
      document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%");
    }
  }, [user?.role]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  // Create a single array describing your stats
  const stats = [
    {
      icon: <FaStar className="text-[hsl(var(--primary))] text-3xl mr-4" />,
      title: "Reward Points",
      value: user?.totalRewardPoints ?? rewardPoints,
    },
    {
      icon: <FaCloud className="text-[hsl(var(--primary))] text-3xl mr-4" />,
      title: "Carbon Credits",
      value: carbonCredits,
    },
    {
      icon: <FaShoppingCart className="text-[hsl(var(--primary))] text-3xl mr-4" />,
      title: "Sold Items",
      value: soldItems,
    },
    {
      icon: <FaClock className="text-[hsl(var(--destructive))] text-3xl mr-4" />,
      title: "Pending Items",
      value: pendingItems,
    },
    {
      icon: <FaGift className="text-[hsl(var(--primary))] text-3xl mr-4" />,
      title: "Donated Items",
      value: donatedItems,
    },
    {
      icon: <FaLeaf className="text-[hsl(var(--primary))] text-3xl mr-4" />,
      title: "Earnings Contributed to Environment",
      value: `NRP ${environmentEarnings}`,
    },
  ];

  return (
    <div className="dashboard-home p-6 bg-[hsl(var(--background))] w-full h-full">
      <h1 className="text-4xl font-bold text-center mb-8 mt-0 text-[hsl(var(--primary))]">
        Dashboard
      </h1>

      {/* Map over the stats array to generate each item */}
      <div className="dashboard-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-item bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg 
                       hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center">
              {stat.icon}
              <div>
                <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
                  {stat.title}
                </h2>
                <p className="text-2xl text-[hsl(var(--foreground))]">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
