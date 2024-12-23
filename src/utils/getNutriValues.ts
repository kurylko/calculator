import { IFoodItem } from '../interfaces/FoodItem';

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

  const fatValuePerKg = (parseFloat(foodItem.fat) * weightInKg).toFixed(2).toString();
  const proteinValuePerKg = (parseFloat(foodItem.protein) * weightInKg).toFixed(2).toString();
  const carbohydrateValuePerKg = (parseFloat(foodItem.carbohydrate) * weightInKg).toFixed(2).toString();
  const caloriesValuePerKg = (parseFloat(foodItem.calories) * weightInKg).toFixed(2).toString();

  return {
    fatValuePerKg,
    proteinValuePerKg,
    carbohydrateValuePerKg,
    caloriesValuePerKg,
  } as INutriScorePerKg;
}
