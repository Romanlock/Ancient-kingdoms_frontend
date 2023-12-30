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
    SetApplicationToCreate: (state, action: PayloadAction<Application>) => {
      state.applicationToCreate = action.payload;
      state.applicationToCreateKingdomsCount = action.payload.KingdomsWithTerm?.length ? 
        action.payload.KingdomsWithTerm.length : 0;
    },
    DeleteApplicationToCreate: (state) => {
      state.applicationToCreate = null;
      state.applicationToCreateKingdomsCount = 0;
    },
    SetCurrentApplication: (state, action: PayloadAction<Application | null>) => {
      state.currentApplication = action.payload;
    },
    DeleteCurrentApplication: (state) => {
      state.currentApplication = null;
    },
    AddKingdomToApplication: (state, action: PayloadAction<KingdomWithTerm>) => {
      if (state.applicationToCreate?.KingdomsWithTerm) {
        state.applicationToCreate?.KingdomsWithTerm.push(action.payload);
        state.applicationToCreateKingdomsCount += 1;

        return;
      }

      state.applicationToCreate!.KingdomsWithTerm = [action.payload];
      state.applicationToCreateKingdomsCount += 1;
    },
    DeleteKingdomFromApplication: (state, action: PayloadAction<Number>) => {
      if (!(state.applicationToCreate?.KingdomsWithTerm)) return;

      state.applicationToCreate.KingdomsWithTerm = state.applicationToCreate.KingdomsWithTerm
        .filter((kingdom: KingdomWithTerm) => kingdom.Kingdom.Id !== action.payload);
      state.applicationToCreateKingdomsCount -= 1;
    },
    UpdateApplicationStatus: (state) => {
      if (!(state.applicationToCreate)) return;
      state.applicationToCreate.State = 'На рассмотрении';
      state.applications.push(state.applicationToCreate);
      state.applicationToCreate = null;
      state.applicationToCreateKingdomsCount = 0;
    },
  }
});

export const applicationReducer = ApplicationSlice.reducer;
export const { 
  SetApplications, 
  SetApplicationToCreate,
  SetCurrentApplication, 
  DeleteCurrentApplication,
  AddKingdomToApplication,
  DeleteApplicationToCreate,
  DeleteKingdomFromApplication,
  UpdateApplicationStatus,
} = ApplicationSlice.actions;
