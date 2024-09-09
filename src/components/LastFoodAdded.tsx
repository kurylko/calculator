import React from "react"
import {IFoodItem} from "../interfaces/foodItem";

const LastFoodAdded: React.FC<IFoodItem> = ({
                                            foodName,
                                            fat,
                                            protein,
                                            carbohydrate,
                                            calories,
                                            weight,
                                        }) => {

    console.log("Rendering LastFoodAdded:", foodName);

    return (
        <div style={{display: "flex", flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'flex-start'}}>
            <div>Name: {foodName} </div>
            <div>Fat: {fat}</div>
            <div>Protein: {protein}</div>
            <div>Carbohydrate: {carbohydrate}</div>
            <div>Calories: {calories}</div>
            <div>Weight: {weight}</div>
        </div>
    )
}

export default LastFoodAdded