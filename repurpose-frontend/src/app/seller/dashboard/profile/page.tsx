"use client";
import React from 'react';
import Layout from '@/components/ui/layout';
import ProfilePage from '@/components/ui/profile';



// @returns {JSX.Element} A JSX element containing the page content.

const Page = () => {
  return (
    <Layout>
      <ProfilePage/>
    </Layout>
  );
};

export default Page;
