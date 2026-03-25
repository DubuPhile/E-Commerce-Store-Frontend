import useClickOutside from "../hooks/useClickOutside";
import "../Styles/Nav.css";

import { useState, useRef } from "react";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const openRef = useRef();
  useClickOutside(openRef, () => setOpen(false), open);

  return (
    <nav className="nav-bar">
      <a href="/" className="customer-service nav-bar-ref">
        Home
      </a>
      <div className={`nav-dropdown ${open ? "open" : ""}`}>
        <div
          className={`products nav-bar-ref `}
          onClick={() => setOpen(!open)}
          ref={openRef}
        >
          Category ▾
        </div>

        <div className="nav-dropdown-menu">
          <a href="/phones">Phones</a>
          <a href="/laptops">Laptops</a>
          <a href="/accessories">Accessories</a>
        </div>
      </div>
      <a href="#" className="customer-service nav-bar-ref">
        Customer Service
      </a>
      <a href="#" className="contactUs nav-bar-ref">
        Contact Us
      </a>
    </nav>
  );
};

export default Nav;
