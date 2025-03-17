import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeGroupName: "",
  description: "",
  existingStoreGroup: "Denver",
  id: "",
  availableStores: [
    { id: 101, storeGroupName: "Safeway, 20th Ave" },
    { id: 103, storeGroupName: "Corona St" },
    { id: 126, storeGroupName: "44th Ave" },
  ],
  selectedStores: [
    { id: 102, storeGroupName: "S Broadway" },
    { id: 104, storeGroupName: "N Federal Blvd" },
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
    setId: (state, action) => {
      state.id = action.payload;
    },
    addToAvailableStores: (state) => {
      state.availableStores.push({
        id: state.id,
        storeGroupName: state.storeGroupName,
      });
      state.id = '';
      state.storeGroupName = '';
      state.description = '';
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
    moveAllSelectedStoresToAvailable: (state) => {
      state.availableStores = [...state.availableStores, ...state.selectedStores];
      state.selectedStores = [];
    },
    moveAllAvailableStoresToSelected: (state) => {
      state.selectedStores = [...state.selectedStores, ...state.availableStores];
      state.availableStores = [];
    },
    moveMultipleStoresToSelected: (state, action) => {
      const selectedIds = action.payload;
      const selectedItems = state.availableStores.filter((store) => selectedIds.includes(store.id));
      
      state.availableStores = state.availableStores.filter((store) => !selectedIds.includes(store.id));
      state.selectedStores = [...state.selectedStores, ...selectedItems];
    },
    
    moveMultipleStoresToAvailable: (state, action) => {
      const selectedIds = action.payload;
      const selectedItems = state.selectedStores.filter((store) => selectedIds.includes(store.id));
    
      state.selectedStores = state.selectedStores.filter((store) => !selectedIds.includes(store.id));
      state.availableStores = [...state.availableStores, ...selectedItems];
    },
    
  },
});

export const {
  setStoreGroupName,
  setDescription,
  setExistingStoreGroup,
  setId,
  addToAvailableStores,
  moveStoreToSelected,
  moveStoreToAvailable,
  moveAllSelectedStoresToAvailable,
  moveAllAvailableStoresToSelected,
  moveMultipleStoresToSelected,
  moveMultipleStoresToAvailable,
} = storeGroupSlice.actions;

export default storeGroupSlice.reducer;
