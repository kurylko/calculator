import React, {useEffect, useState} from "react";
import axios from 'axios';


export default function useRecipes() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios('https://api.edamam.com/api/food-database/v2/parser?app_id=1ce77b14&app_key=05d47bc5520fd314000bf43e83e2ca78&nutrition-type=cooking&category=generic-foods');
                setRecipe(result.data.hints);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('Can not find a recipe'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return {recipe, loading, error};
}

