import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import { GenericMapKV } from '../../../types/commonTypes';
// import { isObjectValidAndNotEmpty } from '../../../utils/nullChecks';

export interface DataSourceConfig {
    key: string;
    value: string;
}

const useFetchOptions = (
    dataSourceApi: string,
    searchString: string | null,
    config: DataSourceConfig,
) => {
    // Ensure that searchString and config are valid before making API calls
    // const enabled = !!dataSourceApi && isObjectValidAndNotEmpty(config);
    console.log('config: ', config);

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['fetchOptions', dataSourceApi, searchString],
        queryFn: async () => {
            if (!dataSourceApi) return [];

            const response = await axios.get(dataSourceApi, {
                // params: { search: searchString },
                params: { searchString },
            });

            if (!response.data || !Array.isArray(response.data)) return [];

            // return response.data.map((item: GenericMapKV<string, string>) => ({
            //     label: item[config.key] ?? '',
            //     value: item[config.value] ?? '',
            // }));
            return response.data;
        },
        enabled: true,
        // staleTime: 5 * 60 * 1000, // 5 minutes
        staleTime: 0, // 5 minutes
    });

    return { options: data, loading: isLoading, refetch };
};

export default useFetchOptions;
