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
    deleteCartItem: builder.mutation({
      query: (productId) => ({
        url: `/cart/delete-item/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    changeQuantity: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/changeQty/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetMyCartQuery,
  useDeleteCartItemMutation,
  useChangeQuantityMutation,
} = cartApiSplice;
