

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../Interfaces/dataStructures/UserInterface"

interface UserState {
  user: User | null,
  isAuthorized: boolean,
  isModerator: boolean,
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
  isModerator: false,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SetUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthorized = state.user ? true : false;
      state.isModerator = state.isAuthorized && state.user!.Role > 1 ? true : false;
    },
    DeleteUser: (state) => {
      state.user = null;
      state.isAuthorized = false;
      state.isModerator = false;
    },
  }
});

export const userReducer = UserSlice.reducer;
export const {
  SetUser,
  DeleteUser,
} = UserSlice.actions;
