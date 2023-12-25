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
    setKingdoms: (state, action: PayloadAction<Kingdom[]>) => {
      state.kingdoms = action.payload;
    },
    setKingdom: (state, action: PayloadAction<Kingdom>) => {
      state.kingdom = action.payload;
    },
    resetKingdom: (state) => {
      state.kingdom = null;
    },
  },
});

export const { setKingdoms, setKingdom, resetKingdom } = kingdomSlice.actions;
export const kingdomReducer = kingdomSlice.reducer;
