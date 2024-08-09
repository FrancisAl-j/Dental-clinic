import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentClinic: null,
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
      state.currentClinic = null;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
    clearClinic: (state) => {
      state.currentClinic = null;
    },
  },
});

export default clinicSlice.reducer;

export const { setClinic, failClinic } = clinicSlice.actions;
