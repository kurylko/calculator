import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {IFoodEstimateValues, IFoodItem, IUserFoodItem} from "../interfaces/FoodItem";
import { getNutriValuesPerKg } from "../utils/getNutriValues";
import CalculationResultDisplay from "./CalculationResultDisplay";
import {SingleProductCheckBox} from "./SingleProductCheckBox";
import {EstimateCalculationResult} from "../interfaces/EstimateCalculationResult";

interface EstimateFoodCalculatorProps {
  usersFoodList: IUserFoodItem[];
  userCalculationResults: EstimateCalculationResult[];
  setUserCalculationResults: React.Dispatch<
    React.SetStateAction<EstimateCalculationResult[]>
  >;
}

// export interface IFoodEstimateValues {
//   fat?: string;
//   protein?: string;
//   carbohydrate?: string;
//   calories?: string;
// }

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

export const EstimateFoodCalculator = ({
  usersFoodList,
  userCalculationResults,
  setUserCalculationResults,
}:  EstimateFoodCalculatorProps) => {
  const productNames = usersFoodList.map((item: IFoodItem) => item.foodName);

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

  // Array of calculation results in LocalStorage

  // const [savedResults, setSavedResults] = useState<EstimateCalculationResult[]>(
  //   () => {
  //     const savedResults = localStorage.getItem("savedCalculationResults");
  //     return savedResults ? JSON.parse(savedResults) : [];
  //   },
  // );

  const handleAddResult = () => {
    if (!result) {
      return;
    }

    setUserCalculationResults((prevResults) => {
        const updatedResults = [...prevResults, result];
        localStorage.setItem("savedCalculationResults", JSON.stringify(updatedResults));
        console.log('Item saved:', updatedResults);
        console.log("saved:", userCalculationResults);
        return updatedResults;
    });

  //   setSavedResults((prevResults) => {
  //     const updatedResults = [...prevResults, result];
  //     localStorage.setItem(
  //       "savedCalculationResults",
  //       JSON.stringify(updatedResults),
  //     );
  //     console.log("Item saved:", updatedResults);
  //     console.log("saved:", savedResults);
  //     return updatedResults;
  //   });
  //   setResult(null);
   };

  // Handle change for single product
  const handleChangeSingleProduct = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedProduct(value);
  };

  // Handle change for multiple products
  // const handleChangeMultipleProducts = (event: SelectChangeEvent<string[]>) => {
  //   const value = event.target.value;
  //   setProducts(typeof value === "string" ? value.split(",") : value);
  // };

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

    if (!matchedProduct) {
      return null;
    }

    const nutriValues = getNutriValuesPerKg(matchedProduct);
    if (!nutriValues) {
      return null;
    }

    const calculateForEstimateCalories = () => {
      const caloriesValue = parseFloat(nutriValues.caloriesValuePerKg);
      const calculatedWeight = Math.round(
        (parseFloat(estimateFoodInputsValues.calories as string) /
          caloriesValue) *
          1000,
      );
      const calculatedFat = Math.round(
        (parseFloat(nutriValues.fatValuePerKg) / 10000) * calculatedWeight,
      );
      const calculatedProtein = Math.round(
        (parseFloat(nutriValues.proteinValuePerKg) / 10000) * calculatedWeight,
      );
      const calculatedCarbohydrate = Math.round(
        (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
          calculatedWeight,
      );

      return {
        calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
        foodName: selectedProduct,
        fat: `${calculatedFat}`,
        protein: `${calculatedProtein}`,
        carbohydrate: `${calculatedCarbohydrate}`,
        calories: estimateFoodInputsValues.calories,
        weight: `${calculatedWeight}`,
      };
    };

    const calculateForEstimateFat = () => {
      const fatValue = parseFloat(nutriValues.fatValuePerKg);
      const calculatedWeight = Math.round(
        (parseFloat(estimateFoodInputsValues.fat as string) / fatValue) * 1000,
      );
      const calculatedProtein = Math.round(
        (parseFloat(nutriValues.proteinValuePerKg) / 10000) * calculatedWeight,
      );
      const calculatedCarbohydrate = Math.round(
        (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
          calculatedWeight,
      );
      const calculatedCalories = Math.round(
        (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
          calculatedWeight,
      );
      return {
        calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
        foodName: selectedProduct,
        fat: estimateFoodInputsValues.fat,
        protein: `${calculatedProtein}`,
        carbohydrate: `${calculatedCarbohydrate}`,
        calories: `${calculatedCalories}`,
        weight: `${calculatedWeight}`,
      };
    };

    const calculateForEstimateProtein = () => {
      const proteinValue = parseFloat(nutriValues.proteinValuePerKg);
      const calculatedWeight = Math.round(
        (parseFloat(estimateFoodInputsValues.protein as string) /
          proteinValue) *
          1000,
      );
      const calculatedFat = Math.round(
        (parseFloat(nutriValues.fatValuePerKg) / 10000) * calculatedWeight,
      );
      const calculatedCarbohydrate = Math.round(
        (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
          calculatedWeight,
      );
      const calculatedCalories = Math.round(
        (parseFloat(nutriValues.carbohydrateValuePerKg) / 10000) *
          calculatedWeight,
      );
      return {
        calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
        foodName: selectedProduct,
        fat: `${calculatedFat}`,
        protein: estimateFoodInputsValues.protein,
        carbohydrate: `${calculatedCarbohydrate}`,
        calories: `${calculatedCalories}`,
        weight: `${calculatedWeight}`,
      };
    };

    const calculateForEstimateCarbohydrate = () => {
      const carbohydrateValue = parseFloat(nutriValues.carbohydrateValuePerKg);
      const calculatedWeight = Math.round(
        (parseFloat(estimateFoodInputsValues.carbohydrate as string) /
          carbohydrateValue) *
          1000,
      );
      const calculatedFat = Math.round(
        (parseFloat(nutriValues.fatValuePerKg) / 10000) * calculatedWeight,
      );
      const calculatedProtein = Math.round(
        (parseFloat(nutriValues.proteinValuePerKg) / 10000) * calculatedWeight,
      );
      const calculatedCalories = Math.round(
        (parseFloat(nutriValues.caloriesValuePerKg) / 10000) * calculatedWeight,
      );
      return {
        calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
        foodName: selectedProduct,
        fat: `${calculatedFat}`,
        protein: `${calculatedProtein}`,
        carbohydrate: estimateFoodInputsValues.carbohydrate,
        calories: `${calculatedCalories}`,
        weight: `${calculatedWeight}`,
      };
    };

    if (
      estimateFoodInputsValues.fat !== "" &&
      estimateFoodInputsValues.carbohydrate === "" &&
      estimateFoodInputsValues.protein === "" &&
      estimateFoodInputsValues.calories === ""
    ) {
      return calculateForEstimateFat();
    } else if (
      estimateFoodInputsValues.fat === "" &&
      estimateFoodInputsValues.carbohydrate !== "" &&
      estimateFoodInputsValues.protein === "" &&
      estimateFoodInputsValues.calories === ""
    ) {
      return calculateForEstimateCarbohydrate();
    } else if (
      estimateFoodInputsValues.fat === "" &&
      estimateFoodInputsValues.carbohydrate === "" &&
      estimateFoodInputsValues.protein !== "" &&
      estimateFoodInputsValues.calories === ""
    ) {
      return calculateForEstimateProtein();
    } else if (
      estimateFoodInputsValues.fat === "" &&
      estimateFoodInputsValues.carbohydrate === "" &&
      estimateFoodInputsValues.protein === "" &&
      estimateFoodInputsValues.calories !== ""
    ) {
      return calculateForEstimateCalories();
    }

    return {
      calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
      foodName: selectedProduct,
      fat: "N/A",
      protein: "N/A",
      carbohydrate: "N/A",
      calories: "N/A",
      weight: "N/A",
    };
  };

  // Calculate multiple products
  // const getCalculateEstimateProducts = (
  //   products: string[],
  //   usersFoodList: IUserFoodItem[],
  //   estimateFoodInputsValues: IFoodEstimateValues,
  // ): EstimateCalculationResult | null => {
  //   const matchingFoods = usersFoodList.filter((item) =>
  //     products.includes(item.foodName),
  //   );
  //
  //   const calculateCaloriesOnly = (): EstimateCalculationResult => {
  //     const estimateCaloriesNumber = parseFloat(
  //       estimateFoodInputsValues.calories as string,
  //     );
  //
  //     const forOnlyCaloriesCalculated = matchingFoods.reduce(
  //       (totalValuesPerKg, item) => {
  //         const nutriValues = getNutriValuesPerKg(item);
  //         if (nutriValues) {
  //           const valuesPerKg = {
  //             caloriesValue: parseFloat(nutriValues.caloriesValuePerKg),
  //           };
  //           return (
  //             totalValuesPerKg +
  //             (isNaN(valuesPerKg.caloriesValue) ? 0 : valuesPerKg.caloriesValue)
  //           );
  //         }
  //         return totalValuesPerKg;
  //       },
  //       0,
  //     );
  //
  //     const calculatedWeight = Math.round(
  //       (estimateCaloriesNumber / forOnlyCaloriesCalculated) * 1000,
  //     );
  //
  //     return {
  //       calculationId: (Math.floor(Math.random() * 1000) + 1).toString(),
  //       foodName: products.join(", "),
  //       fat: "",
  //       protein: "",
  //       carbohydrate: "",
  //       calories: estimateCaloriesNumber.toString(),
  //       weight: `${calculatedWeight}g`,
  //     };
  //   };
  //
  //   if (
  //     estimateFoodInputsValues.fat === "" &&
  //     estimateFoodInputsValues.carbohydrate === "" &&
  //     estimateFoodInputsValues.protein === "" &&
  //     estimateFoodInputsValues.calories !== ""
  //   ) {
  //     return calculateCaloriesOnly();
  //   }
  //
  //   return null;
  // };

  // Handle form submission for calculation

  const handleSubmitCalculation = () => {
    const filledInputsCount = Object.values(estimateFoodInputsValues).filter(
      (value) => value.trim() !== "",
    ).length;
    if (filledInputsCount !== 1) {
      alert("Please fill in only one field to submit.");
      return;
    }

    if (selectedProduct) {
      const singleProductCalculationResult = getCalculateSingleEstimateProduct(
        selectedProduct,
        usersFoodList,
        estimateFoodInputsValues,
      );
      console.log(
        "Single calculation",
        selectedProduct,
        singleProductCalculationResult,
      );
      setResult(singleProductCalculationResult);
    } else {
      const calculationResult = getCalculateSingleEstimateProduct(
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
      console.log("Multiple calculation", setProducts(products));
      setResult(calculationResult);
    }
  };

  return (
    <Box
      sx={{
        marginBottom: "50px",
        display: "flex",
        flexDirection: "column",
        width: { xs: "90%", sm: "90%", md: "85%", lg: "85%" },
        alignItems: {
          xs: "center",
          sm: "center",
          md: "flex-start",
          lg: "flex-start",
        },
      }}
    >
      {/*<FormControl*/}
      {/*  sx={{*/}
      {/*    m: 1,*/}
      {/*    margin: "0",*/}
      {/*    width: {*/}
      {/*      xs: "90%",*/}
      {/*      sm: "90%",*/}
      {/*      md: "35%",*/}
      {/*      lg: "300px",*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <InputLabel id="products-single-checkbox-label">*/}
      {/*    Pick one Product*/}
      {/*  </InputLabel>*/}
      {/*  <Select*/}
      {/*    labelId="products-single-checkbox-label"*/}
      {/*    label="Pick one Product"*/}
      {/*    id="products-single-checkbox"*/}
      {/*    value={selectedProduct}*/}
      {/*    onChange={handleChangeSingleProduct}*/}
      {/*    input={<OutlinedInput label="Pick one Product" />}*/}
      {/*    MenuProps={MenuProps}*/}
      {/*  >*/}
      {/*    {productNames.map((product: string) => (*/}
      {/*      <MenuItem key={product} value={product}>*/}
      {/*        {product}*/}
      {/*      </MenuItem>*/}
      {/*    ))}*/}
      {/*  </Select>*/}
      {/*</FormControl>*/}

      <SingleProductCheckBox productNames={productNames} handleChangeSingleProduct={handleChangeSingleProduct} selectedProduct={selectedProduct}/>

      {/*<FormControl sx={{ m: 1, width: 300 }}>*/}
      {/*  <InputLabel id="products-multiple-checkbox-label">*/}
      {/*    Pick multiple Products*/}
      {/*  </InputLabel>*/}
      {/*  <Select*/}
      {/*    labelId="products-multiple-checkbox-label"*/}
      {/*    id="products-multiple-checkbox"*/}
      {/*    multiple*/}
      {/*    value={products}*/}
      {/*    onChange={handleChangeMultipleProducts}*/}
      {/*    input={<OutlinedInput label="Product" />}*/}
      {/*    renderValue={(selected) => selected.join(", ")}*/}
      {/*    MenuProps={MenuProps}*/}
      {/*  >*/}
      {/*    {productNames.map((name) => (*/}
      {/*      <MenuItem key={name} value={name}>*/}
      {/*        <Checkbox checked={products.includes(name)} />*/}
      {/*        <ListItemText primary={name} />*/}
      {/*      </MenuItem>*/}
      {/*    ))}*/}
      {/*  </Select>*/}
      {/*</FormControl>*/}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "50px",
          width: "100%",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
            lg: "flex-start",
          },
        }}
      >
        <TextField
          id="outlined-required"
          label="Estimate-fat, g"
          name="fat"
          value={estimateFoodInputsValues.fat}
          onChange={handleChangeInputs}
          sx={{ width: { xs: "90%", sm: "45%", md: "20%", lg: "20%" } }}
        />
        <TextField
          id="outlined-required"
          label="Estimate-protein, g"
          name="protein"
          value={estimateFoodInputsValues.protein}
          onChange={handleChangeInputs}
          sx={{ width: { xs: "90%", sm: "45%", md: "20%", lg: "20%" } }}
        />
        <TextField
          id="outlined-required"
          label="Estimate-carbohydrate, g"
          name="carbohydrate"
          value={estimateFoodInputsValues.carbohydrate}
          onChange={handleChangeInputs}
          sx={{ width: { xs: "90%", sm: "45%", md: "20%", lg: "20%" } }}
        />
        <TextField
          id="outlined-required"
          label="Estimate-kcal"
          name="calories"
          value={estimateFoodInputsValues.calories}
          onChange={handleChangeInputs}
          sx={{ width: { xs: "90%", sm: "45%", md: "20%", lg: "20%" } }}
        />
      </Box>

      <Button
        variant="contained"
        onClick={handleSubmitCalculation}
        sx={{
          width: "fit-content",
          alignSelf: {
            xs: "center",
            sm: "center",
            md: "flex-end",
            lg: "flex-end",
          },
        }}
      >
        Calculate
      </Button>
      {result && (
        <Typography
          variant="h5"
          component="div"
          sx={{ marginBottom: "20px", marginTop: "30px", alignSelf: "center" }}
        >
          {selectedProduct
            ? `Calculated nutrition values of ${selectedProduct}`
            : `Calculated nutrition values of ${products.join(", ")}`}
        </Typography>
      )}
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <CalculationResultDisplay result={result} />
        <Button
          sx={{ marginTop: "30px" }}
          variant="outlined"
          onClick={handleAddResult}
        >
          Save the result
        </Button>
      </Box>
    </Box>
  );
};
