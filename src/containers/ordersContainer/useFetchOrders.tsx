import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../../utils/api';
import { isArrayValidAndNotEmpty } from '../../utils/nullChecks';

const useFetchOrders = (
    userId:number | undefined,
    // page: number = DEFAULT_PAGE_NUMBER,
    // size: number = DEFAULT_PAGE_SIZE,
) => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['fetchOrders', userId],
        queryFn: async () => {
            const response = await axios.get(
                `${api.ORDERS.GET_ORDERS}${userId}`,
            );

            if (
                !isArrayValidAndNotEmpty(response.data)) return [];
            return response.data;
            // return updatedValues;
            // return { ...response.data, content: updatedValues };
        },
        enabled: !!userId,
        // staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return { data, isLoading, refetch };
};

export default useFetchOrders;
