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
import { Eye, NotepadText } from "lucide-react";

import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

const AnalyticsDashboard = () => {
  const [pdfs, setPdfs] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");


  const updateData = async (id: number, data: any) => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/content-management/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${userData.access_token}`,
        },
      }
    );
    fetchPdfData();
  }


  const fetchPdfData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/content-management/`,
      {
        headers: {
          Authorization: `Bearer ${userData.access_token}`,
        },
      });
    console.log(res.data);
    setPdfs(res.data);
  };

  useEffect(() => {
    fetchPdfData();
  }, []);



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
                  <TableHead>Public</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pdfs.map((pdf: any) => (
                  <TableRow key={pdf.id}>
                    <TableCell>
                      <div
                        className="truncate max-w-[150px] md:max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap"
                        title={pdf["title"]}
                      >
                        {pdf["title"]}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={pdf.public}
                          onCheckedChange={() => {
                            updateData(pdf.id, {
                              ...pdf,
                              public: !pdf.public,
                            });
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center justify-end space-x-3 text-right">
                      <Button
                        className="hover:bg-green-700 text-white bg-blue-600"
                        size="sm"
                      >
                        <Eye size={15} />
                        <span className="md:flex hidden ml-1">
                          PDF
                        </span>
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white "
                        size="sm"
                      >
                        <Eye size={15} />
                        <span className="md:flex hidden ml-1">view</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => {
                        axios.delete(
                          `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/content-management/${pdf.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${userData.access_token}`,
                            },
                          }
                        );
                        window.location.reload();
                      }}>
                        <AiFillDelete size={15} />
                        <span className="md:flex hidden ml-1">Delete</span>
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
