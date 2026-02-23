import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../features/auth/authSlice";
import { apiSlice } from "../api/apiSlice";
import { useState, useEffect, useRef } from "react";
import "../Styles/DropdownUser.css";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";

const DropdownUser = () => {
  const User = useSelector(selectCurrentUser);
  const { data } = useGetUserQuery(undefined, {
    skip: !User,
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const [avatar, setAvatar] = useState(data?.data?.image || null);
  const openRef = useRef(null);

  useEffect(() => {
    setAvatar(data?.data?.image || null);
  }, [data?.data?.image]);

  useClickOutside(openRef, () => setOpen(false), open);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch(logOut());
      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    }
  };
  return (
    <>
      <div className={`dropdownUser ${open ? "open" : ""}`}>
        <button
          className={`user ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          ref={openRef}
        >
          {User}
          <img
            className="user-icon"
            src={
              avatar !== null
                ? avatar
                : "https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg"
            }
          />
        </button>
        <div className={`dropdownUser-menu`}>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default DropdownUser;
