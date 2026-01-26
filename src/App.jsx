import { useState } from "react";
import HomePage from "./Pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
