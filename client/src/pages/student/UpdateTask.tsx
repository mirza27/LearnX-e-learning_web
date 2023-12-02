import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/eventDetail.css";
import { cloudinaryConfigTaskUpload } from "../../cloudinaryConfig";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface StudentClassTaskProps {
  student_id: string;
}

function StudentTaskUpdate(props: StudentClassTaskProps) {
  const location = useLocation();
  const task_upload_id = location.state && location.state.task_upload_id;
  const event_id = location.state && location.state.event_id;
  const navigate = useNavigate();
  const { student_id } = props;
  const [message, setMessage] = useState("");
  const [taskUploadData, setTaskUploadData] = useState<any>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // link file
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // file yang harus dikirim
  const [comment, setComment] = useState(""); // komen task upload
  const [link, setLink] = useState(""); // link task upload

  const GetTaskUpload = async () => {
    try {
      // mengammbil data task upload
      const response = await axios.get(
        `http://localhost:5000/student/class/content/taskUpload/${task_upload_id}`,
        {}
      );
      setTaskUploadData(response.data);

      if (response.data.message) {
        setMessage(response.data.message);
      }

      // Mengatur link dan comment setelah taskUploadData terisi
      if (response.data.link != null) {
        setLink(response.data.link);
      }

      if (response.data.comment != null) {
        setComment(response.data.comment);
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
  const handleSubmit = async (taskUploadId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/student/class/content/taskUpload/update",
        {
          task_upload_id: taskUploadId,
          link: link,
          file: uploadedImage,
          comment: comment,
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    }
    console.log(event_id);
    navigate("/student/class/content/task", { state: { event_id } }); // reload halaman
  };

  useEffect(() => {
    if (student_id) {
      GetTaskUpload();
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
              <a className="" href="#">
                Task
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Update Assignment
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
        <h1 className="task-title">Task Assignment Update</h1>
        <div className="task-content-update">
          <ul>
            {taskUploadData && link && taskUploadData.link ? (
              <>
                <li>
                  <div className="form-group">
                    <label>Task Link</label>
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div className="form-group">
                    <label>Task Link</label>
                    <input
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                </li>
              </>
            )}

            {taskUploadData && comment && taskUploadData.comment ? (
              <>
                <li>
                  <div className="form-group">
                    <label>Task Comment</label>
                    <textarea
                      id="task-desc"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={{ width: "100%", height: "110px" }}
                    ></textarea>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div className="form-group">
                    <label>Task Comment</label>
                    <textarea
                      id="task-desc"
                      onChange={(e) => setComment(e.target.value)}
                      style={{ width: "100%", height: "110px" }}
                    ></textarea>
                  </div>
                </li>
              </>
            )}
            <div className="task-content-update task-uploads">
              <h3 className="">Your Attachment : </h3>
              <li>
                <div className="form-group">
                  <label>File or Image or PDF</label>
                  <input
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={handleFileChange}
                  />
                  <button onClick={handleUpload}>Upload File</button>
                </div>
                <div className="form-group">
                  <h3>Preview : </h3>
                  {uploadedImage && (
                    <div>
                      <p>Uploaded Image: {uploadedImage}</p>
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        style={{ maxWidth: "300px", maxHeight: "300px" }}
                      />
                    </div>
                  )}
                </div>
              </li>
            </div>
            <input
              value="Update Assignment"
              type="submit"
              onClick={() => handleSubmit(taskUploadData.task_upload_id)}
              id="create-resume"
            />
          </ul>
        </div>
        {/* not fix */}
      </div>
    </main>
  );
}

export default StudentTaskUpdate;
