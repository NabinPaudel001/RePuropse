"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function VerifyKYC() {
  const [pendingKYC] = useState([
    {
      id: 1,
      dateCreated: "2025-02-15",
      storeName: "Tech Haven",
      ownerName: "John Doe",
      businessRegNo: "1234567890",
      documents: ["/doc1.jpg", "/doc2.jpg"],
    },
  ]);

  const [verifiedKYC] = useState([
    {
      id: 1,
      dateCreated: "2025-02-10",
      storeName: "Gadget World",
      ownerName: "Jane Smith",
      businessRegNo: "9876543210",
      documents: ["/doc3.jpg", "/doc4.jpg"],
    },
  ]);

  return (
    <Card className="p-5 shadow-lg">
      <Tabs defaultValue="pending">
        <TabsList className="mb-5">
          <TabsTrigger value="pending">Pending KYC</TabsTrigger>
          <TabsTrigger value="verified">Verified KYC</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <KYCList data={pendingKYC} showActions={true} />
        </TabsContent>
        <TabsContent value="verified">
          <KYCList data={verifiedKYC} showActions={false} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function KYCList({ data, showActions }) {
  return (
    <Table className="w-full border rounded-lg overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>SN</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead>Store Name</TableHead>
          <TableHead>Owner Name</TableHead>
          <TableHead>Business Reg. No</TableHead>
          <TableHead>Documents</TableHead>
          {showActions && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((kyc, index) => (
            <TableRow key={kyc.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{kyc.dateCreated}</TableCell>
              <TableCell>{kyc.storeName}</TableCell>
              <TableCell>{kyc.ownerName}</TableCell>
              <TableCell>{kyc.businessRegNo}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {kyc.documents.map((doc, idx) => (
                    <Image
                      key={idx}
                      src={doc}
                      alt="Document"
                      width={50}
                      height={50}
                      className="rounded border"
                    />
                  ))}
                </div>
              </TableCell>
              {showActions && (
                <TableCell>
                  <Button className="bg-green-500 hover:bg-green-700 mr-2">Verify</Button>
                  <Button className="bg-red-500 hover:bg-red-700">Reject</Button>
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={showActions ? 7 : 6} className="text-center text-gray-500">
              No records found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}