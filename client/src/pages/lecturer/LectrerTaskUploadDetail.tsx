import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/eventDetail.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Modal from "react-modal";
import styled from "styled-components";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface EventProps {
  lecturer_id: string;
}

const StyledScore = styled.span`
  color: var(--orange); /* Warna teks kuning */
  margin-right: 4px;
  display: inline-block;
  font-size: 1.2em; /* Ukuran teks */
`;

function LecturerTaskUploadDetail(props: EventProps) {
  const location = useLocation();
  const task_upload_id = location.state && location.state.task_upload_id;
  const student_name = location.state && location.state.student_name;
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const { lecturer_id } = props;
  const [message, setMessage] = useState("");
  const [taskUploadData, setTaskUploadData] = useState<any>(null);

  const [pdfUrl, setPdfUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const GetTask = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lecturer/my-class/content/getTaskUpload/${task_upload_id}`,
        {}
      );
      setTaskUploadData(response.data);

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

  const handleButtonClick = () => {
    Swal.fire({
      title: "Give Score",
      text: "Give score for student task assignment",
      customClass: {
        popup: "custom-popup-class",
        title: "custom-title-class",
      },
      input: "number",
      inputPlaceholder: "Enter Score (1-100)",
      showCancelButton: true,
      backdrop: false,
      inputValidator: (value) => {
        const parsedValue = parseInt(value, 10);

        if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 100) {
          return "Please enter a valid score between 1 and 100";
        }
      },
      preConfirm: (value) => {
        return (
          axios
            .post(
              `${API_BASE_URL}/lecturer/my-class/content/getTaskUpload/scoring`,
              {
                task_upload_id: task_upload_id,
                score: value,
              }
            )
            .then((response) => {
              Swal.fire({
                title: "Success!",
                text: "Scoring Task successfully",
                icon: "success",
              });

              navigate("/lecturer/myclass/content/task/student-task", {
                state: {
                  task_upload_id: task_upload_id,
                  student_name: student_name,
                },
              });
              GetTask();
            })
            // jika kelas gagal ditambahkan / terdapat error
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
              });
            })
        );
      },
    });
  };

  useEffect(() => {
    if (lecturer_id && task_upload_id && student_name) {
      GetTask();
    }
  }, [lecturer_id]);

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
              <a className="" href="#">
                Task
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Assignment
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* TASK CONTENT */}
      <div className="task-detail-container">
        {taskUploadData && (
          <div>
            <h1 className="task-title">Task Assignment : </h1>
            <div className="task-meta">
              <p>
                {new Date(taskUploadData.updatedAt).toLocaleString("en-ID", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </div>

            <div className="task-content">
              <h2>Student Name : {student_name}</h2>

              {taskUploadData.file && (
                <>
                  <button onClick={() => showPdf(taskUploadData.file)}>
                    Look Task Document
                  </button>
                  <button onClick={() => downloadPdf(taskUploadData.file)}>
                    Download Taks Document
                  </button>
                  <p>
                    Task File link :
                    <a href={taskUploadData.file}> {taskUploadData.file}</a>
                  </p>
                </>
              )}
              {taskUploadData.link && (
                <p>
                  Task Link :
                  <a href={taskUploadData.link}>{taskUploadData.link}</a>
                </p>
              )}

              <div className="late-status">
                {taskUploadData.is_late == "1" ? (
                  <p className="late">*Submited Late*</p>
                ) : (
                  <p className="not-late">*Submited*</p>
                )}
              </div>
              {taskUploadData.score ? (
                <StyledScore>{`${taskUploadData.score}/100`}</StyledScore>
              ) : (
                <>
                  {/* Tombol submit dengan properti onClick */}
                  <button onClick={handleButtonClick}>Give Score</button>
                </>
              )}
            </div>
          </div>
        )}
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

export default LecturerTaskUploadDetail;
