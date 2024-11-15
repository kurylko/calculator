import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EstimateCalculationResult } from '../interfaces/EstimateCalculationResult';

interface PlateState {
    plate: EstimateCalculationResult[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PlateState = {
    plate: [],
    isLoading: false,
    error: null,
};

export const addToPlate = createAsyncThunk<
    EstimateCalculationResult,
    { result: EstimateCalculationResult }
>('plate/addToPlate', async ({ result }, { rejectWithValue }) => {
    try {
        return result;
    } catch (error: unknown) {
        return rejectWithValue(error);
    }
});

export const deleteFromPlate = createAsyncThunk<
    string,
    { result: EstimateCalculationResult }
>(
    'plate/deleteFromPlate',
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
            .addCase(addToPlate.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToPlate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.plate.push(action.payload);
            })
            .addCase(addToPlate.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message || 'Failed to save a calculation result';
            })
            .addCase(deleteFromPlate.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteFromPlate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.plate = state.plate.filter(
                    (statePlate) =>
                        statePlate.calculationId !== action.payload,
                );
            })
            .addCase(deleteFromPlate.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message || 'Failed to delete food item from a plate';
            });
    },
});

export default calculationsCollectionSlice.reducer;
