import { useState } from "react";
import { useAddToCartMutation } from "../features/cart/cartApiSlice";

const Product = ({ product, LastAdded, setLastAdded }) => {
  const [quantity, setQuantity] = useState(1);
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const increase = () => {
    setQuantity(quantity + 1);
  };

  const onAddtoCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: quantity,
      }).unwrap();

      setLastAdded(product._id);
    } catch (err) {
      console.log(err);
    }
  };

  const itemInCart = LastAdded === product._id ? "Item in Cart:✔️" : "";

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={product.imageUrl} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
      </p>
      <div className="QTY-wrapper">
        <span className="QTY-label">Quantity:</span>

        <div className="QTY-box">
          <button onClick={decrease} className="QTY-btn">
            −
          </button>
          <span className="QTY-number">{quantity}</span>

          <button onClick={increase} className="QTY-btn">
            +
          </button>
        </div>
      </div>
      <button className="button-add-to-cart" onClick={onAddtoCart}>
        Add to Cart
      </button>
      <span style={{ paddingLeft: "10px" }}>
        {isLoading ? "Loading..." : itemInCart}
      </span>
    </article>
  );

  return content;
};

export default Product;
