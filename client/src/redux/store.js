import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import clinicReducer from "./clinic/clinicReducer.js";
import clinicsReducer from "./clinic/ClinicsReducer.js";
import patientClinicReducer from "./clinic/patientClinicReducer.js";
import appointmentReducer from "./clinic/appointmentReducer.js";
import historyAppointmentReducer from "./clinic/historyAppointmentReducer.js";
import patientListReducer from "./clinic/patientListReducer.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  clinic: clinicReducer,
  clinics: clinicsReducer,
  patientClinic: patientClinicReducer,
  appointment: appointmentReducer,
  historyAppoinment: historyAppointmentReducer,
  patients: patientListReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
