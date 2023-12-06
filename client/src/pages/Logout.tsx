import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

interface logoutProps {
  user_id: string;
}

function Logout(props: logoutProps) {
  const [message, setMessage] = useState("");
  const { user_id } = props;
  const navigate = useNavigate();

  const removeCookie = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/logout`, {});

      if (response.data.message) {
        setMessage(response.data.message);
      }

      navigate("/login");
    } catch (error: any) {
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (user_id) {
      removeCookie();
    }
  }, [user_id]);

  return <></>;
}
export default Logout;
