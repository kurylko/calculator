import React from 'react';
import { Box, TextField } from '@mui/material';
import {IFoodItem} from "../interfaces/FoodItem";

export interface FoodInputsFormProps {
  foodInputsValues: IFoodItem;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FoodInputsForm = ({ foodInputsValues, handleChange }: FoodInputsFormProps) => {

  return (
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
  );
};
