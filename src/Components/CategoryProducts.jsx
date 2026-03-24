import { useNavigate } from "react-router-dom";

const CategoryProducts = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product-details/${product._id}`);
  };

  return (
    <section className="product-category" onClick={handleClick}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-category-img"
      />
      <h4>{product.name}</h4>
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
      </p>
    </section>
  );
};

export default CategoryProducts;
