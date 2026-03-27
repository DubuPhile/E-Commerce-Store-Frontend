import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import "../Styles/HeaderStyle.css";
import Nav from "./Nav";
import DropdownUser from "./DropdownUser";
import { useGetMyCartQuery } from "../features/cart/cartApiSlice";
import { useSearchProductQuery } from "../features/products/productsApiSlice";
import useClickOutside from "../hooks/useClickOutside";
import { useDebounce } from "../hooks/useDebounce";

const Header = () => {
  const User = useSelector(selectCurrentUser);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data: cart } = useGetMyCartQuery(undefined, {
    skip: !User,
  });
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  const { data: products, isLoading } = useSearchProductQuery(debouncedSearch, {
    skip: search.length < 1,
  });

  const totalItems = cart?.items.length ?? 0;
  const navigate = useNavigate();

  useClickOutside(searchRef, () => setShowResults(false), showResults);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setShowResults(true); // Show results when typing
  };

  return (
    <header className="header">
      <section className="header-section">
        <div className="header-title">
          <div className="logo" onClick={() => navigate("/")}>
            <img src="/logo.png" className="logo-img" alt="logo" />
            <span>DubuTech Shop</span>
          </div>
          <div ref={searchRef}>
            <form className="search-bar-form">
              <div className="input-bar">
                <input
                  id="search-bar"
                  type="text"
                  placeholder="Search..."
                  className="search-bar"
                  autoComplete="off"
                  value={search}
                  onChange={handleInputChange}
                ></input>
                <button type="submit">
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ fontSize: "20px" }}
                  ></i>
                </button>
              </div>
              <div>
                {showResults && search && (
                  <section
                    className={`searchResult ${showResults ? "active" : ""}`}
                  >
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      products?.map((p) => (
                        <section
                          key={p._id}
                          onClick={() => {
                            (navigate(`/product-details/${p._id}`),
                              setShowResults(false),
                              setSearch(""));
                          }}
                          className="searchButton"
                        >
                          <img src={p.imageUrl} className="searchImg" />
                          <span>
                            {p.name} - ${p.price}
                          </span>
                        </section>
                      ))
                    )}
                  </section>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="shopping-cart">
          {User ? (
            <DropdownUser />
          ) : (
            <Link to={"/login"} className="Login" state={{ from: location }}>
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
              {totalItems}
            </span>
          </button>
        </div>
      </section>
      <Nav />
    </header>
  );
};

export default Header;
