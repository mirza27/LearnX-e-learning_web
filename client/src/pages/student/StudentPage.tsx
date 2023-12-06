import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";
import { SidebarListener } from "../../eventListener/SidebarListener";
import Navbar from "../../components/Navbar";
import StudentDashboard from "./StudentDashboard";
import StudentClass from "./StudentClass";
import StudentClassContent from "./StudentClassContent";
import { useNavigate } from "react-router-dom";
import StudentTask from "./StudentTask";
import AnnouncementPage from "../AnnouncementPage";
import MaterialPage from "../MaterialPage";
import StudentTaskUpdate from "./UpdateTask";
import StudentTaskList from "./StudentTaskList";
import Logout from "../Logout";
// import "../../styles/content.css";

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
        const student = responseData.student;
        setStudent_id(student.student_id);
        setFirstName(student.firstname);
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
        <Navbar user_id={student_id} firstname={firstname} />
        <Routes>
          {/* <Route path="/" /> */}
          <Route
            path="/dashboard"
            element={<StudentDashboard student_id={student_id} />}
          />
          <Route
            path="/class"
            element={<StudentClass student_id={student_id} />}
          />
          <Route
            path="/mytask"
            element={<StudentTaskList student_id={student_id} />}
          />
          <Route
            path="/class/content"
            element={<StudentClassContent student_id={student_id} />}
          />
          <Route
            path="/class/content/task"
            element={<StudentTask student_id={student_id} />}
          />
          <Route
            path="/class/content/announcement"
            element={<AnnouncementPage is_lecturer={false} />}
          />
          <Route
            path="/class/content/material"
            element={<MaterialPage is_lecturer={false} />}
          />
          <Route
            path="/class/content/task/update"
            element={<StudentTaskUpdate student_id={student_id} />}
          />
          <Route path="/logout" element={<Logout user_id={student_id} />} />
        </Routes>
      </section>
    </>
  );
}

export default StudentPage;
