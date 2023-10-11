import React, { useEffect } from "react";
import "../styles/sidebar.css";
import "boxicons/css/boxicons.min.css";
import { SidebarListener } from "../eventListener/SidebarListener";

function Sidebar() {
  useEffect(() => {
    SidebarListener(); // style dengan js / event listener

    return () => {
      // Hapus event listener di sini jika diperlukan
    };
  }, []);

  return (
    // Konten Sidebar Anda tetap sama seperti sebelumnya
    <section id="sidebar">
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">LearnX</span>
      </a>
      <ul className="side-menu top">
        <li className="active">
          <a href="#">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bxs-shopping-bag-alt"></i>
            <span className="text">My Class</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bxs-doughnut-chart"></i>
            <span className="text">Task</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bxs-message-dots"></i>
            <span className="text">Material</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bxs-group"></i>
            <span className="text">Announcement</span>
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </a>
        </li>
        <li>
          <a href="#" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;
