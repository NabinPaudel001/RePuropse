"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ManageUsers() {
  const [sellers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", contact: "9876543210" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", contact: "9876543211" },
  ]);

  const [stores] = useState([
    { id: 1, storeName: "SuperMart", contact: "9800000001", address: "Kathmandu" },
    { id: 2, storeName: "TechShop", contact: "9800000002", address: "Lalitpur" },
  ]);

  return (
    <Card className="p-5 shadow-lg">
      <Tabs defaultValue="sellers">
        <TabsList className="mb-5">
          <TabsTrigger value="sellers">Manage Sellers</TabsTrigger>
          <TabsTrigger value="stores">Manage Stores</TabsTrigger>
        </TabsList>

        <TabsContent value="sellers">
          <SellerTable sellers={sellers} />
        </TabsContent>
        <TabsContent value="stores">
          <StoreTable stores={stores} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function SellerTable({ sellers }) {
  return (
    <Table className="w-full border rounded-lg overflow-hidden p-4">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sellers.map((seller) => (
          <TableRow key={seller.id}>
            <TableCell>{seller.name}</TableCell>
            <TableCell>{seller.email}</TableCell>
            <TableCell>{seller.contact}</TableCell>
            <TableCell>
              <Button>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function StoreTable({ stores }) {
  return (
    <Table className="w-full border rounded-lg overflow-hidden p-4">
      <TableHeader>
        <TableRow>
          <TableHead>Store Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stores.map((store) => (
          <TableRow key={store.id}>
            <TableCell>{store.storeName}</TableCell>
            <TableCell>{store.contact}</TableCell>
            <TableCell>{store.address}</TableCell>
            <TableCell>
              <Button >Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}