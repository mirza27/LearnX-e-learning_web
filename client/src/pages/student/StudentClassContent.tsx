import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/classContent.css";
import "../../styles/eventList.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

interface StudentClassContentProps {
  student_id: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function StudentClassContent(props: StudentClassContentProps) {
  const location = useLocation();
  const class_id = location.state && location.state.class_id;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { student_id } = props;

  // deklarasi data untuk response
  const [classData, setClassData] = useState<any>(null);
  const [dataEvent, setDataEvent] = useState<
    {
      event_category_id: number;
      event_id: number;
      event_name: string;
      createdAt: string;
      materials: Array<{
        material_id: number;
        material_name: string;
        file: string | null;
        link: string;
      }>;
      tasks: Array<{
        task_id: number;
        task_name: string | null;
        task_desc: string;
        file: string | null;
        link: string;
        deadline: string | null;
      }>;
      announcements: Array<{
        nama: string;
        content: string;
      }>;
    }[]
  >([]);

  const GetClassList = async () => {
    try {
      // mengambil data class
      const responseClassData = await axios.get(
        `${API_BASE_URL}/student/getclass/${class_id}`,
        {}
      );
      setClassData(responseClassData.data);

      const response = await axios.get(
        `${API_BASE_URL}/student/class/content/${class_id}`,
        {}
      );

      setDataEvent(response.data);

      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };

  const leaveClass = async () => {
    try {
      if (student_id && class_id) {
        const result = await Swal.fire({
          title: "Leave Class",
          text: "Are you sure want to leave this class",
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          input: "checkbox",
          inputPlaceholder: "",
          inputAttributes: {
            style: "display:none",
          },
          showCancelButton: true,
          backdrop: false,
          preConfirm: async () => {
            try {
              const response = await axios.post(
                `${API_BASE_URL}/student/class/content/leave`,
                {
                  student_id: student_id,
                  class_id: class_id,
                }
              );

              if (response.data.success) {
                Swal.fire({
                  title: "Success!",
                  text: "You have successfully leave this class",
                  icon: "success",
                });

                // Refresh halaman class setelah penghapusan berhasil
                navigate("/student/class");
              } else {
                throw new Error(response.data.message || "Deletion failed");
              }
            } catch (error: any) {
              Swal.fire({
                title: "Error!",
                text:
                  error.message ||
                  "An error occurred while deleting the student.",
                icon: "error",
              });
            }
          },
        });

        if (
          result.isDismissed &&
          result.dismiss === Swal.DismissReason.cancel
        ) {
          console.log("Deletion canceled");
        }
      } else {
        console.error("Student is not available.");
        // Optionally, you can add further handling for the case when student_id or class_id is not available
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  // navigasi ke class content / detail kelas
  const goToStudentTaskDetail = (event_id: any) => {
    navigate("task", { state: { event_id } });
  };
  const goToStudentMaterialDetail = (event_id: any) => {
    navigate("material", { state: { event_id } });
  };
  const goToStudentAnnouncementDetail = (event_id: any) => {
    navigate("announcement", { state: { event_id } });
  };

  useEffect(() => {
    if (student_id) {
      GetClassList();
    }
  }, [student_id]);

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Class</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="" href="#">
                Class
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Content
              </a>
            </li>
          </ul>
        </div>
        <a className="btn-download" onClick={() => leaveClass()}>
          <i className="bx bxs-log-out-circle"></i>
          <span className="text">Leave Class</span>
        </a>
      </div>
      {/* MAIN HEADER / BANNER */}
      {classData ? (
        <div className="class-banner">
          <h1>{classData.class_name}</h1>
          <p>{classData.desc}</p>
          <p>
            Created At :{" "}
            {new Date(classData.createdAt).toISOString().split("T")[0]}
          </p>
        </div>
      ) : (
        <p>Loading class data...</p>
      )}

      {/* LOOP EVENT EVENT CLASS */}
      <ul className="box-info event-item">
        {dataEvent.map((event, index) =>
          event.materials.length > 0 ? ( // Kondisi pertama
            <div
              className="box-item blog-card"
              onClick={() => goToStudentMaterialDetail(event.event_id)}
              key={event.event_id}
            >
              <Icon className="bx-material" icon="bx:book" />

              <div className="description">
                {event.materials.map((material) => (
                  <>
                    <h1 className="material">{event.event_name}</h1>
                    <h2>MATERIAL : {material.material_name}</h2>
                  </>
                ))}
                <p className="read-more">
                  <a href="#">
                    {new Date(event.createdAt).toLocaleString("en-US", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </a>
                </p>
              </div>
            </div>
          ) : event.tasks.length > 0 ? ( // Kondisi kedua
            <div
              className="box-item blog-card"
              onClick={() => goToStudentTaskDetail(event.event_id)}
              key={event.event_id}
            >
              <Icon
                className="bx-task"
                icon="fluent:clipboard-task-24-regular"
              />

              <div className="description">
                {event.tasks.map((task) => (
                  <>
                    <h1 className="task">{event.event_name}</h1>
                    <h2>TASK : {task.task_name}</h2>
                  </>
                ))}
                <p className="read-more">
                  <a href="#">
                    {new Date(event.createdAt).toLocaleString("en-US", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </a>
                </p>
              </div>
            </div>
          ) : event.announcements.length > 0 ? ( // Kondisi ketiga
            <div
              className="box-item blog-card"
              onClick={() => goToStudentAnnouncementDetail(event.event_id)}
              key={event.event_id}
            >
              <Icon
                className="bx-announcement"
                icon="mdi:announcement-outline"
              />

              <div className="description">
                {event.announcements.map((announcement) => (
                  <>
                    <h1 className="announcement">{event.event_name}</h1>
                    <h2>ANNOUNCEMENT : {announcement.nama}</h2>
                  </>
                ))}
                <p className="read-more">
                  <a href="#">
                    {new Date(event.createdAt).toLocaleString("en-US", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </a>
                </p>
              </div>
            </div>
          ) : null
        )}
      </ul>
    </main>
  );
}

export default StudentClassContent;
