import React from "react";
import {Button} from "@mui/material";
import { TextField} from '@mui/material';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {IFoodItem} from "../interfaces/foodItem";


export default function FoodInfoPage() {
    const { foodName = '', fat = '', protein = '', carbohydrate = '', calories = '', weight = ''  } = {}

    const lastInputFoodItemString = localStorage.getItem("lastInputFood");

    // Check if the retrieved value is not null
    if (lastInputFoodItemString == null) {
        console.error('No data found in localStorage');
    }

    const lastInputFoodItem : IFoodItem = lastInputFoodItemString ? JSON.parse(lastInputFoodItemString) : null;

    const [addFood, setAddFood] = useState<IFoodItem>( !!lastInputFoodItem ? lastInputFoodItem :
    {foodName, fat, protein, carbohydrate, calories, weight});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        //const value = e.target.value;
        const { target: {value}= {}} = e;
        setAddFood({
            ...addFood,
            [e.target.name]: value
        });
        localStorage.setItem('lastInputFood', JSON.stringify(addFood));
    }

    useEffect(() => {
        localStorage.setItem('lastInputFood', JSON.stringify(addFood));
    }, [addFood]);

    const handleSubmit = () => {
        console.log("handler of Add food btn:", addFood);
    };

    return (
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
                        value={addFood.foodName}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-number"
                        label="Fat"
                        type="number"
                        name="fat"
                        value={addFood.fat}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-number"
                        label="Protein"
                        type="number"
                        name="protein"
                        value={addFood.protein}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-number"
                        label="Carbohydrate"
                        type="number"
                        name="carbohydrate"
                        value={addFood.carbohydrate}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-number"
                        label="Calories, kcal"
                        type="number"
                        name="calories"
                        value={addFood.calories}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-number"
                        label="Standard pack weight, g"
                        type="number"
                        name="weight"
                        value={addFood.weight}
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
    )
}
