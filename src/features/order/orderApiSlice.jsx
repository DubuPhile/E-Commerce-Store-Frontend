import { apiSlice } from "../../api/apiSlice";

const orderApiSplice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    confirmOrder: builder.mutation({
      query: ({ totalPrice, products }) => ({
        url: "/order/confirm-order",
        method: "POST",
        body: { totalPrice, products },
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
  }),
});

export const { useConfirmOrderMutation, useGetOrderQuery } = orderApiSplice;
