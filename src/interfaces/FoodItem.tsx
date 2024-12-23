export interface IApiFoodItem {
  food: {
    category: string;
    foodId: string;
    label: string;
    image: string;
    knownAs: string;
    nutrients: {
      CHOCDF: number;
      ENERC_KCAL: number;
      FAT: number;
      FIBTG: number;
      PROCNT: number;
    };
  };
}

export interface IFoodItem {
  id?: string;
  foodName: string;
  fat: string;
  protein: string;
  carbohydrate: string;
  calories: string;
  weight: string;
}

export type IFoodItemUserInputs = Omit<IFoodItem, 'id'>;

export interface IUserFoodItem extends IFoodItem {
  id?: string;
  userID?: string;
}

export interface IFoodEstimateValues {
  fat: string;
  protein: string;
  carbohydrate: string;
  calories: string;
}
