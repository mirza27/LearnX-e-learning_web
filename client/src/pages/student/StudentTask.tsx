import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/eventDetail.css";

interface StudentClassTaskProps {
  student_id: string;
}

function StudentTask(props: StudentClassTaskProps) {
  const location = useLocation();
  const event_id = location.state && location.state.event_id;
  const navigate = useNavigate();
  const { student_id } = props;
  const [message, setMessage] = useState("");
  const [taskData, setTaskData] = useState<any>(null);

  const GetTask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/student/class/content/task/${event_id}/${student_id}`,
        {}
      );
      setTaskData(response.data);
      console.log(response);
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
    GetTask();
  }, [student_id]);

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Task</h1>
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
              <a className="" href="#">
                Content
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Task
              </a>
            </li>
          </ul>
        </div>
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Download PDF</span>
        </a>
      </div>
      <div className="task-detail-container">
        {taskData && (
          <div>
            <h1 className="task-title">{taskData.event_name}</h1>
            <div className="task-meta">
              <p>Created At: {taskData.createdAt}</p>
            </div>
            {taskData.tasks && taskData.tasks.length > 0 ? (
              taskData.tasks.map((task: any) => (
                <div key={task.task_name} className="task-content">
                  <h2>{task.task_name}</h2>
                  <p>{task.task_desc}</p>
                  <p>
                    Link:{" "}
                    <a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {task.link}
                    </a>
                  </p>
                  <p>Deadline: {task.deadline}</p>
                  {task.task_uploads && task.task_uploads.length > 0 ? (
                    <div className="task-uploads">
                      <h3>Task Uploads</h3>
                      {task.task_uploads.map((upload: any) => (
                        <div
                          key={upload.task_Upload_id}
                          className="task-upload"
                        >
                          <p>Student ID: {upload.student_id}</p>
                          <p>
                            Link:{" "}
                            <a
                              href={upload.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {upload.link}
                            </a>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-task-message">
                      Anda belum mengumpulkan tugas
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="no-task-message">Tidak ada tugas yang tersedia</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default StudentTask;
