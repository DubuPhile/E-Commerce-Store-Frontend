import { apiSlice } from "../../api/apiSlice.jsx";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product",
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    searchProduct: builder.query({
      query: (searchTerm) => `/product/search?query=${searchTerm}`,
    }),
    getProductById: builder.query({
      query: (Id) => `/product/get-product/${Id}`,
      providesTags: (result, error, Id) => [{ type: "Product", Id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useSearchProductQuery,
  useGetProductByIdQuery,
} = productApiSlice;
