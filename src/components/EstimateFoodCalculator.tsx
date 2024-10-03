import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { IUserFoodItem } from "../interfaces/FoodItem";
import { getNutriValuesPerKg } from "../utils/getNutriValues";
import CalculationResultDisplay from "./CalculationResultDisplay";
import Typography from "@mui/material/Typography";

interface EstimateFoodCalculatorProps {
  usersFoodList: IUserFoodItem[];
}

interface IFoodEstimateValues {
  fat?: string;
  protein?: string;
  carbohydrate?: string;
  calories?: string;
}
export interface EstimateCalculationResult {
  foodName: string;
  fat?: string;
  protein?: string;
  carbohydrate?: string;
  calories?: string;
  weight: string;
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

const EstimateFoodCalculator = ({
  usersFoodList,
}: EstimateFoodCalculatorProps) => {
  const productNames = usersFoodList.map((item) => item.foodName);

  const [estimateFoodInputsValues, setEstimateFoodInputsValues] =
    useState<IFoodEstimateValues>({
      fat: "",
      protein: "",
      carbohydrate: "",
      calories: "",
    });

  // Dropdown with products //
  const [products, setProducts] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof products>) => {
    const {
      target: { value },
    } = event;
    setProducts(typeof value === "string" ? value.split(",") : value);
  };

  // Inputs with estimate nutrition values //

  function handleChangeInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const { target: { value } = {} } = e;
    setEstimateFoodInputsValues({
      ...estimateFoodInputsValues,
      [e.target.name]: value,
    });
  }

  // For calculations result //

  const [result, setResult] = useState<EstimateCalculationResult | null>(null);

  const handleSubmitCalculation = () => {
    const calculationResult = getCalculateEstimateProducts(
      products,
      usersFoodList,
      estimateFoodInputsValues,
    );
    console.log("calculated for:", products, result);
    setEstimateFoodInputsValues({
      fat: "",
      protein: "",
      carbohydrate: "",
      calories: "",
    });
    setResult(calculationResult);
  };

  console.log("result", result);

  // My calculations //

  function getCalculateEstimateProducts(
    products: string[],
    usersFoodList: IUserFoodItem[],
    estimateFoodInputsValues: IFoodEstimateValues,
  ): EstimateCalculationResult | null {
    const matchingFoods = usersFoodList.filter((item) =>
      products.includes(item.foodName),
    );

    const calculateCaloriesOnly = (): EstimateCalculationResult => {
      const estimateCaloriesNumber = parseFloat(
        estimateFoodInputsValues.calories as string,
      );

      const caloriesCalculated = matchingFoods.reduce(
        (totalCaloriesPerKg, item) => {
          const nutriValues = getNutriValuesPerKg(item);
          if (nutriValues) {
            const valuesPerKg = {
              fatValue: parseFloat(nutriValues.fatValuePerKg),
              proteinValue: parseFloat(nutriValues.proteinValuePerKg),
              carbohydrateValue: parseFloat(nutriValues.carbohydrateValuePerKg),
              caloriesValue: parseFloat(nutriValues.caloriesValuePerKg),
            };
            return (
              totalCaloriesPerKg +
              (isNaN(valuesPerKg.caloriesValue) ? 0 : valuesPerKg.caloriesValue)
            );
          }
          return totalCaloriesPerKg;
        },
        0,
      );

      const calculatedWeight = Math.round(
        (estimateCaloriesNumber / caloriesCalculated) * 1000,
      );

      const calculateFat = Math.round(
        (estimateCaloriesNumber / caloriesCalculated) * 1000,
      );

      //const valuesPerEstimateCalories = (nutriValues);

      const result: EstimateCalculationResult = {
        foodName: products.join(" "),
        fat: "",
        protein: "",
        carbohydrate: "",
        calories: caloriesCalculated.toString(),
        weight: `${calculatedWeight.toString()}g`,
      };

      return result;
    };

    if (
      estimateFoodInputsValues.fat === "" &&
      estimateFoodInputsValues.carbohydrate === "" &&
      estimateFoodInputsValues.protein === "" &&
      estimateFoodInputsValues.calories !== ""
    ) {
      return calculateCaloriesOnly();
    }

    return null;
  }

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "50px",
      }}
    >
      <FormControl sx={{ m: 1, width: 300, marginLeft: "0" }}>
        <InputLabel id="products-multiple-checkbox-label">Products</InputLabel>
        <Select
          labelId="products-multiple-checkbox-label"
          id="products-multiple-checkbox"
          multiple
          value={products}
          onChange={handleChange}
          input={<OutlinedInput label="Product" />}
          renderValue={(selected) => selected.join(", ")}
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
          id="outlined-required"
          label="Estimate-fat,g"
          name="fat"
          value={estimateFoodInputsValues.fat}
          onChange={handleChangeInputs}
        />
        <TextField
          id="outlined-required"
          label="Estimate-protein,g"
          name="protein"
          value={estimateFoodInputsValues.protein}
          onChange={handleChangeInputs}
        />
        <TextField
          id="outlined-required"
          label="Estimate-carbohydrate"
          name="carbohydrate,g"
          value={estimateFoodInputsValues.carbohydrate}
          onChange={handleChangeInputs}
        />
        <TextField
          id="outlined-required"
          label="Estimate-kcal"
          name="calories"
          value={estimateFoodInputsValues.calories}
          onChange={handleChangeInputs}
        />
      </form>
      <Button
        variant="contained"
        style={{ width: "fit-content", alignSelf: "flex-end" }}
        onClick={handleSubmitCalculation}
      >
        Calculate
      </Button>
      <Typography variant="h5" component="div" sx={{ marginBottom: "20px" }}>
        {`Calculated nutrition values of ${products} (for ${result?.calories} kcal):`}
      </Typography>
      <CalculationResultDisplay result={result} />
    </div>
  );
};

export default EstimateFoodCalculator;
