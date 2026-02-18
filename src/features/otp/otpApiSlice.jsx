import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendOTP: builder.mutation({
      query: (type) => ({
        url: "/user/change-password/send-otp",
        method: "POST",
        body: { ...type },
      }),
    }),
    verifyOTP: builder.mutation({
      query: (otp) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: otp,
      }),
    }),
  }),
});

export const { useSendOTPMutation, useVerifyOTPMutation } = authApiSlice;
