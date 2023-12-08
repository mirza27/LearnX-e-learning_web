import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentPage from "./pages/student/StudentPage";
import LecturerPage from "./pages/lecturer/LecturerPage";

function App() {
  console.log("ini port", process.env.PORT);
  console.log("ini url", process.env.REACT_APP_API_BASE_URL);
  return (
    <Router>
      <Routes>
        {<Route path="/login" element={<Login />} />}
        {<Route path="/" element={<Login />} />}
        {<Route path="/register" element={<Register />} />}
        {<Route path="/lecturer/*" element={<LecturerPage />} />}
        {<Route path="/student/*" element={<StudentPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
