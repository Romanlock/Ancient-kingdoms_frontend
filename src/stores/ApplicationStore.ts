import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Application } from "../dataStructures/ApplicationInterface";

interface ApplicationState {
  applications: Application[],
  currentApplication: Application | null,
}

const initialState: ApplicationState = {
  applications: [],
  currentApplication: null,
}

export const ApplicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action : PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    createCurrentApplication: (state, action: PayloadAction<Application>) => {
      state.currentApplication = action.payload;
    }
  }
});

export const applicationReducer = ApplicationSlice.reducer;
export const { setApplications, createCurrentApplication } = ApplicationSlice.actions;
