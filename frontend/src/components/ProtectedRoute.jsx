import { useSelector } from "react-redux";
import { selectAuthState } from "../features/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector(selectAuthState);

  if (userInfo) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
