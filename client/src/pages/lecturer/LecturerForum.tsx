import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chat from "../Chat";
import Swal from "sweetalert2";

interface StudentForum {
  lecturer_id: string;
  firstname: string;
  socket: any;
}

function LecturerForum(props: StudentForum) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { lecturer_id, firstname, socket } = props;
  const [roomClass, setRoomClass] = useState("");
  const [dataClass, setDataClass] = useState<any[]>([]);
  const [showChat, setShowChat] = useState(false);

  const GetClassForum = async () => {
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

  // menampilkan room chat
  const goToClassRoomChat = (class_id: any) => {
    setRoomClass(class_id);
    if (firstname !== "" && roomClass !== "") {
      setShowChat(true);
      socket.emit("join-room", roomClass);
    }
  };

  useEffect(() => {
    if (lecturer_id && firstname) {
      GetClassForum();
    }
  }, [lecturer_id, firstname]);

  return (
    <main>
      {!showChat ? (
        <>
          <div className="head-title">
            <div className="left">
              <h1>Class</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="/lecturer/dashboard">Dashboard</a>
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
            {/* Loop dan navigasi ke content class*/}
            {dataClass.map((lecturerClass) => (
              <div
                className="card"
                onClick={() => goToClassRoomChat(lecturerClass.class_id)}
                key={lecturerClass.class_id}
              >
                <div className="card-banner">
                  <p className="category-tag popular">
                    {lecturerClass.category}
                  </p>
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
                  <h2 className="blog-title">{lecturerClass.class_name}</h2>
                  <p className="blog-description">{lecturerClass.desc}</p>
                </div>

                <div className="card-profile-info">
                  <p className="profile-followers">Double Clik to Join</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Chat
            user_id={lecturer_id}
            firstname={firstname}
            socket={socket}
            roomClass={roomClass}
          />
        </>
      )}
    </main>
  );
}

export default LecturerForum;
