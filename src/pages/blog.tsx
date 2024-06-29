import React from "react";
import useFoodGoodToKnow from "../hooks/useFoodGoodToKnow";

export default function Blog() {
    const {food, loading, error} = useFoodGoodToKnow();

    return (
        <div>
            <h1 className="blog">BLOG is here </h1>
            {food?.length ? food.map(foodItem =>
                        <><p>{JSON.stringify(foodItem.food.category)}</p>
                <p>{JSON.stringify(foodItem.food.label)}</p></>
                    )
                : (<p> Can not find a recipe </p>)}
        </div>
    )
}