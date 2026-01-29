import { apiSlice } from "../../api/apiSlice.jsx";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product",
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = productApiSlice;
