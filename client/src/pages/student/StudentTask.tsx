import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/eventDetail.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { cloudinaryConfigTaskUpload } from "../../cloudinaryConfig";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Modal from "react-modal";

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

  const [pdfUrl, setPdfUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // link file
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // file yang harus dikirim
  const [link, setLink] = useState(""); // link task upload
  const [comment, setComment] = useState(""); // komen task upload

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  // melakukan upload file untuk mendapat link file
  const handleUpload = async () => {
    if (selectedFile) {
      // form untuk data file upload
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", cloudinaryConfigTaskUpload.uploadPreset);
      formData.append("folder", cloudinaryConfigTaskUpload.folder_name);

      try {
        const response = await fetch(
          cloudinaryConfigTaskUpload.CLOUDINARY_URL,
          {
            method: "POST",
            mode: "cors",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUploadedImage(data.secure_url);
        } else {
          console.error("Gagal mengunggah file ke Cloudinary");
        }
      } catch (error: any) {
        if (error) {
          Swal.fire({
            title: "Error!",
            text: "Gagal mengunggah file",
            icon: "error",
          });
        }
      }
    }
  };

  // melakukan upload ke backend setelah mendapat link upload file
  const handleSubmit = async (taskId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/student/class/content/task/upload",
        {
          task_id: taskId,
          student_id: student_id,
          link: link,
          file: uploadedImage,
          coment: comment,
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
        });
        window.location.reload();
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    }

    navigate("", { state: { event_id } }); // reload halaman setelah submit
  };

  // navigasi untuk update task
  const updateTaskUpload = (task_upload_id: any) => {
    navigate("update", { state: { task_upload_id } });
  };

  useEffect(() => {
    if (student_id) {
      GetTask();
    }
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

            {taskData.tasks && taskData.tasks.length > 0 ? (
              taskData.tasks.map((task: any) => (
                <>
                  <div key={task.task_name} className="task-content">
                    <h2>Task Name : {task.task_name}</h2>
                    <div className="task-meta">
                      <p>
                        Created at : {}
                        {new Date(taskData.createdAt).toLocaleString("en-ID", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>

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

                    <div className="task-detail-container">
                      {task.task_uploads && task.task_uploads.length > 0 ? (
                        <div className="task-uploads">
                          <h3>Your Assignment </h3>
                          <hr />
                          <br />
                          {task.task_uploads.map((upload: any) => (
                            <>
                              <div key={upload.task_Upload_id} className="">
                                {upload.file && (
                                  <>
                                    <button
                                      onClick={() => showPdf(upload.file)}
                                    >
                                      Look Task Document
                                    </button>
                                    <button
                                      onClick={() => downloadPdf(upload.file)}
                                    >
                                      Download Task Document
                                    </button>
                                    <p>
                                      File Link:
                                      <a href={upload.file}>{upload.file}</a>
                                    </p>
                                  </>
                                )}
                                {upload.link && (
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
                                )}
                                {upload.comment && (
                                  <p>Comment : {upload.comment}</p>
                                )}
                                <div className="task-meta">
                                  <p>
                                    Submited at : {}
                                    {new Date(upload.updatedAt).toLocaleString(
                                      "en-ID",
                                      {
                                        dateStyle: "long",
                                        timeStyle: "short",
                                      }
                                    )}
                                  </p>
                                </div>
                                <button
                                  onClick={() =>
                                    updateTaskUpload(upload.task_upload_id)
                                  }
                                >
                                  Edit Attachment
                                </button>
                                <div className="late-status">
                                  {upload.is_late == "1" ? (
                                    <p className="late">*Submited Late*</p>
                                  ) : (
                                    <p className="not-late">*Submited*</p>
                                  )}
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      ) : (
                        <>
                          {/*jika belum ada pengerjaan tugas */}
                          <h3>Your Assignment </h3>
                          <hr />
                          <br />
                          <p className="no-task-message">
                            You haven't uploaded your assignment yet
                          </p>
                          <div className="form-group">
                            <label>File or Image or PDF</label>
                            <input
                              type="file"
                              accept="image/*, application/pdf"
                              onChange={handleFileChange}
                            />
                            <button onClick={handleUpload}>Upload File</button>
                            {uploadedImage && <p>Assignmnet is submited</p>}
                          </div>
                          <div className="form-group">
                            <label>Task Upload Link</label>
                            <input
                              type="text"
                              id="link"
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              placeholder="Task link"
                            />
                            <label>Task Upload Description</label>
                            <textarea
                              id="task-desc"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </div>
                          <input
                            value="Submit your assignments"
                            type="submit"
                            onClick={() => handleSubmit(task.task_id)}
                            id="create-resume"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </>
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

export default StudentTask;
