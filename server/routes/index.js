import express from "express";
import {
  GetStudent,
  StudentRegister,
  StudentLogin,
} from "../controller/Student.js";
import {
  GetLecturer,
  LecturerRegister,
  LecturerLogin,
} from "../controller/Lecturer.js";

import {
  StudentClassList,
  JoinClass,
  ClassContent,
  getClassDataStudent,
  deleteStudentFromClass,
  StudentList,
} from "../controller/StudentClass.js";
import {
  LecturerClassList,
  addNewClass,
  MyClassContent,
  getClassData,
} from "../controller/LecturerClass.js";
import {
  GetTask,
  addTaskUpload,
  addNewTask,
  getTaskUpload,
  updateTaskUpload,
  GetAllTaskByLecturerId,
  GetAllStudentTaskByTaskId,
  updateScore,
  StudentTaskList,
} from "../controller/Task.js";
import {
  addNewAnnouncement,
  getAnnouncement,
} from "../controller/Announcement.js";
import { getMaterial, addNewMaterial } from "../controller/Material.js";

import { authenticateUser, logout } from "../middleware/auth.js";
import {
  getAllEventByLecturer,
  getAllEventByStudent,
} from "../controller/event.js";
const router = express.Router();
// const upload = uploadImage();

// STUDENT ====================================================
// autentikasi
router.get("/student", authenticateUser, GetStudent);
router.post("/student-register", StudentRegister);
router.post("/student-login", StudentLogin);
// event
router.get("/student/dashboard/event/:student_id", getAllEventByStudent);
// class
router.get("/student/getclass/:class_id", getClassDataStudent); // mengambil data kelas
router.post("/student/join-class", JoinClass); // join ke kelas tertentu
router.get("/student/class/:student_id", StudentClassList); // mengambil class yang diikuti student
router.get("/student/class/content/:class_id", ClassContent); // mengambil semua konten kelas
router.post("/student/class/content/leave", deleteStudentFromClass); // keluar dari kelas
// task
router.get("/student/class/content/task/:event_id/:student_id", GetTask); // melihat task
router.post("/student/class/content/task/upload", addTaskUpload); //submit task assignment
router.get("/student/class/content/taskUpload/:task_upload_id", getTaskUpload); // melihat task uplaod
router.post("/student/class/content/taskUpload/update", updateTaskUpload); // update task_upload
router.get(
  "/student/class/content/task/task-list/:student_id/:is_all",
  StudentTaskList
); // mengambil tugas yang perlu dikerjakan

// LECTURER ====================================================
// autentikasi
router.get("/lecturer", authenticateUser, GetLecturer);
router.post("/lecturer-register", LecturerRegister);
router.post("/lecturer-login", LecturerLogin);
// event
router.get("/lecturer/dashboard/event/:lecturer_id", getAllEventByLecturer);
// class
router.get("/lecturer/getclass/:class_id", getClassData);
router.post("/lecturer/add-class", addNewClass);
router.get("/lecturer/my-class/:lecturer_id", LecturerClassList);
router.get("/lecturer/my-class/content/:class_id", MyClassContent);
router.get("/lecturer/my-class/content/:class_id/student-list", StudentList); // mengambil list siswa yang bergabung pada kelas
router.post(
  "/lecturer/my-class/content/delete-student",
  deleteStudentFromClass // menghapus student dari kelas tertentu
);
//task
router.get("/lecturer/my-class/content/task/:event_id", GetTask); // melihat task
router.post("/lecturer/my-class/content/addtask", addNewTask);
router.get(
  "/lecturer/my-class/content/alltask/:lecturer_id",
  GetAllTaskByLecturerId
); // mengambil semua task yang pernah dibuat
router.get(
  "/lecturer/my-class/content/task/taskUpload/:task_id/:class_id",
  GetAllStudentTaskByTaskId
);
router.get(
  "/lecturer/my-class/content/getTaskUpload/:task_upload_id",
  getTaskUpload
);
router.post("/lecturer/my-class/content/getTaskUpload/scoring", updateScore);
// material
router.get("/lecturer/my-class/content/material/:event_id", getMaterial);
router.post("/lecturer/my-class/content/addMaterial", addNewMaterial);
// announcement
router.post(
  "/lecturer/my-class/content/announcement/addAnnouncement",
  addNewAnnouncement
);

// BOTH LECTURER OR STUDENT
router.get("/user/event/announcement/:event_id", getAnnouncement);
router.get("/user/event/material/:event_id", getMaterial);
router.get("/logout", logout);

export default router;
