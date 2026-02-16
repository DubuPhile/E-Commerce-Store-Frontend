import { useState, useCallback } from "react";

export const useTogglePassword = (ref) => {
  const [show, setShow] = useState(false);

  const toggle = useCallback(() => {
    if (!ref.current) return;
    const isPassword = ref.current.type === "password";
    ref.current.type = isPassword ? "text" : "password";
    setShow(isPassword);
  }, [ref]);

  return { toggle, show };
};
