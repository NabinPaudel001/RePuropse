import Layout_store from '@/components/ui/layout_store';
import ProductPage from '@/components/ui/singleProduct';
import React from 'react';

interface ModifyProps {
  params: { id: string }; // Expecting params with an `id` field
}

export default async function Modify({ params }: ModifyProps) {
  const { id } = await params; 

  return (
    <Layout_store>
      <ProductPage params={{ id }} />
    </Layout_store>
  );
}
