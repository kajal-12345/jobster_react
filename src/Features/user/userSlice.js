import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  addUsertoLocalStoarge,
  getUser,
  removeUser,
} from "../../utils/localstorage";
import {
  clearStoreThunk,
  updateUserThunk,
  userLoginThunk,
  userRegisterThunk,
} from "./userThunk";
const initialState = {
  isSidebarOpen: false,
  isLoading: false,
  user: getUser(),
};
// console.log(getUser());
export const userRegister = createAsyncThunk(
  "user/userRegister",
  userRegisterThunk
);
export const userLogin = createAsyncThunk("user/userLogin", userLoginThunk);
export const updateUser = createAsyncThunk("user/updateUser", updateUserThunk);
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUser();
      toast.success(payload);
    },
    setupdateUser: (state, { payload }) => {
      state.isLoading = true;
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { user } = payload;
        state.user = user;
        toast.success(`hello ${user.name}`);
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { user } = payload;

        state.user = user;
        // console.log(state.user);
        addUsertoLocalStoarge(user);
        // console.log(user);
        toast.success(`hello ${user.name}`);
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { user } = payload;
        // console.log("payload");
        // console.log(payload);

        state.user = user;
        console.log(state.user);
        addUsertoLocalStoarge(user);
        // state.isLoggedIn = true;
        toast.success("updated sucessfully");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, (state) => {
        toast.error("error");
      });
  },
});
export default userSlice.reducer;
export const { toggleSidebar, logoutUser, setupdateUser } = userSlice.actions;
