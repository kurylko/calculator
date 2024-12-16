import React, { useState } from 'react';
import { SavedFoodCard } from '../components/SavedFoodCard';
import {
  IFoodEstimateValues,
  IFoodItem,
  IUserFoodItem,
} from '../interfaces/FoodItem';
import { getNutriValuesPerKg } from '../utils/getNutriValues';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import { EstimateCalculationResult } from '../interfaces/EstimateCalculationResult';
import { SingleProductCheckBox } from '../components/SingleProductCheckBox';
import { EstimateUserFoodInputsForm } from '../components/EstimateUserFoodInputsForm';
import { getCalculateSingleEstimateProduct } from '../utils/getCalculateSingleEstimateProduct';
import CalculationResultDisplay from '../components/CalculationResultDisplay';
import CalculationsTable from '../components/CalculationsTable';
import useFetchUserProducts from '../hooks/useFetchUserProducts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { deleteFoodItem, updateFoodItem } from '../state/foodCollectionSlice';
import {
  deleteCalculationResult,
  saveCalculationResult,
} from '../state/calculationsCollectionSlice';
import { FoodFormDialog } from '../components/FoodFormDialog';

export default function MyFoodPage() {
  // Users food list from db or localstorage (redux-persist)
  const dispatch: AppDispatch = useDispatch();
  const { calculations } = useSelector(
    (state: RootState) => state.calculationsCollection,
  );

  const { data, loading } = useFetchUserProducts();

  const handleDeleteProduct = async (
    foodItem: IUserFoodItem,
  ): Promise<void> => {
    if (foodItem.id) {
      dispatch(deleteFoodItem(foodItem));
    } else {
      console.error('No ID found for this food item');
    }
  };

  // Dialog with a Form to edit the food item

  const [openDialog, setOpenDialog] = React.useState(false);
  const [foodInputsValues, setFoodInputsValues] = useState<IFoodItem>({
    foodName: '',
    fat: '',
    protein: '',
    carbohydrate: '',
    calories: '',
    weight: '',
  });

  const handleClickOpenDialog = (foodItemInEdit: IFoodItem) => {
    setFoodInputsValues(foodItemInEdit);
    setOpenDialog(true);
  };

  function handleChangeFoodInputsValues(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { target: { value } = {} } = e;
    setFoodInputsValues({
      ...foodInputsValues,
      [e.target.name]: value,
    });
  }

 // Edit food Item with redux (with or without db)

  const handleEditProduct = async (foodItem: IUserFoodItem): Promise<void> => {
    if (foodItem.id) {
      const foodInputsValues: IFoodItem = {
          foodName: foodItem.foodName,
          fat: foodItem.fat,
          protein: foodItem.protein,
          carbohydrate: foodItem.carbohydrate,
          calories: foodItem.calories,
          weight: foodItem.weight,
      };
      dispatch(updateFoodItem({foodInputsValues, foodItem}));
    } else {
      console.error('Can`t edit this food item');
    }
  };

  // ---- Calculations logic -----
  const productNames = data.map((item: IFoodItem) => item.foodName);

  const [estimateFoodInputsValues, setEstimateFoodInputsValues] =
    useState<IFoodEstimateValues>({
      fat: '',
      protein: '',
      carbohydrate: '',
      calories: '',
    });
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [result, setResult] = useState<EstimateCalculationResult | null>(null);

  // Handle change for single product
  const handleChangeSingleProduct = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedProduct(value);
  };

  // Handle change for input fields
  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEstimateFoodInputsValues((prev: IFoodEstimateValues) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitCalculation = () => {
    const filledInputsCount = Object.values(estimateFoodInputsValues).filter(
      (value) => (value as string).trim() !== '',
    ).length;
    if (filledInputsCount !== 1) {
      alert('Please fill in only one estimate field to submit.');
      return;
    }
    if (selectedProduct) {
      const singleProductCalculationResult = getCalculateSingleEstimateProduct({
        selectedProduct,
        data,
        estimateFoodInputsValues,
      });
      console.log(
        'Single calculation:',
        selectedProduct,
        singleProductCalculationResult,
      );
      setResult(singleProductCalculationResult);
    }
  };

  // User can save the result of calculation to the collection (redux persist)
  const handleSaveResult = () => {
    if (!result) {
      return;
    }
    dispatch(saveCalculationResult({ result }));
  };

  // Calculations of user (redux persist)

  const handleDeleteSavedCalculationResult = async (
    result: EstimateCalculationResult,
  ): Promise<void> => {
    if (result.calculationId) {
      await dispatch(deleteCalculationResult({ result }));
    } else {
      console.error('No ID found for this calculation result');
    }
  };

  return (
    <Box
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <FoodFormDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        foodInputsValues={foodInputsValues}
        handleChange={handleChangeFoodInputsValues}
        handleEditProduct={handleEditProduct}
      />
      <Box sx={{ width: '85%', maxWidth: 700 }}>
        <Typography variant="h3">LET'S COUNT NUTRIENTS</Typography>
      </Box>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            marginBottom: '50px',
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '90%', sm: '90%', md: '85%', lg: '85%' },
            alignItems: {
              xs: 'center',
              sm: 'center',
              md: 'flex-start',
              lg: 'flex-start',
            },
          }}
        >
          <SingleProductCheckBox
            productNames={productNames}
            handleChangeSingleProduct={handleChangeSingleProduct}
            selectedProduct={selectedProduct}
          />
          <EstimateUserFoodInputsForm
            estimateFoodInputsValues={estimateFoodInputsValues}
            handleChangeInputs={handleChangeInputs}
          />
          <Button
            variant="contained"
            onClick={handleSubmitCalculation}
            sx={{
              width: 'fit-content',
              alignSelf: {
                xs: 'center',
                sm: 'center',
                md: 'flex-end',
                lg: 'flex-end',
              },
            }}
          >
            Calculate
          </Button>
          {result && (
            <Typography
              variant="h5"
              component="div"
              sx={{
                marginBottom: '20px',
                marginTop: '30px',
                alignSelf: 'center',
              }}
            >
              {selectedProduct &&
                `Calculated nutrition values of ${selectedProduct}`}
            </Typography>
          )}
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <CalculationResultDisplay result={result} />
            {result && (
              <Button
                sx={{ marginTop: '30px' }}
                variant="outlined"
                onClick={handleSaveResult}
              >
                Save the result
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '85%', maxWidth: 700 }}>
        <Typography variant="h3">MY FOOD</Typography>
      </Box>
      <Box
        style={{
          width: '90%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '50px',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
          marginBottom: '50px',
        }}
      >
        {!loading &&
          !!data.length &&
          data.map((item) => (
            <SavedFoodCard
              key={item.foodName}
              foodName={item.foodName}
              fat={item.fat}
              calories={item.calories}
              protein={item.protein}
              carbohydrate={item.carbohydrate}
              weight={item.weight}
              onClickDelete={() => handleDeleteProduct(item)}
              onClickEdit={() => handleClickOpenDialog(item)}
              nutriValues={getNutriValuesPerKg(item)}
            />
          ))}
      </Box>
      <Box sx={{ width: '100%', marginBottom: '50px' }}>
        <Typography variant="h2" sx={{ marginBottom: '30px' }}>
          MY CALCULATIONS
        </Typography>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <CalculationsTable
            results={calculations}
            handleDelete={handleDeleteSavedCalculationResult}
            plateCalculation={false}
          />
        </Box>
      </Box>
    </Box>
  );
}
