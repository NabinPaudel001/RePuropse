"use client";

import { useState } from "react";
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

export default function ManageIssues() {
  const [issues, setIssues] = useState([
    { id: 1, description: "Fix login bug", postedBy: "Alice", status: "Open" },
    { id: 2, description: "Update UI design", postedBy: "Bob", status: "In Progress" },
    { id: 3, description: "Optimize database queries", postedBy: "Charlie", status: "Resolved" },
  ]);

  return (
    <Card className="p-5 shadow-lg">
      <Tabs defaultValue="all">
        <TabsList className="mb-5">
          <TabsTrigger value="all">All Issues</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <IssueTable issues={issues} setIssues={setIssues} />
        </TabsContent>
        <TabsContent value="open">
          <IssueTable issues={issues.filter(issue => issue.status === "Open")} setIssues={setIssues} />
        </TabsContent>
        <TabsContent value="progress">
          <IssueTable issues={issues.filter(issue => issue.status === "In Progress")} setIssues={setIssues} />
        </TabsContent>
        <TabsContent value="resolved">
          <IssueTable issues={issues.filter(issue => issue.status === "Resolved")} setIssues={setIssues} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function IssueTable({ issues, setIssues }) {
  const router = useRouter();

  const handleStatusChange = (id, newStatus) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) => (issue.id === id ? { ...issue, status: newStatus } : issue))
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
          <TableHead>Description</TableHead>
          <TableHead>Posted By</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.length === 0 ? (
          <TableRow>
            <TableCell colSpan="5" className="text-center p-4 text-gray-500">No issues found</TableCell>
          </TableRow>
        ) : (
          issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>{issue.id}</TableCell>
              <TableCell>{issue.description}</TableCell>
              <TableCell>{issue.postedBy}</TableCell>
              <TableCell>
                <select
                  value={issue.status}
                  onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
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
