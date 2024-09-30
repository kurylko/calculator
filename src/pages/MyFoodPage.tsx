import React from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import {SavedFoodCard} from "../components/SavedFoodCard";

export default function MyFoodPage() {
    const { data, loading } = useFetchProducts();

    console.log("myFood:", data);

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center', marginTop: '50px', marginLeft: '50px'}}>
            <h1>My food page (in development)</h1>
            <div style={{width: '100%', display: 'flex', gap: '50px', alignItems: 'center', marginTop: '10px'}}>
                {!!data.length && data.map(item =>
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

