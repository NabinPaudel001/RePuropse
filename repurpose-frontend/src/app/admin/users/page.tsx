"use client";

import React, { useState, useEffect } from "react";
import { apiRequest } from "@/middleware/errorInterceptor";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
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
 
  const [sellers, setSellers] = useState<
    {
      _id: string;
      createdAt: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      email: string;
      address: string;
      phoneNumber: string;
      totalRewardPoints: string;
    }[]
  >([]);

  const [stores, setStores] = useState<
    {
      _id: string;
      createdAt: string;
      storeName: string;
      storeStatus: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      email: string;
      address: string;
      phoneNumber: string;
    }[]
    >([]);
  
    useEffect(() => {
      const fetchKYCData = async () => {
        try {
          const response = await apiRequest("/api/user/sellers", 'GET');
          console.log("respone her sellers ko", response)
          setSellers(response.data);
        } catch (error) {
          console.log("Error fetching KYC data:", error);
        }
      };
  
      fetchKYCData();
    }, []);
  
    useEffect(() => {
      const fetchKYCData = async () => {
        try {
          const response = await apiRequest("/api/user/stores", 'GET');
          console.log("respone her stores ko", response)
          setStores(response.data);
        } catch (error) {
          console.log("Error fetching KYC data:", error);
        }
      };
  
      fetchKYCData();
    }, []);

  // Fetch Pending KYC data on component mount
  useEffect(() => {
    const fetchKYCData = async () => {
      try {
        const response = await apiRequest("/api/user/sellers", 'GET');
        console.log("respone her sellers data", response)
        setSellers(response.data);
      } catch (error) {
        console.log("Error fetching KYC data:", error);
      }
    };

    fetchKYCData();
  }, []);

  const handleDelete = async (userId:string, role:string) => {
    try {
      const response = await apiRequest(`/api/user/${userId}`, {method: "DELETE"});
      console.log(`Deleted user`, response);
      if (role === "seller") {
        alert("seller deleted successfully!");
        setSellers((prev) => prev.filter((seller) => seller._id !== userId));
      }
      else if (role === "store") {
        alert("store deleted successfully");
        setStores((prev) => prev.filter((store) => store._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      alert("Error in Deleteing user. Please try again.");
    }
  }

  return (
    <Card className="p-5 shadow-lg">
      <Tabs defaultValue="sellers">
        <TabsList className="mb-5">
          <TabsTrigger value="sellers">Manage Sellers</TabsTrigger>
          <TabsTrigger value="stores">Manage Stores</TabsTrigger>
        </TabsList>

        <TabsContent value="sellers">
        <SellerTable sellers={sellers} handleDelete={handleDelete} />
        </TabsContent>
        <TabsContent value="stores">
        <StoreTable stores={stores} handleDelete={handleDelete} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

interface Seller {
  _id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  address: string;
  phoneNumber: string;
  totalRewardPoints: string;
}


function SellerTable({ sellers, handleDelete }: { sellers: Seller[], handleDelete: (userId: string, role: string) => void }) {
  const router = useRouter();

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
          <TableRow key={seller._id}>
            <TableCell>{seller.firstName} {seller.lastName}</TableCell>
            <TableCell>{seller.email}</TableCell>
            <TableCell>{seller.phoneNumber}</TableCell>
            <TableCell>
              {/* <Button onClick={() => router.push(`./details/seller/${seller.id}`)}>View Details</Button> */}
              <Button
                className="ml-2"
                onClick={()=>handleDelete(seller._id, "seller")}
              >Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

interface Store {
  _id: string;
  createdAt: string;
  storeName: string;
  storeStatus: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  address: string;
  phoneNumber: string;
}


function StoreTable({ stores, handleDelete }: { stores: Store[], handleDelete: (userId: string, role: string) => void }) {
  const router = useRouter();

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
          <TableRow key={store._id}>
            <TableCell>{store.storeName}</TableCell>
            <TableCell>{store.phoneNumber}</TableCell>
            <TableCell>{store.address}</TableCell>
            <TableCell>
              {/* <Button onClick={() => router.push(`./details/store/${store.id}`)}>View Details</Button> */}
              <Button
                className="ml-2"
                onClick={()=>handleDelete(store._id, "store")}
              >
                Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
