import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/User';
import { auth } from '../firebase';

interface UserState {
  currentUser: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const getCurrentUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>('currentUser/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const user = await new Promise<IUser | null>((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          resolve({
            uid: user.uid,
            userName: user.displayName || '',
            email: user.email || '',
          });
        } else {
          resolve(null);
        }
        unsubscribe();
      });
    });
    if (!user) {
      return rejectWithValue('No logged in user found');
    }
    return user;
  } catch (error) {
    console.error('Current user error:', error);
    return rejectWithValue('Failed to fetch user');
  }
});

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    resetCurrentUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch current user';
      });
  },
});

export const { resetCurrentUser } = userSlice.actions;
export default userSlice.reducer;
