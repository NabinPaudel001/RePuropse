import Layout from '@/components/ui/layout';
import ProductPage from '@/components/ui/singleProduct';
import React from 'react';

interface ModifyProps {
  params: { id: string }; // Expecting params with an `id` field
}

export default function Modify({ params }: ModifyProps) {
  const { id } = params; // Destructure the `id` from params
  console.log("ID in Modify component:", id);

  return (
    <Layout>
      <ProductPage params={{ id }} />
    </Layout>
  );
}
