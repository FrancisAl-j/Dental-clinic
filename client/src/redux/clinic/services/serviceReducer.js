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
    patientGetServiceStart: (state) => {
      state.loading = true;
    },
    patientGetServiceSuccess: (state, action) => {
      state.loading = false;
      state.service = action.payload;
    },
    patientClearService: (state) => {
      state.service = {};
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
  patientGetServiceStart,
  patientGetServiceSuccess,
  patientClearService,
} = serviceSlice.actions;
