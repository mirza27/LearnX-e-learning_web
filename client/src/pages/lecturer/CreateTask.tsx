import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import "../../styles/form.css";

const cloud_name = "dsr5gqz3v"; // Ganti dengan cloud name Anda
const uploadPreset = "jbonmkha";
const folder_name = "task";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

interface LecturerTaskProps {
  lecturer_id: string;
}

function CreateTask(props: LecturerTaskProps) {
  const { lecturer_id } = props;
  const [dataClass, setDataClass] = useState<
    {
      class_id: string;
      class_name: string;
    }[]
  >([]);

  const GetClassList = async () => {
    if (!lecturer_id) {
      console.log("belum login");
      navigate("/login");
    }

    // menampilkan data untuk select class
    try {
      const response = await axios.get(
        `http://localhost:5000/lecturer/my-class/${lecturer_id}/`,
        {}
      );

      setDataClass(response.data);

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
  }, [lecturer_id]);

  const [eventName, setEventName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [classId, setClassId] = useState("");
  const [deadline, setDeadline] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // variabel untuk file gambar
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // link  nama gambar
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // file yang harus dikirim
  // menampilknkan preview
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
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", folder_name);

      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          mode: "cors",
          body: formData,
        });

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
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/lecturer/my-class/content/addtask",
        {
          event_name: eventName,
          task_name: taskName,
          task_desc: desc,
          class_id: classId,
          file: uploadedImage,
          link: link,
          deadline: deadline,
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
  };

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Create Task</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="" href="#">
                My Task
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Create Task
              </a>
            </li>
          </ul>
        </div>
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Add New</span>
        </a>
      </div>

      {/* FORM ADD A TASK  */}
      <ul className="box-info">
        <h2>Task Information</h2>
        <li>
          <div className="form-group">
            <label>
              Event Name <span>*</span>
            </label>
            <input
              type="text"
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Meet no 12..."
            />
          </div>
        </li>
        <li>
          <div className="form-group">
            <label>
              Task Name<span>*</span>
            </label>
            <input
              type="text"
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Module No 3.."
            />
          </div>
        </li>

        <h2>Task Detail</h2>
        <li>
          <div className="form-group">
            <label>Task Description</label>
            <textarea
              id="task-desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
        </li>
        <li>
          <div className="form-group">
            <label>Class :</label>
            <select
              id="class-id"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            >
              <option value="">Select a class</option> {/* Opsi default */}
              {dataClass.map((classItem) => (
                <option key={classItem.class_id} value={classItem.class_id}>
                  {classItem.class_name}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li>
          <div className="form-group">
            <label>Link</label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Task link"
            />
          </div>
        </li>
        <li>
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </li>
        <h2>Attachment</h2>
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
        {/* add task submit button */}
        <input
          value="Add Task"
          type="submit"
          onClick={handleSubmit}
          id="create-resume"
        />
      </ul>
    </main>
  );
}

export default CreateTask;
