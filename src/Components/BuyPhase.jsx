import { useState } from "react";
import { useAddToCartMutation } from "../features/cart/cartApiSlice";

const BuyPhase = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [isCart, setIsCart] = useState(false);

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

      setIsCart(true);
    } catch (err) {
      console.log(err);
    }
  };
  const buyNow = async () => {};
  const itemInCart = isCart ? "Item in Cart:✔️" : "";

  return (
    <>
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
      <div>
        <button className="button-add-to-cart" onClick={buyNow}>
          Buy Now
        </button>
        <button className="button-add-to-cart" onClick={onAddtoCart}>
          Add to Cart
        </button>
        <span style={{ paddingLeft: "10px" }}>
          {isLoading ? "Loading..." : itemInCart}
        </span>
      </div>
    </>
  );
};

export default BuyPhase;
