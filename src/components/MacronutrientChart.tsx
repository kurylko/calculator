import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MacronutrientChart = ({ userShares } : any) => {
    const userFat = userShares.fatPercentage;
    const userProtein = userShares.proteinPercentage;
    const userCarbs = userShares.carbPercentage;

    // Standard rates for macronutrients
    const standardRates = {
        fat: 25,
        protein: 20,
        carbs: 55,
    };

    // Data for Chart.js
    const data = {
        labels: ["Fat", "Protein", "Carbohydrate"],
        datasets: [
            {
                label: "Standard (%)",
                data: [standardRates.fat, standardRates.protein, standardRates.carbs],
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
            {
                label: "Your plate (%)",
                data: [userFat, userProtein, userCarbs],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Percentage (%)",
                },
            },
        },
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Macronutrient Distribution
            </Typography>
            <Paper elevation={3} sx={{ width: "100%", padding: 2 }}>
                <Bar data={data} options={options} />
            </Paper>
        </Box>
    );
};

export default MacronutrientChart;
