"use client";
import NotificationPage from "@/components/ui/notification";
import Layout_store from "@/components/ui/layout_store";
import React, { useEffect, useState } from "react";

export default function Listing() {
  return (
    <div>
      <Layout_store>
        <NotificationPage />
      </Layout_store>
    </div>
  )
}
