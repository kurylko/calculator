import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../state/userSlice';
import { AppDispatch, RootState } from '../state/store';

const useCurrentUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.user,
  );
  const uid = currentUser?.uid;

  useEffect(() => {
    if (uid) {
      console.log('currentUser:', currentUser);
      dispatch(getCurrentUser);
    }
  }, [uid]);

  return { currentUser, loading: isLoading, error };
};

export default useCurrentUser;
