import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: [],
  loading: false,
  error: null,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,

  reducers: {
    addAppointment: (state, action) => {
      state.appointment = action.payload;
    },
    getAppoinmentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAppoinmentSuccess: (state, action) => {
      state.appointment = action.payload;
      state.error = null;
    },
    getAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
    updateAppointment: (state, action) => {
      const index = state.appointment.findIndex(
        (appt) => appt._id === action.payload._id
      );
      if (index !== -1) {
        state.appointment[index] = action.payload; // Update the specific appointment
      }
    },
    clearAppointment: (state) => {
      state.appointment = [];
      state.error = null;
    },
  },
});

export default appointmentSlice.reducer;

export const {
  addAppointment,
  getAppoinmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
  updateAppointment,
  clearAppointment,
} = appointmentSlice.actions;
