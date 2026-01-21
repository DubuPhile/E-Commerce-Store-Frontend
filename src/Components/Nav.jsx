import "../Styles/Nav.css"

const Nav = () => {
  return (
    <nav className="nav-bar">
      <a href="/" className = "customer-service nav-bar-ref">Home</a>
      <div className="nav-dropdown">
        <a href="#" className="products nav-bar-ref">Products ▾</a>

        <div className="nav-dropdown-menu">
          <a href="/phones">Phones</a>
          <a href="/laptops">Laptops</a>
         <a href="/accessories">Accessories</a>
        </div>
      </div>
      <a href="#" className = "customer-service nav-bar-ref">Customer Service</a>
      <a href="#" className = "contactUs nav-bar-ref">Contact Us</a>
    </nav>
  )
}

export default Nav