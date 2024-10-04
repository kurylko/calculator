import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { IUserFoodItem } from "../interfaces/FoodItem";
import { getNutriValuesPerKg } from "../utils/getNutriValues";
import CalculationResultDisplay from "./CalculationResultDisplay";

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

export const EstimateFoodCalculator: React.FC<EstimateFoodCalculatorProps> = ({
  usersFoodList,
}) => {
  const productNames = usersFoodList.map((item) => item.foodName);

  const [estimateFoodInputsValues, setEstimateFoodInputsValues] =
    useState<IFoodEstimateValues>({
      fat: "",
      protein: "",
      carbohydrate: "",
      calories: "",
    });

  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [products, setProducts] = useState<string[]>([]);
  const [result, setResult] = useState<EstimateCalculationResult | null>(null);

  // Handle change for single product
  const handleChangeSingleProduct = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedProduct(value);
  };

  // Handle change for multiple products
  const handleChangeMultipleProducts = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setProducts(typeof value === "string" ? value.split(",") : value);
  };

  // Handle change for input fields
  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEstimateFoodInputsValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate single product nutrition estimate
  const getCalculateSingleEstimateProduct = (
    selectedProduct: string,
    usersFoodList: IUserFoodItem[],
    estimateFoodInputsValues: IFoodEstimateValues,
  ): EstimateCalculationResult | null => {
    const matchedProduct = usersFoodList.find(
      (item) => item.foodName === selectedProduct,
    );

    if (matchedProduct) {
      const nutriValues = getNutriValuesPerKg(matchedProduct);
      if (nutriValues) {
        const caloriesValue = parseFloat(nutriValues.caloriesValuePerKg);

        const calculatedWeight = Math.round(
          (parseFloat(estimateFoodInputsValues.calories as string) /
            caloriesValue) *
            1000,
        );

        return {
          foodName: selectedProduct,
          fat: nutriValues.fatValuePerKg,
          protein: nutriValues.proteinValuePerKg,
          carbohydrate: nutriValues.carbohydrateValuePerKg,
          calories: estimateFoodInputsValues.calories,
          weight: `${calculatedWeight}g`,
        };
      }
    }

    return null;
  };

  // Calculate multiple products
  const getCalculateEstimateProducts = (
    products: string[],
    usersFoodList: IUserFoodItem[],
    estimateFoodInputsValues: IFoodEstimateValues,
  ): EstimateCalculationResult | null => {
    const matchingFoods = usersFoodList.filter((item) =>
      products.includes(item.foodName),
    );

    const calculateCaloriesOnly = (): EstimateCalculationResult => {
      const estimateCaloriesNumber = parseFloat(
        estimateFoodInputsValues.calories as string,
      );

      const forOnlyCaloriesCalculated = matchingFoods.reduce(
        (totalValuesPerKg, item) => {
          const nutriValues = getNutriValuesPerKg(item);
          if (nutriValues) {
            const valuesPerKg = {
              caloriesValue: parseFloat(nutriValues.caloriesValuePerKg),
            };
            return (
              totalValuesPerKg +
              (isNaN(valuesPerKg.caloriesValue) ? 0 : valuesPerKg.caloriesValue)
            );
          }
          return totalValuesPerKg;
        },
        0,
      );

      const calculatedWeight = Math.round(
        (estimateCaloriesNumber / forOnlyCaloriesCalculated) * 1000,
      );

      return {
        foodName: products.join(", "),
        fat: "",
        protein: "",
        carbohydrate: "",
        calories: estimateCaloriesNumber.toString(),
        weight: `${calculatedWeight}g`,
      };
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
  };

  // Handle form submission for calculation
  const handleSubmitCalculation = () => {
    if (selectedProduct) {
      const singleProductCalculationResult = getCalculateSingleEstimateProduct(
        selectedProduct,
        usersFoodList,
        estimateFoodInputsValues,
      );
      setResult(singleProductCalculationResult);
    } else {
      const calculationResult = getCalculateEstimateProducts(
        products,
        usersFoodList,
        estimateFoodInputsValues,
      );
      setEstimateFoodInputsValues({
        fat: "",
        protein: "",
        carbohydrate: "",
        calories: "",
      });
      setResult(calculationResult);
    }
  };

  return (
    <div style={{ width: "80%", marginBottom: "50px" }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="products-single-checkbox-label">
          Pick one Product
        </InputLabel>
        <Select
          labelId="products-single-checkbox-label"
          id="products-single-checkbox"
          value={selectedProduct}
          onChange={handleChangeSingleProduct}
          input={<OutlinedInput label="Product" />}
          MenuProps={MenuProps}
        >
          {productNames.map((product) => (
            <MenuItem key={product} value={product}>
              {product}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="products-multiple-checkbox-label">
          Pick multiple Products
        </InputLabel>
        <Select
          labelId="products-multiple-checkbox-label"
          id="products-multiple-checkbox"
          multiple
          value={products}
          onChange={handleChangeMultipleProducts}
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
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "50px",
        }}
      >
        <TextField
          id="outlined-required"
          label="Estimate-fat, g"
          name="fat"
          value={estimateFoodInputsValues.fat}
          onChange={handleChangeInputs}
        />
        <TextField
          id="outlined-required"
          label="Estimate-protein, g"
          name="protein"
          value={estimateFoodInputsValues.protein}
          onChange={handleChangeInputs}
        />
        <TextField
          id="outlined-required"
          label="Estimate-carbohydrate, g"
          name="carbohydrate"
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
        onClick={handleSubmitCalculation}
        style={{ width: "fit-content", alignSelf: "flex-end" }}
      >
        Calculate
      </Button>

      <Typography variant="h5" component="div" sx={{ marginBottom: "20px" }}>
        Calculated nutrition values of {products.join(", ")} (for{" "}
        {result?.calories} kcal):
      </Typography>

      <CalculationResultDisplay result={result} />
    </div>
  );
};