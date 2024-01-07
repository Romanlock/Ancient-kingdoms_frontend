import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Application } from "../Interfaces/dataStructures/ApplicationInterface";
import { KingdomWithTerm } from "../Interfaces/dataStructures/KingdomInterface";


interface ApplicationState {
  applicationsAll: Application[],
  applicationsAllCount: number,
  applications: Application[],  // все заявки пользователя
  currentApplication: Application | null,  // выбранная заявка (с княжествами)
  applicationToCreate: Application | null,  // заявка-черновик
  applicationsCount: number,
  applicationToCreateKingdomsCount: number
}

const initialState: ApplicationState = {
  applicationsAll: [],
  applicationsAllCount: 0,
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
    ClearStore: (state) => {
      state.applicationsAll = [],
      state.applicationsAllCount = 0,
      state.applications = [],
      state.currentApplication = null,
      state.applicationToCreate = null,
      state.applicationsCount = 0,
      state.applicationToCreateKingdomsCount = 0
    },
    SetApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
      state.applicationsCount = action.payload.length;
    },
    SetApplicationToCreate: (state, action: PayloadAction<Application>) => {
      state.applicationToCreate = action.payload;
      state.applicationToCreateKingdomsCount = action.payload.KingdomsWithTerm?.length ? 
        action.payload.KingdomsWithTerm.length : 0;
    },
    CreateApplicationToCreate: (state, action: PayloadAction<Application>) => {
      state.applicationToCreate = action.payload;
      state.applicationToCreateKingdomsCount = action.payload.KingdomsWithTerm?.length ? 
        action.payload.KingdomsWithTerm.length : 0;

      state.applications.push(state.applicationToCreate);
      state.applicationsCount += 1;
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
    UpdateApplicationRuler: (state, action: PayloadAction<string>) => {
      if (!(state.applicationToCreate && state.currentApplication)) return;
      
      state.applicationToCreate.Ruler = action.payload;
      state.currentApplication.Ruler = action.payload;
    },
    DeleteApplication: (state, action: PayloadAction<Number>) => {
      state.applications = state.applications.filter((application: Application) => {
        if (application.Id !== action.payload) {
          return application;
        }
      })
      state.applicationsCount = state.applications.length;
    },
    UpdateKingdomFromApplication: (state, action: PayloadAction<KingdomWithTerm>) => {
      const nestedApplication = state.applicationToCreate?.KingdomsWithTerm.find(
        kingdom => kingdom.Kingdom.Id === action.payload.Kingdom.Id
      );
    
      if (!nestedApplication) return;
    
      state.applicationToCreate!.KingdomsWithTerm = state.applicationToCreate!.KingdomsWithTerm.map(
        kingdom => {
          if (kingdom.Kingdom.Id === nestedApplication.Kingdom.Id) {
            return nestedApplication;
          }
          return kingdom;
        }
      );
    },

    // moderator reducers

    SetApplicationsAll: (state, action: PayloadAction<Application[]>) => {
      state.applicationsAll = action.payload;
      state.applicationsAllCount = action.payload.length;
    },
    
  }
});

export const applicationReducer = ApplicationSlice.reducer;
export const { 
  ClearStore,
  SetApplications, 
  SetApplicationToCreate,
  CreateApplicationToCreate,
  SetCurrentApplication, 
  DeleteCurrentApplication,
  AddKingdomToApplication,
  DeleteApplicationToCreate,
  DeleteKingdomFromApplication,
  UpdateApplicationStatus,
  UpdateApplicationRuler,
  UpdateKingdomFromApplication,
  DeleteApplication,
  
  SetApplicationsAll,
} = ApplicationSlice.actions;
