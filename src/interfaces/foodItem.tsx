export interface IFoodItem {
    food : {
        category: string;
        foodId: string;
        label: string;
        image: string;
        knownAs: string;
        nutrients : {
            CHOCDF: number,
            ENERC_KCAL: number,
            FAT: number,
            FIBTG: number,
            PROCNT: number,
        }
    }
}