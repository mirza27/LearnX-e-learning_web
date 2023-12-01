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
