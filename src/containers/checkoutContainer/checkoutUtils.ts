import * as Yup from 'yup';
import { FormFieldConfig } from '../../components/formik/generateFormFields/generateFormTypes';
import { AddressFormValues } from './checkoutTypes';

export const a = 'a';
export const b = 'B';

export const addressFormFieldName = {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'secondName',
    ADDRESS: 'streetAddress',
    CITY: 'city',
    STATE: 'state',
    ZIP: 'zipCode',
    PHONE: 'mobile',
    ADDRESS_NAME: 'nameOfAddress',
};
export const addressFormFieldLabel = {
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    ADDRESS: 'Address',
    CITY: 'City',
    STATE: 'State',
    ZIP: 'ZIP',
    PHONE: 'Phone',
    ADDRESS_NAME: 'Name',
};

export const initialAddressValue = {
    firstName: '',
    secondName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: '',
    nameOfAddress: '',
};

export const ADD_ADDRESS_FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string(),
});

export const addressFormFields:FormFieldConfig<AddressFormValues>[] = [
    {
        fieldName: addressFormFieldName.FIRST_NAME,
        className: 'col-6  ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        placeholder: 'John',
        label: addressFormFieldLabel.FIRST_NAME,
        disabled: false,
    },
    {
        fieldName: addressFormFieldName.LAST_NAME,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: addressFormFieldLabel.LAST_NAME,
        placeholder: 'Doe',
        disabled: false,
    },
    {
        fieldName: addressFormFieldName.ADDRESS_NAME,
        className: 'col-12 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: addressFormFieldLabel.ADDRESS_NAME,
        placeholder: 'HOME',
        disabled: false,
    },
    {
        fieldName: addressFormFieldName.ADDRESS,
        className: 'col-12 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: addressFormFieldLabel.ADDRESS,
        placeholder: '79/81, 3rd Floor, Giriraj, 3rd Bhoiwada, Bhuleshwar',
        disabled: false,
    },
    {
        fieldName: addressFormFieldName.STATE,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: addressFormFieldLabel.STATE,
        placeholder: 'Maharastra',
        disabled: false,
    },
    {
        fieldName: addressFormFieldName.CITY,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: addressFormFieldLabel.CITY,
        placeholder: 'Mumbai',
        disabled: false,
    },
    {
        fieldName: addressFormFieldName.ZIP,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: addressFormFieldLabel.ZIP,
        placeholder: '400002',
        disabled: false,
    },
    {
        fieldName: addressFormFieldName.PHONE,
        className: 'col-6 ',
        fieldClassName: 'w-full',
        component: 'FormikTextfield',
        label: addressFormFieldLabel.PHONE,
        placeholder: '02222416167',
        disabled: false,
    },
];
