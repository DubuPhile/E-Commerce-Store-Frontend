import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import { Provider } from "react-redux";
import store from "./api/store.jsx";
import { ToastProvider } from "./Context/ToastContext.jsx";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/*"} element={<App />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  </StrictMode>,
);
