import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export const PaymentModal = ({ clientSecret, setConfirm, onClose }) => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);
  return (
    <section className="modal" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content text-center">
          <header className="modal-header">
            <h5 className="modal-title">Confirm Payment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </header>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm setConfirm={setConfirm} />
          </Elements>
        </div>
      </div>
    </section>
  );
};
