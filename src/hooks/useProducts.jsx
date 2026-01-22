import { useContext } from "react";
import { ProductsContext } from "../Context/productsProvider";

const useProducts = () => {
    return useContext(ProductsContext)
}

export default useProducts