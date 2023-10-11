import React, { SyntheticEvent, useEffect, useState } from "react";
import "../styles/login.css";
import { LoginListener } from "../eventListener/LoginListener";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    LoginListener(); // style dengan js / event listener
  }, []);

  const StudentLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/student-login", {
        email: email,
        password: password,
      });
    } catch (error) {}
  };

  const LecturerLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/lecturer-login", {
        email: email,
        password: password,
      });
    } catch (error) {}
  };

  return (
    <section>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Login as Lecturer</h1>
            <div className="social-container"></div>
            <span>Stay logged with us</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign In</button>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Stay focus and spread insight to everyone</p>
              <button className="ghost" id="signIn">
                As Student
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Spare your time to study with us</p>
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
