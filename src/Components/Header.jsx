import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import '../Styles/HeaderStyle.css'
const Header = () => {
    const [search, setSearch] = useState("");
  return (
    <header className="header">
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
        <button type="submit"><i className="fa-solid fa-magnifying-glass" style={{fontSize: "20px"}}></i></button>
        </form>
      </div>
      <div className="shopping-cart">
        <Link to={'/Login'} className="Login">Log-in/Sign-Up</Link>
        <i className="fa-solid fa-cart-shopping " style={{fontSize: "25px"}}></i>
      </div>
    </header>
  )
}

export default Header