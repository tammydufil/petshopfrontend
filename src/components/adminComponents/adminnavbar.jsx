import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import withReactContent from "sweetalert2-react-content";

export const SimpleNavbar = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const MySwal = withReactContent(Swal);

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You are about to logout, do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");
        setUser(null);
        window.location.href = "/";
      }
    });
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">Admin Panel</div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
