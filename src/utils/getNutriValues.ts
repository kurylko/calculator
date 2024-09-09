import {IFoodItem} from "../interfaces/FoodItem";

export interface INutriScorePerKg {
    fatValuePerKg: number,
    proteinValuePerKg: number,
    carbohydrateValuePerKg: number,
    caloriesValuePerKg: number
}

export function getNutriValuesPerKg(foodItem: IFoodItem) {
    const weightInKg = 1000 / parseFloat(foodItem.weight);

    const fatValuePerKg = parseFloat(foodItem.fat) * weightInKg;
    const proteinValuePerKg = parseFloat(foodItem.protein) * weightInKg;
    const carbohydrateValuePerKg = parseFloat(foodItem.carbohydrate) * weightInKg;
    const caloriesValuePerKg = parseFloat(foodItem.calories) * weightInKg;
    
    const nutriScorePerKg: INutriScorePerKg = {fatValuePerKg, proteinValuePerKg, carbohydrateValuePerKg, caloriesValuePerKg};

    return nutriScorePerKg;
}
