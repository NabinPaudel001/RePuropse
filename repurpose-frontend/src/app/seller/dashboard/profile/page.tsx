"use client";
import React from 'react';
import Layout from '../../../../components/ui/layout';
import ProfilePage from '@/components/ui/profile';


/**
 * A React functional component representing a page in the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the page content.
 */
const Page = () => {
  return (
    <Layout children={null}>
      <ProfilePage/>
    </Layout>
  );
};

export default Page;
