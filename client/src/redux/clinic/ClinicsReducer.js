import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clinics: [],
};

export const clinicsSlice = createSlice({
  name: "clinics",
  initialState,
  reducers: {
    getClinics: (state, action) => {
      state.clinics = action.payload.map((clinic) => {
        return {
          id: clinic._id,
          clinicName: clinic.clinicName,
          location: clinic.location,
          email: clinic.email,
          contact: clinic.phone,
          logo: clinic.logo,
        };
      });
    },
  },
});

export default clinicsSlice.reducer;

export const { getClinics } = clinicsSlice.actions;
