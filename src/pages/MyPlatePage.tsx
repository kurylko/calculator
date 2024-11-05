import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SegmentedProgressBar} from "../components/SegmentedProgressBar";
import {SingleProductCheckBox} from "../components/SingleProductCheckBox";
import {IFoodEstimateValues, IFoodItem, IUserFoodItem} from "../interfaces/FoodItem";
import {User as FirebaseUser} from "@firebase/auth";
import useFetchProducts from "../hooks/useFetchProducts";
import {useAuth} from "../contexts/authContext/authContext";
import {SelectChangeEvent} from "@mui/material/Select";
import {EstimateUserFoodInputsForm} from "../components/EstimateUserFoodInputsForm";
import {getCalculateSingleEstimateProduct} from "../utils/getCalculateSingleEstimateProduct";
import {getCalculateEstimateProducts} from "../utils/getCalculateEstimateProducts";
import {EstimateCalculationResult} from "../interfaces/EstimateCalculationResult";
import CalculationResultDisplay from "../components/CalculationResultDisplay";
import PlateNutrients from "../components/PlateNutrients";

export type TotalPlate = {
    calories: string;
    carbohydrate: string;
    fat: string;
    protein: string;
    weight: string;
};

export default  function MyPlatePage() {
    const [usersFoodList, setUsersFoodList] = useState<IUserFoodItem[]>([]);
    const [progress, setProgress] = useState<number>(10);

    const { data } = useFetchProducts();
    const { currentUser, loading } = useAuth();
    const uid = currentUser?.uid;

    const getUsersAddedFood = useCallback(
        (currentUser: FirebaseUser | null) => {
            let usersAddedFood: IUserFoodItem[] = [];
            if (currentUser !== null) {
                usersAddedFood = data.filter((food) => food.userID === uid);
            } else {
                const localStorageFoodItems =
                    localStorage.getItem('lastInputFoodItems');
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

    const productNames = usersFoodList.map((item: IFoodItem) => item.foodName);
    const [selectedProduct, setSelectedProduct] = useState<string>('');

    const handleChangeSingleProduct = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setSelectedProduct(value);
    };

    const [estimateFoodInputsValues, setEstimateFoodInputsValues] =
        useState<IFoodEstimateValues>({
            fat: '',
            protein: '',
            carbohydrate: '',
            calories: '',
        });
    const [products, setProducts] = useState<string[]>([]);
    const [result, setResult] = useState<EstimateCalculationResult | null>(null);

    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEstimateFoodInputsValues((prev: IFoodEstimateValues) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitCalculation = () => {
        const filledInputsCount = Object.values(estimateFoodInputsValues).filter(
            (value) => (value as string).trim() !== '',
        ).length;
        if (filledInputsCount !== 1) {
            alert('Please fill in only one field to submit.');
            return;
        }

        if (selectedProduct) {
            const singleProductCalculationResult = getCalculateSingleEstimateProduct({
                selectedProduct,
                usersFoodList,
                estimateFoodInputsValues,
            });
            console.log(
                'Single calculation',
                selectedProduct,
                singleProductCalculationResult,
            );
            setResult(singleProductCalculationResult);
        } else {
            const calculationResult = getCalculateEstimateProducts({
                products,
                usersFoodList,
                estimateFoodInputsValues,
            });
            setEstimateFoodInputsValues({
                fat: '',
                protein: '',
                carbohydrate: '',
                calories: '',
            });
            console.log('Multiple calculation', setProducts(products));
            setResult(calculationResult);
        }
    };

    const [userCalculationResults, setUserCalculationResults] = useState<
        EstimateCalculationResult[]
    >([]);
    const plateCalculationResults = localStorage.getItem('plate') ?? "[]";
    const parsedPlate = JSON.parse(plateCalculationResults);
    console.log("plateCalculationResults", typeof plateCalculationResults);

    const plateTotalToDisplay : TotalPlate = parsedPlate.reduce((accumulator: TotalPlate, item : EstimateCalculationResult) => {
        return {
            calories: (parseFloat(accumulator.calories) + parseFloat(item.calories ?? "0")).toString(),
            carbohydrate: (parseFloat(accumulator.carbohydrate) + parseFloat(item.carbohydrate ?? "0")).toString(),
            fat: (parseFloat(accumulator.fat) + parseFloat(item.fat ?? "0")).toString(),
            protein: (parseFloat(accumulator.protein) + parseFloat(item.protein ?? "0")).toString(),
            weight: (parseFloat(accumulator.weight) + parseFloat(item.weight ?? "0")).toString()
        };
    }, {calories: "0", carbohydrate: "0", fat: "0", protein: "0", weight: "0"})

    const handleAddToPlate = () => {
        if (!result) {
            return;
        }

        setUserCalculationResults((prevResults) => {
            const updatedResults = [...prevResults, result];
            localStorage.setItem(
                'plate',
                JSON.stringify(updatedResults),
            );
            console.log('Item saved:', updatedResults);
            console.log('saved:', userCalculationResults);
            return updatedResults;
        });
        setResult(null);
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setProgress(prev => (prev < 100 ? prev + 1 : 0));
    //     }, 100); // Increase progress by 1% every 0.1 seconds
    //
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <Box
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
                alignItems: 'center',
                paddingTop: '50px',
            }}
        >
            <Box sx={{ width: '85%', maxWidth: 700 }}>
                <Typography variant="h3">LET'S COUNT A DISH</Typography>
            </Box>
            <Container sx={{width: "70%", display: "flex",  justifyContent: "space-between"}}>
                <SegmentedProgressBar progress={progress} />
                <PlateNutrients plateTotalToDisplay={plateTotalToDisplay} />
            </Container>
            <SingleProductCheckBox
                productNames={productNames}
                handleChangeSingleProduct={handleChangeSingleProduct}
                selectedProduct={selectedProduct}
            />
            <EstimateUserFoodInputsForm
                estimateFoodInputsValues={estimateFoodInputsValues}
                handleChangeInputs={handleChangeInputs}
            />
            <Button
                variant="contained"
                onClick={handleSubmitCalculation}
                sx={{
                    width: 'fit-content',
                    alignSelf: {
                        xs: 'center',
                        sm: 'center',
                        md: 'flex-end',
                        lg: 'flex-end',
                    },
                }}
            >
                Calculate
            </Button>
            <CalculationResultDisplay result={result} />
            {result && (
                <Button
                    sx={{ marginTop: '30px' }}
                    variant="outlined"
                    onClick={handleAddToPlate}
                >
                   Add to the plate
                </Button>
            )}
        </Box>
    )
}
