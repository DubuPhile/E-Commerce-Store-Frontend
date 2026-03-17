import { useState, useEffect } from "react";
import CartLineItem from "../Components/CartLineItem";
import { useGetMyCartQuery } from "../features/cart/cartApiSlice";
import { useCheckoutOrderMutation } from "../features/order/orderApiSlice";
import "../Styles/cart.css";
import { useToast } from "../Context/ToastContext";
import PlaceOrder from "../Components/PlaceOrder";
import { useGetAddressesQuery } from "../features/address/addressApiSlice";
import useAuth from "../hooks/useAuth";

const CartPage = () => {
  const { triggerToast } = useToast();
  const [orders, setOrders] = useState(null);
  const [OpenPlaceOrder, setOpenPlaceOrder] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [cart, setCart] = useState([]);
  const { data: MyCart, isLoading } = useGetMyCartQuery();
  const [checkoutOrder] = useCheckoutOrderMutation();
  const checkBoxItem = cart.filter((item) => item.checkBox === true);

  const { auth } = useAuth();
  const {
    data: Addresses,
    isLoading: getAddressLoad,
    refetch,
  } = useGetAddressesQuery(auth.token, {
    skip: !auth.token,
  });

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

  const onSubmitCheckout = async () => {
    try {
      const order = await checkoutOrder({
        totalPrice,
        products: checkBoxItem,
      }).unwrap();

      setOrders(order.data);
      setOpenPlaceOrder(true);
    } catch (err) {
      console.log(err);
      triggerToast(`${err.data?.message || "Error to Place Order"}`, "error");
    }
  };

  pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : OpenPlaceOrder ? (
    <PlaceOrder order={orders} Addresses={Addresses} setConfirm={setConfirm} />
  ) : sortedItems.length === 0 ? (
    <p>Empty</p>
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
