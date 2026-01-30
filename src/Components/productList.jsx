import Products from "./products";
import { useState } from "react";
import { useGetProductsQuery } from "../features/products/productsApiSlice";

const ProductsList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [LastAdded, setLastAdded] = useState(null);
  let pageContent = "";
  if (isLoading) pageContent = <p>Loading...</p>;
  else if (products?.length) {
    pageContent = products.map((product) => {
      return (
        <Products
          key={product._id}
          product={product}
          LastAdded={LastAdded}
          setLastAdded={setLastAdded}
        />
      );
    });
  } else {
    pageContent = <p>Error loading products</p>;
  }

  return <main className="main main--products">{pageContent}</main>;
};

export default ProductsList;
