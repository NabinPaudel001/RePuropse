"use client";
import React from 'react';
import Layout from '../../../../components/ui/layout';
import SettingsPage from '@/components/ui/Setting';
import { Settings } from 'lucide-react';
import Layout_store from '@/components/ui/layout_store';

/**
 * A React functional component representing a page in the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the page content.
 */
const Page = () => {
  return (
    <Layout_store>
      <SettingsPage/>
    </Layout_store>
  );
};

export default Page;
