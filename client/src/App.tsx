import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./pages/Login";
import StudentPage from "./pages/student/StudentPage";

function App() {
  return (
    <Router>
      <Routes>
        {<Route path="/login" element={<Login />} />}
        {<Route path="/register" />}
        {<Route path="/student/*" element={<StudentPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
