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
  }),
});

export const { useConfirmOrderMutation } = orderApiSplice;
