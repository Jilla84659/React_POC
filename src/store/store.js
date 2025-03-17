import { configureStore } from "@reduxjs/toolkit";
import storeGroupReducer from "./storeGroupSlice";

export const store = configureStore({
  reducer: {
    storeGroup: storeGroupReducer,
  },
});

export default store;