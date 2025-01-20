"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import  Sidebar_store  from '@/components/ui/Sidebar_store';

const Page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar_store/>
    
      <div className="flex-1 p-10">
        
      </div>
    </div>
  );
};
export default Page;