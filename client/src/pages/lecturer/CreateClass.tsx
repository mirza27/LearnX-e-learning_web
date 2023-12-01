import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import "../../styles/form.css";

interface LecturerClassProps {
  lecturer_id: string;
}

function CreateClass(props: LecturerClassProps) {
  const { lecturer_id } = props;
  const [className, setClassName] = useState("");
  const [desc, setdesc] = useState("");
  const [category, setcategory] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/lecturer/add-class",
        {
          lecturer_id: lecturer_id,
          class_name: className,
          desc: desc,
          category: category,
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

  useEffect(() => {}, [lecturer_id]);

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Create New Class</h1>
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
              <a className="active" href="#">
                Create Class
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
        <h2>Class Information</h2>
        <li>
          <div className="form-group">
            <label>
              Class Title <span>*</span>
            </label>
            <input
              type="text"
              id="event-name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Math programming with C.."
            />
          </div>
        </li>
        <li>
          <div className="form-group">
            <label>
              Class Description<span>*</span>
            </label>
            <textarea
              id="task-desc"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            ></textarea>
          </div>
        </li>

        <h2>Category</h2>
        <li>
          <div className="form-group">
            <label>Class Category:</label>
            <select
              id="class-id"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value="">Select a class</option>
              <option value="programming">Programming</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="tech">Tech</option>
              <option value="religion">Religion</option>
              <option value="social">Social</option>
              <option value="art">Art</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
            </select>
          </div>
        </li>

        {/* add task submit button */}
        <input
          value="Create Class"
          type="submit"
          onClick={handleSubmit}
          id="create-resume"
        />
      </ul>
    </main>
  );
}

export default CreateClass;
