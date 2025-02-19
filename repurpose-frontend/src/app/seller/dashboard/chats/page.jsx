"use client";
import ChatPage from "@/components/chat/ChatPage";
import React, { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";

 export default function Listing() {
   return (
     <div>
       <Layout>
        <ChatPage />
       </Layout>
     </div>
   )
 }
 