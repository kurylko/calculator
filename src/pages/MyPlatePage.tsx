import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SegmentedProgressBar } from '../components/SegmentedProgressBar';
import { SingleProductCheckBox } from '../components/SingleProductCheckBox';
import {
  IFoodEstimateValues,
  IFoodItem,
  IUserFoodItem,
} from '../interfaces/FoodItem';
import { User as FirebaseUser } from '@firebase/auth';
import useFetchProducts from '../hooks/useFetchProducts';
import { useAuth } from '../contexts/authContext/authContext';
import { SelectChangeEvent } from '@mui/material/Select';
import { EstimateUserFoodInputsForm } from '../components/EstimateUserFoodInputsForm';
import { getCalculateSingleEstimateProduct } from '../utils/getCalculateSingleEstimateProduct';
import { EstimateCalculationResult } from '../interfaces/EstimateCalculationResult';
import CalculationResultDisplay from '../components/CalculationResultDisplay';
import PlateNutrients from '../components/PlateNutrients';
import CalculationsTable from '../components/CalculationsTable';
import MacronutrientChart from '../components/MacronutrientChart';

export type TotalPlate = {
  calories: string;
  carbohydrate: string;
  fat: string;
  protein: string;
  weight: string;
};

export default function MyPlatePage() {
  const [usersFoodList, setUsersFoodList] = useState<IUserFoodItem[]>([]);
  const [progress, setProgress] = useState<number>(10);

  const { data } = useFetchProducts();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const getUsersAddedFood = useCallback(
    (currentUser: FirebaseUser | null) => {
      let usersAddedFood: IUserFoodItem[] = [];
      if (currentUser !== null) {
        usersAddedFood = data.filter((food) => food.userID === uid);
      } else {
        const localStorageFoodItems =
          localStorage.getItem('lastInputFoodItems');
        if (localStorageFoodItems) {
          usersAddedFood = JSON.parse(localStorageFoodItems);
        }
      }
      return usersAddedFood;
    },
    [uid, data],
  );

  useEffect(() => {
    const foodList = getUsersAddedFood(currentUser);
    const filteredFoodList = uid
      ? foodList.filter((food) => food.userID === uid)
      : foodList;
    setUsersFoodList(filteredFoodList);
  }, [currentUser, uid, getUsersAddedFood]);

  const productNames = usersFoodList.map((item: IFoodItem) => item.foodName);
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
  const [products, setProducts] = useState<string[]>([]);
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
        usersFoodList,
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

  const [userCalculationResults, setUserCalculationResults] = useState<
    EstimateCalculationResult[]
  >([]);

  // Added to LocalStorage plate calculations
  const plateCalculationResults = localStorage.getItem('plate') ?? '[]';
  const parsedPlate = JSON.parse(plateCalculationResults);
  console.log('plateCalculationResults', parsedPlate);

  // To display in a Plate card
  const plateTotalToDisplay: TotalPlate = parsedPlate.reduce(
    (accumulator: TotalPlate, item: EstimateCalculationResult) => {
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

    setUserCalculationResults((prevResults) => {
      const updatedResults = [...prevResults, result];
      localStorage.setItem('plate', JSON.stringify(updatedResults));
      return updatedResults;
    });
    setResult(null);
  };

  const deleteCalculationFromLocalStorage = (
    calculationResult: EstimateCalculationResult,
  ) => {
    const localStorageCalculations = localStorage.getItem('plate');
    const calculationResults: EstimateCalculationResult[] =
      localStorageCalculations ? JSON.parse(localStorageCalculations) : [];
    const updatedCalculationResults = calculationResults.filter(
      (item) => item.calculationId !== calculationResult.calculationId,
    );
    localStorage.setItem('plate', JSON.stringify(updatedCalculationResults));
    setUserCalculationResults(updatedCalculationResults);
  };

  const handleDeleteCalculation = async (
    calculationResult: EstimateCalculationResult,
  ): Promise<void> => {
    if (calculationResult.calculationId) {
      await deleteCalculationFromLocalStorage(calculationResult);
      const updatedCalculationResults = localStorage.getItem('plate');
      setUserCalculationResults(
        updatedCalculationResults ? JSON.parse(updatedCalculationResults) : [],
      );
    } else {
      console.error('No ID found for this calculation result');
    }
  };

  // Counting standard macronutrient distribution for a balanced diet

  function countHealthyPlate(plate: TotalPlate) {
    // Convert nutrient values from strings to numbers
    const totalCalories = parseFloat(plate.calories);
    const carbsInGrams = parseFloat(plate.carbohydrate);
    const fatInGrams = parseFloat(plate.fat);
    const proteinInGrams = parseFloat(plate.protein);

    // Calculate calories from each macronutrient
    const carbCalories = carbsInGrams * 4;
    const fatCalories = fatInGrams * 9;
    const proteinCalories = proteinInGrams * 4;

    // Calculate the percentage of each macronutrient
    const carbPercentage = Math.round((carbCalories / totalCalories) * 100);
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
    return {
      fatHealthyRate: fatHealthyRate(),
      proteinHealthyRate: proteinHealthyRate(),
      carbHealthyRate: carbHealthyRate(),
      fatPercentage: fatPercentage,
      carbPercentage: carbPercentage,
      proteinPercentage: proteinPercentage,
      isPlateHealthy: isCarbHealthy && isFatHealthy && isProteinHealthy,
    };
  }

  const plateCalculationRate = countHealthyPlate(plateTotalToDisplay);
  console.log('results:', plateCalculationRate);

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         setProgress(prev => (prev < 100 ? prev + 1 : 0));
  //     }, 100); // Increase progress by 1% every 0.1 seconds
  //
  //     return () => clearInterval(interval);
  // }, []);

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
          width: '70%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <MacronutrientChart userShares={plateCalculationRate} />
        <PlateNutrients plateTotalToDisplay={plateTotalToDisplay} />
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
      <Typography variant="h3">Ingredients in your plate</Typography>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CalculationsTable
          results={parsedPlate}
          handleDelete={handleDeleteCalculation}
        />
      </Box>
    </Box>
  );
}
