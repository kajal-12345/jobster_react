import axios from "axios";
import { clearStore } from "../Features/user/userSlice";
// https://jobify-prod.herokuapp.com/api/v1/toolkit
const customFetch = axios.create({
  baseURL: "",
});
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
export default customFetch;
