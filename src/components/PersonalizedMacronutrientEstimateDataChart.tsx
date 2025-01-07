import React from 'react';
import { IUserBodyData } from '../interfaces/User';

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
  return <div>"Hello Personalized data"</div>;
};
