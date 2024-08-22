import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: [],
  loading: false,
  error: null,
};

export const historyAppointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    getAppointmentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAppoinmentSuccess: (state, action) => {
      state.appointment = action.payload;
      state.loading = false;
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
    cancelStatus: (state, action) => {
      const index = state.appointment.findIndex(
        (appointment) => appointment._id === action.payload._id
      );
      if (index !== -1) {
        state.appointment[index] = action.payload; // Update the specific appointment
      }
    },
    clearHistoryAppointment: (state) => {
      state.appointment = [];
      state.error = null;
    },
  },
});

export default historyAppointmentSlice.reducer;

export const {
  getAppointmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
  clearHistoryAppointment,
  cancelStatus,
} = historyAppointmentSlice.actions;
