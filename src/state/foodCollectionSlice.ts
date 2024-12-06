import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserFoodItem, IFoodItem } from '../interfaces/FoodItem';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { RootState } from './store';

interface FoodCollectionState {
  data: IUserFoodItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FoodCollectionState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchUserFoodItems = createAsyncThunk<
  IUserFoodItem[],
  string,
  { rejectValue: string }
>('foodItem/fetchUserFoodItems', async (userId, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as IUserFoodItem),
    }));
    const usersProducts = items.filter((food) => food.userID === userId);
    if (!usersProducts) throw new Error('Failed to fetch user`s food items');
    return usersProducts;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const deleteFoodItem = createAsyncThunk<string, IUserFoodItem>(
  'foodItem/deleteFoodItem',
  async (foodItem, { rejectWithValue }) => {
    if (!foodItem.id) {
      return rejectWithValue('No ID for user`s food item');
    }
    try {
      const docRef = doc(db, 'products', foodItem.id);
      await deleteDoc(docRef);
      return foodItem.id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createFoodItem = createAsyncThunk<
  IUserFoodItem,
  { foodInputsValues: IFoodItem },
  { state: RootState }
>(
  'foodItem/createFoodItem',
  async ({ foodInputsValues }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUser = state.user.currentUser;
      if (currentUser) {
        const uid = currentUser?.uid;
        const colRef = collection(db, 'products');
        await addDoc(colRef, {
          ...foodInputsValues,
          userID: uid,
        });
        return {
          ...foodInputsValues,
          userID: uid,
        };
      } else {
        return { ...foodInputsValues };
      }
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

// ToDo: Implement updateFoodItem (IFoodItem vs IUserFoodItem )

// export const updateFoodItem = createAsyncThunk<
//     { foodItem: IUserFoodItem },
//     { foodInputsValues: IFoodItem; foodItem: IUserFoodItem },
//     { state: RootState }
// >(
//     'foodItem/updateFoodItem',
//     async ({ foodInputsValues, foodItem },{ getState, rejectWithValue }) => {
//       try {
//         const state = getState();
//         const currentUser = state.user.currentUser;
//         if (currentUser) {
//           const uid = currentUser?.uid;
//           const foodItemId = foodItem.id;
//             if (!foodItemId) {
//               return rejectWithValue('No ID for user`s food item');
//             }
//           const docRef = doc(db, 'products', foodItemId);
//           await updateDoc(docRef, {
//             ...foodInputsValues,
//             userID: uid,
//           });
//            return {
//              ...foodInputsValues,
//              userID: uid,
//            };
//         } else {
//           return { ...foodInputsValues };
//         }
//       } catch (error: unknown) {
//         return rejectWithValue(error);
//       }
//     },
// );

const foodCollectionSlice = createSlice({
  name: 'foodItem',
  initialState,
  reducers: {
    resetFoodItems: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFoodItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserFoodItems.fulfilled,
        (state, action: PayloadAction<IUserFoodItem[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchUserFoodItems.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || 'Failed to fetch data';
        },
      )
      .addCase(createFoodItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFoodItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(createFoodItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create food item';
      })
      .addCase(deleteFoodItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFoodItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (stateFoodItem) => stateFoodItem.id !== action.payload,
        );
      })
      .addCase(deleteFoodItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete food item';
      });
  },
});

export const { resetFoodItems } = foodCollectionSlice.actions;
export default foodCollectionSlice.reducer;
