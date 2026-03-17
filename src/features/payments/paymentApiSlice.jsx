import { apiSlice } from "../../api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    paymentIntent: builder.mutation({
      query: ({ orderId }) => ({
        url: "/pay/payment-intent",
        method: "POST",
        body: { orderId },
      }),
    }),
  }),
});

export const { usePaymentIntentMutation } = paymentApiSlice;
