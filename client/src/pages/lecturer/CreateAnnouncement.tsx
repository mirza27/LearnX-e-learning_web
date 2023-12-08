import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import "../../styles/form.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
interface LecturerAnnounProps {
  lecturer_id: string;
}

function CreateAnnoun(props: LecturerAnnounProps) {
  const { lecturer_id } = props;
  const [dataClass, setDataClass] = useState<
    {
      class_id: string;
      class_name: string;
    }[]
  >([]);

  // menampilkan data untuk select class
  const GetClassList = async () => {
    // menampilkan data untuk select class
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lecturer/my-class/${lecturer_id}/`,
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
    if (lecturer_id) {
      GetClassList();
    }
  }, [lecturer_id]);

  const [eventName, setEventName] = useState("");
  const [nama, setNama] = useState("");
  const [content, setContent] = useState("");
  const [classId, setClassId] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/lecturer/my-class/content/announcement/addAnnouncement`,
        {
          event_name: eventName,
          class_id: classId,
          nama: nama,
          content: content,
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
        });

        navigate("/lecturer/myclass/content", {
          state: { class_id: classId },
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
          <h1>Create New Announcement</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="" href="#">
                Annoucement
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Create Announcement
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* FORM ADD A TASK  */}
      <ul className="box-info">
        <h2>Annoucement Header</h2>
        <li>
          <div className="form-group">
            <label>
              Event Name <span>*</span>
            </label>
            <input
              className="form"
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
              Announcement Name<span>*</span>
            </label>
            <input
              className="form"
              type="text"
              id="task-name"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Task Module No 3.."
            />
          </div>
        </li>

        <h2>Announcement Detail</h2>
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
            <label>Announcemen Content</label>
            <textarea
              className="form"
              id="task-desc"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </li>

        {/* add task submit button */}
        <input
          value="Add Announcement"
          type="submit"
          onClick={handleSubmit}
          id="create-resume"
        />
      </ul>
    </main>
  );
}

export default CreateAnnoun;
