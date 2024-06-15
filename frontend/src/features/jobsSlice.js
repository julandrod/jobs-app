import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const getAllJobs = createAsyncThunk(
  "job/getAllJobs",
  async ({ search, jobStatus, jobType, sort, token }, { rejectWithValue }) => {
    try {
      let url = "/jobs";
      if (search) {
        url =
          url +
          `?search=${search}&sort=${sort}&jobStatus=${jobStatus}&jobType=${jobType}`;
      }
      const { data } = await customFetch.get(url, {
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

export const getSingleJob = createAsyncThunk(
  "job/getSingleJob",
  async ({ jobId, token }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.get(`/jobs/${jobId}`, {
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

export const getJobStats = createAsyncThunk(
  "job/getJobStats",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.get("/jobs/stats", {
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

export const addJob = createAsyncThunk(
  "job/addJob",
  async ({ infoJob, token }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.post("/jobs", infoJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, infoJob, token }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.patch(`/jobs/${jobId}`, infoJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async ({ jobId, token }, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  allJobs: null,
  singleJob: null,
  jobStats: [],
  newJobAdded: false,
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all jobs
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allJobs = payload.body;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload.message);
      })
      // Get single job
      .addCase(getSingleJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleJob = payload.body;
      })
      .addCase(getSingleJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload.message);
      })
      // Get job stats
      .addCase(getJobStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getJobStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobStats = payload.body;
      })
      .addCase(getJobStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload.message);
      })
      // Add a new job
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state) => {
        state.isLoading = false;
        state.newJobAdded = true;
        toast.success("Job added successfully");
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload.message);
      })
      // Edit job
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job updated successfully");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload.message);
      })
      // Delete job
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job deleted successfully");
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload.message);
      });
  },
});

export const selectJobState = (state) => state.job;

export default jobSlice.reducer;
