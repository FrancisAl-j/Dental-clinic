import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,

  reducers: {
    addAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
});
