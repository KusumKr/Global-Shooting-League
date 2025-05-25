import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth, UserRole } from "../../../supabase/auth";
import ShooterDashboard from "./ShooterDashboard";
import RangeOwnerDashboard from "./RangeOwnerDashboard";
import AdminDashboard from "./AdminDashboard";
import { LoadingScreen } from "../ui/loading-spinner";

const DashboardRouter = () => {
  const { userRole, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Loading dashboard..." />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userRole === "franchise_owner" ? (
            <Navigate to="/dashboard/admin" replace />
          ) : userRole === "range_owner" ? (
            <Navigate to="/dashboard/range-owner" replace />
          ) : (
            <Navigate to="/dashboard/shooter" replace />
          )
        }
      />
      <Route path="/shooter" element={<ShooterDashboard />} />
      <Route path="/range-owner" element={<RangeOwnerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default DashboardRouter;
