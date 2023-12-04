import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Icon } from "@iconify/react";

interface LecturerProps {
  lecturer_id: string;
}

function Attachment(props: LecturerProps) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { lecturer_id } = props;
  const [selectedClass, setSelectedClass] = useState<string | null>(null); // class_id yang dipilih pada dropdown
  const [taskData, setTaskData] = useState<any[]>([]);
  const [dataClass, setDataClass] = useState<
    // data class berdasarkan lecturer_id
    {
      class_id: string;
      class_name: string;
    }[]
  >([]);

  const filterDataByClass = (classId: string | null) => {
    if (classId) {
      const filteredData = taskData
        .filter((item) => item.class_id === classId)
        .flatMap((item) =>
          item.tasks.map((task: any) => ({
            event_id: item.event_id,
            createdAt: item.createdAt, // Include event.createdAt in the result
            task_id: task.task_id,
            task_name: task.task_name,
            deadline: task.deadline,
          }))
        );
      return filteredData;
    }
    return [];
  };

  const handleDropdownChange = (option: { value: string }) => {
    setSelectedClass(option.value);
  };

  const GetClassList = async () => {
    // menampilkan data untuk select class
    try {
      const response = await axios.get(
        `http://localhost:5000/lecturer/my-class/${lecturer_id}/`,
        {}
      );

      setDataClass(response.data);

      if (response.data.message) {
        setMessage(response.data.message);
      } else if (response.data.length > 0) {
        // Select the first class by default
        setSelectedClass(response.data[0].class_id);
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

  // mengambil semua data tugas berdasarkan
  const GetTaskData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lecturer/my-class/content/alltask/${lecturer_id}`,
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

  // navigasi ke class content / detail kelas
  const goToLecturerTaskDetail = (event_id: any) => {
    navigate("/lecturer/myclass/content/task", { state: { event_id } });
  };

  useEffect(() => {
    if (lecturer_id) {
      GetClassList();
      GetTaskData();
    }
  }, [lecturer_id]);

  useEffect(() => {
    console.log(filterDataByClass(selectedClass));
  }, [selectedClass, taskData]);

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

      {/* TASK CONTENT */}

      {/* DROP DOWN */}

      <Dropdown
        options={dataClass.map((item) => ({
          value: item.class_id,
          label: item.class_name,
        }))}
        value={selectedClass?.toString()}
        onChange={handleDropdownChange}
        placeholder="Select a class"
      />

      {/* TABEL*/}
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Task Attachment</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Task Date</th>
                <th>Class Name</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {filterDataByClass(selectedClass).map(
                (task: {
                  task_id: string;
                  task_name: string;
                  deadline: string;
                  createdAt: string;
                  event_id: string;
                }) => (
                  <tr
                    key={task.task_id}
                    onClick={() => goToLecturerTaskDetail(task.event_id)}
                  >
                    <td>
                      <Icon
                        className="bx"
                        icon="fluent:clipboard-task-24-regular"
                      />
                      {task.task_name}
                    </td>
                    <td>
                      {new Date(task.createdAt).toLocaleString("en-ID", {
                        dateStyle: "short",
                      })}
                    </td>
                    <td>
                      {dataClass
                        .filter((item) => item.class_id === selectedClass)
                        .map((filteredClass) => filteredClass.class_name)}
                    </td>
                    <td>
                      {task.deadline ? (
                        <>
                          {new Date(task.deadline).toLocaleString("en-ID", {
                            dateStyle: "short",
                          })}
                        </>
                      ) : (
                        <>-</>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Attachment;
