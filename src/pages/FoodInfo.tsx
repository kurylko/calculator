import React, {useMemo} from "react";
import {Button} from "@mui/material";
import {TextField} from '@mui/material';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {IFoodItem} from "../interfaces/FoodItem";
import FoodTable from "../components/FoodTable";
import {getNutriValuesPerKg} from "../utils/getNutriValues";


export default function FoodInfoPage() {
    const lastInputFoodItemString = localStorage.getItem("lastInputFood");

    if (lastInputFoodItemString == null) {
        console.error('No data found in localStorage');
    }

    const lastInputFoodItem: IFoodItem = lastInputFoodItemString ? JSON.parse(lastInputFoodItemString) : null;

    // Storing last added items in localStorage
    const [lastInputFoodItems, setLastInputFoodItems] = useState<IFoodItem[]>(() => {
        const savedItems = localStorage.getItem('lastInputFoodItems');
        if (savedItems) {
            return JSON.parse(savedItems);
        }
        return [];
    });

    const [foodInputsValues, setFoodInputsValues] = useState<IFoodItem>(!!lastInputFoodItem ? lastInputFoodItem :
        {foodName: '', fat: '', protein: '', carbohydrate: '', calories: '', weight: ''});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {target: {value} = {}} = e;
        setFoodInputsValues({
            ...foodInputsValues,
            [e.target.name]: value
        });
        localStorage.setItem('lastInputFood', JSON.stringify(foodInputsValues));
    }

    useEffect(() => {
        localStorage.setItem('lastInputFood', JSON.stringify(foodInputsValues));
    }, [foodInputsValues]);

    const handleSubmit = () => {
        const updatedItems = [...lastInputFoodItems, foodInputsValues];
        setLastInputFoodItems(updatedItems);
        localStorage.setItem('lastInputFoodItems', JSON.stringify(updatedItems));
        setFoodInputsValues({
            foodName: '',
            fat: '',
            protein: '',
            carbohydrate: '',
            calories: '',
            weight: '',
        });
    };

    useEffect(() => {
        console.log("lastInputFoodItems updated:", lastInputFoodItems);
    }, [lastInputFoodItems]);

    const parsedFoodItems = useMemo(() => {
        return lastInputFoodItems.map(item => ({...item, nutriScorePerKg: getNutriValuesPerKg(item)}))
    }, [lastInputFoodItems]);


    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '50px'}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "85%"}}>
                    <h2 style={{textAlign: "center", paddingBottom: "30px"}}>ADD FOOD INFO</h2>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        paddingBottom: "30px"
                    }}>
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Food name"
                            name="foodName"
                            value={foodInputsValues.foodName}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="outlined-number"
                            label="Fat"
                            type="number"
                            name="fat"
                            value={foodInputsValues.fat}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="outlined-number"
                            label="Protein"
                            type="number"
                            name="protein"
                            value={foodInputsValues.protein}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="outlined-number"
                            label="Carbohydrate"
                            type="number"
                            name="carbohydrate"
                            value={foodInputsValues.carbohydrate}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="outlined-number"
                            label="Calories, kcal"
                            type="number"
                            name="calories"
                            value={foodInputsValues.calories}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="outlined-number"
                            label="Standard pack weight, g"
                            type="number"
                            name="weight"
                            value={foodInputsValues.weight}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end", gap: "16px"}}>
                        <Button variant="contained" onClick={handleSubmit}>Add food info</Button>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <Button variant="contained">Cancel</Button>
                        </Link>
                    </div>
                </div>

            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h2 style={{textAlign: "center", paddingBottom: "30px"}}>LAST FOOD YOU ADDED</h2>
                {lastInputFoodItems.length > 0 ?
                    <FoodTable lastInputFoodItems={parsedFoodItems} />
                    : <h3>Add your first food!</h3>
                }
            </div>
        </div>
    )
}
