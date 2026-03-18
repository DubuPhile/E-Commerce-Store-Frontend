import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export const PaymentModal = ({ clientSecret, ref }) => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);

  if (!clientSecret) return;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm ref={ref} />
    </Elements>
  );
};
