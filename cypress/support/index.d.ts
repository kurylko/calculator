import { IFoodItem } from "../../src/interfaces/FoodItem";
import { INutriScorePerKg } from "../../src/utils/getNutriValues";

declare global {
  interface Window {
    lastInputFoodItems: IFoodItem[];
    savePDF: () => void;
    getNutriValuesPerKg: (foodItem: IFoodItem) => INutriScorePerKg | null;
  }
}

export {};
