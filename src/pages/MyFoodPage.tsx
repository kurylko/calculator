import React, { useCallback, useEffect, useState } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import { SavedFoodCard } from "../components/SavedFoodCard";
import { useAuth } from "../contexts/authContext/authContext";
import { User as FirebaseUser } from "firebase/auth";
import { IUserFoodItem } from "../interfaces/FoodItem";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { TextField } from "@mui/material";
import EstimateFoodCalculator from "../components/EstimateFoodCalculator";

export default function MyFoodPage() {
  const [usersFoodList, setUsersFoodList] = useState<IUserFoodItem[]>([]);

  const { data } = useFetchProducts();
  const { deleteProduct } = useDeleteProduct();
  const { currentUser, loading } = useAuth();
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

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        alignItems: "center",
        marginTop: "50px",
        marginLeft: "50px",
      }}
    >
      <h1>LET'S COUNT A DISH</h1>
      <div style={{ width: "100%", display: "flex" }}>
        <EstimateFoodCalculator usersFoodList={usersFoodList} />
      </div>
      <h1>MY FOOD </h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          alignItems: "center",
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
            />
          ))}
      </div>
    </div>
  );
}
