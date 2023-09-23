import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

function App() {
  const [data, setData] = useState({ message: "", items: [] });

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setData(response.data);
        console.log("ini", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // array kosong untuk membuat agar permintaan dilakukan sekali

  return (
    <Router>
      <Routes>{/* <Route path="/login" element={<Login />} /> */}</Routes>
      <div>
        <section id="content">
          {/* Tambahkan Navbar dan Sidebar di sini */}
          <Navbar />
          <Sidebar />
          <h1>Data dari Server</h1>
          <p>{data.message}</p>
          <ul>
            {data.items &&
              data.items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </section>
      </div>
    </Router>
  );
}

export default App;
