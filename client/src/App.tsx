import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [data, setData] = useState({ message: "", items: [] }); // Mengubah initial state menjadi objek kosong

  useEffect(() => {
    // Menggunakan useEffect untuk melakukan pemanggilan HTTP
    axios
      .get("/api")
      .then((response) => {
        setData(response.data); // Set data ke state setelah berhasil mengambilnya
        console.log("ini", response.data); // Menggunakan response.data daripada data (nilai yang lama)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // Gunakan array kosong sebagai dependencies agar permintaan hanya dilakukan sekali

  return (
    <Router>
      <div>
        <Routes></Routes>
        <Sidebar />
        <section id="content">
          <Navbar />
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
