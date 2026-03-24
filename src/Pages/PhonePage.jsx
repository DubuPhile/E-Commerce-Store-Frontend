import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import "../Styles/categoryProducts.css";
import CategoryProducts from "../Components/CategoryProducts";
const PhonePage = () => {
  const [phone, setPhone] = useState([]);
  const { data: products, isLoading } = useGetProductsQuery();
  useEffect(() => {
    setPhone(products?.filter((items) => items.category === "phone") || []);
  }, [products]);

  return phone.length === 0 ? (
    <main className="category-empty">NO PRODUCT AVAILABLE</main>
  ) : (
    <main className="category-main">
      <h2>Mobile Phones</h2>
      <div className="category-main-products">
        {phone?.map((product) => {
          return <CategoryProducts key={product._id} product={product} />;
        })}
      </div>
    </main>
  );
};

export default PhonePage;
