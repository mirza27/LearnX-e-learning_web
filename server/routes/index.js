import express from "express";
import {
  GetStudent,
  StudentRegister,
  StudentLogin,
} from "../controller/Student.js";
import { authenticateUser, logout } from "../middleware/auth.js";

const router = express.Router();

// STUDENT
router.get("/student", authenticateUser, GetStudent);
router.post("/student-register", StudentRegister);
router.post("/student-login", StudentLogin);

// LECTURER
router.get("/lecturer", authenticateUser, GetStudent);
router.post("/lecturer-register", StudentRegister);
router.post("/lecturer-login", StudentLogin);

router.get("/logout", logout);

export default router;
