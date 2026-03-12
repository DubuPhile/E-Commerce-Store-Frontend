import { apiSlice } from "../../api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    paymentIntent: builder.mutation({
      query: (orderId) => ({
        url: "/pay/payment-intent",
        method: "POST",
        body: orderId,
      }),
    }),
    paymentConfirm: builder.mutation({
      query: (paymentIntentId) => ({
        url: "/pay/payment-confirm",
        method: "PATCH",
        body: paymentIntentId,
      }),
    }),
  }),
});

export const { usePaymentIntentMutation, usePaymentConfirmMutation } =
  paymentApiSlice;
