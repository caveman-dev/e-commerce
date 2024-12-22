import { Formik, useFormikContext } from 'formik';
import { Button } from 'primereact/button';
import axios from 'axios';
import { ADD_ADDRESS_FORM_VALIDATION, addressFormFields, initialAddressValue } from './checkoutUtils';
import GenerateFormFields from '../../components/formik/generateFormFields/GenerateFormFields';
import { AddressFormValues } from './checkoutTypes';
import api from '../../utils/api';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import resolvePromise from '../../utils/resolvePromise';
import { getLoginState } from '../../utils/localStorage';
import { isTextValidAndNotEmpty } from '../../utils/nullChecks';

const AddressFields = () => {
    const {
        values,
        handleSubmit,
    } = useFormikContext<AddressFormValues>();
    console.log();
    console.log('handleSubmit: ', handleSubmit);
    return (
        <div className="w-full grid flex align-items-center pt-6">
            <GenerateFormFields
                fields={addressFormFields}
                formValues={values}
            />
            <div className="col-12 flex justify-content-end ">
                <Button className="m-1 hover:bg-primary hover:text-primary-reverse" icon="pi pi-save " onClick={() => handleSubmit()} label="Add Address" outlined />
                {/* eslint-disable-next-line max-len */}
                {/* <Button className="m-1 hover:bg-primary hover:text-primary-reverse" icon="pi pi-plus" label="Add Address and select" outlined /> */}
            </div>
        </div>
    );
};
type Props = {
    refetch:()=>void
};

const AddAddressForm = (props: Props) => {
    const { refetch } = props;
    console.log('refetch: ', refetch);
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    console.log();
    const { login } = getLoginState();
    // @ts-ignore
    const handleSubmit = async (formValues, { resetForm }) => {
        console.log('formValues:34234 ', formValues);
        const addAddressPromise = axios.post(`${api.ADDRESSES.CREATE}?userId=${login?.userId}`, formValues);
        const [response] = await resolvePromise(addAddressPromise, commonHandlers, 'Address added');
        if (isTextValidAndNotEmpty(response)) {
            refetch();
            resetForm({ values: initialAddressValue });
        }
    };
    return (
        <Formik
            initialValues={initialAddressValue}
            onSubmit={handleSubmit}
            validationSchema={ADD_ADDRESS_FORM_VALIDATION}
            validateOnChange={false}
            validateOnMount={false}
            validateOnBlur
        >
            <AddressFields />
        </Formik>
    );
};

export default AddAddressForm;
