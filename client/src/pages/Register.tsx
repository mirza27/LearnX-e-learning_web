import React, { SyntheticEvent, useEffect, useState } from "react";
import { LoginListener } from "../eventListener/LoginListener";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";
import Swal from "sweetalert2";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is student
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const StudentRegister = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/student-register", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/login");
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

  const LecturerRegister = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/lecturer-register", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/login");
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

  return (
    <section>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form
            onSubmit={role === "student" ? StudentRegister : LecturerRegister}
          >
            <h1>Register</h1>
            <br />
            <span>Join with us</span>
            <input
              required
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="confirmation Password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello Learners, </h1>
              <p>Transform your future with our e-learning platform.</p>
              <h4>Register As</h4>
              <select
                className="ghost"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
