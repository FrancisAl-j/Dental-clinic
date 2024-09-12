import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendations: [],
  loading: false,
};

export const recommendationSlice = createSlice({
  name: "recommendations",
  initialState,

  reducers: {
    getRecommendationsStart: (state) => {
      state.loading = true;
    },
    getRecommendationsSuccess: (state, action) => {
      state.loading = false;
      state.recommendations = action.payload;
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
    },
  },
});

export default recommendationSlice.reducer;

export const {
  getRecommendationsStart,
  getRecommendationsSuccess,
  clearRecommendations,
} = recommendationSlice.actions;
