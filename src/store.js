import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/user/userSlice";
import jobSlice from "./Features/job/jobSlice";
import allJobSlice from "./Features/alljob/allJobSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJob: allJobSlice,
  },
});
