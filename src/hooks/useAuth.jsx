import { useSelector } from "react-redux";
import {
  selectCurrentRoles,
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";

const useAuth = () => {
  const auth = {
    token: useSelector(selectCurrentToken),
    user: useSelector(selectCurrentUser),
    roles: useSelector(selectCurrentRoles),
  };
  return { auth };
};

export default useAuth;
