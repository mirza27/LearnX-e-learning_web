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
import { authenticateUser, logout } from "../middleware/auth.js";

const router = express.Router();

// STUDENT
router.get("/student", authenticateUser, GetStudent);
router.post("/student-register", StudentRegister);
router.post("/student-login", StudentLogin);

// LECTURER
router.get("/lecturer", authenticateUser, GetLecturer);
router.post("/lecturer-register", LecturerRegister);
router.post("/lecturer-login", LecturerLogin);

router.get("/logout", logout);

export default router;
