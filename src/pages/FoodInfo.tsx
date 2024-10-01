import React, {useMemo} from "react";
import {Button} from "@mui/material";
import {TextField} from '@mui/material';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {IFoodItem, IUserFoodItem} from "../interfaces/FoodItem";
import FoodTable from "../components/FoodTable";
import {getNutriValuesPerKg} from "../utils/getNutriValues";
import {PdfFoodTable} from "../components/PdfFoodTable";
import { pdf } from '@react-pdf/renderer';
import usePostProduct from "../hooks/usePostProducts";


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

    const [product, setProduct] = useState<IUserFoodItem>();
    const {postProduct, loading: productLoading, error: error} = usePostProduct();

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

    const handleSubmit = async () => {
        const updatedItems = [...lastInputFoodItems, foodInputsValues];
        setLastInputFoodItems(updatedItems);
        localStorage.setItem('lastInputFoodItems', JSON.stringify(updatedItems));
        await postProduct("products", {
            foodName: lastInputFoodItem.foodName,
            fat: lastInputFoodItem.fat,
            protein: lastInputFoodItem.protein,
            carbohydrate: lastInputFoodItem.carbohydrate,
            calories: lastInputFoodItem.calories,
            weight: lastInputFoodItem.weight,
            userID: '1',
        })  .then(() => {
            setFoodInputsValues({
                foodName: '',
                fat: '',
                protein: '',
                carbohydrate: '',
                calories: '',
                weight: '',
            });
        });
    };

    useEffect(() => {
        console.log("lastInputFoodItems updated:", lastInputFoodItems);
    }, [lastInputFoodItems]);

    const parsedFoodItems = useMemo(() => {
        return lastInputFoodItems.map(item => ({...item, nutriScorePerKg: getNutriValuesPerKg(item)}))
    }, [lastInputFoodItems]);


// User can export Food table as a PDF Document

    const savePDF = async () => {
        const doc = <PdfFoodTable data={parsedFoodItems} />;
        const asBlob = await pdf(doc).toBlob();

        const url = URL.createObjectURL(asBlob);
        window.open(url, '_blank');
    };


    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center', marginTop: '50px'}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "85%"}}>
                    <h2 data-test="test-header" style={{textAlign: "center", paddingBottom: "30px"}}>ADD FOOD INFO</h2>
                    <form style={{
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
                    </form>
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
                alignItems: 'center',
                gap: '20px',
                width: '85%',
                marginBottom: '40px',
            }}>
                <h2 style={{textAlign: "center"}}>LAST FOOD YOU ADDED</h2>
                {lastInputFoodItems.length > 0 ?
                    <FoodTable lastInputFoodItems={parsedFoodItems} />
                    : <h3>Add your first food!</h3>
                }
                {lastInputFoodItems.length > 0 &&<Button style={{alignSelf: 'flex-end'}} variant="outlined" onClick={savePDF}>Export as Pdf</Button> }
            </div>
        </div>
    )
}
