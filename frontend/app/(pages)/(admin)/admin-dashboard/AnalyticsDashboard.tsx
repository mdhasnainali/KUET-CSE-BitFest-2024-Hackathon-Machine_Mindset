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

import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";

// const pdfData = [
//   { id: 1, name: "Story_1.pdf", isPublic: true, user: "Md tofaal Ahmed" },
//   {
//     id: 2,
//     name: "Translation_2.pdf",
//     isPublic: false,
//     user: "Md tofaal Ahmed",
//   },
//   { id: 1, name: "Story_1.pdf", isPublic: true, user: "Md tofaal Ahmed" },
//   {
//     id: 2,
//     name: "Translation_2.pdf",
//     isPublic: false,
//     user: "Md tofaal Ahmed",
//   },
// ];

const AnalyticsDashboard = () => {
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  // Students
  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/administrator/students/`,
          {
            headers: {
              Authorization: `Bearer ${userData.access_token}`,
            },
          }
        );
        setStudents(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch students");
      }
    };

    fetchData();
  }, [userData.access_token]);
  const DeleteStudent = async (id: number) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/administrator/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
          },
        }
      );
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error("Failed to delete Student");
    }
  };
  // Teacher
  const [teachers, setTeachers] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/administrator/teachers/`,
          {
            headers: {
              Authorization: `Bearer ${userData.access_token}`,
            },
          }
        );
        setTeachers(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch teachers");
      }
    };

    fetchData();
  }, [userData.access_token]);
  const DeleteTeacher = async (id: number) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/administrator/teachers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
          },
        }
      );
      toast.success("Teacher deleted successfully");
    } catch (error) {
      toast.error("Failed to delete Teacher");
    }
  };
  // metric values
  const MetricValuesAdmin = [
    {
      title: "Total Students",
      value: students.length,
      description: "Total students registered",
    },
    {
      title: "Total Teachers",
      value: teachers.length,
      description: "Number of teachers registered",
    },
    {
      title: "Chatbot Interactions",
      value: "328",
      description: "Total chatbot conversations",
    },
    { title: "Total Pdf", value: "12", description: "Number of Padf" },
  ];

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
        <div className="space-y-4">
          {/* All pdfs */}
          {/* <Card>
            <CardHeader>
              <CardTitle>All PDFs</CardTitle>
              <CardDescription>Manage exported PDF files</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Created By</TableHead>
                    <TableHead>Pdf Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pdfData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="flex items-center justify-end space-x-2">
                        <Button variant="destructive" size="sm">
                          <AiFillDelete size={15} />
                          <span className="md:flex hidden ml-1">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card> */}
          {/* students */}
          <Card>
            <CardHeader>
              <CardTitle>All Students</CardTitle>
              <CardDescription>Manage All Students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.roll}</TableCell>
                      <TableCell>{item.level}</TableCell>
                      <TableCell className="flex items-center justify-end space-x-2">
                        <Button
                          onClick={() => DeleteStudent(item.id)}
                          variant="destructive"
                          size="sm"
                        >
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
          {/* Teacher */}
          <Card>
            <CardHeader>
              <CardTitle>All Teachers</CardTitle>
              <CardDescription>Manage All Teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell className="flex items-center justify-end space-x-2">
                        <Button
                          onClick={() => DeleteTeacher(item.id)}
                          variant="destructive"
                          size="sm"
                        >
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
    </div>
  );
};

export default AnalyticsDashboard;
