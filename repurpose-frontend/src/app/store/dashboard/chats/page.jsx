"use client";
import ChatPage from "@/components/chat/ChatPage";
import React, { useEffect, useState } from "react";
import Layout_store from "@/components/ui/layout_store";

 export default function Listing() {
   return (
     <div>
       <Layout_store>
        <ChatPage />
       </Layout_store>
     </div>
   )
 }
 