import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clinics: [],
};

export const clinicsSlice = createSlice({
  name: "clinics",
  initialState,
  reducers: {
    getClinics: (state, action) => {
      state.clinics = action.payload;
    },
  },
});

export default clinicsSlice.reducer;

export const { getClinics } = clinicsSlice.actions;
