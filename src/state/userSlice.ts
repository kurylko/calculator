import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {useAuth} from "../contexts/authContext/authContext";
import {IUser} from "../interfaces/User";


const initialState = {
    currentUser: {},
    isLoading: false,
    error: {},
}

export const getCurrentUser = createAsyncThunk(
    'getCurrentUser',
    async ({ user }: {user: IUser}, { rejectWithValue }) => {
        try {
            const { currentUser } = useAuth();

            if (!currentUser) {
                return rejectWithValue('No current user found')
            }

            return currentUser;

        } catch (error) {
            console.error('Current user error:', error)
            return rejectWithValue('Failed to fetch user')
        }
    }
)

const userSlice = createSlice({
    name: 'getCurrentUser',
    initialState,
    reducers: {
        testRed: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = action.payload
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload || 'Failed to fetch current user'
            })
    },
})

export default userSlice.reducer