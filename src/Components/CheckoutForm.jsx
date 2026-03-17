import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, forwardRef, useImperativeHandle } from "react";

const CheckoutForm = forwardRef(({ setPaymentIntentId }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      if (!stripe || !elements) return false;
      setLoading(true);

      try {
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });

        if (!error && paymentIntent?.status === "succeeded") {
          setPaymentIntentId(paymentIntent.id);
          return true;
        } else {
          console.error(error);
          return false;
        }
      } finally {
        setLoading(false);
      }
    },
    isLoading: () => loading,
  }));

  return <PaymentElement />;
});

export default CheckoutForm;
