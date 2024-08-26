import React from "react";
import useFoodGoodToKnow from "../hooks/useFoodGoodToKnow";
import Typography from '@mui/material/Typography';

export default function Blog() {
    const {food, loading, error} = useFoodGoodToKnow();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    function getShortFoodItemLabel(string: string) {
        if (string.length > 30) {
            return (string.substring(0, 30) + "...")
        } else {
            return string;
        }
    }

    return (
        <div>
            <Typography variant="h1" gutterBottom style={{marginTop: "25px"}}>
                Find more nutritional information
            </Typography>
            <div className="api-food-item-wrapper"
                 style={{
                     display: "flex",
                     flexWrap: "wrap",
                     justifyContent: "center",
                     gap: "30px",
                     paddingLeft: "25px",
                     paddingTop: "25px"
                 }}>
                {food?.length ? (
                    food.map((foodItem, index) => (
                        <div key={index} className="api-food-item" style={{width: "300px"}}>
                            <p>{getShortFoodItemLabel(foodItem.food.label)}</p>
                            {foodItem.food.image ?
                                <img src={foodItem.food.image} alt={foodItem.food.label}
                                     style={{
                                         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                         borderRadius: '50%',
                                     }}></img> : null
                            }
                            <div style={{display: "flex", justifyContent: "center", gap: "15px"}}>
                                <p>Fat: {foodItem.food.nutrients.FAT}</p>
                                <p>Carbohydrate: {foodItem.food.nutrients.CHOCDF}</p>
                                <p>KCal: {foodItem.food.nutrients.ENERC_KCAL}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Cannot find a recipe</p>
                )}
            </div>
        </div>
    );
}