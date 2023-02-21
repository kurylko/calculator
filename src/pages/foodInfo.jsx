import React from "react";
import {Button} from "@mui/material";
import {Input, TextField} from '@mui/material';
import {useFormControl} from '@mui/material/FormControl';
import {useState} from "react";
import {Link} from "react-router-dom";


export default function FoodInfoPage() {

    const [addFood, setAddFood] = useState({
        foodName: "",
        fat: "",
        carbohydrate: "",
        protein: "",
        calories: "",
        weight: "",
    });

    function handleChange(evt) {
        const value = evt.target.value;
        setAddFood({
            ...addFood,
            [evt.target.name]: value
        });
        console.log(evt.target.name, ":",  value)
    };

    const handleSubmit = () => {
     console.log("handler:", addFood)
    };

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "85%"}}>
            <h2 style={{textAlign: "center", paddingBottom: "30px"}}>ADD FOOD INFO</h2>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", paddingBottom: "30px"}}>
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
                <Button variant="contained"  onClick={handleSubmit}>Add food info</Button>
                <Link to={"/"} style={{textDecoration: "none"}}>
                <Button variant="contained">Cancel</Button>
                    </Link>
            </div>
            </div>
        </div>
    )
}
