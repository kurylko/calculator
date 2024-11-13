import {useEffect} from 'react';
import { IUserFoodItem } from '../interfaces/FoodItem';
import {AppDispatch, RootState} from "../state/store";
import {useDispatch, useSelector} from "react-redux";
import { deleteFoodItem} from "../state/foodCollectionSlice";

const useDeleteProduct = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading } = useSelector(
      (state: RootState) => state.foodCollection,
  );

  return { data, loading: isLoading };
};

export default useDeleteProduct;
