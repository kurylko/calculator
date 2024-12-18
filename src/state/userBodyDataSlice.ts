import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {IUserBodyData} from "../interfaces/User";

interface UserBodyDataState {
    userBodyData: IUserBodyData;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserBodyDataState = {
    userBodyData: {
        gender: '',
        weight: 60,
        height: 160,
        mealsPerDay: 2,
    },
    isLoading: false,
    error: null,
}

export const saveUserBodyData = createAsyncThunk<IUserBodyData,  { userBodyData: IUserBodyData }>(
    'userBodyData/saveUserBodyData',
    async ({userBodyData}, { rejectWithValue }) => {
        try {
            return userBodyData;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    });

const userBodyDataSlice = createSlice({
    name: 'userBodyData',
    initialState,
    reducers: {
        resetUserBodyData: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUserBodyData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(saveUserBodyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userBodyData = action.payload;
            })
            .addCase(saveUserBodyData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to save user`s body data';
            });
    },
});

export default userBodyDataSlice.reducer;