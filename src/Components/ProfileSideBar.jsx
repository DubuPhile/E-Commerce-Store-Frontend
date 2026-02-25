import { profileMenu } from "../data/sidebarMenu";
import { useState, useEffect } from "react";
import "../Styles/profileSidebar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { hasLocalPassword } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const ProfileSideBar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const hasLocalPass = useSelector(hasLocalPassword);
  const location = useLocation();

  useEffect(() => {
    const menu = profileMenu(hasLocalPass);

    const activeItem = menu.find((item) => {
      if (item.path && location.pathname.startsWith(item.path)) {
        return true;
      }

      if (
        item.children?.some((child) => location.pathname.startsWith(child.path))
      ) {
        return true;
      }

      return false;
    });

    if (activeItem) {
      setOpenMenu(activeItem.id);
    }
  }, [location.pathname, hasLocalPass]);
  const handleParentClick = (item) => {
    if (item.children) {
      setOpenMenu((prev) => (prev === item.id ? null : item.id));
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className="sidebar">
      {profileMenu(hasLocalPass).map((item) => (
        <nav key={item.id}>
          <div
            className={`sidebar-item ${openMenu === item.id ? "active" : ""}`}
            onClick={() => handleParentClick(item)}
          >
            <div className="left">
              <i className={`fa-solid ${item.icon}`}></i>
              <span>{item.label}</span>
            </div>
            {item.children && (
              <i
                className={`fa-solid fa-chevron-down ${
                  openMenu === item.id ? "rotate" : ""
                }`}
              ></i>
            )}
          </div>
          {item.children && (
            <div
              className={`submenu-wrapper ${
                openMenu === item.id ? "open" : ""
              }`}
            >
              <div className="submenu">
                {item.children.map((child) => (
                  <NavLink
                    key={child.id}
                    to={child.path}
                    end={false}
                    className={({ isActive }) =>
                      `submenu-item ${isActive ? "active" : ""}`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>
      ))}
    </aside>
  );
};

export default ProfileSideBar;
