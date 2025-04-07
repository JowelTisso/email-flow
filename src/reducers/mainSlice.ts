import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmailTemplate } from "../utils/Types";
import { initialEmailTemplates } from "../utils/data";

export interface MainState {
  isSourceModalOpen: boolean;
  isLeadModalOpen: boolean;
  isBlockModalOpen: boolean;
  isColdEmailModalOpen: boolean;
  isTemplateModalOpen: boolean;
  isSaveModalOpen: boolean;
  emailTemplates: EmailTemplate[];
}

const initialState: MainState = {
  isSourceModalOpen: false,
  isLeadModalOpen: false,
  isBlockModalOpen: false,
  isColdEmailModalOpen: false,
  isTemplateModalOpen: false,
  isSaveModalOpen: false,
  emailTemplates: initialEmailTemplates,
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
    toggleSaveModal: (state) => {
      state.isSaveModalOpen = !state.isSaveModalOpen;
    },
    addEmailTemplate: (state, action: PayloadAction<EmailTemplate>) => {
      state.emailTemplates = [...state.emailTemplates, action.payload];
    },
  },
});

export const {
  toggleSourceModal,
  toggleLeadModal,
  toggleBlockModal,
  toggleColdEmailModal,
  toggleTemplateModal,
  toggleSaveModal,
  addEmailTemplate,
} = mainSlice.actions;

export default mainSlice.reducer;
