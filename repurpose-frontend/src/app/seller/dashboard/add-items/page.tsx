"use client";
import React from 'react';
import Layout from '../../../../components/ui/layout';
import AddItems from '../../../../components/ui/addItems';

/**
 * A React functional component representing the add-items page in the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the add-items page content.
 */
const AddItemsPage = () => {
  return (
    <Layout>
      <AddItems/>
    </Layout>
  );
};

export default AddItemsPage;
