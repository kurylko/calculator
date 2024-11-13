import React, { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IFoodItem } from '../interfaces/FoodItem';
import FoodTable from '../components/FoodTable';
import { getNutriValuesPerKg } from '../utils/getNutriValues';
import { PdfFoodTable } from '../components/PdfFoodTable';
import { pdf } from '@react-pdf/renderer';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { createFoodItem } from '../state/foodCollectionSlice';
import { AppDispatch, RootState } from '../state/store';

export default function FoodInfoPage() {
  const dispatch: AppDispatch = useDispatch();

  const { data } = useSelector((state: RootState) => state.foodCollection);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const lastInputFoodItemString = localStorage.getItem('lastInputFood');

  if (lastInputFoodItemString == null) {
    console.error('No data found in localStorage');
  }

  const lastInputFoodItem: IFoodItem = lastInputFoodItemString
    ? JSON.parse(lastInputFoodItemString)
    : null;

  // Storing last added items in localStorage
  const [lastInputFoodItems, setLastInputFoodItems] = useState<IFoodItem[]>(
    () => {
      const savedItems = localStorage.getItem('lastInputFoodItems');
      if (savedItems) {
        return JSON.parse(savedItems);
      }
      return [];
    },
  );

  const [foodInputsValues, setFoodInputsValues] = useState<IFoodItem>(
    !!lastInputFoodItem
      ? lastInputFoodItem
      : {
          foodName: '',
          fat: '',
          protein: '',
          carbohydrate: '',
          calories: '',
          weight: '',
        },
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target: { value } = {} } = e;
    setFoodInputsValues({
      ...foodInputsValues,
      [e.target.name]: value,
    });
    localStorage.setItem('lastInputFood', JSON.stringify(foodInputsValues));
  }

  useEffect(() => {
    localStorage.setItem('lastInputFood', JSON.stringify(foodInputsValues));
  }, [foodInputsValues]);

  const handleSubmit = async () => {
    const updatedItems = [...lastInputFoodItems, foodInputsValues];
    setLastInputFoodItems(updatedItems);
    console.log('lastInputFoodItems:', lastInputFoodItem);
    localStorage.setItem('lastInputFoodItems', JSON.stringify(updatedItems));

    if (currentUser) {
      try {
        await dispatch(createFoodItem({ foodInputsValues }));
      } catch (error) {
        console.error('Error posting food item:', error);
      }
    }
    setFoodInputsValues({
      foodName: '',
      fat: '',
      protein: '',
      carbohydrate: '',
      calories: '',
      weight: '',
    });
  };

  // useEffect(() => {
  //   console.log("lastInputFoodItems updated:", lastInputFoodItems);
  // }, [lastInputFoodItems]);

  const parsedFoodItems = useMemo(() => {
    return lastInputFoodItems.map((item) => ({
      ...item,
      nutriScorePerKg: getNutriValuesPerKg(item),
    }));
  }, [lastInputFoodItems]);

  // User can export Food table as a PDF Document

  const savePDF = async () => {
    const doc = <PdfFoodTable data={parsedFoodItems} />;
    const asBlob = await pdf(doc).toBlob();

    const url = URL.createObjectURL(asBlob);
    window.open(url, '_blank');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '90%',
          }}
        >
          <Typography
            variant="h3"
            data-test="test-header"
            sx={{ textAlign: 'center', paddingBottom: '30px' }}
          >
            ADD FOOD INFO
          </Typography>
          <Box
            sx={{
              width: { xs: '85%', sm: '85%', md: '100%', lg: '100%' },
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              paddingBottom: '30px',
              marginBottom: '30px',
              alignItems: {
                xs: 'center',
                sm: 'center',
                md: 'flex-start',
                lg: 'flex-start',
              },
              justifyContent: {
                xs: 'center',
                sm: 'center',
                md: 'flex-start',
                lg: 'flex-start',
              },
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Food name"
              name="foodName"
              value={foodInputsValues.foodName}
              onChange={handleChange}
              sx={{
                width: { xs: '90%', sm: '45%', md: '20%', lg: '20%' },
              }}
            />
            <TextField
              required
              id="outlined-number"
              label="Fat"
              type="number"
              name="fat"
              value={foodInputsValues.fat}
              onChange={handleChange}
              sx={{
                width: { xs: '90%', sm: '45%', md: '20%', lg: '20%' },
              }}
            />
            <TextField
              required
              id="outlined-number"
              label="Protein"
              type="number"
              name="protein"
              value={foodInputsValues.protein}
              onChange={handleChange}
              sx={{
                width: { xs: '90%', sm: '45%', md: '20%', lg: '20%' },
              }}
            />
            <TextField
              required
              id="outlined-number"
              label="Carbohydrate"
              type="number"
              name="carbohydrate"
              value={foodInputsValues.carbohydrate}
              onChange={handleChange}
              sx={{
                width: { xs: '90%', sm: '45%', md: '20%', lg: '20%' },
              }}
            />
            <TextField
              required
              id="outlined-number"
              label="Calories, kcal"
              type="number"
              name="calories"
              value={foodInputsValues.calories}
              onChange={handleChange}
              sx={{
                width: { xs: '90%', sm: '45%', md: '20%', lg: '20%' },
              }}
            />
            <TextField
              required
              id="outlined-number"
              label="Standard pack weight, g"
              type="number"
              name="weight"
              value={foodInputsValues.weight}
              onChange={handleChange}
              sx={{
                width: { xs: '90%', sm: '45%', md: '20%', lg: '25%' },
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: {
                xs: 'center',
                sm: 'center',
                md: 'flex-end',
                lg: 'flex-end',
              },
              marginBottom: '30px',
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Add food info
            </Button>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <Button variant="contained">Cancel</Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          width: '85%',
          marginBottom: '40px',
        }}
      >
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', marginBottom: '30px' }}
        >
          LAST FOOD YOU ADDED
        </Typography>
        {lastInputFoodItems.length > 0 ? (
          <FoodTable lastInputFoodItems={parsedFoodItems} />
        ) : (
          <h3>Add your first food!</h3>
        )}
        {lastInputFoodItems.length > 0 && (
          <Button
            sx={{
              alignSelf: {
                xs: 'center',
                sm: 'center',
                md: 'flex-end',
                lg: 'flex-end',
              },
            }}
            variant="outlined"
            onClick={savePDF}
          >
            Export as Pdf
          </Button>
        )}
      </Box>
    </Box>
  );
}
