import React from "react";
import {Button} from "@mui/material";
import { TextField} from '@mui/material';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";


export default function FoodInfoPage() {
    const { foodName = '', fat = '', protein = '', carbohydrate = '', calories = '', weight = ''  } = {}

    const lastInputFoodItem = JSON.parse(localStorage.getItem("lastInputFood"));

    const [addFood, setAddFood] = useState( !!lastInputFoodItem ? lastInputFoodItem :
    {foodName, fat, protein, carbohydrate, calories, weight});

    function handleChange(e) {
        const value = e.target.value;
        const { target = {event: {value}= {}}  } = e;
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