import { IFoodItem } from "../interfaces/FoodItem";

export interface INutriScorePerKg {
  fatValuePerKg: string;
  proteinValuePerKg: string;
  carbohydrateValuePerKg: string;
  caloriesValuePerKg: string;
}

export function getNutriValuesPerKg(
  foodItem: IFoodItem,
): INutriScorePerKg | null {
  if (isNaN(parseFloat(foodItem.weight)) || parseFloat(foodItem.weight) <= 0) {
    return null;
  }

  const weightInKg = 1000 / parseFloat(foodItem.weight);

  const fatValuePerKg = Math.round(
    parseFloat(foodItem.fat) * weightInKg,
  ).toString();
  const proteinValuePerKg = Math.round(
    parseFloat(foodItem.protein) * weightInKg,
  ).toString();
  const carbohydrateValuePerKg = Math.round(
    parseFloat(foodItem.carbohydrate) * weightInKg,
  ).toString();
  const caloriesValuePerKg = Math.round(
    parseFloat(foodItem.calories) * weightInKg,
  ).toString();

  return {
    fatValuePerKg,
    proteinValuePerKg,
    carbohydrateValuePerKg,
    caloriesValuePerKg,
  } as INutriScorePerKg;
}
