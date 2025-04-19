import React, { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartnavPopup } from "./cardnavpopup";

const MySwal = withReactContent(Swal);

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const userContext = useContext(UserContext);

  console.log(user);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const processLogin = async (
    email,
    password,
    setLoading,
    userContext,
    navigate
  ) => {
    if (!email || !password) {
      Swal.showValidationMessage("Both email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password }
      );

      const loginData = response.data;
      const { message, token, user } = loginData;

      const { isAdmin, ...restUser } = user;

      const cleanedData = { message, token, user: restUser };

      localStorage.setItem("user", JSON.stringify(cleanedData));
      localStorage.setItem("loginTime", new Date().toISOString());

      userContext?.setUser(cleanedData);

      await MySwal.fire("Success", "Logged in successfully!", "success");
      navigate("/");
    } catch (error) {
      console.log(error);

      Swal.showValidationMessage(
        "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const processRegister = async (fullname, email, password, setLoading) => {
    if (!fullname || !email || !password) {
      Swal.showValidationMessage("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        fullname,
        email,
        password,
      });

      await MySwal.fire("Success", "Registration complete!", "success");
      handleLogin(); // Open login after successful registration
    } catch (error) {
      Swal.showValidationMessage(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Enter Login Details",
      html: `
        <div class="space-y-4 text-left">
          <div>
            <label for="swal-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="swal-email" type="email" placeholder="Enter your email"
              class="w-full px-4 py-2 border border-gray-300 !rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label for="swal-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="swal-password" type="password" placeholder="Enter your password"
              class="w-full px-4 py-2 border border-gray-300 !rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div class="text-sm text-center">
            Don’t have an account?
            <a href="#" id="swal-switch-register" class="text-blue-600 hover:underline transition">Register here</a>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: `<span id="login-btn-text">Login</span><svg id="login-spinner" class="hidden ml-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"/></svg>`,
      didOpen: () => {
        const registerLink = Swal.getPopup().querySelector(
          "#swal-switch-register"
        );
        registerLink.addEventListener("click", (e) => {
          e.preventDefault();
          Swal.close();
          handleRegister();
        });
      },
      preConfirm: async () => {
        const email = Swal.getPopup().querySelector("#swal-email").value;
        const password = Swal.getPopup().querySelector("#swal-password").value;
        const spinner = Swal.getPopup().querySelector("#login-spinner");
        const text = Swal.getPopup().querySelector("#login-btn-text");

        if (!email || !password) {
          Swal.showValidationMessage("Both email and password are required.");
          throw new Error(); // prevents closing
        }

        spinner.classList.remove("hidden");
        text.textContent = "Logging in...";
        Swal.getConfirmButton().disabled = true;

        try {
          await processLogin(email, password, () => {}, userContext, navigate);
        } catch (error) {
          throw new Error(); // stops modal from closing
        } finally {
          spinner.classList.add("hidden");
          text.textContent = "Login";
          Swal.getConfirmButton().disabled = false;
          window.location.reload();
        }
      },
      customClass: {
        popup: "rounded-xl p-6 menufont",
        confirmButton:
          "swal2-confirm btn btn-primary flex items-center justify-center",
        cancelButton: "swal2-cancel btn btn-outline-secondary ml-2",
        title: "text-lg font-semibold",
      },
    });
  };

  const handleRegister = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Fill the details below to register",
      html: `
        <div class="space-y-4 text-left">
          <div>
            <label for="swal-fullname" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input id="swal-fullname" type="text" placeholder="Enter your full name"
              class="w-full px-4 py-2 border border-gray-300 !rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label for="swal-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="swal-email" type="email" placeholder="Enter your email"
              class="w-full px-4 py-2 border border-gray-300 !rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label for="swal-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="swal-password" type="password" placeholder="Create a password"
              class="w-full px-4 py-2 border border-gray-300 !rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div class="text-sm text-center">
            Already have an account?
            <a href="#" id="swal-switch-login" class="text-blue-600 hover:underline transition">Login here</a>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: `<span id="register-btn-text">Register</span><svg id="register-spinner" class="hidden ml-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"/></svg>`,
      didOpen: () => {
        const loginLink = Swal.getPopup().querySelector("#swal-switch-login");
        loginLink.addEventListener("click", (e) => {
          e.preventDefault();
          Swal.close();
          handleLogin();
        });
      },
      preConfirm: async () => {
        const fullname = Swal.getPopup().querySelector("#swal-fullname").value;
        const email = Swal.getPopup().querySelector("#swal-email").value;
        const password = Swal.getPopup().querySelector("#swal-password").value;
        const spinner = Swal.getPopup().querySelector("#register-spinner");
        const text = Swal.getPopup().querySelector("#register-btn-text");

        if (!fullname || !email || !password) {
          Swal.showValidationMessage("Please fill in all fields");
          throw new Error(); // stop swal from closing
        }

        spinner.classList.remove("hidden");
        text.textContent = "Registering...";
        Swal.getConfirmButton().disabled = true;

        try {
          await processRegister(fullname, email, password, () => {});
        } catch (error) {
          throw new Error(); // stop swal from closing
        } finally {
          spinner.classList.add("hidden");
          text.textContent = "Register";
          Swal.getConfirmButton().disabled = false;
        }
      },
      customClass: {
        popup: "rounded-xl p-6 menufont",
        confirmButton:
          "swal2-confirm btn btn-primary flex items-center justify-center",
        cancelButton: "swal2-cancel btn btn-outline-secondary ml-2",
        title: "text-lg font-semibold",
      },
    });
  };

  const handleGetInTouch = () => {
    Swal.fire({
      title: "<strong>Contact Information</strong>",
      html: `
        <div style="text-align: left; font-size: 16px;">
          <p><strong>📍 Address:</strong><br />123 Innovation Street, Tech Valley, NY 10001</p>
          <p><strong>📞 Phone:</strong><br />(123) 456-7890</p>
          <p><strong>✉️ Email:</strong><br />contact@example.com</p>
          <p style="margin-top: 15px;">Feel free to reach out to us for any inquiries or collaborations. We're here to help you!</p>
        </div>
      `,
      icon: "info",
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Close",
      customClass: {
        popup: "rounded-xl p-6",
        title: "text-lg font-semibold",
        confirmButton: "swal2-confirm btn btn-primary",
      },
    });
  };

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
        window.location.reload();
      }
    });
  };

  return (
    <header className="section page-header">
      {/* RD Navbar*/}
      <div className="rd-navbar-wrap">
        <nav
          className="rd-navbar rd-navbar-modern !w-screen"
          data-layout="rd-navbar-fixed"
          data-sm-layout="rd-navbar-fixed"
          data-md-layout="rd-navbar-fixed"
          data-md-device-layout="rd-navbar-fixed"
          data-lg-layout="rd-navbar-static"
          data-lg-device-layout="rd-navbar-fixed"
          data-xl-layout="rd-navbar-static"
          data-xl-device-layout="rd-navbar-static"
          data-xxl-layout="rd-navbar-static"
          data-xxl-device-layout="rd-navbar-static"
          data-lg-stick-up-offset="100px"
          data-xl-stick-up-offset="120px"
          data-xxl-stick-up-offset="140px"
          data-lg-stick-up="true"
          data-xl-stick-up="true"
          data-xxl-stick-up="true"
        >
          <div
            className="rd-navbar-collapse-toggle rd-navbar-fixed-element-1"
            data-rd-navbar-toggle=".rd-navbar-collapse"
          >
            <span />
          </div>
          <div className="rd-navbar-aside-outer">
            <div className="rd-navbar-aside">
              <div className="rd-navbar-collapse">
                <div className="contacts-ruth">
                  <div className="unit unit-spacing-xs align-items-center">
                    <div className="unit-left">
                      <span className="linear-icon icon linearicons-map-marker" />
                    </div>
                    <div className="unit-body !text-[black] hover:!text-[black]">
                      <p className="!font-semibold hover:!font-semibold">
                        66646 John Doe
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing
                      </p>
                    </div>
                  </div>
                </div>
                {/* <a
                  className="button button-primary-outline button-sm button-icon button-icon-left"
                  href="#"
                >
                  <span className="icon mdi mdi-email-outline icon-size-m" />
                  Get in touchds
                </a> */}
              </div>
              {/* RD Navbar Panel*/}
              <div className="rd-navbar-panel">
                {/* RD Navbar Toggle*/}
                <button
                  className="rd-navbar-toggle"
                  data-rd-navbar-toggle=".rd-navbar-nav-wrap"
                >
                  <span />
                </button>
                {/* RD Navbar Brand*/}
                <div className="">
                  <a className="" href="/">
                    <img
                      className="w-[50px] md:w-[120px] md:-mb-[40px]"
                      src="/assets/img/petlogo.png"
                      alt=""
                      width={168}
                      height={60}
                    />
                  </a>
                </div>
              </div>
              <div className="rd-navbar-button">
                <a
                  className="button button-primary-outline button-sm button-icon button-icon-left"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleGetInTouch();
                  }}
                >
                  <span className="icon mdi mdi-email-outline icon-size-m" />
                  Get in touch
                </a>
              </div>
            </div>
          </div>
          <div className="rd-navbar-main-outer">
            <div className="rd-navbar-main">
              <div className="rd-navbar-nav-wrap">
                {/* RD Navbar Nav*/}
                <ul className="rd-navbar-nav">
                  <li className="rd-nav-item active">
                    <a className="rd-nav-link" href="/">
                      Home
                    </a>
                  </li>

                  <li className="rd-nav-item">
                    <a className="rd-nav-link" href="shop">
                      Shop
                    </a>
                    {/* RD Navbar Dropdown*/}
                    <ul className="rd-menu rd-navbar-dropdown  !py-0 !pb-6">
                      <li className="rd-dropdown-item">
                        <a
                          className="rd-dropdown-link !font-semibold"
                          href="shop"
                        >
                          Shop List
                        </a>
                      </li>

                      <li className="rd-dropdown-item">
                        <a
                          className="rd-dropdown-link !font-semibold"
                          href="cartpage"
                        >
                          Cart Page
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="rd-nav-item">
                    <a className="rd-nav-link" href="/news">
                      Blog
                    </a>
                  </li>

                  {user && (
                    <>
                      <li className="rd-nav-item">
                        <a className="rd-nav-link" href="/profile">
                          Profile
                        </a>
                      </li>
                      <li className="rd-nav-item">
                        <a
                          className="rd-nav-link"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </>
                  )}

                  {!user && (
                    <li className="rd-nav-item">
                      <a
                        className="rd-nav-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogin();
                        }}
                      >
                        Account
                      </a>
                      {/* RD Navbar Dropdown*/}
                      {!user && (
                        <>
                          <ul className="rd-menu !py-0 !pb-6 rd-navbar-dropdown">
                            <li className="rd-dropdown-item">
                              <a
                                href="#"
                                className="rd-dropdown-link !font-semibold"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLogin();
                                }}
                              >
                                Login
                              </a>
                            </li>

                            <li className="rd-dropdown-item">
                              <a
                                href="#"
                                className="rd-dropdown-link !font-semibold"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRegister();
                                }}
                              >
                                Register
                              </a>
                            </li>
                          </ul>
                        </>
                      )}
                    </li>
                  )}
                </ul>
              </div>
              <div className="rd-navbar-main-element">
                {/* RD Navbar Search*/}
                <div className="rd-navbar-search rd-navbar-search-2">
                  <button
                    className="rd-navbar-search-toggle rd-navbar-fixed-element-3"
                    data-rd-navbar-toggle=".rd-navbar-search"
                  >
                    <span />
                  </button>
                  <form
                    className="rd-search"
                    action="search-results.html"
                    data-search-live="rd-search-results-live"
                    method="GET"
                  >
                    <div className="form-wrap">
                      <label
                        className="form-label"
                        htmlFor="rd-navbar-search-form-input"
                      >
                        Search...
                      </label>
                      <input
                        className="rd-navbar-search-form-input form-input"
                        id="rd-navbar-search-form-input"
                        type="text"
                        name="s"
                        autoComplete="off"
                      />
                      <div
                        className="rd-search-results-live"
                        id="rd-search-results-live"
                      />
                      <button
                        className="rd-search-form-submit fl-bigmug-line-search74"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
                <CartnavPopup></CartnavPopup>
                <a
                  className="rd-navbar-basket rd-navbar-basket-mobile fl-bigmug-line-shopping202 rd-navbar-fixed-element-2"
                  href="cartpage"
                ></a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
  8;
};
