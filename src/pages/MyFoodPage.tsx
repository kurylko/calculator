import React from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import {SavedFoodCard} from "../components/SavedFoodCard";
import {useAuth} from "../contexts/authContext/authContext";
import {IUserFoodItem} from "../interfaces/FoodItem";

export default function MyFoodPage() {
    const { data, loading } = useFetchProducts();
    const {currentUser} = useAuth();
    console.log("current user:", currentUser?.email);

    const getUsersAddedFood = ({currentUser}: any): IUserFoodItem[] => {
        let usersAddedFood: IUserFoodItem[] = [];
        if(currentUser !== null){
            usersAddedFood = data;
        } else {
           const localStorageFoodItems = localStorage.getItem('lastInputFoodItems');
           if(localStorageFoodItems) {
               usersAddedFood = JSON.parse(localStorageFoodItems);
           }
        }
        return usersAddedFood;
    }

    const foodList = getUsersAddedFood({currentUser});

    console.log("foodList", foodList);

    console.log("myFood data from db:", data);

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center', marginTop: '50px', marginLeft: '50px'}}>
            <h1>My food page (in development)</h1>
            <div style={{width: '100%', display: 'flex', flexWrap: "wrap", gap: '50px', alignItems: 'center', marginTop: '10px'}}>
                {!!foodList.length && foodList.map(item =>
                    <SavedFoodCard
                        key={item.id}
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

