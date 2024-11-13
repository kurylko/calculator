import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserFoodItem, IFoodItem } from '../interfaces/FoodItem';
import { useAuth } from '../contexts/authContext/authContext';
import usePostProduct from '../hooks/usePostProducts';
import useDeleteProduct from '../hooks/useDeleteProduct';
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore';
import { db } from '../firebase';

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
    if(!foodItem.id) {
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
  { foodInputsValues: IFoodItem }
>(
  'foodItem/createFoodItem',
  async ({ foodInputsValues }, { rejectWithValue }) => {
    try {
      const { currentUser } = useAuth();
      const uid = currentUser?.uid;
      const { postProduct } = usePostProduct();
      const newFoodItem = await postProduct('products', {
        ...foodInputsValues,
        userID: uid,
      });
      return newFoodItem;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
