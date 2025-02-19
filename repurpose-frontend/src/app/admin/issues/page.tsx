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
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function ManageIssues() {
  const [issues, setIssues] = useState([
    { id: 1, title: "Login Bug", description: "Fix login bug", postedBy: "Alice", status: "Open", category: "Transaction", screenshot: "/images/R.jpeg" },
    { id: 2, title: "UI Update", description: "Update UI design", postedBy: "Bob", status: "Progress", category: "Violence", screenshot: "/images/ui-update.png" },
    { id: 3, title: "DB Optimization", description: "Optimize database queries", postedBy: "Charlie", status: "Resolved", category: "Technical", screenshot: "/images/db-optimization.png" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const filteredIssues = issues.filter(issue => 
    (selectedCategory ? issue.category.toLowerCase() === selectedCategory.toLowerCase() : true) &&
    (selectedStatus === "all" ? true : issue.status.toLowerCase() === selectedStatus.replace(" ", "").toLowerCase())
  );

  return (
    <Card className="p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Issues</h2>
        <div className="relative">
          <select
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
          <IssueTable issues={filteredIssues} setIssues={setIssues} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function IssueTable({ issues, setIssues }) {
  const handleStatusChange = (id, newStatus) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  const handleDelete = (id) => {
    setIssues((prevIssues) => prevIssues.filter((issue) => issue.id !== id));
  };

  return (
    <Table className="w-full border rounded-lg overflow-hidden p-4">
      <TableHeader>
        <TableRow>
          <TableHead>Issue ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Posted By</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Screenshot</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.length === 0 ? (
          <TableRow>
            <TableCell colSpan="8" className="text-center p-4 text-gray-500">No issues found</TableCell>
          </TableRow>
        ) : (
          issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>{issue.id}</TableCell>
              <TableCell>{issue.title}</TableCell>
              <TableCell>{issue.description}</TableCell>
              <TableCell>{issue.postedBy}</TableCell>
              <TableCell>
                <select
                  value={issue.status}
                  onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                  className="border px-2 py-1 rounded-md bg-white"
                >
                  <option value="Open">Open</option>
                  <option value="Progress">Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </TableCell>
              <TableCell>{issue.category}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <Image
                      src={issue.screenshot}
                      alt={issue.title}
                      width={50}
                      height={50}
                      className="cursor-pointer rounded"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>{issue.title}</DialogTitle>
                    <Image
                      src={issue.screenshot}
                      alt={issue.title}
                      width={500}
                      height={400}
                      className="rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Button className="ml-2 bg-red-500 hover:bg-red-600" onClick={() => handleDelete(issue.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
