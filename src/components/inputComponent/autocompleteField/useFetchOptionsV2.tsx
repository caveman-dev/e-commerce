import { useState, useEffect } from 'react';
import axios from 'axios';
import { GenericMapKV } from '../../../types/commonTypes';

export interface DataSourceConfig {
    key: string;
    value: string;
}

const useFetchOptionsV2 = (
    dataSourceApi: string,
    searchString: string | null,
    config: DataSourceConfig,
) => {
    const [data, setData] = useState<GenericMapKV<string, string>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!dataSourceApi || !config.key || !config.value) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(dataSourceApi, {
                    params: { size: 5, searchString },
                });

                if (response.data.content && Array.isArray(response.data.content)) {
                    const options = response.data.content.map(
                        (item: GenericMapKV<string, string>) => ({
                            label: item[config.key] ?? '',
                            value: item[config.value] ?? '',
                        }),
                    );
                    setData(options);
                } else {
                    setData([]);
                }
            } catch (err) {
                setError(err as Error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dataSourceApi, searchString, config.key, config.value]);

    return { data, isLoading, error };
};

export default useFetchOptionsV2;
