"use client";
import React from 'react';
import Sidebar from '@/components/ui/Sidebar';

/**
 * A React functional component that provides a layout with a sidebar for dashboard pages.
 * 
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The main content to be displayed alongside the sidebar.
 * @returns {JSX.Element} A JSX element containing the layout with a sidebar.
 */
const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
