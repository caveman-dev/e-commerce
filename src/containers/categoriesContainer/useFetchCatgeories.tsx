import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import api from '../../utils/api';
import { isArrayValidAndNotEmpty, isObjectValidAndNotEmpty } from '../../utils/nullChecks';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../utils/constants';

const useFetchCatgeories = (
    page: number = DEFAULT_PAGE_NUMBER,
    size: number = DEFAULT_PAGE_SIZE,
) => {
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['fetchCategories', page, size],
        queryFn: async () => {
            const response = await axios.get(
                api.CATEGORIES.SEARCH,
                {
                    params: { page, size },
                },
            );

            if (!response.data.content ||
                 !isArrayValidAndNotEmpty(response.data.content)) return [];

            console.log('response.data:324234 ', response.data);
            // @ts-ignore
            const updatedValues = response.data.content?.map((row) => {
                const updatedRow = { ...row };
                console.log('updatedRow:234234 ', updatedRow);
                if (isObjectValidAndNotEmpty(row.topLevelCategory)) {
                    updatedRow.topLevelCategoryName = row.topLevelCategory.name;
                    updatedRow.topLevelCategoryId = row.topLevelCategory.id;
                    // delete updatedRow.topLevelCategory;
                    console.log('updatedRow:23432423423 ', updatedRow);
                }
                if (isObjectValidAndNotEmpty(row.secondLevelCategory)) {
                    updatedRow.secondLevelCategoryName = row.secondLevelCategory.name;
                    updatedRow.secondLevelCategoryId = row.secondLevelCategory.id;
                    // delete updatedRow.secondLevelCatgeory;
                }
                delete updatedRow.children;
                return updatedRow;
            });
            console.log('updatedValues: ', updatedValues);
            // return updatedValues;
            return { ...response.data, content: updatedValues };
        },
        enabled: true,
        // staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return { data, isLoading, refetch };
};

export default useFetchCatgeories;
