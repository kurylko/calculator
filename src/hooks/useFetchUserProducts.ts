import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { IUserFoodItem } from '../interfaces/FoodItem';
import {useAuth} from "../contexts/authContext/authContext";

const useFetchUserProducts = () => {
    const [data, setData] = useState<IUserFoodItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const uid = currentUser?.uid;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const items: IUserFoodItem[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as IUserFoodItem[];
                const usersProducts = items.filter((food) => food.userID === uid);
                setData(usersProducts);
            } catch (error) {
                console.error('Error fetching users`s food items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, loading };
};

export default useFetchUserProducts;