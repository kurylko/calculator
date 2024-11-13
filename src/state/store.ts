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

const persistConfig = {
  key: 'root',
  storage: storage,
  //whitelist: ['foodCollection'],
};
const rootReducer = combineReducers({
  user: UserSlice,
  foodCollection: FoodCollectionSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const persistor = persistStore(makeStore());

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
