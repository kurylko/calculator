import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from './userSlice';
import FoodCollectionSlice from './foodCollectionSlice';
import CalculationsCollectionSlice from "./calculationsCollectionSlice";

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: storage,
  // whitelist: ['foodCollection'],
};

// Root reducer combining all slices
const rootReducer = combineReducers({
  user: UserSlice,
  foodCollection: FoodCollectionSlice,
  calculationsCollection: CalculationsCollectionSlice,
});

// Persisted reducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store creation function
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
  });

  // Persistor created after store
  const persistor = persistStore(store);
  return { store, persistor };
};

// Export store and persistor
const { store, persistor } = makeStore();
export { store, persistor };

// Types for TypeScript usage
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
