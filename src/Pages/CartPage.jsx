import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import useCart from "../hooks/useCart";
import CartLineItem from "../Components/CartLineItem";

const CartPage = () => {
  const [confirm, setConfirm] = useState(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };
  useEffect(() => {
    if (totalItems === 0) setConfirm(false);
  }, [totalItems]);

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button onClick={onSubmitOrder} className="cart-submit">
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
