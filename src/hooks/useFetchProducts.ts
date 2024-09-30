import {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {IUserFoodItem} from "../interfaces/FoodItem";

const useFetchProducts = () => {
    const [data, setData] = useState<IUserFoodItem[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const items : IUserFoodItem[] = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as IUserFoodItem[];
                console.log("products", data);
                setData(items);

            } catch (error) {
                console.error("Error fetching products:", error);
                const typedError = error as Error;
                console.error("Typed Error fetching:", typedError.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return {data, loading};
}

export default useFetchProducts;