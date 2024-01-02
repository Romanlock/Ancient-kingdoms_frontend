import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface AppState {
  currentPage: string | null;
}

const initialState: AppState = {
  currentPage: null,
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
  }
});

export const appReducer = AppSlice.reducer;
export const {
  SetCurrentPage,
  DeleteCurrentPage,
} = AppSlice.actions;
