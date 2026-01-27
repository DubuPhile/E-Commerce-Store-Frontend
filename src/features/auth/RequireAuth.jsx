import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentRoles } from "./authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const token = useSelector(selectCurrentToken);
  const roles = useSelector(selectCurrentRoles);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (
    allowedRoles &&
    !roles.some((role) => allowedRoles.includes(role))
  ) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
