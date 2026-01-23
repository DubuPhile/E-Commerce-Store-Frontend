import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import ProductsProvider from "./Context/productsProvider.jsx";
import { CartProvider } from "./Context/cartProvider.jsx";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route path={"/*"} element={<App />} />
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  </StrictMode>,
);
