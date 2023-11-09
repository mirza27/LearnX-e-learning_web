import React, { useEffect, useState } from "react";
import "../../styles/myclass.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface StudentClassProps {
  student_id: string;
  firstname: string;
}

function StudentClass(props: StudentClassProps) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { student_id } = props;
  const { firstname } = props;
  const [classCode, setClassCode] = useState("");
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
    if (!student_id) {
      navigate("/login");
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/student/class/${student_id}`,
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

  useEffect(() => {
    // Panggil GetClassList saat komponen dimuat
    GetClassList();
  }, [student_id]);

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
            .post("http://localhost:5000/student/join-class", {
              student_id: student_id,
              classCode: classCode,
            })
            // jika kelas berhasil ditambahkan
            .then((response) => {
              if (response.data.status === "ok") {
                Swal.fire({
                  title: "Success!",
                  text: "You have successfully joined the class.",
                  icon: "success",
                });
              } else {
                Swal.fire({
                  title: "Warning!",
                  text: response.data.message,
                  icon: "error",
                });
              }
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
                <img
                  className="banner-img"
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  alt=""
                />
              </div>
              <div className="card-body">
                <p className="blog-hashtag">
                  bergabung pada {studentClass.createdAt}
                </p>
                <h2 className="blog-title">{classItem.class_name}</h2>
                <p className="blog-description">{classItem.desc}</p>
                <div className="card-profile">
                  <img
                    className="profile-img"
                    src="https://images.unsplash.com/photo-1554780336-390462301acf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
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
