import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../features/auth/authSlice";
import { useState } from "react";
import "../Styles/DropdownUser.css";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
const DropdownUser = () => {
  const User = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch(logOut());
      navigate("/login");
    }
  };
  return (
    <>
      <div className={`dropdownUser ${open ? "open" : ""}`}>
        <button
          className={`user ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          {User}
        </button>
        <div className={`dropdownUser-menu`}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default DropdownUser;
