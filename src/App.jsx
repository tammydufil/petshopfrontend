import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Protected } from "./components/protected";
import React, { useEffect, useState } from "react";
import $ from "jquery";

import { UserContext } from "./context/UserContext";
import { Home } from "./pages/home";
import { Shop } from "./pages/shop";
import { CartPage } from "./pages/cartpage";
import { Checkout } from "./pages/checkout";
import { News } from "./pages/news";
import { Error } from "./pages/error";
import ProfilePage from "./pages/profile";
import { AdminPage } from "./pages/admin";
import PostCheckout from "./pages/postcheckout";
import Swal from "sweetalert2";
import OrdersPage from "./pages/orders";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");

    if (loginTime) {
      const loginDate = new Date(loginTime);
      const now = new Date();
      const diffInMs = now - loginDate;
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if (diffInHours >= 8) {
        Swal.fire({
          icon: "info",
          title: "Session Expired",
          text: "You have been logged out. Please login again.",
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.clear();
          window.location.reload();
        });
      }
    }
  }, []);
  useEffect(() => {
    // console.log("useEffect triggered");

    const timeout = setTimeout(() => {
      // console.log("Timeout triggered, adding core.min.js script");

      const coreScript = document.createElement("script");
      coreScript.src = "/assets/pjs/core.min.js";
      coreScript.onload = () => {
        const script = document.createElement("script");
        script.src = "/assets/pjs/script.js";
        script.onload = () => {
          if (window.jQuery) {
            $(document).ready(function () {
              // console.log("DOM is ready, jQuery initialized");
            });
          } else {
            // console.error("jQuery not loaded properly.");
          }
        };

        document.body.appendChild(script);
      };

      document.body.appendChild(coreScript);

      // alert("Ran after 2 seconds!");
    }, 500);

    return () => {
      clearTimeout(timeout);
      // console.log("Cleanup: Timeout cleared");
    };
  }, []);

  useEffect(() => {
    setUserLoading(true);
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    setUserLoading(false);
  }, []);

  return (
    <UserContext
      value={{
        user,
        setUser,
        userLoading,
        setUserLoading,
        cart,
        setCart,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/news" element={<News />} />

          <Route path="*" element={<Error></Error>} />

          <Route element={<Protected />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/postcheckout" element={<PostCheckout />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
