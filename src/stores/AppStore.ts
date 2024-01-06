import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AppState {
  currentPage: string | null;
  kingdomFeedNameFilter: string | null;
  moderatorAllKingdomsNameFilter: string | null;
  moderatorApplicationFeedStatusFilter: string | null;
  moderatorApplicationFeedUsernameFilter: string | null;
  moderatorApplicationFeedDateFromFilter: Date | null;
  moderatorApplicationFeedDateToFilter: Date | null;
}

const initialState: AppState = {
  currentPage: null,
  kingdomFeedNameFilter: null,
  moderatorAllKingdomsNameFilter: null,
  moderatorApplicationFeedStatusFilter: null,
  moderatorApplicationFeedUsernameFilter: null,
  moderatorApplicationFeedDateFromFilter: null,
  moderatorApplicationFeedDateToFilter: null,
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    SetCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    DeleteCurrentPage: (state) => {
      state.currentPage = null;
    },
    SetKingdomFeedNameFilter: (state, action: PayloadAction<string>) => {
      state.kingdomFeedNameFilter = action.payload;
    },
    DeleteKingdomFeedNameFilter: (state) => {
      state.kingdomFeedNameFilter = null;
    },
    SetModeratorAllKingdomsNameFilter: (state, action: PayloadAction<string>) => {
      state.moderatorAllKingdomsNameFilter = action.payload;
    },
    DeleteModeratorAllKingdomsNameFilter: (state) => {
      state.moderatorAllKingdomsNameFilter = null;
    },
    SetModeratorApplicationFeedStatusFilter: (state, action: PayloadAction<string>) => {
      state.moderatorApplicationFeedStatusFilter = action.payload;
    },
    DeleteModeratorApplicationFeedStatusFilter: (state) => {
      state.moderatorApplicationFeedStatusFilter = null;
    },
    SetModeratorApplicationFeedUsernameFilter: (state, action: PayloadAction<string>) => {
      state.moderatorApplicationFeedUsernameFilter = action.payload;
    },
    DeleteModeratorApplicationFeedUsernameFilter: (state) => {
      state.moderatorApplicationFeedUsernameFilter = null;
    },
    SetModeratorApplicationFeedDateFromFilter: (state, action: PayloadAction<Date>) => {
      state.moderatorApplicationFeedDateFromFilter = action.payload;
    },
    DeleteModeratorApplicationFeedDateFromFilter: (state) => {
      state.moderatorApplicationFeedDateFromFilter = null;
    },
    SetModeratorApplicationFeedDateToFilter: (state, action: PayloadAction<Date>) => {
      state.moderatorApplicationFeedDateToFilter = action.payload;
    },
    DeleteModeratorApplicationFeedDateToFilter: (state) => {
      state.moderatorApplicationFeedDateToFilter = null;
    },
  }
});

export const appReducer = AppSlice.reducer;
export const {
  SetCurrentPage,
  DeleteCurrentPage,
  SetKingdomFeedNameFilter,
  DeleteKingdomFeedNameFilter,
  SetModeratorAllKingdomsNameFilter,
  DeleteModeratorAllKingdomsNameFilter,
  SetModeratorApplicationFeedStatusFilter,
  DeleteModeratorApplicationFeedStatusFilter,
  SetModeratorApplicationFeedUsernameFilter,
  DeleteModeratorApplicationFeedUsernameFilter,
  SetModeratorApplicationFeedDateFromFilter,
  DeleteModeratorApplicationFeedDateFromFilter,
  SetModeratorApplicationFeedDateToFilter,
  DeleteModeratorApplicationFeedDateToFilter,
} = AppSlice.actions;
