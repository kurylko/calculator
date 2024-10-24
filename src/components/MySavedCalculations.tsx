import React from "react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {EstimateCalculationResult} from "./EstimateFoodCalculator";
import CalculationsTable from "./CalculationsTable";

interface MySavedCalculationsProps {
    results: EstimateCalculationResult[] | null
}

export const MySavedCalculations = ({results} : MySavedCalculationsProps) => {
    return (
        <Box>
            <Typography variant="h2" sx={{marginBottom: "30px"}}>MY CALCULATIONS</Typography>
            <Box sx={{width: "100%"}}>
                <CalculationsTable results={results}/>
            </Box>
        </Box>
    )
}