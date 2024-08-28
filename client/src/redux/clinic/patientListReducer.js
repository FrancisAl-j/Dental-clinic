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
    addPatientStart: (state) => {
      state.loading = true;
    },
    addPatientSuccess: (state, action) => {
      state.loading = false;
      state.patients.push(action.payload);
      console.log(state.patients);
    },
  },
});

export default patientListSlice.reducer;

export const {
  getPatientStart,
  getPatientSuccess,
  addPatientStart,
  addPatientSuccess,
} = patientListSlice.actions;
