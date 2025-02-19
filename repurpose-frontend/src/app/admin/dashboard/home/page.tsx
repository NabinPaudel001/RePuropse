"use client";
import React from "react";
import Link from "next/link";
import {
  FaUsers,
  FaCheckCircle,
  FaExclamationCircle,
  FaStar,
  FaCloud,
  FaList,
} from "react-icons/fa"; // Importing icons

const AdminDashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--muted))]">
      <div className="max-w-6xl w-full p-8">
        {/* Header Section */}
        <div className="bg-[hsl(var(--card))] shadow-lg rounded-lg overflow-hidden mb-10">
          <div className="p-8 text-center">
            <h1 className="text-5xl font-extrabold text-[hsl(var(--primary))] mb-4 tracking-wide">
              Admin Dashboard
            </h1>
            
          </div>
        </div>

        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/** Reusable Card Component */}
          <DashboardCard
            href="/admin/users"
            Icon={FaUsers}
            title="Manage Users"
          />
          <DashboardCard
            href="/admin/dashboard/verify-kyc"
            Icon={FaCheckCircle}
            title="Verify KYC"
          />
          <DashboardCard
            href="/admin/issues"
            Icon={FaExclamationCircle}
            title="Manage Issues"
            notificationCount={1}
          />
          <DashboardCard
            href="/admin/rewards"
            Icon={FaStar}
            title="Manage Reward Points"
          />
          
          <DashboardCard
            href="/admin/listed-items"
            Icon={FaList}
            title="Manage Listed Items"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Dashboard Card Component
interface DashboardCardProps {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  notificationCount?: number | null;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ href, Icon, title, notificationCount = null }) => (
  <Link
    href={href}
    className="relative bento-box bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 group"
  >
    <div className="flex items-center justify-center">
      <Icon className="text-[hsl(var(--primary))] text-5xl group-hover:scale-110 transition-transform duration-300" />
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] ml-4">
        {title}
      </h2>
    </div>
    {notificationCount && (
      <span className="absolute top-2 right-2 bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] text-xs font-bold px-2 py-1 rounded-full">
        {notificationCount}
      </span>
    )}
  </Link>
);

export default AdminDashboard;
