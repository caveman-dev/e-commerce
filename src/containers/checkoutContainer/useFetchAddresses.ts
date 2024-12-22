import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../../utils/api';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';

const useFetchAddresses = (userId:number) => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['fetchAddresses', userId],
        queryFn: async () => {
            const response = await axios.get(`${api.ADDRESSES.LIST}${userId}`);
            console.log('response:435323423 ', response);

            if (!isObjectValidAndNotEmpty(response.data)) return [];
            // return updatedValues;
            return response.data;
        },
        enabled: !!userId,
        staleTime: 0,
        // staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return { data, isLoading, refetch };
};

export default useFetchAddresses;
