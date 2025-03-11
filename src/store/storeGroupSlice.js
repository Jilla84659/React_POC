import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeGroupName: "",
  description: "",
  existingStoreGroup: "Denver",
  availableStores: [
    { id: 101, name: "Safeway, 20th Ave" },
    { id: 103, name: "Corona St" },
    { id: 126, name: "44th Ave" },
  ],
  selectedStores: [
    { id: 102, name: "S Broadway" },
    { id: 104, name: "N Federal Blvd" },
  ],
};

const storeGroupSlice = createSlice({
  name: "storeGroup",
  initialState,
  reducers: {
    setStoreGroupName: (state, action) => {
      state.storeGroupName = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setExistingStoreGroup: (state, action) => {
      state.existingStoreGroup = action.payload;
    },
    moveStoreToSelected: (state, action) => {
      const store = state.availableStores.find((s) => s.id === action.payload);
      if (store) {
        state.availableStores = state.availableStores.filter((s) => s.id !== action.payload);
        state.selectedStores.push(store);
      }
    },
    moveStoreToAvailable: (state, action) => {
      const store = state.selectedStores.find((s) => s.id === action.payload);
      if (store) {
        state.selectedStores = state.selectedStores.filter((s) => s.id !== action.payload);
        state.availableStores.push(store);
      }
    },
  },
});

export const {
  setStoreGroupName,
  setDescription,
  setExistingStoreGroup,
  moveStoreToSelected,
  moveStoreToAvailable,
} = storeGroupSlice.actions;

export default storeGroupSlice.reducer;
