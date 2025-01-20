"use client";
import React from 'react';
import Header from '@/components/ui/Header';
import { ReactNode } from 'react';
import Sidebar_store from '@/components/ui/Sidebar_store';

const Layout_store = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar_store />
      <div className="flex flex-col flex-grow ml-64">
        <Header />
        <div className="flex justify-center items-center p-10 mt-16 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout_store;
