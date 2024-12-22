import { DataSourceConfig } from '../../inputComponent/autocompleteField/useFetchOptions';

export type FormType = 'Readonly' | 'FormikTextfield' | 'FormikFloatInputText' | 'FormikSelect' | 'FormikAutoCompleteField' | 'FormikInputNumber' | 'FormikChips';

export type Option = {
    label: string;
    value: string | number;
};

export interface FormFieldConfig<T> {
    fieldName: string;
    className?: string;
    fieldClassName?: string;
    component: FormType // Use a string union for supported types
    placeholder?: string;
    label?: string;
    disabled?: boolean | ((formValues: T) => boolean);
    showIf?: (formValues: T) => boolean;
    hideIf?: (formValues: T) => boolean;
    options?:Option[];
    bodyClassName?:string
    forceSelection?:boolean;
    dropdown?:boolean;
    dataSourceApi?: string | ((formValues: T) => string);
    dataSourceConfig?:DataSourceConfig;
    onChangeHandlers?:string[];
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    actionHandlers?:Record<string, (newValue: any, fieldName: string) => void>
    // onSelectHandlers?:Array<string>,
    // onBlurHandlers?:Array<string>,
    // onChangeHandlers?:Array<string>
}
