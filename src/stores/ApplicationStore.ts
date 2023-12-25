import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Application } from "../Interfaces/dataStructures/ApplicationInterface";
import { Kingdom, KingdomWithTerm } from "../Interfaces/dataStructures/KingdomInterface";

interface ApplicationState {
  applications: Application[],
  currentApplication: Application | null,
  applicationsCount: number,
}

const initialState: ApplicationState = {
  applications: [],
  currentApplication: null,
  applicationsCount: 0,
}

export const ApplicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    SetApplications: (state, action : PayloadAction<Application[]>) => {
      state.applications = action.payload;
      state.applicationsCount = action.payload.length;
    },
    CreateCurrentApplication: (state, action: PayloadAction<Application>) => {
      if (state.currentApplication) {
        return
      }

      state.currentApplication!.Id = action.payload.Id;
    },
    AddKingdomToApplication: (state, action: PayloadAction<KingdomWithTerm>) => {
      if (state.currentApplication) {
        state.currentApplication.KingdomsWithTerm.push(action.payload);
      }
    },
  }
});

export const applicationReducer = ApplicationSlice.reducer;
export const { 
  SetApplications, 
  CreateCurrentApplication, 
  AddKingdomToApplication 
} = ApplicationSlice.actions;
