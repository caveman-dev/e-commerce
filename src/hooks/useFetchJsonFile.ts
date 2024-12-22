import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getJsonPath } from '../utils/constants';

// Function to fetch JSON data using axios
const fetchJsonData = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        // Handle specific error cases if needed
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Network response was not ok');
        }
        throw new Error('An unexpected error occurred');
    }
};

// Custom hook to fetch JSON data using react-query
const useFetchJsonData = (path: string) => {
    const url = getJsonPath(path);

    return useQuery({
        queryKey: ['jsonData', url],
        queryFn: () => fetchJsonData(url),
        staleTime: 5 * 60 * 1000, // 5 minutes
        // cacheTime: 10 * 60 * 1000, // 10 minutes
        retry: 2, // Retry 2 times before failing
    });
};
export default useFetchJsonData;
