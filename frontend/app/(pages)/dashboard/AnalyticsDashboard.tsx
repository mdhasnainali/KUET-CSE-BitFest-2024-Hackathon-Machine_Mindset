"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MetricValues } from "@/constant";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const pdfData = [
  { id: 1, name: "Story_1.pdf", isPublic: true },
  { id: 2, name: "Translation_2.pdf", isPublic: false },
  { id: 3, name: "Chatbot_Transcript.pdf", isPublic: true },
  { id: 3, name: "Chatbot_Transcript.pdf", isPublic: true },
  { id: 3, name: "Chatbot_Transcript.pdf", isPublic: false },
  { id: 3, name: "Chatbot_Transcript.pdf", isPublic: true },
  { id: 3, name: "Chatbot_Transcript.pdf", isPublic: false },
];

const AnalyticsDashboard = () => {
  const [pdfs, setPdfs] = useState(pdfData);

  const togglePdfVisibility = (id: number) => {
    setPdfs(
      pdfs.map((pdf) =>
        pdf.id === id ? { ...pdf, isPublic: !pdf.isPublic } : pdf
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          {MetricValues.map((item) => (
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
                  <TableHead>File Name</TableHead>
                  <TableHead>Public Pdf</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pdfs.map((pdf) => (
                  <TableRow key={pdf.id}>
                    <TableCell>{pdf.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={pdf.isPublic}
                          onCheckedChange={() => togglePdfVisibility(pdf.id)}
                        />
                      </div>
                    </TableCell>
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
