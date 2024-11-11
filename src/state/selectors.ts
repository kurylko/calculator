import { createSelector } from '@reduxjs/toolkit'
import { RootState } from "./store";

const selectUserState = (state: RootState) => state.selectUserSlice

export const selectCurrentUser = createSelector(
    [selectUserState],
    (userState) => userState.currentUser
)


const foodCollectionState = (state : RootState) => state.foodCollectionSlice

export const selectFoodCollection = createSelector(
    [foodCollectionState],
    (foodCollectionState) => foodCollectionState.data
)