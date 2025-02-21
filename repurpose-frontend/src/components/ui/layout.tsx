"use client";
import React, { ReactNode } from "react";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* 
        On medium screens and above, apply a left margin equal to the sidebar width (64).
        On smaller screens, the sidebar is toggled and overlays the content.
      */}
      <div className="flex flex-col flex-grow md:ml-64">
        <Header />
        <main className="p-10 mt-16 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
