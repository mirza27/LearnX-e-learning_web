import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import { cloudinaryConfigMaterial } from "../../cloudinaryConfig";
import "../../styles/form.css";

interface LecturerMaterialProps {
  lecturer_id: string;
}

function CreateMaterial(props: LecturerMaterialProps) {
  const { lecturer_id } = props;
  const [dataClass, setDataClass] = useState<
    {
      class_id: string;
      class_name: string;
    }[]
  >([]);

  // menampilkan data untuk select class
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
  const [materialName, setMaterialName] = useState("");
  const [link, setLink] = useState("");
  const [classId, setClassId] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // mengupload file
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // link  nama gambar
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // file yang harus dikirim
  // menampilknkan preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // form untuk data file upload
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", cloudinaryConfigMaterial.uploadPreset);
      formData.append("folder", cloudinaryConfigMaterial.folder_name);

      try {
        const response = await fetch(cloudinaryConfigMaterial.CLOUDINARY_URL, {
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
        "http://localhost:5000/lecturer/my-class/content/addMaterial",
        {
          event_name: eventName,
          materialName: materialName,
          file: uploadedImage,
          link: link,
          class_id: classId,
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
          <h1>Create New Material</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="" href="#">
                Material
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Create Material
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
        <h2>Material Header</h2>
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
              Material Name<span>*</span>
            </label>
            <input
              type="text"
              id="task-name"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              placeholder="Module No 3.."
            />
          </div>
        </li>

        <h2>Material Detail</h2>
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
              placeholder="Material.com..."
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
          value="Add Material"
          type="submit"
          onClick={handleSubmit}
          id="create-resume"
        />
      </ul>
    </main>
  );
}

export default CreateMaterial;
