import { useState, useEffect } from "react";
import CartLineItem from "../Components/CartLineItem";
import { useGetMyCartQuery } from "../features/cart/cartApiSlice";
import { useConfirmOrderMutation } from "../features/order/orderApiSlice";
import "../Styles/cart.css";
import { useToast } from "../Context/ToastContext";
import { usePaymentIntentMutation } from "../features/payments/paymentApiSlice";
import { PaymentModal } from "../Components/paymentModal";

const CartPage = () => {
  const { triggerToast } = useToast();
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [cart, setCart] = useState([]);
  const { data: MyCart, isLoading } = useGetMyCartQuery();
  const [confirmOrder] = useConfirmOrderMutation();
  const [paymentIntent] = usePaymentIntentMutation();
  const checkBoxItem = cart.filter((item) => item.checkBox === true);

  let pageContent = "";

  useEffect(() => {
    if (MyCart?.items) {
      setCart(MyCart?.items);
    }
  }, [MyCart]);

  if (isLoading) return (pageContent = <p>Loading...</p>);

  const totalItems = checkBoxItem.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = checkBoxItem.reduce((total, item) => {
    return total + item.quantity * item.product?.price;
  }, 0);

  const sortedItems = [...cart].sort((a, b) =>
    a.product.name.localeCompare(b.product.name),
  );

  const onSubmitOrder = async () => {
    try {
      const order = await confirmOrder({
        totalPrice,
        products: checkBoxItem,
      }).unwrap();

      const newOrderId = order.data._id;

      setOrderId(newOrderId);

      const paymentInt = await paymentIntent({ orderId: newOrderId }).unwrap();
      setClientSecret(paymentInt.clientSecret);
    } catch (err) {
      console.log(err);
      triggerToast(`${err.data?.message || "Error to Place Order"}`, "error");
    }
  };

  const handleClose = async () => {
    try {
      setClientSecret(null);
    } catch (err) {
      console.log(err);
    }
  };

  pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : clientSecret ? (
    <PaymentModal
      setConfirm={setConfirm}
      clientSecret={clientSecret}
      onClose={handleClose}
    />
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
    <>
      <main className="main main-cart">{pageContent}</main>
    </>
  );
};

export default CartPage;
