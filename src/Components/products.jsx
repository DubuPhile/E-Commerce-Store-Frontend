import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product-details/${product._id}`);
  };

  const content = (
    <article className="product" onClick={handleClick}>
      <img src={product.imageUrl} alt={product.name} className="product__img" />
      <h4>{product.name}</h4>
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
      </p>
    </article>
  );

  return content;
};

export default Product;
