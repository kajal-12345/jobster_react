// import customFetch from "../../utils/axios";
import axios from 'axios';
import { clearallJobsState } from "../alljob/allJobSlice";
import { clearValues } from "../job/jobSlice";
import { clearStore, logoutUser } from "./userSlice";
export const userRegisterThunk = async (user, thunkAPI) => {
  try {
    const resp = await axios.post("http://localhost:5000/auth/register", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const userLoginThunk = async (user, thunkAPI) => {
  try {
    const resp = await axios.post("http://localhost:5000/auth/login", user);
    localStorage.setItem('token',resp.data.token);
    localStorage.setItem('user',resp.data.user);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
// Bearer ${thunkAPI.getState().user.user.token}
export const updateUserThunk = async (user, thunkAPI) => {
  const userId = user.id;
  // console.log(user.id);
  try {
    const resp = await axios.patch(`http://localhost:5000/auth/updateUser/${userId}`, user, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(clearStore());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearallJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
