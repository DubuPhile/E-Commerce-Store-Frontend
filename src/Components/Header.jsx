import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/HeaderStyle.css";
import Nav from "./Nav";
import useCart from "../hooks/useCart";
const Header = () => {
  const [search, setSearch] = useState("");
  const { totalItems } = useCart();
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
          <Link to={"/Login"} className="Login">
            Log-in /Sign-Up
          </Link>
          <button className="cart-wrapper" onClick={() => navigate("/cart")}>
            <i
              className="fa-solid fa-cart-shopping"
              style={{ fontSize: "25px" }}
            ></i>
            <span className="count">{totalItems}</span>
          </button>
        </div>
      </section>
      <Nav />
    </header>
  );
};

export default Header;
