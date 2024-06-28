import React from "react";
import useRecipes from "../hooks/useRecepies";

export default function Blog() {
    const {recipe, loading, error} = useRecipes();

    return (
        <div>
            <h1 className="blog">BLOG is here </h1>
            {recipe ? (
                <pre>{JSON.stringify(recipe, null, 2)}</pre>): (<p> Can not find a recipe </p>)}
        </div>
    )
}