import Header from "./HEader"
import Nav from "./Nav"
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <>
        <Header />
        <Nav />
        <div className="body">{children}</div>
        <Footer />
    </>
  )
}

export default Layout