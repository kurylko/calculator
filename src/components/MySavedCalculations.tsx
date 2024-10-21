import React from "react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import CalculationResultDisplay from "./CalculationResultDisplay";
import {EstimateCalculationResult} from "./EstimateFoodCalculator";

interface MySavedCalculationsProps {
    results: EstimateCalculationResult[] | null
}

export const MySavedCalculations = ({results} : MySavedCalculationsProps) => {
    return (
        <Box>
            <Typography variant="h2">MY CALCULATIONS</Typography>
            <Box>
                { results?.map((result) =>
                    <CalculationResultDisplay result={result}/>
                )}
            </Box>
        </Box>
    )
}