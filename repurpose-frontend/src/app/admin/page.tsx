"use client";
import React from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-4xl w-full p-6">
        {/* Header Section */}
        <div className="bg-[hsl(var(--card))] shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-4xl font-bold text-center mb-8 mt-0 text-[hsl(var(--primary))]">Admin Dashboard</h1>
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="/admin/users" className="block w-full text-left px-4 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-foreground))]">
                Manage Users
              </Link>
            </li>
            <li>
              <Link href="/admin/kyc" className="block w-full text-left px-4 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-foreground))]">
                Verify KYC
              </Link>
            </li>
            <li>
              <Link href="/admin/issues" className="block w-full text-left px-4 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-foreground))]">
                Manage Issues
              </Link>
            </li>
            <li>
              <Link href="/admin/rewards" className="block w-full text-left px-4 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-foreground))]">
                Manage Reward Points
              </Link>
            </li>
            <li>
              <Link href="/admin/carbon-credits" className="block w-full text-left px-4 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-foreground))]">
                Manage Carbon Credits
              </Link>
            </li>
            <li>
              <Link href="/admin/listed-items" className="block w-full text-left px-4 py-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-foreground))]">
                Manage Listed Items
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
