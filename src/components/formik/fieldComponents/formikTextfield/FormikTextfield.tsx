// components/FormikTextfield.tsx
import React from 'react';
import { FieldInputProps, FormikProps } from 'formik';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { isArrayValidAndNotEmpty } from '../../../../utils/nullChecks';
import callHandlers from '../../../../utils/callHandlers';
// import { KeyFilterType } from 'primereact/keyfilter';

// Exclude props that should not be passed down to InputText
type ExcludeProps = 'onChange' | 'value' | 'onBlur';

// Props type for FormikTextfield
type FormikTextfieldProps<FormValues> = Omit<InputTextProps, ExcludeProps> & {
    field: FieldInputProps<string>;
    form: FormikProps<FormValues>;
    // keyfilter?: KeyFilterType;
    filled?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    onChangeHandlers?: Array<string>;
    onBlurHandlers?: Array<string>;
    actionHandlers?: Record<string, (newValue: string, fieldName: string) => void>;
    label?:string
    className?:string
};

const FormikTextfield = <FormValues extends object>({
    form,
    field,
    // keyfilter,
    filled = false,
    disabled = false,
    onChangeHandlers,
    onBlurHandlers,
    actionHandlers,
    label,
    className = '',
    ...otherProps
}: FormikTextfieldProps<FormValues>) => {
    const { getFieldMeta, setFieldTouched } = form;
    const {
        name, value, onChange, onBlur,
    } = field;
    const { error, touched } = getFieldMeta(name);

    // Handle change event
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newValue = event.target.value;
        onChange(event);
        if (isArrayValidAndNotEmpty(onChangeHandlers)) {
            callHandlers(newValue, name, onChangeHandlers, actionHandlers);
        }
    };

    // Handle blur event
    const handleBlur = (
        event: React.FocusEvent<HTMLInputElement>,
    ) => {
        onBlur(event);
        if (isArrayValidAndNotEmpty(onBlurHandlers)) {
            callHandlers(value, name, onBlurHandlers, actionHandlers);
            // onBlurHandlers.forEach((handler) => {
            //     if (actionHandlers && actionHandlers[handler]) {
            //         actionHandlers[handler](value, name);
            //     }
            // });
        }
        setFieldTouched(name, true, false);
    };

    // Determine class names based on props
    const inputClassName = classNames('p-inputtext', {
        'p-invalid': touched && error,
        'p-filled': filled,
        'p-disabled': disabled,
        'p-inputtext-sm': true,
    }, className);

    return (
        <div className="p-field">
            {
                label && (
                    <div className="p-label mb-1 text-sm">
                        <label htmlFor={name}>{label}</label>
                    </div>
                )
            }
            <InputText
                // id={name}
                {...field}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                // keyfilter={keyfilter}
                className={inputClassName}
                disabled={disabled}
                {...otherProps}
            />
            {/* {touched && error && (
                <div>
                    <small className="p-error text-xs">{error}</small>
                </div>
            )} */}
        </div>
    );
};

export default FormikTextfield;
