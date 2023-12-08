import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Icon } from "@iconify/react";

interface StudentSTaskListProps {
  student_id: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function StudentTaskList(props: StudentSTaskListProps) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { student_id } = props;
  const [selectedClass, setSelectedClass] = useState<string | null>(null); // class_id yang dipilih pada dropdown
  const [taskData, setTaskData] = useState<any[]>([]);
  const [dataClass, setDataClass] = useState<
    {
      student_class_id: string;
      createdAt: string;
      clases: {
        class_id: string;
        class_name: string;
        desc: string;
        category: string;
        lecturer: { firstname: string };
      }[];
    }[]
  >([]);

  const filterDataByClass = (class_id: string | null) => {
    if (class_id) {
      const filteredData = taskData
        .filter((item) => item.class_id == class_id)
        .flatMap((item) =>
          item.tasks.map((task: any) => {
            const taskUploads = task.task_uploads.map((tu: any | null) => ({
              task_upload_id: tu.task_upload_id,
              is_late: tu.is_late,
              updatedAt: tu.updatedAt,
              score: tu.score,
            }));

            return {
              event_id: item.event_id,
              event_name: item.event_name,
              task_name: task.task_name,
              deadline: task.deadline,
              task_uploads: taskUploads,
            };
          })
        );
      console.log(filteredData);
      return filteredData;
    }
    return [];
  };

  const handleDropdownChange = (option: { value: string }) => {
    setSelectedClass(option.value);
  };

  const GetClassList = async () => {
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

  const GetTaskData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/student/class/content/task/task-list/${student_id}/1`,
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

  // navigasi ke student task
  const goToStudentTask = (event_id: any) => {
    navigate("/student/class/content/task", {
      state: { event_id },
    });
  };

  useEffect(() => {
    if (student_id) {
      GetClassList();
      GetTaskData();
    }
  }, [student_id]);

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>All Task</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                All Task
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* DROP DOWN */}
      <Dropdown
        options={dataClass.map((item) => ({
          value: item.clases[0].class_id,
          label: item.clases[0].class_name,
        }))}
        value={selectedClass?.toString()}
        onChange={handleDropdownChange}
        placeholder="Select a class"
      />

      {/* TABEL*/}
      <div className="table-data">
        {" "}
        <div className="todo">
          <div className="head">
            <h3>Your Task</h3>
            <i className="bx bx-filter"></i>
          </div>
          <ul className="todo-list">
            {filterDataByClass(selectedClass).map(
              (task: {
                task_name: string;
                deadline: string;
                createdAt: string;
                event_id: string;
                is_late: string;
                task_uploads: Array<{
                  task_upload_id: string;
                  is_late: string;
                  updatedAt: string;
                  score: string;
                }>;
              }) => (
                <li
                  onClick={() => goToStudentTask(task.event_id)}
                  className={
                    task.task_uploads.length > 0 ? "completed" : "not-completed"
                  }
                  key={task.event_id} // Add a unique key
                >
                  <p>{task.task_name}</p>
                  {task.task_uploads.length > 0 ? (
                    <Icon
                      className="bx"
                      icon="fluent:clipboard-task-24-regular"
                    />
                  ) : (
                    <i className="bx bx-plus"></i>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default StudentTaskList;
