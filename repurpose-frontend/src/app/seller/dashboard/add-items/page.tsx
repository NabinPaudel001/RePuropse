"use client";
import React from 'react';
import Layout from '../../../../components/ui/layout';
import AddItems from '@/components/ui/addItems';

/**
 * A React functional component representing a page in the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the page content.
 */
const Page = () => {
  return (
    <Layout>
      <AddItems />
    </Layout>
  );
};

export default Page;
