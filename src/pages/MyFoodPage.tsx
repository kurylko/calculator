import React from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import {IUserFoodItem} from "../interfaces/FoodItem";

export default function MyFoodPage() {
    const { data, loading } = useFetchProducts();

    console.log("myFood:", data);
    console.log("loading:", loading);

    return (
        <div>
            <h1>My food page (in development)</h1>
            {data.length > 0 ?? ( data.map((item) =>  <p> userSavedFood: {item.foodName} </p>)
                )
            }
        </div>
    )
}

