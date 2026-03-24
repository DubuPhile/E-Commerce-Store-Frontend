import { apiSlice } from "../../api/apiSlice";

const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (Data) => ({
        url: "/user/add-address",
        method: "POST",
        body: Data,
      }),
    }),
    getAddresses: builder.query({
      query: () => ({
        url: "/user/get-address",
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteAddress: builder.mutation({
      query: ({ addressId }) => ({
        url: `/user/delete-address/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-address/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});
export const {
  useAddAddressMutation,
  useGetAddressesQuery,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressApiSlice;
