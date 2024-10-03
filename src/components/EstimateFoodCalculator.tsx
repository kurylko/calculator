import React, {useState} from "react";
import { Button, TextField } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {IUserFoodItem} from "../interfaces/FoodItem";
import {getNutriValuesPerKg} from "../utils/getNutriValues";

interface EstimateFoodCalculatorProps {
    usersFoodList: IUserFoodItem[]
}

interface IFoodEstimateValues {
    fat?: string,
    protein?: string,
    carbohydrate?: string,
    calories?: string,
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const EstimateFoodCalculator = ({usersFoodList}: EstimateFoodCalculatorProps) => {
    const productNames = usersFoodList.map(item => item.foodName);

    const [products, setProducts] = React.useState<string[]>([]);
    const [estimateFoodInputsValues, setEstimateFoodInputsValues] = useState<IFoodEstimateValues>({
                fat: "",
                protein: "",
                carbohydrate: "",
                calories: "",
            },
    );

    console.log('estimateFoodInputsValues', estimateFoodInputsValues);

    const handleChange = (event: SelectChangeEvent<typeof products>) => {
        const {
            target: {value},
        } = event;
        setProducts(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    function handleChangeInputs (e: React.ChangeEvent<HTMLInputElement>) {
        const { target: { value } = {} } = e;
        setEstimateFoodInputsValues({
            ...estimateFoodInputsValues,
            [e.target.name]: value,
        });
    }

    const handleSubmitCalculation = () => {
        console.log('calculated for:', products);
    }

    console.log('products', products);

    const calculateEstimateProducts = (products: string[], usersFoodList: IUserFoodItem[], estimateFoodInputsValues: IFoodEstimateValues) => {
        const matchingFoods = usersFoodList.filter(item => products.includes(item.foodName));

        const calculateCaloriesOnly = () => {
            const estimateCaloriesNumber = parseFloat(estimateFoodInputsValues.calories as string);
           const valueQ = matchingFoods.forEach((item) => getNutriValuesPerKg(item));
            return (estimateCaloriesNumber)
        };

        if(estimateFoodInputsValues.fat === "" && estimateFoodInputsValues.carbohydrate === "" && estimateFoodInputsValues.protein === "" && estimateFoodInputsValues.calories !== ""){
           return calculateCaloriesOnly;
        }

        return null;

    }

    console.log("11");


  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center",  marginBottom: "50px"}}>
        <FormControl sx={{ m: 1, width: 300, marginLeft: "0" }}>
            <InputLabel id="products-multiple-checkbox-label">Products</InputLabel>
            <Select
                labelId="products-multiple-checkbox-label"
                id="products-multiple-checkbox"
                multiple
                value={products}
                onChange={handleChange}
                input={<OutlinedInput label="Product" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {productNames.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={products.includes(name)} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "50px",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Estimate-fat"
          name="fat"
          value={estimateFoodInputsValues.fat}
          onChange={handleChangeInputs}
        />
        <TextField
          required
          id="outlined-required"
          label="Estimate-protein"
          name="protein"
          value={estimateFoodInputsValues.protein}
          onChange={handleChangeInputs}
        />
        <TextField
          required
          id="outlined-required"
          label="Estimate-carbohydrate"
          name="carbohydrate"
          value={estimateFoodInputsValues.carbohydrate}
          onChange={handleChangeInputs}
        />
          <TextField
              required
              id="outlined-required"
              label="Estimate-calories"
              name="calories"
              value={estimateFoodInputsValues.calories}
              onChange={handleChangeInputs}
          />
      </form>
      <Button
        variant="contained"
        style={{ width: "fit-content", alignSelf: "flex-end" }}
        onClick={() => {
          console.log("submitted");
        }}
      >
        Calculate
      </Button>
    </div>
  );
};

export default EstimateFoodCalculator
