import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../../utils/api';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';

const useFetchCart = (isLoggedin: boolean, showCart?:boolean, fetchToggle?:boolean) => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['fetchCart', isLoggedin, showCart, fetchToggle],
        queryFn: async () => {
            const response = await axios.get(api.CARTS.GET_CART_FOR_USERS);
            console.log('Response data:', response.data);

            if (!isObjectValidAndNotEmpty(response.data)) return [];
            return response.data;
        },
        enabled: isLoggedin || showCart, // Fetch only when logged in
        staleTime: 0,
    });

    // Refetch when isLoggedin changes to true
    useEffect(() => {
        if (isLoggedin && refetch) {
            refetch();
        }
    }, [isLoggedin, refetch, showCart]);

    return { data: isLoggedin ? data : null, isLoading, refetch };
};

export default useFetchCart;
