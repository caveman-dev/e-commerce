import * as Yup from 'yup';
import { FormFieldConfig } from '../../components/formik/generateFormFields/generateFormTypes';
import { ProductFormValues, ProductUi } from './productTypes';
import api from '../../utils/api';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';

export const a = 'a';

export const initialProductsValue:ProductUi = {
    title: '',
    description: '',
    price: null,
    quantity: null,
    discountedPrice: null,
    discountedPersent: null,
    brand: '',
    color: '',
    size: [{ name: '', sizeQuantity: 1 }],
    mainImageUrl: '',
    imageUrls: [],
    // size: '',
    topLevelCategory: null,
    secondLevelCategory: null,
    thirdLevelCategory: null,
    labels: [],
};

export const productFormFieldLabel = {
    TITLE: 'Title',
    DESCRIPTION: 'Description',
    QUANTITY: 'Quantity',
    PRICE: 'Price',
    DISCOUNTED_PRICE: 'Discounted Price',
    DISCOUNTED_PERCENT: 'Discounted Percent',
    BRAND: 'Brand',
    COLOR: 'Color',
    SIZE: 'Size',
    TOP_LEVEL_CATEGORY: 'Top level category',
    SECOND_LEVEL_CATEGORY: 'Second level category',
    THIRD_LEVEL_CATEGORY: 'Third level category',
    MAIN_IMAGE: 'Main Image',
    LABELS: 'Labels',
    OTHER_IMAGE: 'Other Images',
};

export const productFormFieldName = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    QUANTITY: 'quantity',
    PRICE: 'price',
    DISCOUNTED_PRICE: 'discountedPrice',
    DISCOUNTED_PERCENT: 'discountedPersent',
    BRAND: 'brand',
    COLOR: 'color',
    SIZE: 'size',
    TOP_LEVEL_CATEGORY: 'topLevelCategory',
    SECOND_LEVEL_CATEGORY: 'secondLevelCategory',
    THIRD_LEVEL_CATEGORY: 'thirdLevelCategory',
    MAIN_IMAGE: 'mainImageUrl',
    LABELS: 'labels',
    OTHER_IMAGE: 'imageUrls',
};

export const ADD_PRODUCTS_FORM_VALIDATION = Yup.object().shape({
    title: Yup.string(),
    size: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Size is required'),
            sizeQuantity: Yup.number()
                .required('Quantity is required')
                .min(1, 'Quantity must be at least 1'),
        }),
    ),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleTopLevelChange = (value:any, name:string) => {
    console.log('name: 232342342343765', name);
    console.log('value: 232342342343765', value);
};

