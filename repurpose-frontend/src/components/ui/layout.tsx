"use client";
import React from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex inset-0">
      <Sidebar  />
      {/* Removed ml-64 from here */}
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex  justify-center items-center p-10 mt-16 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
