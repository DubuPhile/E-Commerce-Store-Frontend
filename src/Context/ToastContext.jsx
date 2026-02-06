import { createContext, useContext, useState, useCallback } from "react";
import "../Styles/toast.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });
  let toastTimeout;

  const triggerToast = useCallback((message, type = "info") => {
    setToast({ show: true, message, type });

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <i
            className="fa-solid fa-circle-check"
            style={{ marginRight: "8px", color: "green" }}
          ></i>
        );
      case "error":
        return (
          <i
            className="fa-solid fa-xmark"
            style={{ marginRight: "8px", color: "red" }}
          ></i>
        );
      case "info":
        return (
          <i className="fa-solid fa-info" style={{ marginRight: "8px" }}></i>
        );
      default:
        return null;
    }
  };
  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      {toast.show && (
        <div className={`toast-popup ${toast.type}`}>
          {getIcon(toast.type)}
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
