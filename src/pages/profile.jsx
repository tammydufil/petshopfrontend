import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { UserContext } from "../context/UserContext";

export default function ProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
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
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src="/assets/img/boy.png"
              alt="Avatar"
              className="w-32 h-32 p-1 rounded-full object-cover border-4 border-blue-500"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-1">{user?.user?.fullname}</h2>
            <p className="text-gray-500">{user?.user?.email}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div
                onClick={() => {
                  window.location.href = "/orders";
                }}
                className="cursor-pointer bg-blue-100 text-blue-600 rounded-xl p-4 text-center hover:bg-blue-200 transition"
              >
                <FaBoxOpen className="text-2xl mx-auto mb-2" />
                <p className="text-sm">My Orders</p>
              </div>
              <div
                onClick={() => {
                  window.location.href = "/cart";
                }}
                className="cursor-pointer bg-green-100 text-green-600 rounded-xl p-4 text-center hover:bg-green-200 transition"
              >
                <FaShoppingCart className="text-2xl mx-auto mb-2" />
                <p className="text-sm">Cart</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Account Summary</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">8</p>
              <p className="text-sm text-gray-500 mt-1">Orders Placed</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <p className="text-3xl font-bold text-green-600">2</p>
              <p className="text-sm text-gray-500 mt-1">Items in Cart</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <p className="text-3xl font-bold text-pink-600">5</p>
              <p className="text-sm text-gray-500 mt-1">Pending Deliveries</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
