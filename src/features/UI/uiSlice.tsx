import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMyProfileOpen: false,
};

// createSlice automatically generates action creators and action types that correspond to the reducers and state.
const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    toggleMyProfile: (state) => {
      state.isMyProfileOpen = !state.isMyProfileOpen;
    },
    closeMyProfile: (state) => {
      state.isMyProfileOpen = false;
    },
  },
});

// action creator. we dispatch this in the components.
export const { toggleMyProfile, closeMyProfile } = uiSlice.actions;

export default uiSlice.reducer;
