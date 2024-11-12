import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { IUserFoodItem } from '../interfaces/FoodItem';

const usePostProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postProduct = async (collectionName: string, data: IUserFoodItem) => {
    setLoading(true);
    setError(null);

    try {
      const colRef = collection(db, 'products');
      const docRef = await addDoc(colRef, data);

      console.log('Document written with ID: ', docRef.id);
      return { ...data, id: docRef.id };
    } catch (err) {
      const errorMessage = (err as Error).message || 'An error occurred';
      console.error('Error adding document: ', err);
      setError(errorMessage);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postProduct, error };
};

export default usePostProduct;
