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

export default function ManageListed() {
  const [listedItems, setListedItems] = useState([
    { id: 1, title: "Item A", category: "Electronics", price: "$100", status: "Active", listedBy: "User1" },
    { id: 2, title: "Item B", category: "Clothing", price: "$50", status: "Pending", listedBy: "User2" },
    { id: 3, title: "Item C", category: "Furniture", price: "$200", status: "Sold", listedBy: "User3" },
  ]);

  return (
    <Card className="p-5 shadow-lg">
      <Tabs defaultValue="listed">
        <TabsList className="mb-5">
          <TabsTrigger value="listed">Manage Listed Items</TabsTrigger>
        </TabsList>

        <TabsContent value="listed">
          <ListedTable listedItems={listedItems} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function ListedTable({ listedItems }) {
  return (
    <Table className="w-full border rounded-lg overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Listed By</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listedItems.length > 0 ? (
          listedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.listedBy}</TableCell>
              <TableCell>
                <Button >Remove</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="6" className="text-center text-gray-500">
              No listed items found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}