import { useContext } from "react";
import CartContext from "../Context/cartProvider";

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
