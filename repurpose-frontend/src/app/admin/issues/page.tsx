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
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { json } from "stream/consumers";

interface Reports {
  _id: string;
  createdAt: string;
  title: string;
  description: string;
  status: string;
  attachmentUrl: string;
  category: string;
  postedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

export default function ManageIssues() {
  // const [issues, setIssues] = useState([
  //   { id: 1, title: "Login Bug", description: "Fix login bug", postedBy: "Alice", status: "Open", category: "Transaction", screenshot: "/images/R.jpeg" },
  //   { id: 2, title: "UI Update", description: "Update UI design", postedBy: "Bob", status: "Progress", category: "Violence", screenshot: "/images/ui-update.png" },
  //   { id: 3, title: "DB Optimization", description: "Optimize database queries", postedBy: "Charlie", status: "Resolved", category: "Technical", screenshot: "/images/db-optimization.png" },
  // ]);
  const [reports, setReports] = useState<
    {
      _id: string;
      createdAt: string;
      title: string;
      description: string;
      status: string;
      attachmentUrl: string;
      category: string;
      postedBy: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
      }
    }[]
  >([]);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const response = await apiRequest("/api/user/reports", 'GET');
        console.log("respone her pending data ko", response)
        setReports(response.data);
      } catch (error) {
        console.log("Error fetching KYC data:", error);
      }
    };

    fetchReportsData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredReports = reports.filter(report =>
    (selectedCategory ? report.category.toLowerCase() === selectedCategory.toLowerCase() : true) &&
    (selectedStatus === "all" ? true : report.status.toLowerCase() === selectedStatus.replace(" ", "").toLowerCase())
  );

  return (
    <Card className="p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Issues</h2>
        <div className="relative">
          <label htmlFor="category-select" className="sr-only">Select a category</label>
          <select
            id="category-select"
            className="border px-3 py-2 rounded-md appearance-none bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="technical">Technical Issue</option>
            <option value="transaction">Transaction</option>
            <option value="report">Report</option>
            <option value="violence">Violence</option>
            <option value="unethical">Unethical Product</option>
            <option value="customer_service">Customer Service</option>
            <option value="delivery">Delivery Issue</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 pointer-events-none text-gray-500" size={16} />
        </div>
      </div>
      <Tabs defaultValue="all" onValueChange={setSelectedStatus}>
        <TabsList className="mb-5">
          <TabsTrigger value="all">All Issues</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="Progress">Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus}>
          <IssueTable reports={filteredReports} setReports={setReports} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

// interface Issue {
//   id: number;
//   title: string;
//   description: string;
//   postedBy: string;
//   status: string;
//   category: string;
//   screenshot: string;
// }

function IssueTable({ reports, setReports }: { reports: Reports[], setReports: React.Dispatch<React.SetStateAction<Reports[]>> }) {
  // const handleStatusChange = (_id: string, newStatus: string) => {
  //   setReports((prevReports: any) =>
  //     prevReports.map((report: any) =>
  //       report._id === _id ? { ...report, status: newStatus } : report
  //     )
  //   );
  // };

  const handleStatusChange = async (_id: string, newStatus: string) => {
    try {
      // Make API request to update the status on the backend
      const response = await apiRequest(`/api/user/reports/status/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
        headers: { 'Content-Type': 'application/json' }

      });
      // If the request is successful, update the local state
      if (response.success) {
        setReports((prevReports: any) =>
          prevReports.map((report: any) =>
            report._id === _id ? { ...report, status: newStatus } : report
          )
        );
      } else {
        console.log("Error updating status:", response.message);
      }
    } catch (error) {
      console.log("Error while changing status:", error);
    }
  };


  return (
    <Table className="w-full border rounded-lg overflow-hidden p-4">
      <TableHeader>
        <TableRow>
          <TableHead>S.N</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Posted By</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Screenshot</TableHead>
          {/* <TableHead>Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center p-4 text-gray-500">No issues found</TableCell>
          </TableRow>
        ) : (
          reports.map((report, index) => (
            <TableRow key={report._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.description}</TableCell>
              <TableCell>{report.postedBy.email}</TableCell>
              <TableCell>
                <label htmlFor={`status-select-${report._id}`} className="sr-only">Status</label>
                <select
                  id={`status-select-${report._id}`}
                  value={report.status}
                  onChange={(e) => handleStatusChange(report._id, e.target.value)}
                  className="border px-2 py-1 rounded-md bg-white"
                >
                  <option value="open">Open</option>
                  <option value="progress">Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </TableCell>
              <TableCell>{report.category}</TableCell>
              <TableCell>
                {report.attachmentUrl ? (
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src={report.attachmentUrl}
                        alt={report.title}
                        width={50}
                        height={50}
                        className="cursor-pointer rounded"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>{report.title}</DialogTitle>
                      <Image
                        src={report.attachmentUrl}
                        alt={report.title}
                        width={500}
                        height={400}
                        className="rounded-lg"
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <span className="text-gray-500">Not provided</span>
                )}
              </TableCell>

              {/* <TableCell>
                <Button className="ml-2 bg-red-500 hover:bg-red-600" onClick={() => handleDelete(report._id)}>Delete</Button>
              </TableCell> */}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
