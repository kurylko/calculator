import React, {useCallback, useEffect, useState} from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import {SavedFoodCard} from "../components/SavedFoodCard";
import {useAuth} from "../contexts/authContext/authContext";
import {User as FirebaseUser} from "firebase/auth";
import {IFoodEstimateValues, IFoodItem, IUserFoodItem} from "../interfaces/FoodItem";
import useDeleteProduct from "../hooks/useDeleteProduct";
import {getNutriValuesPerKg} from "../utils/getNutriValues";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SelectChangeEvent} from "@mui/material/Select";
import {EstimateCalculationResult} from "../interfaces/EstimateCalculationResult";
import {SingleProductCheckBox} from "../components/SingleProductCheckBox";
import {EstimateUserFoodInputsForm} from "../components/EstimateUserFoodInputsForm";
import {getCalculateEstimateProducts} from "../utils/getCalculateEstimateProducts";
import {getCalculateSingleEstimateProduct} from "../utils/getCalculateSingleEstimateProduct";
import CalculationResultDisplay from "../components/CalculationResultDisplay";
import CalculationsTable from "../components/CalculationsTable";

export default function MyFoodPage() {
    const [usersFoodList, setUsersFoodList] = useState<IUserFoodItem[]>([]);

    const {data} = useFetchProducts();
    const {deleteProduct} = useDeleteProduct();
    const {currentUser, loading} = useAuth();
    const uid = currentUser?.uid;

    const getUsersAddedFood = useCallback(
        (currentUser: FirebaseUser | null) => {
            let usersAddedFood: IUserFoodItem[] = [];
            if (currentUser !== null) {
                usersAddedFood = data.filter((food) => food.userID === uid);
            } else {
                const localStorageFoodItems =
                    localStorage.getItem("lastInputFoodItems");
                if (localStorageFoodItems) {
                    usersAddedFood = JSON.parse(localStorageFoodItems);
                }
            }
            return usersAddedFood;
        },
        [uid, data],
    );

    useEffect(() => {
        const foodList = getUsersAddedFood(currentUser);
        const filteredFoodList = uid
            ? foodList.filter((food) => food.userID === uid)
            : foodList;
        setUsersFoodList(filteredFoodList);
    }, [currentUser, uid, getUsersAddedFood]);

    const deleteProductFromLocalStorage = (foodItem: IUserFoodItem) => {
        const localStorageFoodItems = localStorage.getItem("lastInputFoodItems");
        const foodItems: IUserFoodItem[] = localStorageFoodItems
            ? JSON.parse(localStorageFoodItems)
            : [];
        const updatedFoodItems = foodItems.filter(
            (item) => item.foodName !== foodItem.foodName,
        );
        localStorage.setItem(
            "lastInputFoodItems",
            JSON.stringify(updatedFoodItems),
        );
        setUsersFoodList(updatedFoodItems);
    };

    const handleDeleteProduct = async (
        foodItem: IUserFoodItem,
    ): Promise<void> => {
        if (foodItem.id) {
            await deleteProduct("products", foodItem);
            const updatedFoodItemsFromDB = getUsersAddedFood(currentUser);
            setUsersFoodList(updatedFoodItemsFromDB);
        }
        if (foodItem.foodName) {
            deleteProductFromLocalStorage(foodItem);
        } else {
            console.error("No ID found for this food item");
        }
    };

    // Calculations logic
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

    const handleSaveResult = () => {
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
        setResult(null);
    };

    // Handle change for single product
    const handleChangeSingleProduct = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setSelectedProduct(value);
    };

    // Handle change for input fields
    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEstimateFoodInputsValues((prev: IFoodEstimateValues) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitCalculation = () => {
        const filledInputsCount = Object.values(estimateFoodInputsValues).filter(
            (value) => (value as string).trim() !== "",
        ).length;
        if (filledInputsCount !== 1) {
            alert("Please fill in only one field to submit.");
            return;
        }

        if (selectedProduct) {
            const singleProductCalculationResult = getCalculateSingleEstimateProduct(
                {
                    selectedProduct,
                    usersFoodList,
                    estimateFoodInputsValues,
                }
            );
            console.log(
                "Single calculation",
                selectedProduct,
                singleProductCalculationResult,
            );
            setResult(singleProductCalculationResult);
        } else {
            const calculationResult = getCalculateEstimateProducts(
                {
                    products,
                    usersFoodList,
                    estimateFoodInputsValues,
                }
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


    // Calculations of user (stored in LS)

    const [userCalculationResults, setUserCalculationResults] = useState<EstimateCalculationResult[]>([]);
    const calculationResults = localStorage.getItem("savedCalculationResults");

    const deleteCalculationFromLocalStorage = (calculationResult: EstimateCalculationResult) => {
        const localStorageCalculations = localStorage.getItem("savedCalculationResults");
        const calculationResults: EstimateCalculationResult[] = localStorageCalculations
            ? JSON.parse(localStorageCalculations)
            : [];
        const updatedCalculationResults = calculationResults.filter(
            (item) => item.calculationId !== calculationResult.calculationId,
        );
        localStorage.setItem(
            "savedCalculationResults",
            JSON.stringify(updatedCalculationResults),
        );
        setUserCalculationResults(updatedCalculationResults);
    };

    const handleDeleteCalculation = async (
        calculationResult: EstimateCalculationResult,
    ): Promise<void> => {
        if (calculationResult.calculationId) {
            await deleteCalculationFromLocalStorage(calculationResult);
            const updatedCalculationResults = localStorage.getItem("savedCalculationResults");
            setUserCalculationResults(updatedCalculationResults ? JSON.parse(updatedCalculationResults) : []);
        } else {
            console.error("No ID found for this calculation result");
        }
    };

    useEffect(() => {
        const parsedResults = calculationResults ? JSON.parse(calculationResults) : [];
       setUserCalculationResults(parsedResults);
    }, [calculationResults]);



    return (
        <Box
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                alignItems: "center",
                paddingTop: "50px",
            }}
        >
            <Box sx={{width: "85%", maxWidth: 700}}>
                <Typography variant="h3">LET'S COUNT A DISH</Typography>
            </Box>
            <Box
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
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
                    <SingleProductCheckBox productNames={productNames} handleChangeSingleProduct={handleChangeSingleProduct} selectedProduct={selectedProduct}/>
                    <EstimateUserFoodInputsForm estimateFoodInputsValues={estimateFoodInputsValues} handleChangeInputs={handleChangeInputs}/>
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
                            onClick={handleSaveResult}
                        >
                            Save the result
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{width: "85%", maxWidth: 700}}>
                <Typography variant="h3">MY FOOD</Typography>
            </Box>
            <Box
                style={{
                    width: "90%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "50px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                    marginBottom: "50px",
                }}
            >
                {!loading &&
                    !!usersFoodList.length &&
                    usersFoodList.map((item) => (
                        <SavedFoodCard
                            key={item.foodName}
                            foodName={item.foodName}
                            fat={item.fat}
                            calories={item.calories}
                            protein={item.protein}
                            carbohydrate={item.carbohydrate}
                            weight={item.weight}
                            onClick={() => handleDeleteProduct(item)}
                            nutriValues={getNutriValuesPerKg(item)}
                        />
                    ))}
            </Box>
            <Box sx={{width: "100%", marginBottom: "50px"}}>
                <Typography variant="h2" sx={{marginBottom: "30px"}}>MY CALCULATIONS</Typography>
                <Box sx={{display: "flex", width: "100%"}}>
                    <CalculationsTable results={userCalculationResults} handleDelete={handleDeleteCalculation}/>
                </Box>
            </Box>
        </Box>
    );
}
