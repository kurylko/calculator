import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SingleProductCheckBox } from '../components/SingleProductCheckBox';
import { IFoodEstimateValues, IFoodItem } from '../interfaces/FoodItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { EstimateUserFoodInputsForm } from '../components/EstimateUserFoodInputsForm';
import { getCalculateSingleEstimateProduct } from '../utils/getCalculateSingleEstimateProduct';
import { EstimateCalculationResult } from '../interfaces/EstimateCalculationResult';
import CalculationResultDisplay from '../components/CalculationResultDisplay';
import PlateNutrients from '../components/PlateNutrients';
import CalculationsTable from '../components/CalculationsTable';
import MacronutrientChart from '../components/MacronutrientChart';
import useFetchUserProducts from '../hooks/useFetchUserProducts';
import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToPlate, deleteFromPlate } from '../state/plateSlice';
import { NutrientsDistributionPreForm } from '../components/NutriensDistributionPreForm';
import { IUserBodyData } from '../interfaces/User';

export type TotalPlateNutrients = {
  calories: string;
  carbohydrate: string;
  fat: string;
  protein: string;
  weight: string;
};

export interface PlateMacroNutrientsRate {
  fatHealthyRate: string;
  proteinHealthyRate: string;
  carbHealthyRate: string;
  fatPercentage: number;
  carbPercentage: number;
  proteinPercentage: number;
  isPlateHealthy: boolean;
}

