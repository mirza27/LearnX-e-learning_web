import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import "boxicons/css/boxicons.min.css";
import { SidebarListener } from "../eventListener/SidebarListener";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false); // untuk toggle hide

  const menuItem = [
    // menaruh path side bar
    {
      path: "/student/dashboard",
      name: "Dashboard",
      icon: "bx bxs-shopping-bag-alt",
    },
    {
      path: "/student/class",
      name: "Myclass",
      icon: "bx bxs-shopping-bag-alt",
    },
  ];

  useEffect(() => {
    const menuBar = document.querySelector("#content nav .bx.bx-menu");
    const sidebar = document.getElementById("sidebar");

    if (sidebar && menuBar) {
      menuBar.addEventListener("click", function () {
        sidebar.classList.toggle("hide");
        setIsSidebarHidden(!isSidebarHidden);
      });
    }
  }, [isSidebarHidden]);

  return (
    // Konten Sidebar Anda tetap sama seperti sebelumnya
    <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">LearnX</span>
      </a>
      <ul className="side-menu top">
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <li>
              <a href="#">
                <i className={item.icon}></i>
                <span className="text">{item.name}</span>
              </a>
            </li>
          </NavLink>
        ))}
      </ul>
    </section>
  );
}

export default Sidebar;
