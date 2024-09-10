import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: {},
  loading: false,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,

  reducers: {
    getServiceStart: (state) => {
      state.loading = true;
    },
    getServiceSuccess: (state, action) => {
      state.loading = false;
      state.service = action.payload;
    },
    clearService: (state) => {
      state.loading = false;
      state.service = {};
    },
    updateServiceStart: (state) => {
      state.loading = true;
    },
    updateServiceSuccess: (state, action) => {
      state.loading = false;
      state.service = action.payload;
    },
  },
});

export default serviceSlice.reducer;

export const {
  getServiceStart,
  getServiceSuccess,
  clearService,
  updateServiceStart,
  updateServiceSuccess,
} = serviceSlice.actions;
