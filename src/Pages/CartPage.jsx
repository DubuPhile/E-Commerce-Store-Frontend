import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import CartLineItem from "../Components/CartLineItem";
import { useGetMyCartQuery } from "../features/cart/cartApiSlice";
import "../Styles/cart.css";

const CartPage = () => {
  const [confirm, setConfirm] = useState(false);
  const [cart, setCart] = useState([]);
  const { data: MyCart, error, isLoading } = useGetMyCartQuery();

  let pageContent = "";

  useEffect(() => {
    if (MyCart?.items) {
      setCart(MyCart?.items);
    }
  }, [MyCart]);

  if (isLoading) return (pageContent = <p>Loading...</p>);

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.quantity * item.product?.price;
  }, 0);

  const sortedItems = [...cart].sort((a, b) =>
    a.product.name.localeCompare(b.product.name),
  );

  const onSubmitOrder = () => {
    setConfirm(true);
  };

  pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul>
        {sortedItems.map((item) => {
          return <CartLineItem key={item._id} item={item} />;
        })}
      </ul>
      <div className="cart-totals">
        <p>Total Items: {totalItems}</p>
        <p>
          Total Price:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalPrice)}
        </p>
        <button
          className="cart-submit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
      </div>
    </>
  );
  return (
    <Layout>
      <main className="main main-cart">{pageContent}</main>
    </Layout>
  );
};

export default CartPage;
