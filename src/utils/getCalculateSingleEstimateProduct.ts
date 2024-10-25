// Calculate single product nutrition estimate

import {IUserFoodItem} from "../interfaces/FoodItem";
import {getNutriValuesPerKg} from "./getNutriValues";
import {IFoodEstimateValues} from "./../interfaces/FoodItem";

interface GetCalculateSingleEstimateProductProps {
    selectedProduct: string,
    usersFoodList: IUserFoodItem[],
    estimateFoodInputsValues: IFoodEstimateValues,
}

export const getCalculateSingleEstimateProduct = (
    {
        selectedProduct,
        usersFoodList,
        estimateFoodInputsValues,
    }
: GetCalculateSingleEstimateProductProps)=> {
    const matchedProduct = usersFoodList.find(
        (item) => item.foodName === selectedProduct,
    );

    if (!matchedProduct) {
        return null;
    }

    const nutriValues = getNutriValuesPerKg(matchedProduct);
    if (!nutriValues) {
        return null;
    }

    const calculateForEstimateCalories = () => {
        const caloriesValue = parseFloat(nutriValues.caloriesValuePerKg);
        const calculatedWeight = Math.round(
            (parseFloat(estimateFoodInputsValues.calories as string) /
                caloriesValue) *
            1000,
        );
        const calculatedFat = Math.round(
            (parseFloat(nutriValues.fatValuePerKg) / 10000) * calculatedWeight,
        );
        const calculatedProtein = Math.round(
            (parseFloat(nutriValues.proteinValuePerKg) / 10000) * calculatedWeight,
        );
        const calculatedCarbohydrate = Math.round(
            (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
            calculatedWeight,
        );

        return {
            calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
            foodName: selectedProduct,
            fat: `${calculatedFat}`,
            protein: `${calculatedProtein}`,
            carbohydrate: `${calculatedCarbohydrate}`,
            calories: estimateFoodInputsValues.calories,
            weight: `${calculatedWeight}`,
        };
    };

    const calculateForEstimateFat = () => {
        const fatValue = parseFloat(nutriValues.fatValuePerKg);
        const calculatedWeight = Math.round(
            (parseFloat(estimateFoodInputsValues.fat as string) / fatValue) * 1000,
        );
        const calculatedProtein = Math.round(
            (parseFloat(nutriValues.proteinValuePerKg) / 10000) * calculatedWeight,
        );
        const calculatedCarbohydrate = Math.round(
            (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
            calculatedWeight,
        );
        const calculatedCalories = Math.round(
            (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
            calculatedWeight,
        );
        return {
            calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
            foodName: selectedProduct,
            fat: estimateFoodInputsValues.fat,
            protein: `${calculatedProtein}`,
            carbohydrate: `${calculatedCarbohydrate}`,
            calories: `${calculatedCalories}`,
            weight: `${calculatedWeight}`,
        };
    };

    const calculateForEstimateProtein = () => {
        const proteinValue = parseFloat(nutriValues.proteinValuePerKg);
        const calculatedWeight = Math.round(
            (parseFloat(estimateFoodInputsValues.protein as string) /
                proteinValue) *
            1000,
        );
        const calculatedFat = Math.round(
            (parseFloat(nutriValues.fatValuePerKg) / 10000) * calculatedWeight,
        );
        const calculatedCarbohydrate = Math.round(
            (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
            calculatedWeight,
        );
        const calculatedCalories = Math.round(
            (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
            calculatedWeight,
        );
        return {
            calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
            foodName: selectedProduct,
            fat: `${calculatedFat}`,
            protein: estimateFoodInputsValues.protein,
            carbohydrate: `${calculatedCarbohydrate}`,
            calories: `${calculatedCalories}`,
            weight: `${calculatedWeight}`,
        };
    };

    const calculateForEstimateCarbohydrate = () => {
        const carbohydrateValue = parseFloat(nutriValues.carbohydrateValuePerKg);
        const calculatedWeight = Math.round(
            (parseFloat(estimateFoodInputsValues.carbohydrate as string) /
                carbohydrateValue) *
            1000,
        );
        const calculatedFat = Math.round(
            (parseFloat(nutriValues.fatValuePerKg) / 10000) * calculatedWeight,
        );
        const calculatedProtein = Math.round(
            (parseFloat(nutriValues.proteinValuePerKg) / 10000) * calculatedWeight,
        );
        const calculatedCalories = Math.round(
            (parseFloat(nutriValues.caloriesValuePerKg) / 10000) * calculatedWeight,
        );
        return {
            calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
            foodName: selectedProduct,
            fat: `${calculatedFat}`,
            protein: `${calculatedProtein}`,
            carbohydrate: estimateFoodInputsValues.carbohydrate,
            calories: `${calculatedCalories}`,
            weight: `${calculatedWeight}`,
        };
    };

    if (
        estimateFoodInputsValues.fat !== "" &&
        estimateFoodInputsValues.carbohydrate === "" &&
        estimateFoodInputsValues.protein === "" &&
        estimateFoodInputsValues.calories === ""
    ) {
        return calculateForEstimateFat();
    } else if (
        estimateFoodInputsValues.fat === "" &&
        estimateFoodInputsValues.carbohydrate !== "" &&
        estimateFoodInputsValues.protein === "" &&
        estimateFoodInputsValues.calories === ""
    ) {
        return calculateForEstimateCarbohydrate();
    } else if (
        estimateFoodInputsValues.fat === "" &&
        estimateFoodInputsValues.carbohydrate === "" &&
        estimateFoodInputsValues.protein !== "" &&
        estimateFoodInputsValues.calories === ""
    ) {
        return calculateForEstimateProtein();
    } else if (
        estimateFoodInputsValues.fat === "" &&
        estimateFoodInputsValues.carbohydrate === "" &&
        estimateFoodInputsValues.protein === "" &&
        estimateFoodInputsValues.calories !== ""
    ) {
        return calculateForEstimateCalories();
    }

    return {
        calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
        foodName: selectedProduct,
        fat: "N/A",
        protein: "N/A",
        carbohydrate: "N/A",
        calories: "N/A",
        weight: "N/A",
    };
};