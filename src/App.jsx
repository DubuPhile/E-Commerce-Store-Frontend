import HomePage from "./Pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./Components/PersistLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PersistLogin />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<RequireAuth allowedRoles={[2001, 5150]} />}>
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
