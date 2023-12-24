import { configureStore } from '@reduxjs/toolkit';
import { kingdomReducer } from './KingdomsSlice';
import { applicationReducer } from './ApplicationStore';

const store = configureStore({ 
  reducer: { 
    kingdom: kingdomReducer,
    application: applicationReducer,
  } 
});

export type AppDispatch = typeof store.dispatch;

export default store;
