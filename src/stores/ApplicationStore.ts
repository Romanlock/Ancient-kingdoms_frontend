import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Application } from "../Interfaces/dataStructures/ApplicationInterface";
import { Kingdom, KingdomWithTerm } from "../Interfaces/dataStructures/KingdomInterface";

interface ApplicationState {
  applications: Application[],  // все заявки
  currentApplication: Application | null,  // выбранная заявка (с княжествами)
  applicationToCreate: Application | null,  // заявка-черновик
  applicationsCount: number,
  applicationToCreateKingdomsCount: number
}

const initialState: ApplicationState = {
  applications: [],
  currentApplication: null,
  applicationToCreate: null,
  applicationsCount: 0,
  applicationToCreateKingdomsCount: 0
}

export const ApplicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    SetApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
      state.applicationsCount = action.payload.length;
    },
    SetCurrentApplication: (state, action: PayloadAction<Application | null>) => {
      state.currentApplication = action.payload;
    },
    DeleteCurrentApplication: (state) => {
      state.currentApplication = null;
    },
    // CreateCurrentApplication: (state, action: PayloadAction<Application>) => {
    //   if (state.currentApplication) {
    //     return
    //   }

    //   state.currentApplication!.Id = action.payload.Id;
    //   state.applicationsCount = 0;
    // },
    AddKingdomToApplication: (state, action: PayloadAction<KingdomWithTerm>) => {
      if (state.currentApplication) {
        state.currentApplication.KingdomsWithTerm.push(action.payload);
        state.applicationsCount += 1;
      }
    },
  }
});

export const applicationReducer = ApplicationSlice.reducer;
export const { 
  SetApplications, 
  SetCurrentApplication, 
  DeleteCurrentApplication,
  AddKingdomToApplication,
} = ApplicationSlice.actions;
