import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import "../Styles/HeaderStyle.css";
import Nav from "./Nav";
import DropdownUser from "./DropdownUser";
import { useGetMyCartQuery } from "../features/cart/cartApiSlice";

const Header = () => {
  const User = useSelector(selectCurrentUser);
  const [search, setSearch] = useState("");
  const { data: cart, isLoading } = useGetMyCartQuery();

  const totalItems = cart?.items.length ?? 0;
  const navigate = useNavigate();
  return (
    <header className="header">
      <section className="header-section">
        <div className="header-title">
          <h2>E-commerce Store</h2>
          <form className="search-bar-form">
            <input
              id="search-bar"
              type="text"
              placeholder="Search..."
              className="search-bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button type="submit">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ fontSize: "20px" }}
              ></i>
            </button>
          </form>
        </div>
        <div className="shopping-cart">
          {User ? (
            <DropdownUser />
          ) : (
            <Link to={"/login"} className="Login">
              Log-in /Sign-Up
            </Link>
          )}
          <button className="cart-wrapper" onClick={() => navigate("/cart")}>
            <i
              className="fa-solid fa-cart-shopping"
              style={{ fontSize: "25px" }}
            ></i>
            <span
              className="count"
              style={
                totalItems === undefined ||
                totalItems === null ||
                totalItems === 0
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              {isLoading ? "Loading..." : totalItems}
            </span>
          </button>
        </div>
      </section>
      <Nav />
    </header>
  );
};

export default Header;
