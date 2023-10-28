import React, { SyntheticEvent, useEffect, useState } from "react";
import "../../styles/class.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface StudentClassProps {
  student_id: string;
}

function StudentClass(props: StudentClassProps) {
  const { student_id } = props;
  const [classCode, setClassCode] = useState("");
  const [dataclass, setDataClass] = useState<
    {
      student_class_id: number;
      clases: {
        class_id: number;
        class_name: string;
        lecturer: { firstname: string };
      }[];
    }[]
  >([]);

  const navigate = useNavigate();

  const GetClassList = async () => {
    if (!student_id) {
      navigate("/login");
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/student/class-list`,
        { student_id: student_id }
      );

      setDataClass(response.data);
      console.log(student_id);
      console.log(dataclass);
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
    // Panggil GetClassList saat komponen dimuat
    GetClassList();
  }, [student_id]);

  // modal add class
  const handleAddClassClick = () => {
    Swal.fire({
      title: "Add Class",
      text: "Input Class Code to join a new class",
      customClass: {
        popup: "custom-popup-class",
        title: "custom-title-class",
      },
      input: "text",
      inputPlaceholder: "Enter Class Code",
      showCancelButton: true,
      backdrop: false,

      inputValidator: (value) => {
        if (!value) {
          return "Class Code is required";
        }
      },
    });
  };

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Class</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/student/dashboard">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Class
              </a>
            </li>
          </ul>
        </div>
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Download PDF</span>
        </a>
      </div>

      <ul className="box-info">
        <div className="box-item" onClick={handleAddClassClick}>
          <li>
            <i className="bx bxs-bookmark-plus"></i>
            <span className="text">
              <h3>Add Class</h3>
            </span>
          </li>
        </div>
        {dataclass.map((studentClass) =>
          studentClass.clases.map((classItem) => (
            <div className="box-item" key={classItem.class_id}>
              <li>
                <i className="bx bxs-group"></i>
                <span className="text">
                  <h3>{classItem.class_name}</h3>
                  <p>{classItem.lecturer.firstname}</p>
                </span>
              </li>
            </div>
          ))
        )}
      </ul>
    </main>
  );
}

export default StudentClass;
