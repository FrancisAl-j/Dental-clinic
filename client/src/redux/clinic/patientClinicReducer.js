import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clinic: null,
};

export const patientClinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    getClinic: (state, action) => {
      const clinic = action.payload;

      state.clinic = {
        id: clinic._id,
        clinicName: clinic.clinicName,
        location: clinic.location,
        email: clinic.email,
        contact: clinic.phone,
        logo: clinic.logo,
        background: clinic.background,
        details: clinic.details,
      };
    },
    clearClinic: (state) => {
      state.clinic = null;
    },
  },
});

export default patientClinicSlice.reducer;

export const { getClinic, clearClinic } = patientClinicSlice.actions;
