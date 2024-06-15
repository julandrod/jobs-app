import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ token, newUserInfo }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.patch("/users/update", newUserInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdminStats = createAsyncThunk(
  "user/getAdminStats",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.get("/users/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userData: null,
  adminStats: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload.body;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload.body;
        toast.success("Profile updated successfully");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload.message);
      })
      // Get admin stats
      .addCase(getAdminStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.adminStats = payload.body;
      })
      .addCase(getAdminStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const selectUserState = (state) => state.user;

export default userSlice.reducer;
