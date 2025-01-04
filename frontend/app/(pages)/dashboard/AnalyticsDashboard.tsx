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
import { Eye } from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

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
  };

  const fetchPdfData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/content-management/`,
      {
        headers: {
          Authorization: `Bearer ${userData.access_token}`,
        },
      }
    );
    console.log(res.data);
    setPdfs(res.data);
  };

  useEffect(() => {
    fetchPdfData();
  }, []);
  // metrics
  const [publicdata, setpublicdata] = useState("");
  const [privatedata, setprivatedata] = useState("");
  const [stories_written, setstories_written] = useState("");
  const [total_words, settotal_words] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/analytics/`,
          {
            headers: {
              Authorization: `Bearer ${userData.access_token}`,
            },
          }
        );

        console.log(res);
        setpublicdata(res.data.public);
        setprivatedata(res.data.private);
        setstories_written(res.data.stories_written);
        settotal_words(res.data.total_words);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userData.access_token]);

  const MetricValues = [
    {
      title: "Words Translated",
      value: total_words,
      description: "Total words translated",
    },
    {
      title: "Public Stories",
      value: publicdata,
      description: "Total public stories",
    },
    {
      title: "Private Stories",
      value: privatedata,
      description: "Total private stories",
    },
    {
      title: "Stories Written",
      value: stories_written,
      description: "Total stories written",
    },
  ];

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
                  <TableHead>Title</TableHead>
                  <TableHead>caption</TableHead>
       
                  <TableHead>Public</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pdfs.length > 0 ? (
                  pdfs.map((pdf: any) => (
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
                        <div
                          className="truncate max-w-[150px] md:max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap"
                          title={pdf["caption"]}
                        >
                          {pdf["caption"]}
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
                        <a
                          href={pdf?.pdf_file}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            className="hover:bg-green-700 text-white bg-blue-600"
                            size="sm"
                          >
                            <Eye size={15} />
                            <span className="md:flex hidden ml-1">PDF</span>
                          </Button>
                        </a>
                        {/* <a
                          href={pdf?.pdf_file}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Eye size={15} />
                          <span className="md:flex hidden ml-1">PDF</span>
                        </a> */}
                        {/* <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <Eye size={15} />
                          <span className="md:flex hidden ml-1">View</span>
                        </Button> */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            axios.delete(
                              `${process.env.NEXT_PUBLIC_ROOT_URL}/teacher/content-management/${pdf.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${userData.access_token}`,
                                },
                              }
                            );
                            fetchPdfData(); // Reload data after deletion
                          }}
                        >
                          <AiFillDelete size={15} />
                          <span className="md:flex hidden ml-1">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center pt-4">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
