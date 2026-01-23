import useProducts from "../hooks/useProducts";
import Products from "./products";
import useCart from "../hooks/useCart";

const ProductsList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  let pageContent = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart = cart.some((item) => item.sku === product.sku);
      return (
        <Products
          key={product.sku}
          products={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  return <main className="main main--products">{pageContent}</main>;
};

export default ProductsList;
