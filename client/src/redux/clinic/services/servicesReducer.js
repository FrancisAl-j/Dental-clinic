import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  loading: false,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,

  reducers: {
    getServicesStart: (state) => {
      state.loading = true;
    },
    getServicesSuccess: (state, action) => {
      state.loading = false;
      state.services = action.payload;
    },
  },
});

export default servicesSlice.reducer;

export const { getServicesStart, getServicesSuccess } = servicesSlice.actions;
