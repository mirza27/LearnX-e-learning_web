import React, { useEffect, useState } from "react";
import "../../styles/myclass.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface StudentClassProps {
  student_id: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function StudentClass(props: StudentClassProps) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { student_id } = props;
  const [dataClass, setDataClass] = useState<
    {
      student_class_id: number;
      createdAt: string;
      clases: {
        class_id: number;
        class_name: string;
        desc: string;
        category: string;
        lecturer: { firstname: string };
      }[];
    }[]
  >([]);

  const GetClassList = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/student/class/${student_id}`,
        {}
      );
      console.log(response.data);
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

  // navigasi ke class content / detail kelas
  const goToStudentClassDetail = (class_id: any) => {
    navigate("content", { state: { class_id } });
  };

  // MODAL ADD CLASS / gabung kelas
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
      preConfirm: (classCode) => {
        return (
          axios
            .post(`${API_BASE_URL}/student/join-class`, {
              student_id: student_id,
              classCode: classCode,
            })
            // jika kelas berhasil ditambahkan
            .then((response) => {
              Swal.fire({
                title: "Success!",
                text: "You have successfully joined the class.",
                icon: "success",
              });
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
    GetClassList();
    navigate(""); // refresh halaman class
  };

  useEffect(() => {
    if (student_id) {
      GetClassList();
    }
  }, [student_id]);

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
        <a href="#" className="btn-download" onClick={handleAddClassClick}>
          <i className="bx bxs-bookmark-plus"></i>
          <span className="text">Join Class</span>
        </a>
      </div>
      <div className="wrapper">
        {dataClass.map((studentClass) =>
          studentClass.clases.map((classItem) => (
            <div
              className="card"
              onClick={() => goToStudentClassDetail(classItem.class_id)}
              key={classItem.class_id}
            >
              <div className="card-banner">
                <p className="category-tag popular">{classItem.category}</p>
                {classItem.category === "programming" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182576/classCategory/eyvq7v7hlqrxepqb02od.jpg"
                    alt=""
                  />
                )}
                {classItem.category === "math" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/pugqhj6eha4axzgmtk3v.jpg"
                    alt=""
                  />
                )}
                {classItem.category === "science" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/rgtymjlcjh0pifznxmlr.jpg"
                    alt=""
                  />
                )}
                {classItem.category === "art" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182576/classCategory/zyfwwpwrkwmrbribwwdd.jpg"
                    alt=""
                  />
                )}
                {classItem.category === "history" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/unlykbmaoq82sqbvbxxw.jpg"
                    alt=""
                  />
                )}
                {classItem.category === "social" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182576/classCategory/syjags0axrhn3mpeej3w.jpg"
                    alt=""
                  />
                )}
                {classItem.category === "tech" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/iar7ddihjk4bjuxg3t7k.jpg"
                    alt=""
                  />
                )}
                {classItem.category === "religion" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/qkyyic5erf743yfj56ss.jpg"
                    alt=""
                  />
                )}
                {classItem.category === "business" && (
                  <img
                    className="banner-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182578/classCategory/oq4i4fdciqiptxeunqhu.jpg"
                    alt=""
                  />
                )}
              </div>
              <div className="card-body">
                <p className="blog-hashtag">
                  bergabung pada <br />
                  {new Date(studentClass.createdAt).toLocaleString("en-ID", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
                <h2 className="blog-title">{classItem.class_name}</h2>
                <p className="blog-description">{classItem.desc}</p>
                <div className="card-profile">
                  <img
                    className="profile-img"
                    src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1701435649/wtg263ifmmxdizglhfc9.png"
                    alt=""
                  />
                  <div className="card-profile-info">
                    <h3 className="profile-name">
                      {classItem.lecturer.firstname}
                    </h3>
                    <p className="profile-followers"></p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default StudentClass;
