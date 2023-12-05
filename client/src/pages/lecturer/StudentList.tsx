import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/eventDetail.css";

interface ClassStudentListProps {
  lecturer_id: string;
}

function ClassStudentList(props: ClassStudentListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const class_id = location.state && location.state.class_id;
  const [message, setMessage] = useState("");
  const { lecturer_id } = props;
  const [studentList, setStudentList] = useState<any>(null);

  const getStudent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lecturer/my-class/content/${class_id}/student-list`,
        {}
      );

      setStudentList(response.data);
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

  // action untuk menghapus student
  const deleteStudentAction = async (student_id: any, class_id: any) => {
    try {
      if (student_id && class_id) {
        const result = await Swal.fire({
          title: "Delete Student",
          text: "Are you sure to delete the student",
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          input: "checkbox",
          inputPlaceholder: "",
          inputAttributes: {
            style: "display:none",
          },
          showCancelButton: true,
          backdrop: false,
          preConfirm: async () => {
            try {
              const response = await axios.post(
                "http://localhost:5000/lecturer/my-class/content/delete-student",
                {
                  student_id: student_id,
                  class_id: class_id,
                }
              );

              if (response.data.success) {
                Swal.fire({
                  title: "Success!",
                  text: "You have successfully deleted the student ?",
                  icon: "success",
                });
                // Refresh halaman class setelah penghapusan berhasil
                getStudent();
                navigate("/lecturer/myclass/content/student-edit", {
                  state: { student_id, class_id },
                });
              } else {
                throw new Error(response.data.message || "Deletion failed");
              }
            } catch (error: any) {
              Swal.fire({
                title: "Error!",
                text:
                  error.message ||
                  "An error occurred while deleting the student.",
                icon: "error",
              });
            }
          },
        });

        if (
          result.isDismissed &&
          result.dismiss === Swal.DismissReason.cancel
        ) {
          console.log("Deletion canceled");
        }
      } else {
        console.error("Student is not available.");
        // Optionally, you can add further handling for the case when student_id or class_id is not available
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  // Contoh pemanggilan fungsi

  useEffect(() => {
    if (lecturer_id) {
      getStudent();
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
              <a className="" href="#">
                My Class
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="" href="#">
                Content
              </a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Student List
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* STUDENT LIST */}
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recent Orders</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentList && studentList.length > 0 ? (
                <>
                  {studentList.map((student: any) => (
                    <tr>
                      <td>
                        <img src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1699182577/classCategory/unlykbmaoq82sqbvbxxw.jpg" />
                        <p>
                          {student.firstname} {student.lastname}
                        </p>
                      </td>
                      <td>
                        <span
                          className="status pending"
                          onClick={() =>
                            deleteStudentAction(student.student_id, class_id)
                          }
                        >
                          delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <p>You have not student</p>
                </>
              )}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default ClassStudentList;
