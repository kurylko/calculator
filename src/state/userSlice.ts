import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/User';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

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

interface CreateUserArgs {
  email: string;
  password: string;
}

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

export const createUser = createAsyncThunk<
  IUser,
  CreateUserArgs,
  { rejectValue: string }
>(
  'currentUser/createUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return {
        uid: newUser.user.uid,
        email: newUser.user.email || '',
      };
    } catch (error) {
      console.error('Current user error:', error);
      return rejectWithValue('Failed to create a user');
    }
  },
);

export const logInUser = createAsyncThunk<
  IUser,
  CreateUserArgs,
  { rejectValue: string }
>('currentUser/logInUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userData: IUser = {
        uid: currentUser.uid,
        email: currentUser.email ?? undefined,
      };
      return userData;
    } else {
      return rejectWithValue('No user is currently logged in');
    }
  } catch (error) {
    console.error('Current user error:', error);
    return rejectWithValue('Failed to create a user');
  }
});

export const logOutUser = createAsyncThunk<null, void, { rejectValue: string }>(
  'currentUser/logOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
      return null;
    } catch (error) {
      console.error('Current user error:', error);
      return rejectWithValue('Failed to log out a user');
    }
  },
);

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
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create new user';
      })
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to log in user';
      })
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to log out user';
      });
  },
});

export const { resetCurrentUser } = userSlice.actions;
export default userSlice.reducer;
