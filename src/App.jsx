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

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/product-details/:Id"
          element={<ProdDescriptionPage />}
        ></Route>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<RequireAuth allowedRoles={[700]} />}>
            <Route path="/profile">
              <Route index element={<Navigate to="my-profile" replace />} />
              <Route path="my-profile" element={<Profile />} />
              <Route path="bank" element={<Bank />} />
            </Route>
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
