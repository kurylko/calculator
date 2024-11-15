import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../state/userSlice';
import { AppDispatch, RootState } from '../state/store';

const useCurrentUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.user,
  );

  const { uid } = currentUser || {};

  const handleGetUserData = () => dispatch(getCurrentUser());

  useEffect(() => {
      handleGetUserData();
  }, [uid]);

  return { currentUser, handleGetUserData, loading: isLoading, error };
};

export default useCurrentUser;
