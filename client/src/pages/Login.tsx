import React, { SyntheticEvent, useEffect, useState } from "react";
import "../styles/login.css";
import { LoginListener } from "../eventListener/LoginListener";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    LoginListener(); // style dengan js / event listener
  }, []);

  const LecturerLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/lecturer-login`, {
        email: email,
        password: password,
      });
      navigate("/lecturer");
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
  const StudentLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/student-login`, {
        email: email,
        password: password,
      });
      navigate("/student");
    } catch (error: any) {
      if (error.response) {
        // Menampilkan SweetAlert pada kesalahan
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
        <div className="form-container sign-up-container">
          <form onSubmit={LecturerLogin}>
            <h1>Login as Lecturer</h1>
            <div className="social-container"></div>
            <span>Stay logged with us</span>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
            <NavLink to="/register">
              <span>
                <a>Dont have account ?</a>
              </span>
            </NavLink>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={StudentLogin}>
            <h1>Login as Student</h1>
            <div className="social-container"></div>
            <span>Stay logged with us</span>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
            <NavLink to="/register">
              <span>
                <a>Dont have account ?</a>
              </span>
            </NavLink>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hi Knowledge Enthusiasts,</h1>
              <p>Experience Learning in a New Light</p>
              <button className="ghost" id="signIn">
                As Student
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hey there, Lifelong Learners,</h1>
              <p>Empower Education, Anywhere, Anytime</p>
              <button className="ghost" id="signUp">
                As Lecturer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
