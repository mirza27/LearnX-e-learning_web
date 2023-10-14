import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LecturerSidebar from "../../components/LecturerSidebar";
import { SidebarListener } from "../../eventListener/SidebarListener";
import Navbar from "../../components/Navbar";
import LecturerDashboard from "./LecturerDashboard";
import LecturerClass from "./LecturerClass";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../../styles/content.css";

function LecturerPage() {
  const [firstname, setFirstName] = useState("");
  const [lecturer_id, setLecturer_id] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      // tidak menggunakan axios agar tidak lansung
      const response = await fetch("http://localhost:5000/lecturer", {
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
        // mengambil data Lecturer
        const lecturer = responseData;
        setLecturer_id(lecturer.Lecturer_id);
        setFirstName(lecturer.firstname);
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
      <LecturerSidebar />
      <section id="content">
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<LecturerDashboard />} />
          <Route path="/class" element={<LecturerClass />} />
        </Routes>
      </section>
    </>
  );
}

export default LecturerPage;
