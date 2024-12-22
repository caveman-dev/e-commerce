import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../../utils/api';
import { isArrayValidAndNotEmpty } from '../../utils/nullChecks';

const useFetchProducts = (
    pageNumber: number,
    pageSize: number,
    category?:number | string,
) => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['fetchProducts', pageNumber, pageSize, category],
        queryFn: async () => {
            const response = await axios.get(
                api.PRODUCTS.LIST,
                {
                    params: { pageNumber, pageSize, category },
                },
            );

            if (!response.data.content ||
                 !isArrayValidAndNotEmpty(response.data.content)) return [];
            // return updatedValues;
            return response.data;
        },
        enabled: true,
        // staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return { data, isLoading, refetch };
};

export default useFetchProducts;
