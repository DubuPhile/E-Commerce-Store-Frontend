import { useSelector } from "react-redux";
import {
  selectCurrentRoles,
  selectCurrentToken,
  selectCurrentUser,
  hasLocalPassword,
} from "../features/auth/authSlice";

const useAuth = () => {
  const auth = {
    token: useSelector(selectCurrentToken),
    user: useSelector(selectCurrentUser),
    roles: useSelector(selectCurrentRoles),
    hasLocalPassword: useSelector(hasLocalPassword),
  };
  return { auth };
};

export default useAuth;
