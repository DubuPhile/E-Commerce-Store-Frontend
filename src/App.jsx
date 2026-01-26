import { useState } from "react";
import HomePage from "./Pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
