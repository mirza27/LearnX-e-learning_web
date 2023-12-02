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
import CreateTask from "./CreateTask";
import CreateMaterial from "./CreateMaterial";
import CreateAnnoun from "./CreateAnnouncement";
import CreateClass from "./CreateClass";
import AnnouncementPage from "../AnnouncementPage";
import MaterialPage from "../MaterialPage";
import LecturerTask from "./LecturerTask";
import Attachment from "./Attachment";
import LecturerTaskUploadDetail from "./LectrerTaskUploadDetail";

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
        const lecturer = responseData.lecturer;
        setLecturer_id(lecturer.lecturer_id);
        setFirstName(lecturer.firstname);
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
        <Navbar user_id={lecturer_id} firstname={firstname} />
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
            path="/myclass/create"
            element={<CreateClass lecturer_id={lecturer_id} />}
          />
          <Route
            path="/task/create"
            element={<CreateTask lecturer_id={lecturer_id} />}
          />
          <Route
            path="/material/create"
            element={<CreateMaterial lecturer_id={lecturer_id} />}
          />

          <Route
            path="/announcement/create"
            element={<CreateAnnoun lecturer_id={lecturer_id} />}
          />
          <Route
            path="/myclass/content/announcement"
            element={<AnnouncementPage is_lecturer={true} />}
          />
          <Route
            path="/myclass/content/material"
            element={<MaterialPage is_lecturer={true} />}
          />
          <Route
            path="/myclass/content/task"
            element={<LecturerTask is_lecturer={true} />}
          />
          <Route
            path="/attachment"
            element={<Attachment lecturer_id={lecturer_id} />}
          />
          <Route
            path="/myclass/content/task/student-task"
            element={<LecturerTaskUploadDetail lecturer_id={lecturer_id} />}
          />
        </Routes>
      </section>
      .
    </>
  );
}

export default LecturerPage;
