import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/content.css";
import { Icon } from "@iconify/react";

interface StudentDashboardProps {
  student_id: string;
}

function StudentDashboard(props: StudentDashboardProps) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { student_id } = props;
  const [taskData, setTaskData] = useState<any[]>([]);
  const [dataClass, setDataClass] = useState<any[]>([]);
  const [eventData, setEventData] = useState<any[]>([]);

  const GetTaskData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/student/class/content/task/task-list/${student_id}/1`,
        {}
      );

      setTaskData(response.data);

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

  const GetClassList = async () => {
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

  const getEventList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/student/dashboard/event/${student_id}`,
        {}
      );

      setEventData(response.data);
      console.log(response.data);

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

  // navigasi ke student event
  const goToDetailEvent = (event_id: any, category_id: any) => {
    if (category_id == 1 || category_id == 0) {
      navigate("/student/class/content/task", {
        state: { event_id },
      });
    } else if (category_id == 2) {
      navigate("/student/class/content/material", {
        state: { event_id },
      });
    } else if (category_id == 3) {
      navigate("/student/class/content/announcement", {
        state: { event_id },
      });
    }
  };

  useEffect(() => {
    if (student_id) {
      GetTaskData();
      getEventList();
      GetClassList();
    }
  }, [student_id]);

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

      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <h3>{taskData.length}</h3>
            <p>Task</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>{dataClass.length}</h3>
            <p>Class Joined</p>
          </span>
        </li>
        <li>
          <i className="bx bx-dots-vertical-rounded"></i>
          <span className="text">
            <h3>
              {
                eventData.filter((event) => event.event_category_id === 2)
                  .length
              }
            </h3>

            <p>Material</p>
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
            <h3>Your Task</h3>
            <i className="bx bx-filter"></i>
          </div>
          <ul className="todo-list">
            {taskData.map((event) =>
              event.tasks.map(
                (task: any) =>
                  task.task_uploads.length === 0 && (
                    <li
                      className="not-completed"
                      key={task.task_id}
                      onClick={() => goToDetailEvent(event.event_id, 0)}
                    >
                      <p>{task.task_name}</p>
                      <i className="bx bx-plus"></i>
                    </li>
                  )
              )
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default StudentDashboard;
