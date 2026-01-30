import { apiSlice } from "../../api/apiSlice";

const cartApiSplice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyCart: builder.query({
      query: () => "/cart/get-my-cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation, useGetMyCartQuery } = cartApiSplice;
