import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const setupUser = createAsyncThunk(
  "auth/setupUser",
  async ({ dataUser, endPoint }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.post(`/auth/${endPoint}`, dataUser);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: false,
  statusCode: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutUser: () => localStorage.removeItem("user"),
  },
  extraReducers: (builder) => {
    builder
      // Login/Register user
      .addCase(setupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setupUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.statusCode = payload.code;
        state.isAuthenticated = true;
        if (state.statusCode === 200) {
          state.userInfo = payload.body.token;
          localStorage.setItem("user", JSON.stringify(state.userInfo));
          toast.success();
        }
        toast.success(
          state.statusCode === 200
            ? "Login Successful!"
            : "Registration successful"
        );
      })
      .addCase(setupUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload.error);
      });
  },
});

export const { logOutUser } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
