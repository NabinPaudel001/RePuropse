"use client";
import React from 'react';
import Layout from '../../../../components/ui/layout';
import SettingsPage from '@/components/ui/Setting';
import { Settings } from 'lucide-react';


/**
 * A React functional component representing a page in the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the page content.
 */
const Page = () => {
  return (
    <Layout children={null}>
      <SettingsPage/>
    </Layout>
  );
};

export default Page;
