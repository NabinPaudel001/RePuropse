"use client";
import Layout from "@/components/ui/layout";
import MyListings from "@/components/ui/listings";
import React, { useEffect, useState } from "react";
import Layout_store from "@/components/ui/layout_store";

 export default function Listing() {
   return (
     <div>
       <Layout_store>
        <MyListings />
       </Layout_store>
     </div>
   )
 }
 