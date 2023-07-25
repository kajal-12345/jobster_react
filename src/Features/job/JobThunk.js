import { showLoading, hideLoading, getAllJobs } from "../alljob/allJobSlice";
// import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import axios from "axios";
import { clearValues } from "./jobSlice";
import { appliedJobs } from "./jobSlice";


export const createJobThunk = async (job, thunkAPI) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  const userId = user._id;
  try {
    const resp = await axios.post(`http://localhost:5000/jobs/${userId}`, job, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        // authorization: `bearer`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      // thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    // return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  try {
    const resp = await axios.delete(
      `http://localhost:5000/jobs/${userId}/${jobId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    thunkAPI.dispatch(getAllJobs());
    return resp.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    // return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await axios.patch(`http://localhost:5000/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI);
    throw error;
  }
};

export const appliedJobThunk = async ({ jobId, job }, thunkAPI) => {
 jobId = thunkAPI.appliedJobId;
 thunkAPI.dispatch(appliedJobs(jobId));
 console.log(jobId);
  // fetch(`http://localhost:500/applied-jobs/${jobId}`, {
  //   headers: {
  //     authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  // })
  //   .then((data) => console.log(data))
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
