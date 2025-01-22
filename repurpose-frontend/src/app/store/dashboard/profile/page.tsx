"use client";
import React from 'react';
import Layout from '../../../../components/ui/layout';

import Layout_store from '@/components/ui/layout_store';
import StoreProfile from '@/components/ui/StoreProfile';

/**
 * A React functional component representing a page in the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the page content.
 */
const Page = () => {
  return (
    <Layout_store >
      <StoreProfile />
    </Layout_store>
  );
};

export default Page;
