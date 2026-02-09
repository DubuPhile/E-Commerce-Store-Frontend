import { profileMenu } from "../data/sidebarMenu";
import { useState } from "react";
import "../Styles/profileSidebar.css";
import { NavLink } from "react-router-dom";

const ProfileSideBar = () => {
  const [openMenu, setOpenMenu] = useState("profile");

  const handleParentClick = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <aside className="sidebar">
      {profileMenu.map((item) => (
        <nav key={item.id}>
          <div
            className={`sidebar-item ${openMenu === item.id ? "active" : ""}`}
            onClick={() => handleParentClick(item.id)}
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
