import { createSlice } from "@reduxjs/toolkit";

export interface MainState {
  isSourceModalOpen: boolean;
  isLeadModalOpen: boolean;
  isBlockModalOpen: boolean;
}

const initialState: MainState = {
  isSourceModalOpen: false,
  isLeadModalOpen: false,
  isBlockModalOpen: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    toggleSourceModal: (state) => {
      state.isSourceModalOpen = !state.isSourceModalOpen;
    },
    toggleLeadModal: (state) => {
      state.isLeadModalOpen = !state.isLeadModalOpen;
    },
    toggleBlockModal: (state) => {
      state.isBlockModalOpen = !state.isBlockModalOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSourceModal, toggleLeadModal, toggleBlockModal } =
  mainSlice.actions;

export default mainSlice.reducer;
