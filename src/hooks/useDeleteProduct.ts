import {useState} from 'react';
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '../firebase';
import {IUserFoodItem} from "../interfaces/FoodItem";

const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);


    const deleteProduct = async (collectionName: string, data: IUserFoodItem) => {
        setLoading(true);
        setError(null);

        if (!data.id) {
            setError(new Error("Product ID is missing"));
            setLoading(false);
            return;
        }


        try {
            const docRef = doc(db, collectionName, data.id);
            await deleteDoc(docRef);
            console.log("Product deleted with ID: ", docRef.id);
        } catch (err) {
            console.error("Error deleting document: ", err);
            setError(err as Error);
        } finally {
            setLoading(false);
        }

        setLoading(false);
    };

    return {loading, deleteProduct, error};
}

export default useDeleteProduct;