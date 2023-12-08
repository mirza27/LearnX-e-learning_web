import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import "boxicons/css/boxicons.min.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { SidebarListener } from "../eventListener/SidebarListener";

function StudentSidebar() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false); // untuk toggle hide

  const menuItem = [
    // menaruh path side bar
    {
      path: "/student/dashboard",
      name: "Dashboard",
      icon: "akar-icons:dashboard",
    },
    {
      path: "/student/class",
      name: "Class",
      icon: "ion:people",
    },
    {
      path: "/student/mytask",
      name: "My Task",
      icon: "fluent:clipboard-task-24-regular",
    },
    {
      path: "/student/forum",
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

  // useEffect(() => {
  //   SidebarListener();
  // });

  return (
    // Konten Sidebar Anda tetap sama seperti sebelumnya
    <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
      <NavLink to="/student/dashboard">
        <a className="brand">
          <Icon icon="ion:school-outline" className="bx" />
          <span className="text">LearnX</span>
        </a>
      </NavLink>
      <ul className="side-menu top">
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <li>
              <a href="#">
                <Icon icon={item.icon} className="bx" />
                <span className="text">{item.name}</span>
              </a>
            </li>
          </NavLink>
        ))}
      </ul>

      {/* OTHER MENU */}
      <ul className="side-menu">
        <NavLink to="/student/logout">
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

export default StudentSidebar;
