"use client";

import React, { useState, useEffect } from "react";
import { apiRequest } from "@/middleware/errorInterceptor";
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
  // const [listedItems, setListedItems] = useState([
  //   { id: 1, title: "Item A", category: "Electronics", price: "$100", status: "Active", listedBy: "User1", image: "/images/R.jpeg" },
  //   { id: 2, title: "Item B", category: "Clothing", price: "$50", status: "Pending", listedBy: "User2", image: "/images/R.jpeg" },
  //   { id: 3, title: "Item C", category: "Furniture", price: "$200", status: "Sold", listedBy: "User3", image: "/images/OIP.jpeg" },
  // ]);

  const [listedItems, setListedItems] = useState<
    {
      _id: string;
      name: string;
      seller: {
        firstName: string,
        lastName: string
      }
      description: string;
      price: number;
      images: string[];
      status: string;
      discount: number;
      partName: string;
      materialName: string;
      ecoFriendly: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchListedItemData = async () => {
      try {
        const response = await apiRequest("/api/product/all/pending", 'GET');
        console.log("respone her products ko", response)
        setListedItems(response.data);
      } catch (error) {
        console.log("Error fetching products data:", error);
      }
    };

    fetchListedItemData();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      const response = await apiRequest(`/api/product/${productId}`, { method: "DELETE" });
      console.log(`Deleted product`, response);
      alert("Item deleted successfully!");
      setListedItems((prev) => prev.filter((item) => item._id !== productId));

    } catch (error) {
      console.error("Error deleting User:", error);
      alert("Error in Deleteing user. Please try again.");
    }
  }

  return (
    <Card className="p-5 shadow-lg">
      <Tabs defaultValue="listed">
        <TabsList className="mb-5">
          <TabsTrigger value="listed">Manage Listed Items</TabsTrigger>
        </TabsList>

        <TabsContent value="listed">
          <ListedTable listedItems={listedItems} handleDelete={handleDelete} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

// interface ListedItem {
//   id: number;
//   title: string;
//   category: string;
//   price: string;
//   status: string;
//   listedBy: string;
//   image: string;
// }
export interface ListedItem {
  _id: string;
  name: string;
  seller: {
    firstName: string;
    lastName: string;
  }
  description: string;
  price: number;
  images: string[];
  status: string;
  discount: number;
  partName: string;
  materialName: string;
  ecoFriendly: string;
}

function ListedTable({ listedItems, handleDelete }: { listedItems: ListedItem[], handleDelete:(productId:string)=>void }) {
  return (
    <Table className="w-full border rounded-lg overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Part Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Material Name</TableHead>
          <TableHead>Listed By</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listedItems.length > 0 ? (
          listedItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <Image src={item.images[0]} alt={item.name} width={50} height={50} className="cursor-pointer rounded" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>{item.name}</DialogTitle>
                    <Image src={item.images[0]} alt={item.name} width={500} height={400} className="rounded-lg" />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.partName}</TableCell>
              <TableCell>Rs. {item.price}</TableCell>
              <TableCell>{item.materialName}</TableCell>
              <TableCell>{item.seller?.firstName} {item.seller?.lastName}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(item._id,)}

                >Remove</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-gray-500">
              No listed items found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
