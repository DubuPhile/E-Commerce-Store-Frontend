import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import "../Styles/categoryProducts.css";
import CategoryProducts from "../Components/CategoryProducts";

const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState([]);
  const { data: products, isLoading } = useGetProductsQuery();
  useEffect(() => {
    setAccessories(
      products?.filter((items) => items.category === "accessories") || [],
    );
  }, [products]);

  return accessories.length === 0 ? (
    <main className="category-empty">NO PRODUCT AVAILABLE</main>
  ) : (
    <main className="category-main">
      <h2>Accessories</h2>
      <div className="category-main-products">
        {accessories?.map((product) => {
          return <CategoryProducts key={product._id} product={product} />;
        })}
      </div>
    </main>
  );
};

export default AccessoriesPage;
