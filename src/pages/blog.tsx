import React from "react";
import useFoodGoodToKnow from "../hooks/useFoodGoodToKnow";

export default function Blog() {
    const { food, loading, error } = useFoodGoodToKnow();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1 className="blog">BLOG is here</h1>
            {food?.length ? (
                food.map((foodItem, index) => (
                    <div key={index}>
                        <p>{foodItem.food.category}</p>
                        <p>{foodItem.food.label}</p>
                    </div>
                ))
            ) : (
                <p>Cannot find a recipe</p>
            )}
        </div>
    );
}