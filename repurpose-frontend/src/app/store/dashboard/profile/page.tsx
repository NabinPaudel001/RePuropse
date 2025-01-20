"use client";
import React from 'react';
import Layout from '../../../../components/ui/layout';
import ProfilePage from '@/components/ui/profile';
import Layout_store from '@/components/ui/layout_store';

/**
 * A React functional component representing a page in the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the page content.
 */
const Page = () => {
  return (
    <Layout_store children={null}>
      <ProfilePage/>
    </Layout_store>
  );
};

export default Page;
