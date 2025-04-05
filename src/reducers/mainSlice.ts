import { createSlice } from "@reduxjs/toolkit";

export interface MainState {
  isSourceModalOpen: boolean;
  isLeadModalOpen: boolean;
  isBlockModalOpen: boolean;
  isColdEmailModalOpen: boolean;
  isTemplateModalOpen: boolean;
}

const initialState: MainState = {
  isSourceModalOpen: false,
  isLeadModalOpen: false,
  isBlockModalOpen: false,
  isColdEmailModalOpen: false,
  isTemplateModalOpen: false,
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
    toggleColdEmailModal: (state) => {
      state.isColdEmailModalOpen = !state.isColdEmailModalOpen;
    },
    toggleTemplateModal: (state) => {
      state.isTemplateModalOpen = !state.isTemplateModalOpen;
    },
  },
});

export const {
  toggleSourceModal,
  toggleLeadModal,
  toggleBlockModal,
  toggleColdEmailModal,
  toggleTemplateModal,
} = mainSlice.actions;

export default mainSlice.reducer;
