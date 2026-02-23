import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    firebaseLogin: builder.mutation({
      query: (token) => ({
        url: "/user/firebase-login",
        method: "POST",
        body: token,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "GET",
        credentials: "include",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/user/getUser",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: (updatedData) => ({
        url: "/user/updateUser",
        method: "PUT",
        body: updatedData,
      }),
    }),
    changePassword: builder.mutation({
      query: (Data) => ({
        url: "/user/changePwd",
        method: "PATCH",
        body: Data,
      }),
    }),
    setPassword: builder.mutation({
      query: (Data) => ({
        url: "/user/set-password",
        method: "PATCH",
        body: Data,
      }),
    }),
  }),
});

export const {
  useFirebaseLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useSetPasswordMutation,
} = authApiSlice;
