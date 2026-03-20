import { useState, useEffect } from "react";
import CartLineItem from "../Components/CartLineItem";
import { useGetMyCartQuery } from "../features/cart/cartApiSlice";
import { useCheckoutOrderMutation } from "../features/order/orderApiSlice";
import "../Styles/cart.css";
import { useToast } from "../Context/ToastContext";
import { useNavigate } from "react-router-dom";
import { calculateTotalPrice, calculateTotalItems } from "../utils/computation";
import emptyCart from "../assets/empty-cart.png";

const CartPage = () => {
  const navigate = useNavigate();
  const { triggerToast } = useToast();
  const [cart, setCart] = useState([]);
  const { data: MyCart, isLoading } = useGetMyCartQuery();
  const [checkoutOrder] = useCheckoutOrderMutation();
  const checkBoxItem = cart.filter((item) => item.checkBox === true);
  let pageContent = "";

  useEffect(() => {
    if (MyCart?.items) {
      setCart(MyCart?.items);
    }
  }, [MyCart]);

  if (isLoading) return (pageContent = <p>Loading...</p>);

  const totalItems = calculateTotalItems(checkBoxItem);

  const totalPrice = calculateTotalPrice(checkBoxItem);

  const sortedItems = [...cart].sort((a, b) =>
    a.product.name.localeCompare(b.product.name),
  );

  const onSubmitCheckout = async () => {
    try {
      const order = await checkoutOrder({
        totalPrice,
        products: checkBoxItem,
      }).unwrap();
      const checkoutId = order.data._id;

      navigate(`/place-order/${checkoutId}`);
    } catch (err) {
      console.log(err);
      triggerToast(`${err.data?.message || "Error to Place Order"}`, "error");
    }
  };

  pageContent =
    sortedItems.length === 0 ? (
      <section className="empty-cart">
        <img src={emptyCart} alt="empty-cart" className="empty-cart-img" />
        <h5>There is no items here</h5>
        <button onClick={() => navigate("/")}>Browse Shop</button>
      </section>
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
            onClick={onSubmitCheckout}
          >
            Check Out Order
          </button>
        </div>
      </>
    );
  return (
    <>
      <main className="main main-cart">{pageContent}</main>
    </>
  );
};

export default CartPage;
