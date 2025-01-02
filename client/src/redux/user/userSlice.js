import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    signInStart: (state) => {
      state.currentUser = null;
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
    setUpdatedUser: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    deleteUpdatedUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    updatePaid: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser.payment = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
  signout,
  setUpdatedUser,
  deleteUpdatedUser,
  updatePaid,
} = userSlice.actions;
