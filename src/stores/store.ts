import { configureStore } from '@reduxjs/toolkit';
import { kingdomReducer } from './KingdomStore';
import { applicationReducer } from './ApplicationStore';
import { userReducer } from './UserStore';

const store = configureStore({ 
  reducer: { 
    kingdom: kingdomReducer,
    application: applicationReducer,
    user: userReducer,
  } ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['applications/AddKingdomToApplication'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
