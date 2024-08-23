import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  patients: [],
};

export const patientListSlice = createSlice({
  name: "patients",
  initialState,

  reducers: {
    getPatientStart: (state) => {
      state.loading = true;
    },
    getPatientSuccess: (state, action) => {
      state.loading = false;
      state.patients = action.payload;
    },
  },
});

export default patientListSlice.reducer;

export const { getPatientStart, getPatientSuccess } = patientListSlice.actions;
