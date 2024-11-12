import { useEffect } from 'react';
import { useAuth } from '../contexts/authContext/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFoodItems } from '../state/foodCollectionSlice';
import { AppDispatch, AppStore, RootState } from '../state/store';

const useFetchUserProducts = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (state: RootState) => state.foodCollection,
  );
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  useEffect(() => {
    if (uid) {
      dispatch(fetchUserFoodItems(uid));
    }
  }, [uid]);

  return { data, loading: isLoading };
};

export default useFetchUserProducts;
