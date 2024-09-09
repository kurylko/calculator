import React from "react";
import {Button} from "@mui/material";
import {TextField} from '@mui/material';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {IFoodItem} from "../interfaces/FoodItem";
import FoodTable, {FoodWithNutriScore} from "../components/FoodTable";
import {getNutriValuesPerKg} from "../utils/getNutriValues";


export default function FoodInfoPage() {

    const {foodName = '', fat = '', protein = '', carbohydrate = '', calories = '', weight = ''} = {}

    const lastInputFoodItemString = localStorage.getItem("lastInputFood");

    if (lastInputFoodItemString == null) {
        console.error('No data found in localStorage');
    }

    const lastInputFoodItem: IFoodItem = lastInputFoodItemString ? JSON.parse(lastInputFoodItemString) : null;

    // Storing last added items in sessionStorage
    const [lastInputFoodItems, setLastInputFoodItems] = useState<FoodWithNutriScore[]>(() => {
        const savedItems = sessionStorage.getItem('lastInputFoodItems');
        if (savedItems) {
            const parsedItems: IFoodItem[] = JSON.parse(savedItems);
            const itemsWithNutriScore = parsedItems.map(item => {
                if (!item.hasOwnProperty('nutriScorePerKg')) {
                    const nutriScorePerKg = getNutriValuesPerKg(item);
                    return { ...item, nutriScorePerKg };
                }
                return item as FoodWithNutriScore;
            });
            return itemsWithNutriScore;
        }
        return [];
    });

    const [nutriScore, setNutriScore] = useState<any | null>(null);

    const [addFood, setAddFood] = useState<IFoodItem>(!!lastInputFoodItem ? lastInputFoodItem :
        {foodName, fat, protein, carbohydrate, calories, weight});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        //const value = e.target.value;
        const {target: {value} = {}} = e;
        setAddFood({
            ...addFood,
            [e.target.name]: value
        });
        localStorage.setItem('lastInputFood', JSON.stringify(addFood));
    }

    useEffect(() => {
        localStorage.setItem('lastInputFood', JSON.stringify(addFood));
    }, [addFood]);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(event){
            event.preventDefault();
        }
        const nutriScorePerKg = getNutriValuesPerKg(addFood);
        setNutriScore(nutriScorePerKg);
        const mergedItem: FoodWithNutriScore = {
            ...addFood,
            nutriScorePerKg: nutriScorePerKg || {
                fatValuePerKg: 'N/A',
                proteinValuePerKg: 'N/A',
                carbohydrateValuePerKg: 'N/A',
                caloriesValuePerKg: 'N/A'
            }
        };
        console.log("handler of Add food btn:", addFood);
        const updatedItems = [...lastInputFoodItems, mergedItem];
        setLastInputFoodItems(updatedItems);
        sessionStorage.setItem('lastInputFoodItems', JSON.stringify(updatedItems));
        console.log(lastInputFoodItems);
        setAddFood({
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

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h2 style={{textAlign: "center", paddingBottom: "30px"}}>LAST FOOD YOU ADDED</h2>
                {lastInputFoodItems.length > 0 ?
                    <FoodTable lastInputFoodItems={lastInputFoodItems} />
                    : <h3>Add your first food!</h3>
                }
            </div>
        </div>
    )
}
