import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice";
import foodCollectionSlice from "./foodCollectionSlice";



export const makeStore = () => {
    return configureStore({
        reducer: {
            userSlice,
            foodCollectionSlice,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
