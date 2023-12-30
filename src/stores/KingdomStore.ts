import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kingdom } from '../Interfaces/dataStructures/KingdomInterface';

interface KingdomState {
  kingdoms: Kingdom[],
  kingdom: Kingdom | null,
}

const initialState: KingdomState = {
  kingdoms: [],
  kingdom: null,
};

export const kingdomSlice = createSlice({
  name: 'kingdom',
  initialState,
  reducers: {
    SetKingdoms: (state, action: PayloadAction<Kingdom[]>) => {
      state.kingdoms = action.payload;
    },
    SetKingdom: (state, action: PayloadAction<Kingdom>) => {
      state.kingdom = action.payload;
    },
    DeleteKingdom: (state) => {
      state.kingdom = null;
    },
  },
});

export const { SetKingdoms, SetKingdom, DeleteKingdom } = kingdomSlice.actions;
export const kingdomReducer = kingdomSlice.reducer;
