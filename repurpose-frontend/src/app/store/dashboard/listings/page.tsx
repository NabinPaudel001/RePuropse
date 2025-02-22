"use client";
import Layout from "@/components/ui/layout";
import MyListings from "@/components/ui/listings";
import React, { useEffect, useState } from "react";
import Layout_store from "@/components/ui/layout_store";
import AvailableItems from "@/components/ui/availableitems";

 export default function Listing() {
   return (
     <div>
       <Layout_store>
       <AvailableItems />
       </Layout_store>
     </div>
   )
 }
 