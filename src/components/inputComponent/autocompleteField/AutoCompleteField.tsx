import {
    ReactNode,
    // useEffect,
    useState,
} from 'react';
// import axios from 'axios';
import {
    AutoComplete, AutoCompleteProps, AutoCompleteChangeEvent, AutoCompleteCompleteEvent,
} from 'primereact/autocomplete';
import
// useFetchOptions,
{ DataSourceConfig } from './useFetchOptions';
import { GenericMapKV } from '../../../types/commonTypes';
import './autoComplete.css';
import useFetchOptionsV2 from './useFetchOptionsV2';
// import { isValidFunction } from '../../../utils/nullChecks';

type DefaultOption = { label: string; value: string };

export type AutoCompleteFieldProps<T = DefaultOption> = Omit<AutoCompleteProps, 'onChange' | 'suggestions'> & {
  value: T | T[] | null;
  onChange: (value: T | T[] | null, event: AutoCompleteChangeEvent) => void;
  dataSourceApi: string;
  dataSourceConfig: DataSourceConfig;
//   customLabel?: (option: GenericMapKV<string, string>) => string;
  itemTemplate?: (item: GenericMapKV<string, string>) => ReactNode;
  label?: string;
  id?: string;
  bodyClassName?: string;

};

const AutoCompleteField = <T extends object>(props: AutoCompleteFieldProps<T>): JSX.Element => {
    const {
        value,
        onChange,
        dataSourceApi,
        dataSourceConfig,
        bodyClassName,
        label,
        id,
        // customLabel,
        ...restProps
    } = props;
    console.log('bodyClassName: ', bodyClassName);

    const [searchString, setSearchString] = useState<string | null>('');
    // const [fetchedOptions, setFetchedOptions] = useState([]);
    // console.log('fetchedOptions:234234 ', fetchedOptions);

    // Fetch options based on search string
    // const { options: fetchedOptions, loading, refetch } = useFetchOptions(
    //     dataSourceApi,
    //     searchString,
    //     dataSourceConfig,
    // );
    const { data: fetchedOptions } = useFetchOptionsV2(
        dataSourceApi,
        searchString,
        dataSourceConfig,
    );
    console.log('fetchedOptions:2312124 ', fetchedOptions, id);
    // console.log('loading: ', loading);

    // const updatedFetchOptions = fetchedOptions.map((item: GenericMapKV<string, string>) => ({
    //     label: item[dataSourceConfig.key] ?? '',
    //     value: item[dataSourceConfig.value] ?? '',
    // }));
    // useEffect(() => {
    //     try {
    //         axios.get(dataSourceApi, {
    //             params: { searchString },
    //         // eslint-disable-next-line consistent-return
    //         }).then((response) => {
    //             if (!response.data || !Array.isArray(response.data)) return [];

    //             const options = response.data.map((item: GenericMapKV<string, string>) => ({
    //                 label: item[dataSourceConfig.key] ?? '',
    //                 value: item[dataSourceConfig.value] ?? '',
    //             }));
    //             // @ts-ignore
    //             setFetchedOptions(options);
    //         });
    //     } catch (eror) {
    //         console.log('eror: ', eror);
    //     }
    // }, [dataSourceApi, dataSourceConfig.key, dataSourceConfig.value, searchString]);

    const handleOptionChange = (e: AutoCompleteChangeEvent) => {
        onChange(e.value, e);
    };

    const handleCompleteMethod = (e: AutoCompleteCompleteEvent) => {
        console.log('e.query: ', e.query);
        if (!e.query) {
            setSearchString(null); // Fetch all options
        } else {
            setSearchString(e.query); // Fetch filtered options
        }
        // refetch();
    };

    // const handleDropdownOpen = () => {
    //     if (fetchedOptions.length > 0) {
    //         setSearchString(''); // Reset searchString to trigger suggestions for all options
    //     }
    // };

    const fieldId = id || `autocomplete-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    // const itemTemplate = (item: { label: string; value: string }) => {
    //     console.log();
    //     // if (isValidFunction(itemTemplate)) {
    //     //     return itemTemplate(item);
    //     // }
    //     return <span>{item.label || ''}</span>;
    // };

    console.log('value:423423 ', value);
    return (
        <div className={bodyClassName}>
            <div className="p-label mb-1 text-sm">
                {label && <label htmlFor={fieldId}>{label}</label>}
            </div>
            <AutoComplete
                id={fieldId}
                value={value}
                field="label"
                suggestions={fetchedOptions}
                // suggestions={fetchedOptions}
                completeMethod={handleCompleteMethod}
                dropdownMode="current"
                // multiple={multiple}
                onChange={handleOptionChange}
                // onFocus={handleDropdownOpen}
                // placeholder={placeholder}
                // className={className}
                // itemTemplate={itemTemplate} // Use custom template for suggestions
                // loading={loading}
                {...restProps}
            />
        </div>
    );
};

export default AutoCompleteField;
