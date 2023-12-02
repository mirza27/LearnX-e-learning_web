import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/eventDetail.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Modal from "react-modal";

interface EventProps {
  is_lecturer: boolean;
}

function LecturerTask(props: EventProps) {
  const location = useLocation();
  const event_id = location.state && location.state.event_id;
  const navigate = useNavigate();
  const { is_lecturer } = props;
  const [message, setMessage] = useState("");
  const [taskData, setTaskData] = useState<any>(null);
  const [taskUpload, setTaskUpload] = useState<any[]>([]);

  const [pdfUrl, setPdfUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const GetTask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lecturer/my-class/content/task/${event_id}`,
        {}
      );
      setTaskData(response.data);
      console.log(response.data);
      if (response.data.message) {
        setMessage(response.data.message);
      }

      if (
        // mengambil task_id untuk menagmbil data taskUpload
        response.data.tasks &&
        response.data.tasks.length > 0 &&
        response.data.tasks[0].task_id &&
        response.data.class_id
      ) {
        const taskId = response.data.tasks[0].task_id;
        const classId = response.data.class_id;
        GetTaskUpload(taskId, classId);
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

  // mengambil data taskUpload siswa
  const GetTaskUpload = async (task_id: string, class_id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lecturer/my-class/content/task/taskUpload/${task_id}/${class_id}`,
        {}
      );
      console.log(response.data);
      setTaskUpload(response.data);

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

  const showPdf = (pdfLink: string) => {
    setPdfUrl(pdfLink);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const downloadPdf = (downloadLink: string) => {
    // Membuka tautan PDF di tab/window baru dan memberi opsi unduh
    const link = document.createElement("a");
    link.href = downloadLink;
    link.target = "_blank";
    link.download = "material.pdf";
    link.click();
  };

  // navigasi ke class content / detail kelas
  const goToTaskUploadDetail = (task_upload_id: any, student_name: string) => {
    if (task_upload_id) {
      navigate("student-task", {
        state: {
          task_upload_id: task_upload_id,
          student_name: student_name,
        },
      });
    } else {
      console.error("Task Upload ID is not available.");
      // Optionally, you can add further handling for the case when task_upload_id is not available
    }
  };

  useEffect(() => {
    if (is_lecturer) {
      GetTask();
    }
  }, [is_lecturer]);

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
                My Class
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
      </div>

      {/* TASK CONTENT */}
      <div className="task-detail-container">
        {taskData && (
          <div>
            <h1 className="task-title">{taskData.event_name}</h1>
            <div className="task-meta">
              <p>
                {new Date(taskData.createdAt).toLocaleString("en-ID", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </div>
            {taskData.tasks && taskData.tasks.length > 0 ? (
              taskData.tasks.map((task: any) => (
                <div key={task.task_name} className="task-content">
                  <h2>Task Name : {task.task_name}</h2>

                  {task.file && (
                    <>
                      <button onClick={() => showPdf(task.file)}>
                        Look Task Document
                      </button>
                      <button onClick={() => downloadPdf(task.file)}>
                        Download Taks Document
                      </button>
                      <p>
                        Task link :<a href={task.file}> {task.file}</a>
                      </p>
                    </>
                  )}
                  {task.link && (
                    <p>
                      Task Link :<a href={task.link}>{task.link}</a>
                    </p>
                  )}

                  {task.deadline && (
                    <p>
                      Deadline:{" "}
                      {new Date(task.deadline).toLocaleString("en-ID", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
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

      {/* TABLE */}
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Student Task Attachment</h3>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Time Submited</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {taskUpload.map((item) => (
                <tr
                  key={item.student_id}
                  onClick={
                    item.task_upload && item.task_upload.task_upload_id
                      ? () =>
                          goToTaskUploadDetail(
                            item.task_upload.task_upload_id,
                            item.firstname
                          )
                      : undefined
                  }
                >
                  <td>
                    <img src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1701435649/wtg263ifmmxdizglhfc9.png" />
                    <p>{`${item.firstname} ${item.lastname}`}</p>
                  </td>
                  <td>
                    {item.task_upload ? (
                      <>
                        {new Date(item.task_upload.updatedAt).toLocaleString(
                          "en-ID",
                          {
                            dateStyle: "short",
                            timeStyle: "short",
                          }
                        )}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    {item.task_upload ? (
                      item.task_upload.is_late === false ? (
                        <span className="status completed">Submitted</span>
                      ) : (
                        <span className="status process">Submitted Late</span>
                      )
                    ) : (
                      <span className="status pending">Not Submitted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DOCUMENT */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="PDF Viewer Modal"
        style={{
          content: {
            width: "60%", // Sesuaikan dengan ukuran yang diinginkan
            height: "100%", // Sesuaikan dengan ukuran yang diinginkan
            margin: "auto",
            border: "1px solid #ccc", // Contoh properti style lainnya
            borderRadius: "8px", // Contoh properti style lainnya
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Contoh properti style lainnya
            zIndex: 1001,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Contoh properti style untuk overlay
            zIndex: 999,
          },
        }}
      >
        {pdfUrl && (
          <div>
            {pdfUrl.endsWith(".pdf") ? (
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer fileUrl={pdfUrl} />
              </Worker>
            ) : (
              <img src={pdfUrl} alt="Image" />
            )}
          </div>
        )}
        <button className="close-modal" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </main>
  );
}

export default LecturerTask;
