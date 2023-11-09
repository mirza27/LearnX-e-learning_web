import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/classContent.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

interface StudentClassContentProps {
  student_id: string;
  firstname: string;
}

function StudentClassContent(props: StudentClassContentProps) {
  const location = useLocation();
  const class_id = location.state && location.state.class_id;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { student_id } = props;
  const { firstname } = props;

  // deklarasi data untuk response
  const [dataEvent, setDataEvent] = useState<
    {
      event_category_id: number;
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
    if (!student_id) {
      navigate("/login");
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/student/class/content/${class_id}`,
        {}
      );
      console.log(response.data);
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

  useEffect(() => {
    GetClassList();
  }, [student_id]);

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
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Download PDF</span>
        </a>
      </div>
      {/* MAIN HEADER / BANNER */}

      {/* LOOP EVENT EVENT CLASS */}
      <ul className="box-info">
        {dataEvent.map((event, index) =>
          event.materials.length > 0 ? ( // Kondisi pertama
            <div className="box-item" key={index}>
              <li>
                <Icon className="bx-material" icon="bx:book" />

                {event.materials.map((material) => (
                  <>
                    <span className="text">
                      <h4>{event.event_name}</h4>
                      <h3>MATERIAL : {material.material_name}</h3>
                    </span>
                  </>
                ))}
                <div>
                  <p>{event.createdAt}</p>
                </div>
              </li>
            </div>
          ) : event.tasks.length > 0 ? ( // Kondisi kedua
            <div className="box-item" key={index}>
              <li>
                <Icon
                  className="bx-task"
                  icon="fluent:clipboard-task-24-regular"
                />
                {event.tasks.map((task) => (
                  <>
                    <span className="text">
                      <h4>{event.event_name}</h4>
                      <h3>TASK : {task.task_name}</h3>
                    </span>
                  </>
                ))}
                <div>
                  <p>{event.createdAt}</p>
                </div>
              </li>
            </div>
          ) : event.announcements.length > 0 ? ( // Kondisi ketiga
            <div className="box-item" key={index}>
              <li>
                <Icon
                  className="bx-announcement"
                  icon="mdi:announcement-outline"
                />
                {event.announcements.map((announcement) => (
                  <>
                    <span className="text">
                      <h4>{event.event_name}</h4>
                      <h3>TASK : {announcement.nama}</h3>
                    </span>
                  </>
                ))}
                <div>
                  <p>{event.createdAt}</p>
                </div>
              </li>
            </div>
          ) : null
        )}
      </ul>
    </main>
  );
}

export default StudentClassContent;
