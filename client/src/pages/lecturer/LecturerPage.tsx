import React, { SyntheticEvent, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LecturerSidebar from "../../components/LecturerSidebar";
import Navbar from "../../components/Navbar";
import LecturerDashboard from "./LecturerDashboard";
import LecturerClass from "./LecturerClass";
import LecturerClassContent from "./LecturerClassContent";
import "../../styles/content.css";
import { SidebarListener } from "../../eventListener/SidebarListener";
import LecturerTask from "./LecturerTask";

function LecturerPage() {
  const [firstname, setFirstName] = useState("");
  const [lecturer_id, setLecturer_id] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const jwt = require("jsonwebtoken");

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
        const lecturer = responseData.lecturer;
        setLecturer_id(lecturer.lecturer_id);
        setFirstName(lecturer.firstname);

        // menyimpan token ke local
        localStorage.setItem("token", responseData.token);
      } else {
        // Pengguna tidak memiliki cookie, arahkan ke rute /login
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // try {
  //   const decoded = jwt.verify(
  //     localStorage.getItem("token"),
  //     "hagsydgsdjkasdkbh7yiuJHBJGCD"
  //   );
  //   console.log(decoded);
  //   // Token valid, Anda dapat menggunakannya dalam aplikasi Anda
  //   if (!decoded) {
  //     navigate("/login");
  //   }
  // } catch (error) {
  //   console.error("Token tidak valid atau kadaluwarsa:", error);
  // }

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
          {/* <Route path="/" /> */}
          <Route
            path="/dashboard"
            element={
              <LecturerDashboard
                lecturer_id={lecturer_id}
                firstname={firstname}
              />
            }
          />
          <Route
            path="/myclass"
            element={
              <LecturerClass lecturer_id={lecturer_id} firstname={firstname} />
            }
          />
          <Route
            path="/myclass/content"
            element={
              <LecturerClassContent
                lecturer_id={lecturer_id}
                firstname={firstname}
              />
            }
          />
          <Route
            path="/task/create"
            element={<LecturerTask lecturer_id={lecturer_id} />}
          />
        </Routes>
      </section>
      .
    </>
  );
}

export default LecturerPage;
