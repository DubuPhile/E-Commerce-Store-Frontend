import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import "../Styles/categoryProducts.css";
import CategoryProducts from "../Components/CategoryProducts";

const LaptopPage = () => {
  const [laptop, setLaptop] = useState([]);
  const { data: products, isLoading } = useGetProductsQuery();
  useEffect(() => {
    setLaptop(products?.filter((items) => items.category === "laptop") || []);
  }, [products]);

  return laptop.length === 0 ? (
    <main className="category-empty">NO PRODUCT AVAILABLE</main>
  ) : (
    <main className="category-main">
      <h2>Laptops</h2>
      <div className="category-main-products">
        {laptop?.map((product) => {
          return <CategoryProducts key={product._id} product={product} />;
        })}
      </div>
    </main>
  );
};

export default LaptopPage;
