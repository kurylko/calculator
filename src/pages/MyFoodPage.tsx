import React from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import {SavedFoodCard} from "../components/SavedFoodCard";
import {useAuth} from "../contexts/authContext/authContext";
import { User as FirebaseUser } from "firebase/auth";
import {IUserFoodItem} from "../interfaces/FoodItem";


export default function MyFoodPage() {
    const { data } = useFetchProducts();
    const {currentUser, loading} = useAuth();
    const uid = currentUser?.uid;

    console.log("current user:", currentUser?.uid);

    const getUsersAddedFood = (currentUser: FirebaseUser | null) => {
        let usersAddedFood: IUserFoodItem[] = [];
        if(currentUser !== null){
            usersAddedFood = data;
        } else {
            console.log(2)
           const localStorageFoodItems = localStorage.getItem('lastInputFoodItems');
           if(localStorageFoodItems) {
               usersAddedFood = JSON.parse(localStorageFoodItems);
           }
        }
        return usersAddedFood;
    }

    const foodList = getUsersAddedFood(currentUser);
    const finalUsersFoodList = foodList.filter(food => food.userID === uid);

    console.log("foodList", foodList);

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center', marginTop: '50px', marginLeft: '50px'}}>
            <h1>MY FOOD </h1>
            <div style={{width: '100%', display: 'flex', flexWrap: "wrap", gap: '50px', alignItems: 'center', marginTop: '10px'}}>
                {!loading && !!finalUsersFoodList.length && finalUsersFoodList.map(item =>
                    <SavedFoodCard
                        key={item.foodName}
                        foodName={item.foodName}
                        fat={item.fat}
                        calories={item.calories}
                        protein={item.protein}
                        carbohydrate={item.carbohydrate}
                        weight={item.weight}
                    />)
                }
            </div>

        </div>
    )
}

