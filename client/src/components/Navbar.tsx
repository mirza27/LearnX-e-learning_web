import React, { useEffect } from "react";
import "../styles/navbar.css";
import "boxicons/css/boxicons.min.css"; // import icon

interface NavbarProps {
  user_id: string;
  firstname: string;
}

function Navbar(props: NavbarProps) {
  const { user_id } = props;
  const { firstname } = props;

  return (
    <nav>
      <i className="bx bx-menu"></i>
      <a href="#" className="nav-link">
        {user_id && firstname ? <>Welcome {firstname}</> : <>Welcome User</>}
      </a>
      <form action="#">
        <div className="form-input">
          {/* <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button> */}
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className="switch-mode"></label>
      <a href="#" className="notification">
        <i className="bx bxs-bell"></i>
        {/* <span className="num"></span> */}
      </a>
      <a href="#" className="profile">
        <img src="https://res.cloudinary.com/dsr5gqz3v/image/upload/v1701435649/wtg263ifmmxdizglhfc9.png" />
      </a>
    </nav>
  );
}

export default Navbar;
