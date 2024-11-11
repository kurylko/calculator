import { configureStore } from '@reduxjs/toolkit'
import selectUserSlice from "./selectUserSlice";
import foodCollectionSlice from "./foodCollectionSlice";



export const makeStore = () => {
    return configureStore({
        reducer: {
            selectUserSlice,
            foodCollectionSlice,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
