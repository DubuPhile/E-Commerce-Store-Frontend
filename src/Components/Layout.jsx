import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
