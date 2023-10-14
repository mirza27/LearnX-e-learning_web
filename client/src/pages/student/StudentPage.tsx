import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";
import { SidebarListener } from "../../eventListener/SidebarListener";
import Navbar from "../../components/Navbar";
import StudentDashboard from "./StudentDashboard";
import StudentClass from "./StudentClass";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../../styles/content.css";

function StudentPage() {
  const [firstname, setFirstName] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      // tidak menggunakan axios agar tidak lansung
      const response = await fetch("http://localhost:5000/student", {
        headers: {
          "content-type": "application/json",
        },
        mode: "cors",
        method: "GET",
        credentials: "include", // Mengambil cookie
      });

      const responseData = await response.json();

      // mengambil pesan
      if (responseData.message) {
        setMessage(responseData.message);
      }

      if (response.ok) {
        // mengambil data student
        const student = responseData;
        setStudent_id(student.student_id);
        setFirstName(student.firstname);
        console.log(message);
      } else {
        // Pengguna tidak memiliki cookie, arahkan ke rute /login
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    SidebarListener(); //script sidebar
    checkAuth();
  }, []);

  return (
    <>
      <StudentSidebar />
      <section id="content">
        <Navbar />
        <Routes>
          {/* <Route path="/" /> */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/class" element={<StudentClass />} />
        </Routes>
      </section>
    </>
  );
}

export default StudentPage;
