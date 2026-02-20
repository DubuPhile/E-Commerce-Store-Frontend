import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    roles: null || [],
    hasLocalPassword: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, roles, hasLocalPassword } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.roles = roles || [];
      state.hasLocalPassword = hasLocalPassword;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.hasLocalPassword = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRoles = (state) => state.auth.roles;
export const hasLocalPassword = (state) => state.auth.hasLocalPassword;
