"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MetricValuesAdmin } from "@/constant";
import { AiFillDelete } from "react-icons/ai";

const pdfData = [
  { id: 1, name: "Story_1.pdf", isPublic: true, user: "Md tofaal Ahmed" },
  {
    id: 2,
    name: "Translation_2.pdf",
    isPublic: false,
    user: "Md tofaal Ahmed",
  },
  { id: 1, name: "Story_1.pdf", isPublic: true, user: "Md tofaal Ahmed" },
  {
    id: 2,
    name: "Translation_2.pdf",
    isPublic: false,
    user: "Md tofaal Ahmed",
  },
];

const AnalyticsDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          {MetricValuesAdmin.map((item) => (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Exported PDFs</CardTitle>
            <CardDescription>Manage your exported PDF files</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Created By</TableHead>
                  <TableHead>Pdf Name</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pdfData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="flex items-center space-x-2">
                      <Button variant="destructive" size="sm">
                        <AiFillDelete size={17} className="mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
