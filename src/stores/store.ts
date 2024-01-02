import { configureStore } from '@reduxjs/toolkit';
import { kingdomReducer } from './KingdomStore';
import { applicationReducer } from './ApplicationStore';
import { userReducer } from './UserStore';
import { appReducer } from './AppStore';

const store = configureStore({ 
  reducer: { 
    kingdom: kingdomReducer,
    application: applicationReducer,
    user: userReducer,
    app: appReducer,
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
