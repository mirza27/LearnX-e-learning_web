import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import "boxicons/css/boxicons.min.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

function LecturerSidebar() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false); // untuk toggle hide

  const menuItem = [
    // menaruh path side bar
    {
      path: "/lecturer/dashboard",
      name: "Dashboard",
      icon: "akar-icons:dashboard",
    },
    {
      path: "/lecturer/myclass",
      name: "My Class",
      icon: "ion:people",
    },

    {
      path: "/lecturer/attachment",
      name: "Attachment",
      icon: "fluent:clipboard-task-24-regular",
    },
    {
      path: "/lecturer/forums",
      name: "Forums",
      icon: "ic:baseline-chat",
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
        <Icon icon="ion:school-outline" className="bx" />
        <span className="text">LearnX</span>
      </a>
      <ul className="side-menu top">
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <li>
              <a href="#">
                <Icon className="bx" icon={item.icon} />
                <span className="text">{item.name}</span>
              </a>
            </li>
          </NavLink>
        ))}
      </ul>

      {/* OTHER MENU */}
      <ul className="side-menu">
        <li>
          <a href="#">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </a>
        </li>
        <NavLink to="/lecturer/logout">
          <li>
            <a href="#" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </NavLink>
      </ul>
    </section>
  );
}

export default LecturerSidebar;
