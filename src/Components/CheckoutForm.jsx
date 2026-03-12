import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { usePaymentConfirmMutation } from "../features/payments/paymentApiSlice";
import { useState } from "react";

const CheckoutForm = ({ setConfirm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmPayment] = usePaymentConfirmMutation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (!error && paymentIntent.status === "succeeded") {
      try {
        await confirmPayment({ paymentIntentId: paymentIntent.id }).unwrap();
        setConfirm(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(error.message);
      return;
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
