import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export const PaymentModal = ({
  clientSecret,
  setConfirm,
  ref,
  setPaymentIntentId,
}) => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);

  if (!clientSecret) return <p>Loading Pls Wait...</p>;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        ref={ref}
        setConfirm={setConfirm}
        setPaymentIntentId={setPaymentIntentId}
      />
    </Elements>
  );
};
