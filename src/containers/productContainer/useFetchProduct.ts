import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../../utils/api';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';

const useFetchProduct = (
    id:number | string,
    userId:number | string | null,
) => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['fetchProducts', id],
        queryFn: async () => {
            const response = await axios.get(
                userId ? `${api.PRODUCTS.PRODUCT}${id}?userId=${userId}` : `${api.PRODUCTS.PRODUCT}${id}`,
            );
            console.log('response:435323423 ', response);

            if (!isObjectValidAndNotEmpty(response.data)) return [];
            // return updatedValues;
            return response.data;
        },
        enabled: true,
        // staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return { data, isLoading, refetch };
};

export default useFetchProduct;
