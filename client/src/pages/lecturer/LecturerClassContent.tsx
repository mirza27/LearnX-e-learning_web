import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";
import "../../styles/classContent.css";
import "../../styles/eventList.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

interface LecturerClassContentProps {
  lecturer_id: string;
  firstname: string;
}

function LecturerClassContent(props: LecturerClassContentProps) {
  const location = useLocation();
  const class_id = location.state && location.state.class_id;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { lecturer_id } = props;
  const { firstname } = props;

  // path action add button
  const menuItem = [
    {
      path: "/lecturer/task/create",
      name: "Add Task",
      icon: "fluent:clipboard-task-24-regular",
    },
    {
      path: "/lecturer/material/create",
      name: "Add Material",
      icon: "bx:book",
    },
    {
      path: "/lecturer/announcement/create",
      name: "Announcement",
      icon: "mdi:announcement-outline",
    },
  ];

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
        `http://localhost:5000/lecturer/getclass/${class_id}`,
        {}
      );
      setClassData(responseClassData.data);

      // mengambil data setiap item
      const response = await axios.get(
        `http://localhost:5000/lecturer/my-class/content/${class_id}`,
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

  // navigasi ke class content / detail kelas
  const goToLecturerTaskDetail = (event_id: any) => {
    navigate("task", { state: { event_id } });
  };
  const goToLecturerMaterialDetail = (event_id: any) => {
    navigate("material", { state: { event_id } });
  };
  const goToLecturerAnnouncementDetail = (event_id: any) => {
    navigate("announcement", { state: { event_id } });
  };

  useEffect(() => {
    if (lecturer_id) {
      GetClassList();
    }
  }, [lecturer_id]);

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>My Class</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="" href="#">
                My Class
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
        <Link to="student-edit" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Edit Student</span>
        </Link>
      </div>
      {/* MAIN HEADER / CLASS BANNER */}
      {classData ? (
        <div className="class-banner">
          <h1>{classData.class_name}</h1>
          <p>{classData.desc}</p>
          <p>#{classData.code}</p>
          <p>
            Created At :{" "}
            {new Date(classData.createdAt).toISOString().split("T")[0]}
          </p>
        </div>
      ) : (
        <p>Loading class data...</p>
      )}

      {/* LOOP EVENT EVENT CLASS */}
      <ul className="box-info">
        {dataEvent.map((event, index) =>
          event.materials.length > 0 ? ( // Kondisi pertama
            <div className="box-item blog-card" key={index}>
              <Icon className="bx-material" icon="bx:book" />

              <div
                className="description"
                onClick={() => goToLecturerMaterialDetail(event.event_id)}
              >
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
            <div className="box-item blog-card" key={index}>
              <Icon
                className="bx-task"
                icon="fluent:clipboard-task-24-regular"
              />

              <div
                className="description"
                onClick={() => goToLecturerTaskDetail(event.event_id)}
              >
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
            <div className="box-item blog-card" key={index}>
              <Icon
                className="bx-announcement"
                icon="mdi:announcement-outline"
              />

              <div
                className="description"
                onClick={() => goToLecturerAnnouncementDetail(event.event_id)}
              >
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

      {/* action button */}
      <div className="floating-container">
        <div className="floating-button">+</div>
        <div className="element-container">
          {menuItem.map((item, index) => (
            <>
              <NavLink to={item.path} key={index} className="link">
                <a href="#">
                  <span className="float-element tooltip-left">
                    <Icon className="material-icons" icon={item.icon} />
                  </span>
                </a>
              </NavLink>
            </>
          ))}
        </div>
      </div>
      {/* end action button  */}
    </main>
  );
}

export default LecturerClassContent;
