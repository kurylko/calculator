import React from "react";
import useFoodGoodToKnow from "../hooks/useFoodGoodToKnow";

export default function Blog() {
    const {food, loading, error} = useFoodGoodToKnow();

    return (
        <div>
            <h1 className="blog">BLOG is here </h1>
            {food ? (
                <pre>{JSON.stringify(food, null, 2)}</pre>): (<p> Can not find a recipe </p>)}
        </div>
    )
}