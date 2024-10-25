// Function to calculate multiple products
import {IFoodEstimateValues, IUserFoodItem} from "../interfaces/FoodItem";
import {getNutriValuesPerKg} from "./getNutriValues";
import {EstimateCalculationResult} from "../interfaces/EstimateCalculationResult";

interface GetCalculateEstimateProductsProps {
    products: string[],
    usersFoodList: IUserFoodItem[],
    estimateFoodInputsValues: IFoodEstimateValues,
}

export const getCalculateEstimateProducts = (
    {
        products,
        usersFoodList,
        estimateFoodInputsValues,
    }
    : GetCalculateEstimateProductsProps) => {
    const matchingFoods = usersFoodList.filter((item) =>
        products.includes(item.foodName),
    );

    const calculateCaloriesOnly = (): EstimateCalculationResult => {
        const estimateCaloriesNumber = parseFloat(
            estimateFoodInputsValues.calories as string,
        );

        const forOnlyCaloriesCalculated = matchingFoods.reduce(
            (totalValuesPerKg, item) => {
                const nutriValues = getNutriValuesPerKg(item);
                if (nutriValues) {
                    const valuesPerKg = {
                        caloriesValue: parseFloat(nutriValues.caloriesValuePerKg),
                    };
                    return (
                        totalValuesPerKg +
                        (isNaN(valuesPerKg.caloriesValue) ? 0 : valuesPerKg.caloriesValue)
                    );
                }
                return totalValuesPerKg;
            },
            0,
        );

        const calculatedWeight = Math.round(
            (estimateCaloriesNumber / forOnlyCaloriesCalculated) * 1000,
        );

        return {
            calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
            foodName: products.join(", "),
            fat: "",
            protein: "",
            carbohydrate: "",
            calories: estimateCaloriesNumber.toString(),
            weight: `${calculatedWeight}g`,
        };
    };

    if (
        estimateFoodInputsValues.fat === "" &&
        estimateFoodInputsValues.carbohydrate === "" &&
        estimateFoodInputsValues.protein === "" &&
        estimateFoodInputsValues.calories !== ""
    ) {
        return calculateCaloriesOnly();
    }

    return null;
};