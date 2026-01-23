import { memo } from "react";

const Product = ({ products, dispatch, REDUCER_ACTIONS, inCart }) => {
  const img = new URL(`../images/${products?.image}`, import.meta.url).href;

  const onAddtoCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...products, qty: 1 },
    });

  const itemInCart = inCart ? "Item in Cart:✔️" : "";

  const content = (
    <article className="product">
      <h3>{products.name}</h3>
      <img src={img} alt={products.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(products.price)}
      </p>
      <button className="button-add-to-cart" onClick={onAddtoCart}>
        Add to Cart
      </button>{" "}
      <span>{" " + itemInCart}</span>
    </article>
  );

  return content;
};

function areProductsEqual(
  { products: prevProduct, inCart: prevInCart },
  { products: nextProduct, inCart: nextInCart },
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return prevProduct[key] === nextProduct[key];
    }) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo(Product, areProductsEqual);

export default MemoizedProduct;