export default function MyPlatePage() {
  // data is a users food list
  const { data } = useFetchUserProducts();

  // ToDo set users calculations in redux
  // const { currentUser } = useSelector((state: RootState) => state.user);

  const productNames = data.map((item: IFoodItem) => item.foodName);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleChangeSingleProduct = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedProduct(value);
  };

  const [estimateFoodInputsValues, setEstimateFoodInputsValues] =
    useState<IFoodEstimateValues>({
      fat: '',
      protein: '',
      carbohydrate: '',
      calories: '',
    });

  const [result, setResult] = useState<EstimateCalculationResult | null>(null);

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
        'Single calculation',
        selectedProduct,
        singleProductCalculationResult,
      );
      setResult(singleProductCalculationResult);
    }
  };

  // Added result to a plate (redux persist)
  const { plate } = useSelector((state: RootState) => state.plate);
  const dispatch: AppDispatch = useDispatch();

  // To display in a Plate card
  const plateTotalToDisplay: TotalPlateNutrients = plate.reduce(
    (accumulator: TotalPlateNutrients, item: EstimateCalculationResult) => {
      return {
        calories: (
          parseFloat(accumulator.calories) + parseFloat(item.calories ?? '0')
        ).toString(),
        carbohydrate: (
          parseFloat(accumulator.carbohydrate) +
          parseFloat(item.carbohydrate ?? '0')
        ).toString(),
        fat: (
          parseFloat(accumulator.fat) + parseFloat(item.fat ?? '0')
        ).toString(),
        protein: (
          parseFloat(accumulator.protein) + parseFloat(item.protein ?? '0')
        ).toString(),
        weight: (
          parseFloat(accumulator.weight) + parseFloat(item.weight ?? '0')
        ).toString(),
      };
    },
    { calories: '0', carbohydrate: '0', fat: '0', protein: '0', weight: '0' },
  );

  const handleAddToPlate = () => {
    if (!result) {
      return;
    }
    dispatch(addToPlate({ result }));
    setResult(null);
  };

  const handleDeleteCalculation = async (
    result: EstimateCalculationResult,
  ): Promise<void> => {
    if (result.calculationId) {
      await dispatch(deleteFromPlate({ result }));
    } else {
      console.error('No ID found for this calculation result');
    }
  };

  // User body data from a form for calculations

  const [userBodyDataInputs, setUserBodyDataInputs] = useState<IUserBodyData>({
    gender: '',
    weight: 60,
    height: 160,
    mealsPerDay: 2,
  });

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setUserBodyDataInputs((prev: IUserBodyData) => ({
      ...prev,
      gender: name,
    }));
  }

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setUserBodyDataInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveUserData = () => {
    console.log('userBodyData:', userBodyDataInputs);
  };

  // Counting standard macronutrient distribution for a balanced diet

  function countHealthyPlate(plate: TotalPlateNutrients) {
    // Convert nutrient values from strings to numbers
    const totalCalories = parseFloat(plate.calories);
    console.log('totalCalories', totalCalories);
    const carbsInGrams = parseFloat(plate.carbohydrate);
    console.log('carbsInGrams', carbsInGrams);
    const fatInGrams = parseFloat(plate.fat);
    const proteinInGrams = parseFloat(plate.protein);

    // Calculate calories from each macronutrient
    const carbCalories = carbsInGrams * 4;
    const fatCalories = fatInGrams * 9;
    const proteinCalories = proteinInGrams * 4;

    // Calculate the percentage of each macronutrient
    const carbPercentage = Math.round((carbCalories / totalCalories) * 100);
    console.log('carbPercentage', carbPercentage);
    const fatPercentage = Math.round((fatCalories / totalCalories) * 100);
    const proteinPercentage = Math.round(
      (proteinCalories / totalCalories) * 100,
    );

    // Determine if each macronutrient is within the healthy range
    const isCarbHealthy = carbPercentage >= 45 && carbPercentage <= 65;
    const isFatHealthy = fatPercentage >= 20 && fatPercentage <= 35;
    const isProteinHealthy = proteinPercentage >= 10 && proteinPercentage <= 35;

    function fatHealthyRate() {
      let fatRate = '';
      if (fatPercentage < 20) {
        fatRate = 'too low';
      } else if (fatPercentage > 35) {
        fatRate = 'too high';
      } else {
        fatRate = 'good';
      }
      return fatRate;
    }

    function proteinHealthyRate() {
      let proteinRate = '';
      if (proteinPercentage < 10) {
        proteinRate = 'too low';
      } else if (proteinPercentage > 35) {
        proteinRate = 'too high';
      } else {
        proteinRate = 'good';
      }
      return proteinRate;
    }

    function carbHealthyRate() {
      let carbRate = '';
      if (carbPercentage < 45) {
        carbRate = 'too low';
      } else if (carbPercentage > 65) {
        carbRate = 'too high';
      } else {
        carbRate = 'good';
      }
      return carbRate;
    }

    // Return the results
    const plateCalculationRate: PlateMacroNutrientsRate = {
      fatHealthyRate: fatHealthyRate(),
      proteinHealthyRate: proteinHealthyRate(),
      carbHealthyRate: carbHealthyRate(),
      fatPercentage: fatPercentage,
      carbPercentage: carbPercentage,
      proteinPercentage: proteinPercentage,
      isPlateHealthy: isCarbHealthy && isFatHealthy && isProteinHealthy,
    };

    return plateCalculationRate;
  }

  const plateCalculationRate: PlateMacroNutrientsRate | null = useMemo(() => {
    if (!plateTotalToDisplay) return null;
    return countHealthyPlate(plateTotalToDisplay);
  }, [plateTotalToDisplay]);

  console.log(
    'plateCalculationRate',
    plateCalculationRate ? plateCalculationRate : 'no data',
  );

  return (
    <Box
      style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <Box sx={{ width: '85%', maxWidth: 700 }}>
        <Typography variant="h3">LET'S COUNT A DISH</Typography>
      </Box>
      <Container
        sx={{
          height: {
            xs: '90%',
            sm: '90%',
            md: '270px',
            lg: '300px',
          },
          width: {
            xs: '90%',
            sm: '90%',
            md: '90%',
            lg: '70%',
          },
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'flex-row',
          },
          gap: '10px',
          justifyContent: {
            xs: 'space-around',
            sm: 'space-around',
            md: 'space-between',
            lg: 'space-between',
          },
          marginTop: '50px',
          marginBottom: '50px',
          alignItems: 'center',
        }}
      >
        {!plateCalculationRate?.carbPercentage ? (
          <NutrientsDistributionPreForm
            userBodyDataInputs={userBodyDataInputs}
            handleCheckBoxChange={handleCheckBoxChange}
            handleSaveUserData={handleSaveUserData}
            handleSelectChange={handleSelectChange}
          />
        ) : (
          <MacronutrientChart userShares={plateCalculationRate} />
        )}
        <PlateNutrients {...plateTotalToDisplay} />
      </Container>
      <Box
        sx={{
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
      </Box>
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
      <CalculationResultDisplay result={result} />
      {result && (
        <Button
          sx={{ marginTop: '30px' }}
          variant="outlined"
          onClick={handleAddToPlate}
        >
          Add to the plate
        </Button>
      )}
      <Typography variant="h3" sx={{ marginTop: '30px', marginBottom: '30px' }}>
        Ingredients in your plate
      </Typography>
      <Box sx={{ display: 'flex', width: '100%', marginBottom: '30px' }}>
        <CalculationsTable
          results={plate}
          handleDelete={handleDeleteCalculation}
          plateCalculation={true}
        />
      </Box>
    </Box>
  );
}
