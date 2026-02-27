import HomePage from "./Pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import ProdDescriptionPage from "./Pages/prodDescriptionPage";
import RegisterPage from "./Pages/RegisterPage";
import Profile from "./Pages/profilePages/Profile";
import Bank from "./Pages/profilePages/BankPage";
import ChangePassword from "./Pages/profilePages/changePassword";
import SetPassword from "./Pages/profilePages/setPassword";
import MyOrders from "./Pages/profilePages/MyOrders";
import Addresses from "./Pages/profilePages/Addresses";
import NotFound from "./Pages/NotFound";
import Layout from "./Components/Layout";
import ProfileLayout from "./Components/ProfileLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<Layout />}>
          <Route
            path="/product-details/:Id"
            element={<ProdDescriptionPage />}
          />
          <Route element={<PersistLogin />}>
            <Route index element={<HomePage />} />
            <Route element={<RequireAuth allowedRoles={[700]} />}>
              <Route element={<ProfileLayout />}>
                <Route path="profile">
                  <Route index element={<Navigate to="my-profile" replace />} />
                  <Route path="my-profile" element={<Profile />} />
                  <Route path="change-password" element={<ChangePassword />} />
                  <Route path="set-password" element={<SetPassword />} />
                  <Route path="addresses" element={<Addresses />} />
                  <Route path="bank" element={<Bank />} />
                </Route>
                <Route path="orders" element={<MyOrders />} />
                <Route path="cart" element={<CartPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
