import { apiSlice } from "../../api/apiSlice";

const orderApiSplice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    confirmOrder: builder.mutation({
      query: ({
        totalPrice,
        products,
        Address,
        paymentMethod,
        checkoutId,
      }) => ({
        url: "/order/confirm-order",
        method: "POST",
        body: { totalPrice, products, Address, paymentMethod, checkoutId },
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
    getOrder: builder.query({
      query: () => ({
        url: "/order/get-orders",
        method: "GET",
        credentials: "include",
      }),
    }),
    getCheckout: builder.query({
      query: (checkoutId) => ({
        url: `/order/get-checkout/${checkoutId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    checkoutOrder: builder.mutation({
      query: ({ totalPrice, products }) => ({
        url: "/order/checkout-order",
        method: "POST",
        body: { totalPrice, products },
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useConfirmOrderMutation,
  useGetOrderQuery,
  useCheckoutOrderMutation,
  useGetCheckoutQuery,
} = orderApiSplice;
