import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { SidebarListener } from "../../eventListener/SidebarListener";
import Navbar from "../../components/Navbar";
import StudentDashboard from "./StudentDashboard";
import StudentClass from "./StudentClass";

import "../../styles/content.css";

function StudentPage() {
  useEffect(() => {
    SidebarListener(); //script sidebar

    return () => {
      // Hapus event listener di sini jika diperlukan
    };
  }, []);

  return (
    <>
      <Sidebar />
      <section id="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/class" element={<StudentClass />} />
        </Routes>
      </section>
    </>
  );
}

export default StudentPage;
