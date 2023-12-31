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
import StudentForum from "./StudentForum";
import axios from "axios";
import { io } from "socket.io-client";
// import "../../styles/content.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const socket = io(`${API_BASE_URL}`);

function StudentPage() {
  const [firstname, setFirstName] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      // tidak menggunakan axios agar tidak lansung
      const response = await fetch(`${API_BASE_URL}/student`, {
        headers: {
          "content-Type": "application/json",
        },
        mode: "cors",
        method: "GET",
        credentials: "include", // Mengambil cookie
      });

      const responseData = await response.json();
      console.log("Response Status: ", response.status);

      console.log("lecturer Data: ", responseData);

      // mengambil pesan
      if (responseData.message) {
        setMessage(responseData.message);
      }

      if (response.ok) {
        // mengambil data Lecturer
        const student = responseData.student;
        setStudent_id(student.student_id);
        setFirstName(student.firstname);
      } else {
        // Pengguna tidak memiliki cookie, arahkan ke rute /login
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        // Log the raw response body
        console.log(
          "Received the following instead of valid JSON:",
          error.response.data
        );
      }
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
            path="/forum"
            element={
              <StudentForum
                student_id={student_id}
                firstname={firstname}
                socket={socket}
              />
            }
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
