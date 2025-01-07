import React from 'react';
import { IUserBodyData } from '../interfaces/User';
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

export interface PersonalizedMacronutrientEstimateData {
  personalizedFat: string;
  personalizedProtein: string;
  personalizedCarbohydrate: string;
  personalizedCalories: string;
}

interface PersonalizedMacronutrientEstimateDataChartProps {
  userBodyDataInputs: IUserBodyData;
  personalizedMacronutrientEstimateData: PersonalizedMacronutrientEstimateData | null;
}

export const PersonalizedMacronutrientEstimateDataChart = ({
  userBodyDataInputs,
  personalizedMacronutrientEstimateData,
}: PersonalizedMacronutrientEstimateDataChartProps) => {
  return <Box>
    <Typography
        gutterBottom
        sx={{ color: 'text.secondary', fontSize: 14, paddingBottom: 2 }}
    >
      Your estimate calories per Day: {personalizedMacronutrientEstimateData?.personalizedCalories} kCal
    </Typography>
    <Typography
        gutterBottom
        sx={{ color: 'text.secondary', fontSize: 14 }}
    >
      Fat: {personalizedMacronutrientEstimateData?.personalizedFat} g
    </Typography>
    <Typography
        gutterBottom
        sx={{ color: 'text.secondary', fontSize: 14 }}
    >
      Protein: {personalizedMacronutrientEstimateData?.personalizedProtein} g
    </Typography>
    <Typography
        gutterBottom
        sx={{ color: 'text.secondary', fontSize: 14 }}
    >
      Carbs: {personalizedMacronutrientEstimateData?.personalizedCarbohydrate} g
    </Typography>
  </Box>
};
