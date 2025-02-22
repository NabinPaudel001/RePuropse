"use client";
import Layout from "@/components/ui/layout";
import MyListings from "@/components/ui/listings";
import React, { useEffect, useState } from "react";

 export default function Listing() {
   return (
     <div>
       <Layout>
        <MyListings />
       </Layout>
     </div>
   )
 }
 
