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

import { StudentClassList, JoinClass } from "../controller/StudentClass.js";
import {
  LecturerClassList,
  addNewClass,
  MyClassContent,
} from "../controller/LecturerClass.js";

import { authenticateUser, logout } from "../middleware/auth.js";

const router = express.Router();

// STUDENT
router.get("/student", authenticateUser, GetStudent);
router.post("/student-register", StudentRegister);
router.post("/student-login", StudentLogin);
router.get("/student/class-list/:student_id", StudentClassList);
router.post("/student/join-class", JoinClass);

// LECTURER
router.get("/lecturer", authenticateUser, GetLecturer);
router.post("/lecturer-register", LecturerRegister);
router.post("/lecturer-login", LecturerLogin);
router.post("/lecturer/add-class", addNewClass);
router.get("/lecturer/my-class/:lecturer_id", LecturerClassList);
router.get("/lecturer/my-class/content/:class_id", MyClassContent);

router.get("/logout", logout);

export default router;
