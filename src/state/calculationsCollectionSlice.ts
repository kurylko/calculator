import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EstimateCalculationResult } from '../interfaces/EstimateCalculationResult';

interface CalculationsCollectionState {
  calculations: EstimateCalculationResult[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CalculationsCollectionState = {
  calculations: [],
  isLoading: false,
  error: null,
};

// ToDo: calculations in DB

// export const fetchUserCalculations = createAsyncThunk<
//     EstimateCalculationResult[],
//     string,
//     { rejectValue: string }
// >('calculation/fetchUserCalculations', async (userId, { rejectWithValue }) => {
//     try {
//         const querySnapshot = await getDocs(collection(db, 'products'));
//         const items = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...(doc.data() as IUserFoodItem),
//         }));
//         const usersProducts = items.filter((food) => food.userID === userId);
//         if (!usersProducts) throw new Error('Failed to fetch user`s food items');
//         return usersProducts;
//     } catch (error: unknown) {
//         const errorMessage =
//             error instanceof Error ? error.message : 'An unknown error occurred';
//         return rejectWithValue(errorMessage);
//     }
// });

export const saveCalculationResult = createAsyncThunk<
  EstimateCalculationResult,
  { result: EstimateCalculationResult }
>('calculation/createCalculation', async ({ result }, { rejectWithValue }) => {
  try {
    return result;
  } catch (error: unknown) {
    return rejectWithValue(error);
  }
});

export const deleteCalculationResult = createAsyncThunk<
  string,
  { result: EstimateCalculationResult }
>(
  'calculation/deleteCalculationResult',
  async ({ result }, { rejectWithValue }) => {
    const resultId = result.calculationId;
    if (!resultId) {
      return rejectWithValue('No ID for calculation result found');
    }
    try {
      return resultId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const calculationsCollectionSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    resetFoodItems: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUserCalculations.pending, (state) => {
      //     state.isLoading = true;
      //     state.error = null;
      // })
      // .addCase(
      //     fetchUserCalculations.fulfilled,
      //     (state, action: PayloadAction<EstimateCalculationResult[]>) => {
      //         state.isLoading = false;
      //         state.data = action.payload;
      //     },
      // )
      // .addCase(
      //     fetchUserCalculations.rejected,
      //     (state, action: PayloadAction<string | undefined>) => {
      //         state.isLoading = false;
      //         state.error = action.payload || 'Failed to fetch calculations';
      //     },
      // )
      .addCase(saveCalculationResult.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveCalculationResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.calculations.push(action.payload);
      })
      .addCase(saveCalculationResult.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Failed to save a calculation result';
      })
      .addCase(deleteCalculationResult.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCalculationResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.calculations = state.calculations.filter(
          (stateCalculationResult) =>
            stateCalculationResult.calculationId !== action.payload,
        );
      })
      .addCase(deleteCalculationResult.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Failed to delete calculation result';
      });
  },
});

export default calculationsCollectionSlice.reducer;
