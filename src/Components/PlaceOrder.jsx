import { useEffect, useState, useRef } from "react";
import { usePaymentIntentMutation } from "../features/payments/paymentApiSlice";
import { PaymentModal } from "./paymentModal";
import { useConfirmOrderMutation } from "../features/order/orderApiSlice";

const PlaceOrder = ({ order, Addresses, setConfirm }) => {
  const [Address, setAddress] = useState(
    Addresses.data.filter((item) => item.isDefault),
  );

  const [orders, setOrder] = useState(order);
  const [active, setActive] = useState("cod");
  const [credit, setCredit] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  const checkoutRef = useRef();

  const [paymentIntent] = usePaymentIntentMutation();
  const [confirmOrder] = useConfirmOrderMutation();
  useEffect(() => {
    if (active !== "credit") return;
    if (!order?._id) return;

    const fetchPaymentIntent = async () => {
      try {
        const paymentInt = await paymentIntent({ orderId: order._id }).unwrap();
        setClientSecret(paymentInt.clientSecret);
        setPaymentIntentId(paymentInt.paymentId);
        setCredit(true);
      } catch (err) {
        console.error("Failed to create payment intent:", err);
      }
    };

    fetchPaymentIntent();
  }, [active, order?._id]);
  const methods = [
    { id: "cod", label: "Cash on Delivery" },
    { id: "credit", label: "Credit / Debit Card" },
  ];

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const isCredit = active === "credit";
      const method = isCredit ? "Credit" : "COD";

      const order = await confirmOrder({
        totalPrice: orders.totalPrice,
        products: orders.products,
        Address: Address,
        paymentMethod: method,
        checkoutId: orders._id,
      }).unwrap();

      if (checkoutRef.current) {
        const success = await checkoutRef.current.handleSubmit();
        if (success) {
          console.log("Payment succeeded! Confirming order...");
        }
      }

      setConfirm(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    console.log("cancel");
  };
  const handleChangeAddress = () => {
    console.log("changeAddress");
  };
  return (
    <>
      <section className="placeorder-main">
        <section className="placeorder-section">
          <h3 className="payment-title">Checkout</h3>
          <form onSubmit={handleSubmitOrder}>
            {Address.map((item) => {
              return (
                <div
                  className="placeorder-address"
                  key={item._id}
                  onClick={handleChangeAddress}
                >
                  <div>
                    <h5>{item.fullName}</h5>
                    <span>
                      {[
                        item.street,
                        item.city,
                        item.province,
                        item.country,
                        item.postalCode,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    </span>
                  </div>
                  <span style={{ color: "orange" }}>Change</span>
                </div>
              );
            })}
            <div className="placeorder-orders">
              {orders.products?.map((item) => {
                return (
                  <div className="placeorder-prod" key={item._id}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img src={item.product?.imageUrl} className="prod-img" />
                      <h5>{item.product?.name}</h5>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.product?.price)}
                      </span>

                      <span className="prod-qty">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="payment-container">
                <h3>Payment Methods</h3>
                <div className="method-tabs">
                  {methods.map((method) => (
                    <button
                      key={method.id}
                      className={`method-btn ${active === method.id ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(method.id);
                      }}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>
              {active === "credit" && (
                <PaymentModal
                  ref={checkoutRef}
                  clientSecret={clientSecret}
                  setPaymentIntentId={setPaymentIntentId}
                />
              )}
              <p className="totalPrice">
                <span>TOTAL:</span>{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(orders.totalPrice)}
              </p>
            </div>
            <div className="payment-btn">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="confirm-payment-btn">
                Confirm Payment
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default PlaceOrder;
