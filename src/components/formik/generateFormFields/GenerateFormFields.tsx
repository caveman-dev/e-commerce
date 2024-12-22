import { Field, FormikValues } from 'formik';
import { useMemo } from 'react';
import { FormFieldConfig } from './generateFormTypes';
import FormikTextfield from '../fieldComponents/formikTextfield/FormikTextfield';
import FormikFloatInputText from '../fieldComponents/formikFloatInputText/FormikFloatInputText';
import FormikSelect from '../fieldComponents/formikSelect/FormikSelect';
import FormikAutoCompleteField from '../fieldComponents/formikAutoCompleteField/FormikAutoCompleteField';
import FormikInputNumber from '../fieldComponents/formikInputNumber/FormikInputNumber';
import { isValidFunction } from '../../../utils/nullChecks';
import FormikChips from '../fieldComponents/formikChips/FormikChips';

interface GenerateFormFieldsProps<T> {
    fields: FormFieldConfig<T>[];
    formValues: T;
}

const GenerateFormFields = <T extends FormikValues>(
    { fields, formValues }: GenerateFormFieldsProps<T>) => {
    console.log('formValues:423423 ', formValues);
    const memoizedFields = useMemo(() => fields.map((field:FormFieldConfig<T>) => {
        const updatedField = { ...field };
        if (isValidFunction(field.dataSourceApi)) {
            updatedField.dataSourceApi = field?.dataSourceApi(formValues);
        }
        if (isValidFunction(field.disabled)) {
            updatedField.disabled = field?.disabled(formValues);
        }
        return updatedField;
    }), [fields, formValues]);

    const renderComponent = (field: FormFieldConfig<T>) => {
        const {
            fieldName,
            placeholder,
            label,
            disabled,
            options,
            fieldClassName,
            dropdown,
            forceSelection,
            dataSourceApi,
            bodyClassName,
            dataSourceConfig,
            onChangeHandlers,
            actionHandlers,
        } = field;
        const commonProps = {
            placeholder, label, disabled,
        };
        switch (field.component) {
            case 'FormikTextfield':
                return (
                    <Field
                        component={FormikTextfield}
                        name={fieldName}
                        className={fieldClassName}
                        {...commonProps}
                    />
                );
            case 'FormikChips':
                return (
                    <Field
                        component={FormikChips}
                        name={fieldName}
                        // className={classNames}
                        feildClassName={fieldClassName}
                        {...commonProps}
                    />
                );
            case 'FormikInputNumber':
                return (
                    <Field
                        component={FormikInputNumber}
                        name={fieldName}
                        className={fieldClassName}
                        {...commonProps}
                    />
                );
            case 'FormikFloatInputText':

                return (
                    <Field
                        component={FormikFloatInputText}
                        className={fieldClassName}
                        name={fieldName}
                        {...commonProps}
                    />
                );
            case 'FormikSelect':
                return (
                    <Field
                        component={FormikSelect}
                        className={fieldClassName}
                        name={fieldName}
                        {...commonProps}
                        options={options}
                    />
                );
            case 'FormikAutoCompleteField':
                return (
                    <Field
                        component={FormikAutoCompleteField}
                        className={fieldClassName}
                        name={fieldName}
                        {...commonProps}
                        bodyClassName={bodyClassName}
                        dropdown={dropdown}
                        dataSourceApi={dataSourceApi}
                        forceSelection={forceSelection}
                        dataSourceConfig={dataSourceConfig}
                        onChangeHandlers={onChangeHandlers}
                        actionHandlers={actionHandlers}

                        // placeholder={field.placeholder}
                        // label={field.label}
                        // disabled={field.disabled}
                    />
                );
            // case 'select':
                // return null;
            // Add more cases for different components
            // case 'custom':
                // return null;
                // return (
                //     <Field
                //         name={field.fieldName as string}
                //         // Assuming you might want to use a custom component
                //         render={({ field }) => (
                //             <input
                //                 {...field}
                //                 placeholder={field.placeholder}
                //                 disabled={field.disabled}
                //             />
                //         )}
                //     />
                // );
            default:
                return null;
        }
    };

    return (
        <>
            {memoizedFields.map((field) => {
                if (field.showIf && !field.showIf(formValues)) {
                    return null;
                }
                if (field.hideIf && field.hideIf(formValues)) {
                    return null;
                }
                return (
                    <div className={field.className} key={field.label}>
                        {/* <form> */}
                        {renderComponent(field)}
                        {/* </form> */}
                    </div>
                );
            })}
        </>
    );
};

export default GenerateFormFields;
