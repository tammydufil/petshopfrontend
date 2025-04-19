import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Home } from "../pages/home";

export const Protected = () => {
  const { user, userLoading } = useContext(UserContext);

  const location = useLocation();

  // console.log(location);

  useEffect(() => {
    if (!userLoading && user && window.initJQueryUI) {
      window.initJQueryUI();
    }
  }, [userLoading, user]);

  if (userLoading) {
    return null; // Or a spinner if you'd like
  }

  return user ? <Outlet /> : <Home />;
};
