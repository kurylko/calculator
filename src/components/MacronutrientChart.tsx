import React from 'react';
import { Typography, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { PlateMacroNutrientsRate } from '../pages/MyPlatePage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface MacronutrientChartProps {
  userShares: PlateMacroNutrientsRate | null;
}

const MacronutrientChart = ({ userShares }: MacronutrientChartProps) => {
  const userFat = userShares?.fatPercentage;
  const userProtein = userShares?.proteinPercentage;
  const userCarbs = userShares?.carbPercentage;

  // Standard rates for macronutrients
  const standardRates = {
    fat: 25,
    protein: 20,
    carbs: 55,
  };

  // Data for Chart.js
  const data = {
    labels: ['Fat', 'Protein', 'Carbohydrate'],
    datasets: [
      {
        label: 'Standard (%)',
        data: [standardRates.fat, standardRates.protein, standardRates.carbs],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Your plate (%)',
        data: [userFat, userProtein, userCarbs],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)',
        },
      },
    },
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        height: '100%',
        width: '80%',
      }}
    >
      <CardContent sx={{ paddingBottom: 0, width: '100%' }}>
        <Typography variant="body2" gutterBottom>
          Macronutrient Distribution
        </Typography>
      </CardContent>
      <CardContent sx={{ padding: 0, width: '100%' }}>
        <Paper elevation={0} sx={{ width: '100%', padding: 1 }}>
          <Bar data={data} options={options} />
        </Paper>
      </CardContent>
    </Card>
  );
};

export default MacronutrientChart;
