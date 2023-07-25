import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createJobThunk,
  deleteJobThunk,
  editJobThunk,
  appliedJobThunk,
} from "./JobThunk";
import { getUser } from "../../utils/localstorage";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
  appliedJobId: "",
};

export const createJob = createAsyncThunk("job/createJob", createJobThunk);
export const deleteJob = createAsyncThunk("jobs/deleteJob", deleteJobThunk);
export const editJob = createAsyncThunk(" jobs/editJob", editJobThunk);
export const appliedJobs = createAsyncThunk(
  "job/appliedJobs",
  appliedJobThunk
);
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUser?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
    setAppliedJobs: (state, action) => {
      // console.log(state)
      state.appliedJobId = action.payload
      // console.log(action.payload);
      // console.log("payload",state.appliedJobId);
      return { state};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("job created successfully");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("modified .......");
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      });
  },
});
export const { handleChange, clearValues, setEditJob, setAppliedJobId } =
  jobSlice.actions;
export default jobSlice.reducer;
