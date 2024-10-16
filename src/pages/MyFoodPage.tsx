import React, {useCallback, useEffect, useState} from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import {SavedFoodCard} from "../components/SavedFoodCard";
import {useAuth} from "../contexts/authContext/authContext";
import {User as FirebaseUser} from "firebase/auth";
import {IUserFoodItem} from "../interfaces/FoodItem";
import useDeleteProduct from "../hooks/useDeleteProduct";
import {EstimateFoodCalculator} from "../components/EstimateFoodCalculator";
import {getNutriValuesPerKg} from "../utils/getNutriValues";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function MyFoodPage() {
    const [usersFoodList, setUsersFoodList] = useState<IUserFoodItem[]>([]);

    const {data} = useFetchProducts();
    const {deleteProduct} = useDeleteProduct();
    const {currentUser, loading} = useAuth();
    const uid = currentUser?.uid;

    const getUsersAddedFood = useCallback(
        (currentUser: FirebaseUser | null) => {
            let usersAddedFood: IUserFoodItem[] = [];
            if (currentUser !== null) {
                usersAddedFood = data.filter((food) => food.userID === uid);
            } else {
                const localStorageFoodItems =
                    localStorage.getItem("lastInputFoodItems");
                if (localStorageFoodItems) {
                    usersAddedFood = JSON.parse(localStorageFoodItems);
                }
            }
            return usersAddedFood;
        },
        [uid, data],
    );

    useEffect(() => {
        const foodList = getUsersAddedFood(currentUser);
        const filteredFoodList = uid
            ? foodList.filter((food) => food.userID === uid)
            : foodList;
        setUsersFoodList(filteredFoodList);
    }, [currentUser, uid, getUsersAddedFood]);

    const deleteProductFromLocalStorage = (foodItem: IUserFoodItem) => {
        const localStorageFoodItems = localStorage.getItem("lastInputFoodItems");
        const foodItems: IUserFoodItem[] = localStorageFoodItems
            ? JSON.parse(localStorageFoodItems)
            : [];
        const updatedFoodItems = foodItems.filter(
            (item) => item.foodName !== foodItem.foodName,
        );
        localStorage.setItem(
            "lastInputFoodItems",
            JSON.stringify(updatedFoodItems),
        );
        setUsersFoodList(updatedFoodItems);
    };

    const handleDeleteProduct = async (
        foodItem: IUserFoodItem,
    ): Promise<void> => {
        if (foodItem.id) {
            await deleteProduct("products", foodItem);
            const updatedFoodItemsFromDB = getUsersAddedFood(currentUser);
            setUsersFoodList(updatedFoodItemsFromDB);
        }
        if (foodItem.foodName) {
            deleteProductFromLocalStorage(foodItem);
        } else {
            console.error("No ID found for this food item");
        }
    };

    return (
        <Box
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                alignItems: "center",
                paddingTop: "50px",
            }}
        >
            <Box sx={{width: "85%", maxWidth: 700}}>
                <Typography variant="h3">LET'S COUNT A DISH</Typography>
            </Box>
            <Box
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <EstimateFoodCalculator usersFoodList={usersFoodList}/>
            </Box>
            <Box sx={{width: "85%", maxWidth: 700}}>
                <Typography variant="h3">MY FOOD</Typography>
            </Box>
            <Box
                style={{
                    width: "90%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "50px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                    marginBottom: "50px",
                }}
            >
                {!loading &&
                    !!usersFoodList.length &&
                    usersFoodList.map((item) => (
                        <SavedFoodCard
                            key={item.foodName}
                            foodName={item.foodName}
                            fat={item.fat}
                            calories={item.calories}
                            protein={item.protein}
                            carbohydrate={item.carbohydrate}
                            weight={item.weight}
                            onClick={() => handleDeleteProduct(item)}
                            nutriValues={getNutriValuesPerKg(item)}
                        />
                    ))}
            </Box>
        </Box>
    );
}
