import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/content.css";

interface LecturerDashboardProps {
  lecturer_id: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function LecturerDashboard(props: LecturerDashboardProps) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { lecturer_id } = props;
  const [taskData, setTaskData] = useState<any[]>([]);
  const [dataClass, setDataClass] = useState<any[]>([]);
  const [eventData, setEventData] = useState<any[]>([]);

  const getEventList = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lecturer/dashboard/event/${lecturer_id}`,
        {}
      );

      setEventData(response.data);

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

  // navigasi ke lecturer event
  const goToDetailEvent = (event_id: any, category_id: any) => {
    if (category_id == 1 || category_id == 0) {
      navigate("/lecturer/myclass/content/task", {
        state: { event_id },
      });
    } else if (category_id == 2) {
      navigate("/lecturer/myclass/content/material", {
        state: { event_id },
      });
    } else if (category_id == 3) {
      navigate("/lecturer/myclass/content/announcement", {
        state: { event_id },
      });
    }
  };

  const goToClass = (class_id: any) => {
    if (class_id) {
      navigate("/lecturer/myclass/content", {
        state: { class_id },
      });
    }
  };

  const GetClassList = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lecturer/my-class/${lecturer_id}`,
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
      getEventList();
      GetClassList();
    }
  }, [lecturer_id]);

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>

      <ul className="dasboard-public-info box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <h3>
              {
                eventData.filter((event) => event.event_category_id === 1)
                  .length
              }
            </h3>
            <p>Task Made</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>{dataClass.length}</h3>
            <p>Class Made</p>
          </span>
        </li>
        <li>
          <i className="bx bx-dots-vertical-rounded"></i>
          <span className="text">
            <h3>
              {" "}
              {
                eventData.filter((event) => event.event_category_id === 2)
                  .length
              }
            </h3>
            <p>Material Made</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Event Lately</h3>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Time Created</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {eventData.slice(0, 5).map((event) => (
                <tr
                  key={event.event_id}
                  onClick={() =>
                    goToDetailEvent(event.event_id, event.event_category_id)
                  }
                >
                  <td>
                    <p>{event.event_name}</p>
                  </td>
                  <td>
                    {new Date(event.createdAt).toLocaleString("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>
                    {event.event_category_id === 1 ? (
                      <span className="status pending">Task</span>
                    ) : event.event_category_id === 2 ? (
                      <span className="status completed">Material</span>
                    ) : event.event_category_id === 3 ? (
                      <span className="status process">Announcement</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="todo">
          <div className="head">
            <h3>My Class</h3>
            <i className="bx bx-filter"></i>
          </div>
          <ul className="todo-list">
            {dataClass
              .slice(0, 3)
              .map(
                (
                  classItem: { class_name: string; class_id: string },
                  index: number
                ) => (
                  <li
                    className="completed"
                    key={index}
                    onClick={() => goToClass(classItem.class_id)}
                  >
                    <p>{classItem.class_name}</p>
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </li>
                )
              )}
            {/* Tambahkan item todo lainnya di sini */}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default LecturerDashboard;
