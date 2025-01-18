"use client";
import React from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';

/**
 * A React functional component that provides a layout with a sidebar and header for dashboard pages.
 * 
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The main content to be displayed alongside the sidebar and below the header.
 * @returns {JSX.Element} A JSX element containing the layout with a sidebar and header.
 */
const Layout = ({ children }) => {
  return (
    <div className="flex z-20" >
      <Sidebar />
      <div className="flex z-10 ml-64">
        <Header />
        <div className="p-10 mt-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
