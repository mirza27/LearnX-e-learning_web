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
} from "../controller/StudentClass.js";
import {
  LecturerClassList,
  addNewClass,
  MyClassContent,
} from "../controller/LecturerClass.js";
import { GetTask, addTaskUpload, addNewTask } from "../controller/Task.js";
import {
  addNewAnnouncement,
  getAnnouncement,
} from "../controller/Announcement.js";
import { authenticateUser, logout } from "../middleware/auth.js";
const router = express.Router();
// const upload = uploadImage();

// STUDENT ====================================================
// autentikasi
router.get("/student", authenticateUser, GetStudent);
router.post("/student-register", StudentRegister);
router.post("/student-login", StudentLogin);
// class
router.post("/student/join-class", JoinClass);
router.get("/student/class/:student_id", StudentClassList);
router.get("/student/class/content/:class_id", ClassContent);
// task
router.get("/student/class/content/task/:event_id/:student_id", GetTask); // melihat task
router.post("/student/class/content/task/upload", addTaskUpload);
// material
// announcement
router.get("/student/class/content/announcement/:event_id", getAnnouncement);

// LECTURER ====================================================
// autentikasi
router.get("/lecturer", authenticateUser, GetLecturer);
router.post("/lecturer-register", LecturerRegister);
router.post("/lecturer-login", LecturerLogin);
// class
router.post("/lecturer/add-class", addNewClass);
router.get("/lecturer/my-class/:lecturer_id", LecturerClassList);
router.get("/lecturer/my-class/content/:class_id", MyClassContent);
//task
router.get("/lecturer/my-class/content/task/:event_id", GetTask); // melihat task
router.post("/lecturer/my-class/content/addtask", addNewTask);
// material

// announcement
router.get(
  "/lecturer/my-class/content/announcement/:event_id",
  getAnnouncement
);
router.post(
  "/lecturer/my-class/content/announcement/addAnnouncement",
  addNewAnnouncement
);

router.get("/logout", logout);

export default router;
