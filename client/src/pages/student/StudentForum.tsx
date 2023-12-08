import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chat from "../Chat";
import Swal from "sweetalert2";

interface StudentForum {
  student_id: string;
  firstname: string;
  socket: any;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function StudentForum(props: StudentForum) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { student_id, firstname, socket } = props;
  const [roomClass, setRoomClass] = useState("");
  const [dataClass, setDataClass] = useState<any[]>([]);
  const [showChat, setShowChat] = useState(false);

  const GetClassForum = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/student/class/${student_id}`,
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

  // menampilkan room chat
  const goToClassRoomChat = (class_id: any) => {
    setRoomClass(class_id);
    if (firstname !== "" && roomClass !== "") {
      setShowChat(true);
      socket.emit("join-room", roomClass);
    }
  };

  useEffect(() => {
    if (student_id && firstname) {
      GetClassForum();
    }
  }, [student_id, firstname]);

  return (
    <main>
      {!showChat ? (
        <>
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
                    Forum
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* CLASS LIST */}
          <div className="wrapper">
            {dataClass.map((studentClass) =>
              studentClass.clases.map((classItem: any) => (
                <div
                  className="card"
                  onClick={() => goToClassRoomChat(classItem.class_id)}
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
                    <h2 className="blog-title">{classItem.class_name}</h2>
                    <p className="blog-description">{classItem.desc}</p>
                  </div>
                  <div className="card-profile-info">
                    <p className="profile-followers">Double Clik to Join</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <Chat
          user_id={student_id}
          firstname={firstname}
          socket={socket}
          roomClass={roomClass}
        />
      )}
    </main>
  );
}

export default StudentForum;
