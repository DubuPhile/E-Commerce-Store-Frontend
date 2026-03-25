import "../Styles/placeOrder.css";
import { useEffect, useState, useRef } from "react";
import { usePaymentIntentMutation } from "../features/payments/paymentApiSlice";
import { PaymentModal } from "../Components/paymentModal";
import { useConfirmOrderMutation } from "../features/order/orderApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAddressesQuery } from "../features/address/addressApiSlice";
import { useGetCheckoutQuery } from "../features/order/orderApiSlice";
import useAuth from "../hooks/useAuth";
import ChangeAddressModal from "../Components/ChangeAddressModal";
import { useToast } from "../Context/ToastContext";

const PlaceOrder = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { checkoutId } = useParams();
  const [Address, setAddress] = useState(null);
  const [active, setActive] = useState("cod");
  const [clientSecret, setClientSecret] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { triggerToast } = useToast();

  const checkoutRef = useRef();

  const {
    data: Addresses,
    isLoading: getAddressLoad,
    refetch,
  } = useGetAddressesQuery(auth.token, {
    skip: !auth.token,
  });
  const { data: order, isLoading: checkoutload } =
    useGetCheckoutQuery(checkoutId);

  const [paymentIntent] = usePaymentIntentMutation();
  const [confirmOrder] = useConfirmOrderMutation();

  useEffect(() => {
    if (Addresses?.data) {
      const defaultAddress = Addresses.data.find((item) => item.isDefault);
      setAddress(defaultAddress || null);
    }
  }, [Addresses]);

  const orders = order?.data?.[0];

  useEffect(() => {
    if (active !== "credit") return;
    if (!orders?._id) return;

    const fetchPaymentIntent = async () => {
      try {
        const paymentInt = await paymentIntent({
          orderId: orders._id,
        }).unwrap();
        setClientSecret(paymentInt.clientSecret);
      } catch (err) {
        console.error("Failed to create payment intent:", err);
      }
    };

    fetchPaymentIntent();
  }, [active, orders?._id]);
  const methods = [
    { id: "cod", label: "Cash on Delivery" },
    { id: "credit", label: "Credit / Debit Card" },
  ];

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const isCredit = active === "credit";
      const method = isCredit ? "Credit" : "COD";

      if (checkoutRef.current) {
        const result = await checkoutRef.current.handleSubmit();
        if (!result) {
          triggerToast("Invalid Card Number!", "error");
          return;
        }
        console.log("Payment succeeded! Confirming order...");
      }

      const order = await confirmOrder({
        totalPrice: orders.totalPrice,
        products: orders.products,
        Address: Address,
        paymentMethod: method,
        checkoutId: orders._id,
      }).unwrap();
      triggerToast("Ordered Placed", "success");
      navigate("/success");
    } catch (err) {
      console.log(err);
      triggerToast("Error order pls try again!", "error");
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const handleChangeAddress = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  if (checkoutload) return <div>Loading checkout...</div>;
  return (
    <>
      <section className="placeorder-main">
        <section className="placeorder-section">
          <h3 className="payment-title">Checkout</h3>
          <form onSubmit={handleSubmitOrder}>
            {Address && (
              <div
                className="placeorder-address"
                key={Address._id}
                onClick={handleChangeAddress}
                onClose={() => setOpenModal(false)}
              >
                <div>
                  <h5>{Address.fullName}</h5>
                  <span>
                    {[
                      Address.street,
                      Address.city,
                      Address.province,
                      Address.country,
                      Address.postalCode,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  </span>
                </div>
                <span style={{ color: "orange" }}>Change</span>
              </div>
            )}
            <div className="placeorder-orders">
              {orders?.products?.map((item) => {
                return (
                  <div
                    className="placeorder-prod"
                    key={item._id || item.product?._id}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img src={item.product?.imageUrl} className="prod-img" />
                      <h5>{item.product?.name}</h5>
                    </div>
                    <div className="place-order-price">
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
                <PaymentModal ref={checkoutRef} clientSecret={clientSecret} />
              )}
              <p className="totalPrice">
                <span>TOTAL:</span>{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(orders?.totalPrice)}
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
          {openModal && (
            <ChangeAddressModal
              setAddress={setAddress}
              onClose={() => setOpenModal(false)}
            />
          )}
        </section>
      </section>
    </>
  );
};

export default PlaceOrder;