export const productFormFields:FormFieldConfig<ProductFormValues | ProductUi>[] = [
    {
        fieldName: productFormFieldName.TITLE,
        className: 'col-6  ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        placeholder: 'Product Name',
        label: productFormFieldLabel.TITLE,
        disabled: false,
    },

    {
        fieldName: productFormFieldName.BRAND,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: productFormFieldLabel.BRAND,
        placeholder: 'e.g. Nike',
        disabled: false,
    },
    {
        fieldName: productFormFieldName.COLOR,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: productFormFieldLabel.COLOR,
        placeholder: 'e.g. Red',
        disabled: false,
    },
    {
        fieldName: productFormFieldName.PRICE,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikInputNumber',
        label: productFormFieldLabel.PRICE,
        placeholder: 'e.g. 1000',
        disabled: false,
    },
    {
        fieldName: productFormFieldName.DISCOUNTED_PERCENT,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikInputNumber',
        label: productFormFieldLabel.DISCOUNTED_PERCENT,
        placeholder: 'e.g. 10',
        disabled: false,
    },
    {
        fieldName: productFormFieldName.DISCOUNTED_PRICE,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikInputNumber',
        label: productFormFieldLabel.DISCOUNTED_PRICE,
        placeholder: 'e.g. 100',
        disabled: false,
    },
    {
        fieldName: productFormFieldName.TOP_LEVEL_CATEGORY,
        className: 'col-6 p-2',
        fieldClassName: 'w-full',
        bodyClassName: 'w-full',
        forceSelection: true,
        dropdown: true,
        component: 'FormikAutoCompleteField',
        dataSourceApi: `${api.CATEGORIES.SEARCH}?level=1`,
        dataSourceConfig: {
            key: 'name',
            value: 'id',
        },
        onChangeHandlers: ['onTopLevelChange'],
        actionHandlers:
            { onTopLevelChange: handleTopLevelChange },
        placeholder: 'Type in or Select',
        label: productFormFieldLabel.TOP_LEVEL_CATEGORY,
        disabled: false,
    },
    {
        fieldName: productFormFieldName.SECOND_LEVEL_CATEGORY,
        className: 'col-6 p-2',
        fieldClassName: 'w-full',
        bodyClassName: 'w-full',
        forceSelection: true,
        dropdown: true,
        component: 'FormikAutoCompleteField',
        placeholder: 'Type in or Select',
        dataSourceApi: (formValues) => `${api.CATEGORIES.SEARCH}?level=2&topLevelCategoryId=${formValues?.topLevelCategory?.value || ''}`,
        dataSourceConfig: {
            key: 'name',
            value: 'id',
        },
        disabled: (formValues) => {
            if (isObjectValidAndNotEmpty(formValues.topLevelCategory)) {
                return false;
            }
            return true;
        },
        label: productFormFieldLabel.SECOND_LEVEL_CATEGORY,
    },
    {
        fieldName: productFormFieldName.THIRD_LEVEL_CATEGORY,
        className: 'col-6 p-2',
        fieldClassName: 'w-full',
        bodyClassName: 'w-full',
        forceSelection: true,
        dropdown: true,
        component: 'FormikAutoCompleteField',
        dataSourceApi: (formValues) => `${api.CATEGORIES.SEARCH}?level=3&topLevelCategoryId=${formValues?.topLevelCategory?.value || ''}&secondLevelCategoryId=${formValues?.secondLevelCategory?.value || ''}`,
        dataSourceConfig: {
            key: 'name',
            value: 'id',
        },
        placeholder: 'Type in or Select',
        label: productFormFieldLabel.THIRD_LEVEL_CATEGORY,
        disabled: (formValues) => {
            if (isObjectValidAndNotEmpty(formValues.topLevelCategory) &&
            isObjectValidAndNotEmpty(formValues.secondLevelCategory)
            ) {
                return false;
            }
            return true;
        },
    },
    {
        fieldName: productFormFieldName.LABELS,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikChips',
        label: productFormFieldLabel.LABELS,
        placeholder: 'e.g. Nike',
        disabled: false,
    },
    {
        fieldName: productFormFieldName.DESCRIPTION,
        className: 'col-12 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: productFormFieldLabel.DESCRIPTION,
        placeholder: 'Add Description',
        disabled: false,
    },

    {
        fieldName: productFormFieldName.MAIN_IMAGE,
        className: 'col-12 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: productFormFieldLabel.MAIN_IMAGE,
        placeholder: 'Add image link',
        disabled: false,
    },
    {
        fieldName: productFormFieldName.OTHER_IMAGE,
        className: 'col-12',
        fieldClassName: 'w-full ',
        component: 'FormikChips',
        label: productFormFieldLabel.OTHER_IMAGE,
        placeholder: 'Add image link and hit enter to add more',
        disabled: false,
    },

];

export const mapProductDatatoPayload = (input:ProductUi) => {
    console.log('input:23423423 ', input);
    const payload = {
        ...input,
        // size: input.sizes.map((sizeObj) => ({
        //     name: sizeObj.name,
        //     sizeQuantity: sizeObj.sizeQuantity,
        // })),
        topLevelCategory: input.topLevelCategory?.label,
        secondLevelCategory: input.secondLevelCategory?.label,
        thirdLevelCategory: input.thirdLevelCategory?.label,
    };
    // @ts-ignore
    // delete payload.sizes;
    return payload;
};

const mapValueToForm = (input:ProductUi) => ({
    ...input,
    discountedPersent: input.discountPercent,
    topLevelCategory: {
        label: input.category?.topLevelCategory.name,
        value: input.category?.topLevelCategory.id,
    },
    secondLevelCategory: {
        label: input.category?.secondLevelCategory.name,
        value: input.category?.secondLevelCategory.id,
    },
    thirdLevelCategory: {
        label: input.category?.name,
        value: input.category?.id,
    },
    labels: input.labels || [],
});

console.log('mapValueToForm: ', mapValueToForm);

export const getInitialProductValues = (value:ProductUi | null) => {
    if (isObjectValidAndNotEmpty<ProductUi>(value)) {
        return mapValueToForm(value);
        // return initialProductsValue;
    }
    return initialProductsValue;
};
