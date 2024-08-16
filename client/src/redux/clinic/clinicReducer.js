import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentClinic: {},
  error: null,
};

export const clinicSlice = createSlice({
  name: "clinic",
  initialState,

  reducers: {
    setClinic: (state, action) => {
      state.currentClinic = action.payload;
      state.error = null;
    },
    failClinic: (state, action) => {
      state.currentClinic = {};
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
    clearClinic: (state) => {
      state.currentClinic = {};
      state.error = null;
    },
    updateClinic: (state, action) => {
      console.log("Clinic updated:", action.payload);
      state.currentClinic = action.payload;
      state.error = null;
    },
    updateFailClinic: (state, action) => {
      state.currentClinic = {};
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
  },
});

export default clinicSlice.reducer;

export const {
  setClinic,
  failClinic,
  clearClinic,
  updateClinic,
  updateFailClinic,
} = clinicSlice.actions;
