import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Footer } from "../components/footer";
import { SimpleNavbar } from "../components/adminComponents/adminnavbar";
import { AdminUsers } from "../components/adminComponents/adminusers";
import { ProductCategories } from "../components/adminComponents/productCategories";
import { Products } from "../components/adminComponents/products";
import AdminOrdersPage from "../components/adminComponents/adminOrdersPage";

export const AdminPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/validateAdmin`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response.data.validated) {
          setIsValidated(true);
        } else {
          setAccessDenied(true);
        }
      } catch (error) {
        console.error("Admin validation failed", error);
        setAccessDenied(true);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      validateAdmin();
    } else {
      setLoading(false);
      setAccessDenied(true);
    }
  }, [user?.token]);

  const handleSelectChange = (e) => {
    navigate(location.pathname, { state: { view: e.target.value } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isValidated && accessDenied) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-semibold">
        You don’t have access to this page
      </div>
    );
  }

  return (
    <div>
      <SimpleNavbar />
      <div>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex justify-end mb-6">
            <select
              onChange={handleSelectChange}
              defaultValue=""
              className="border border-gray-300 px-4 py-2 rounded-lg"
            >
              <option value="" disabled>
                Choose Menu
              </option>
              <option value="users">Users</option>
              <option value="categories">Categories</option>
              <option value="products">Products</option>
              <option value="Orders">Orders</option>
            </select>
          </div>

          {location.state?.view === "users" && (
            <div>
              <AdminUsers></AdminUsers>
            </div>
          )}
          {location.state?.view === "categories" && (
            <div>
              <ProductCategories></ProductCategories>{" "}
            </div>
          )}
          {location.state?.view === "products" && (
            <div>
              <Products></Products>
            </div>
          )}
          {location.state?.view === "Orders" && (
            <div>
              <AdminOrdersPage></AdminOrdersPage>
            </div>
          )}

          {!location.state?.view && (
            <div className="text-center text-gray-500">
              You have not chosen what to view
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};
