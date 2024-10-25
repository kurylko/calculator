import {Box, TextField} from "@mui/material";
import React from "react";
import {IFoodEstimateValues} from "../interfaces/FoodItem";

interface EstimateUserFoodInputsFormProps {
    estimateFoodInputsValues: IFoodEstimateValues;
    handleChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EstimateUserFoodInputsForm = ({estimateFoodInputsValues, handleChangeInputs} : EstimateUserFoodInputsFormProps) => {
    return (
    <Box
        sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "50px",
            width: "100%",
            justifyContent: {
                xs: "center",
                sm: "center",
                md: "flex-start",
                lg: "flex-start",
            },
        }}
    >
        <TextField
            id="outlined-required"
            label="Estimate-fat, g"
            name="fat"
            value={estimateFoodInputsValues.fat}
            onChange={handleChangeInputs}
            sx={{ width: { xs: "90%", sm: "45%", md: "20%", lg: "20%" } }}
        />
        <TextField
            id="outlined-required"
            label="Estimate-protein, g"
            name="protein"
            value={estimateFoodInputsValues.protein}
            onChange={handleChangeInputs}
            sx={{ width: { xs: "90%", sm: "45%", md: "20%", lg: "20%" } }}
        />
        <TextField
            id="outlined-required"
            label="Estimate-carbohydrate, g"
            name="carbohydrate"
            value={estimateFoodInputsValues.carbohydrate}
            onChange={handleChangeInputs}
            sx={{ width: { xs: "90%", sm: "45%", md: "20%", lg: "20%" } }}
        />
        <TextField
            id="outlined-required"
            label="Estimate-kcal"
            name="calories"
            value={estimateFoodInputsValues.calories}
            onChange={handleChangeInputs}
            sx={{ width: { xs: "90%", sm: "45%", md: "20%", lg: "20%" } }}
        />
    </Box>
    )
}