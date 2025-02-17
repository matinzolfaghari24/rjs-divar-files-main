import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import HomePage from "pages/HomePage";
import PageNotFound from "pages/PageNotFound";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user";
import DashboardPage from "src/pages/DashboardPage";
import Loader from "components/modules/Loader";

function Router() {
  const { data, isLoading } = useQuery(["profile"], getProfile);
  console.log({ data, isLoading });
  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/admin"
        element={
          data && data.data.role == "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
