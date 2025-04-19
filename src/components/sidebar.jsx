import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Module to route mapping
const moduleAccessMap = {
  "New Purchase": "/newpurchase",
  "Purchase History": "/purchasehistory",
  "View Inventory": "/inventory",
  "Product List": "/productlist",
  "Add Product": "/productaddnew",
  "Category List": "/productcategorylist",
  "Add Category": "/productaddcategory",
  "All Product Types": "/producttypelist",
  "Add Product Type": "/productaddtype",
  "New User": "/newusers",
  "Users List": "/userslist",
  "Daily Requisition": "/dailyrequests",
  "Admin Approval List": "/adminapprovalrequests",
  "All Approval List": "/allapprovalrequests",
  "Approval Requests": "/approvalrequests",
};

export const Sidebar = () => {
  const { user, Modules } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");
  const [openSubmenu, setOpenSubmenu] = useState("");
  const [loadingModules, setLoadingModules] = useState(true);
  const [userModules, setUserModules] = useState([]);

  useEffect(() => {
    if (Modules) {
      const parsedModules = Modules.split(",").map((mod) => mod.trim());
      setUserModules(parsedModules);
      setLoadingModules(false);
    }
  }, [Modules]);

  useEffect(() => {
    if (loadingModules || userModules.length === 0) return;

    const allowedRoutes = Object.values(moduleAccessMap).filter((path) =>
      userModules.some((mod) => moduleAccessMap[mod] === path)
    );

    if (location.pathname === "/") {
      setActive("DASHBOARD");
    } else {
      for (const [key, value] of Object.entries(moduleAccessMap)) {
        if (location.pathname.includes(value)) {
          if (key.includes("Purchase")) setOpenSubmenu("PURCHASE");
          if (key.includes("Product")) setOpenSubmenu("PRODUCT");
          if (key.includes("User")) setOpenSubmenu("USERS");
          if (key.includes("Inventory")) setOpenSubmenu("INVENTORY");
          if (key.includes("Requisition") || key.includes("Approval"))
            setOpenSubmenu("REQUESTS");

          setActive(key);
          break;
        }
      }
    }
  }, [location.pathname, userModules, loadingModules]);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? "" : menu);
  };

  const isActiveSubLink = (path) => location.pathname === path;

  const renderLink = (module, text) => {
    const path = moduleAccessMap[module];
    if (!userModules.includes(module)) return null;
    return (
      <li key={module}>
        <a
          href={path}
          className={isActiveSubLink(path) ? "active-submenu-link" : ""}
        >
          {text}
        </a>
      </li>
    );
  };

  return (
    <div className="sidebar" id="sidebar">
      {loadingModules && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 opacity-5 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul className="mynavul">
            <li className={active === "DASHBOARD" ? "active" : ""}>
              <a href="/">
                <img src="assets/img/icons/dashboard.svg" alt="img" />
                <span> Dashboard</span>
              </a>
            </li>

            {/* PURCHASE */}
            {(userModules.includes("New Purchase") ||
              userModules.includes("Purchase History")) && (
              <li
                className={`submenu ${
                  openSubmenu === "PURCHASE" ? "open" : ""
                }`}
              >
                <a href="#" onClick={() => toggleSubmenu("PURCHASE")}>
                  <img src="assets/img/icons/purchase1.svg" alt="img" />
                  <span> Purchase</span> <span className="menu-arrow" />
                </a>
                <ul
                  style={{
                    display: openSubmenu === "PURCHASE" ? "block" : "none",
                  }}
                >
                  {renderLink("New Purchase", "New Purchase")}
                  {renderLink("Purchase History", "Purchase History")}
                </ul>
              </li>
            )}

            {/* INVENTORY */}
            {userModules.includes("View Inventory") && (
              <li
                className={`submenu ${
                  openSubmenu === "INVENTORY" ? "open" : ""
                }`}
              >
                <a href="#" onClick={() => toggleSubmenu("INVENTORY")}>
                  <img src="assets/img/icons/expense1.svg" alt="img" />
                  <span> Inventory</span> <span className="menu-arrow" />
                </a>
                <ul
                  style={{
                    display: openSubmenu === "INVENTORY" ? "block" : "none",
                  }}
                >
                  {renderLink("View Inventory", "View Inventory")}
                </ul>
              </li>
            )}

            {/* PRODUCT */}
            {userModules?.some(
              (mod) => mod.includes("Product") || mod.includes("Category")
            ) && (
              <li
                className={`submenu ${openSubmenu === "PRODUCT" ? "open" : ""}`}
              >
                <a href="#" onClick={() => toggleSubmenu("PRODUCT")}>
                  <img src="assets/img/icons/product.svg" alt="img" />
                  <span> Product</span> <span className="menu-arrow" />
                </a>
                <ul
                  style={{
                    display: openSubmenu === "PRODUCT" ? "block" : "none",
                  }}
                >
                  {renderLink("Product List", "Product List")}
                  {renderLink("Add Product", "Add Product")}
                  {renderLink("Category List", "Category List")}
                  {renderLink("Add Category", "Add Category")}
                  {renderLink("All Product Types", "All Product Types")}
                  {renderLink("Add Product Type", "Add Product Type")}
                </ul>
              </li>
            )}

            {/* USERS */}
            {(userModules.includes("New User") ||
              userModules.includes("Users List")) && (
              <li
                className={`submenu ${openSubmenu === "USERS" ? "open" : ""}`}
              >
                <a href="#" onClick={() => toggleSubmenu("USERS")}>
                  <img src="assets/img/icons/users1.svg" alt="img" />
                  <span> Users</span> <span className="menu-arrow" />
                </a>
                <ul
                  style={{
                    display: openSubmenu === "USERS" ? "block" : "none",
                  }}
                >
                  {renderLink("New User", "New User")}
                  {renderLink("Users List", "Users List")}
                </ul>
              </li>
            )}

            {/* REQUESTS */}
            {userModules?.some((mod) =>
              [
                "Daily Requisition",
                "Admin Approval List",
                "All Approval List",
                "Approval Requests",
              ].includes(mod)
            ) && (
              <li
                className={`submenu ${
                  openSubmenu === "REQUESTS" ? "open" : ""
                }`}
              >
                <a href="#" onClick={() => toggleSubmenu("REQUESTS")}>
                  <img src="assets/img/icons/product.svg" alt="img" />
                  <span> Requests</span> <span className="menu-arrow" />
                </a>
                <ul
                  style={{
                    display: openSubmenu === "REQUESTS" ? "block" : "none",
                  }}
                >
                  {renderLink("Daily Requisition", "Daily Requisition")}
                  {renderLink("Admin Approval List", "User Approval List")}
                  {renderLink("All Approval List", "All Approval List")}
                  {renderLink("Approval Requests", "Approval Requests")}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
