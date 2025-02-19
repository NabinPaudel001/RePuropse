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
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

export default function ManageListed() {
  const [listedItems, setListedItems] = useState([
    { id: 1, title: "Item A", category: "Electronics", price: "$100", status: "Active", listedBy: "User1", image: "/images/R.jpeg" },
    { id: 2, title: "Item B", category: "Clothing", price: "$50", status: "Pending", listedBy: "User2", image: "/images/R.jpeg" },
    { id: 3, title: "Item C", category: "Furniture", price: "$200", status: "Sold", listedBy: "User3", image: "/images/OIP.jpeg" },
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
          <TableHead>Image</TableHead>
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
              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <Image src={item.image} alt={item.title} width={50} height={50} className="cursor-pointer rounded" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>{item.title}</DialogTitle>
                    <Image src={item.image} alt={item.title} width={500} height={400} className="rounded-lg" />
                  </DialogContent>
                </Dialog>
              </TableCell>
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
            <TableCell colSpan="7" className="text-center text-gray-500">
              No listed items found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
