import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { IUserFoodItem } from '../interfaces/FoodItem';

const usePostProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postProduct = async (collectionName: string, data: IUserFoodItem) => {
    setLoading(true);
    setError(null);

    const colRef = collection(db, 'products');

    addDoc(colRef, data)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((err) => {
        console.error('Error adding document: ', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(false);
  };

  return { loading, postProduct, error };
};

export default usePostProduct;
