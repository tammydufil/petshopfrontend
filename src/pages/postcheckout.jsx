import React, { useEffect, useContext, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

const PostCheckout = () => {
  const { user } = useContext(UserContext);
  const hasPostedRef = useRef(false);

  useEffect(() => {
    const postOrder = async () => {
      const orderData = JSON.parse(localStorage.getItem("orderData"));
      if (!orderData) return (window.location.href = "/");

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/createOrder`,
          {
            items: orderData.cart,
            ...orderData.customerDetails,
            amount_paid: orderData?.amountPaid,
            userid: user?.user?.userid,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        localStorage.removeItem("orderData");

        await Swal.fire({
          icon: "success",
          title: "Order Placed",
          text: "Your order was successfully placed!",
          confirmButtonColor: "#4f46e5",
        }).then(() => {
          window.location.href = "/orders";
        });
      } catch (error) {
        console.error("Failed to post order", error);
        await Swal.fire({
          icon: "error",
          title: "Error Placing Order",
          text: error?.message,
          confirmButtonColor: "#4f46e5",
        });
      }
    };

    if (!hasPostedRef.current && user?.token) {
      hasPostedRef.current = true;
      postOrder();
    }
  }, [user?.token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner"></div>
    </div>
  );
};

export default PostCheckout;
