import * as Yup from 'yup';
import { isNumberValid, isObjectValidAndNotEmpty } from '../../utils/nullChecks';
import { CategoryFormValues, CategoryUi } from './categoryTypes';
import { FormFieldConfig } from '../../components/formik/generateFormFields/generateFormTypes';
import { GenericMapKV } from '../../types/commonTypes';
import api from '../../utils/api';

export const categoryFormFieldLabel = {
    NAME: 'Name',
    LEVEL: 'Type',
    TOP_LEVEL_CATEGORY: 'Top level category',
    SECOND_LEVEL_CATEGORY: 'Second level category',
};

export const categoryFormFieldName:GenericMapKV<string, string> = {
    NAME: 'name',
    LEVEL: 'level',
    TOP_LEVEL_CATEGORY: 'topLevelCategory',
    SECOND_LEVEL_CATEGORY: 'secondLevelCategory',
};

export const initialCategoriesValue = {
    [categoryFormFieldName.NAME]: '',
    [categoryFormFieldName.LEVEL]: null,
    [categoryFormFieldName.TOP_LEVEL_CATEGORY]: null,
    [categoryFormFieldName.SECOND_LEVEL_CATEGORY]: null,
};

export const ADD_CATEGORIES_FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    level: Yup.number().required('Level is required'),
    // topLevelCategory: Yup.string().nullable().when('level', {
    //     is: (level:number) => level !== 1,
    //     then: Yup.string().required('Top level category is required'),
    //     otherwise: Yup.string(),
    // }),
    // secondLevelCategory: Yup.string().nullable().when('level', {
    //     is: 3,
    //     then: Yup.string().required('Second level category is required'),
    //     otherwise: Yup.string(),
    // }),
});

export const catgeoriesOptions = [
    { label: 'Top level category', value: 1 },
    { label: 'Second level category', value: 2 },
    { label: 'Third level category', value: 3 },
];

export const categoryFormFields:FormFieldConfig<CategoryFormValues>[] = [
    {
        fieldName: categoryFormFieldName.NAME,
        className: 'col-6  mt-4',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        placeholder: 'Category Name',
        label: categoryFormFieldLabel.NAME,
        disabled: false,
    },
    {
        fieldName: categoryFormFieldName.LEVEL,
        className: 'col-6 mt-4',
        fieldClassName: 'w-full',
        component: 'FormikSelect',
        label: categoryFormFieldLabel.LEVEL,
        placeholder: 'Select LEVEL',
        disabled: false,
        options: catgeoriesOptions,
    },
    {
        fieldName: categoryFormFieldName.TOP_LEVEL_CATEGORY,
        className: 'col-6 p-2',
        fieldClassName: 'w-full',
        bodyClassName: 'w-full',
        forceSelection: true,
        dropdown: true,
        component: 'FormikAutoCompleteField',
        placeholder: 'Type in or Select',
        dataSourceApi: `${api.CATEGORIES.SEARCH}?level=1`,
        dataSourceConfig: {
            key: 'name',
            value: 'id',
        },
        label: categoryFormFieldLabel.TOP_LEVEL_CATEGORY,
        showIf: (formValues:CategoryFormValues) => isNumberValid(formValues.level) &&
                formValues.level !== 1,
        disabled: false,
    },
    {
        fieldName: categoryFormFieldName.SECOND_LEVEL_CATEGORY,
        className: 'col-6 p-2',
        fieldClassName: 'w-full',
        bodyClassName: 'w-full',
        forceSelection: true,
        dropdown: true,
        component: 'FormikAutoCompleteField',
        placeholder: 'Type in or Select',
        // @ts-ignore
        dataSourceApi: (formValues) => `${api.CATEGORIES.SEARCH}?level=2&topLevelCategoryId=${formValues?.topLevelCategory?.value || ''}`,
        dataSourceConfig: {
            key: 'name',
            value: 'id',
        },
        label: categoryFormFieldLabel.SECOND_LEVEL_CATEGORY,
        disabled: false,
        showIf: (formValues) => formValues.level === 3 &&
                isNumberValid(formValues.level) &&
                isNumberValid(formValues?.topLevelCategory?.value),
    },
];

const mapValueToForm = (data:CategoryUi) => ({
    ...data,
    topLevelCategory: isObjectValidAndNotEmpty(data.topLevelCategory) ?
        {
            label: data.topLevelCategory?.name,
            value: data.topLevelCategory?.id,
        } :
        null,
    secondLevelCategory: isObjectValidAndNotEmpty(data.secondLevelCategory) ?
        {
            label: data.secondLevelCategory?.name,
            value: data.secondLevelCategory?.id,
        } :
        null,
});
export const getInitialCategoryValues = (value:CategoryUi | null) => {
    if (isObjectValidAndNotEmpty<CategoryFormValues>(value)) {
        return mapValueToForm(value);
    }
    return initialCategoriesValue;
};
