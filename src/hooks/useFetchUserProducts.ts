import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFoodItems } from '../state/foodCollectionSlice';
import { AppDispatch, RootState } from '../state/store';

const useFetchUserProducts = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (state: RootState) => state.foodCollection,
  );
  const { currentUser } = useSelector((state: RootState) => state.user);
  const uid = currentUser?.uid;

  useEffect(() => {
    if (uid) {
      dispatch(fetchUserFoodItems(uid));
    }
  }, [uid]);

  return { data, loading: isLoading };
};

export default useFetchUserProducts;
