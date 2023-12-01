import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/myclass.css";
import "../../styles/content.css";

interface LecturerClassProps {
  lecturer_id: string;
  firstname: string;
}

function LecturerClass(props: LecturerClassProps) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { lecturer_id } = props;
  const { firstname } = props;
  // deklarasi data untuk response
  const [dataClass, setDataClass] = useState<
    {
      class_id: number;
      class_name: string;
      code: string;
      category: string;
      desc: string;
      createdAt: string;
    }[]
  >([]);

  const GetClassList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lecturer/my-class/${lecturer_id}`,
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

  // navigasi ke class content / detail kelas
  const goToClassDetail = (class_id: any) => {
    navigate(`content`, { state: { class_id } });
  };

  useEffect(() => {
    if (lecturer_id) {
      GetClassList();
    }
  }, [lecturer_id]);

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>My Class</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                My Class
              </a>
            </li>
          </ul>
        </div>
        <Link to="create" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Create New Class</span>
        </Link>
      </div>
      <div className="wrapper">
        {/* Loop dan navigasi ke content class*/}
        {dataClass.map((lecturerClass) => (
          <div
            className="card"
            onClick={() => goToClassDetail(lecturerClass.class_id)}
            key={lecturerClass.class_id}
          >
            <div className="card-banner">
              <p className="category-tag popular">{lecturerClass.category}</p>
              {lecturerClass.category === "programming" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182576/classCategory/eyvq7v7hlqrxepqb02od.jpg"
                  alt=""
                />
              )}
              {lecturerClass.category === "math" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/pugqhj6eha4axzgmtk3v.jpg"
                  alt=""
                />
              )}
              {lecturerClass.category === "science" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/rgtymjlcjh0pifznxmlr.jpg"
                  alt=""
                />
              )}
              {lecturerClass.category === "art" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182576/classCategory/zyfwwpwrkwmrbribwwdd.jpg"
                  alt=""
                />
              )}
              {lecturerClass.category === "history" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/unlykbmaoq82sqbvbxxw.jpg"
                  alt=""
                />
              )}
              {lecturerClass.category === "social" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182576/classCategory/syjags0axrhn3mpeej3w.jpg"
                  alt=""
                />
              )}
              {lecturerClass.category === "tech" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/iar7ddihjk4bjuxg3t7k.jpg"
                  alt=""
                />
              )}
              {lecturerClass.category === "religion" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/qkyyic5erf743yfj56ss.jpg"
                  alt=""
                />
              )}
              {lecturerClass.category === "business" && (
                <img
                  className="banner-img"
                  src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182578/classCategory/oq4i4fdciqiptxeunqhu.jpg"
                  alt=""
                />
              )}
            </div>
            <div className="card-body">
              <p className="blog-hashtag">#{lecturerClass.code}</p>
              <p className="blog-hashtag">
                created at {}
                {new Date(lecturerClass.createdAt).toLocaleString("en-ID", {
                  dateStyle: "short",
                })}
              </p>
              <h2 className="blog-title">{lecturerClass.class_name}</h2>
              <p className="blog-description">{lecturerClass.desc}</p>
              <div className="card-profile">
                <img
                  className="profile-img"
                  src="https://images.unsplash.com/photo-1554780336-390462301acf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  alt=""
                />
                <div className="card-profile-info">
                  <h3 className="profile-name">{firstname}</h3>
                  <p className="profile-followers">{lecturer_id}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default LecturerClass;
