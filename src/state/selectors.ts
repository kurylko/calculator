import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const userState = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [userState],
  (userState) => userState.currentUser,
);

const foodCollectionState = (state: RootState) => state.foodCollection;

export const selectFoodCollection = createSelector(
  [foodCollectionState],
  (foodCollectionState) => foodCollectionState.data,
);

const calculationsCollectionState = (state: RootState) => state.calculationsCollection;

const plateState = (state: RootState) => state.plate;