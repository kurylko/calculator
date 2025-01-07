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
      Estimate calories per Day: {personalizedMacronutrientEstimateData?.personalizedCalories} kcal
    </Typography>
  </Box>
};
