// components/FormikInputNumber.tsx
import React from 'react';
import { FieldInputProps, FormikProps } from 'formik';
import { InputNumber, InputNumberProps } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { isArrayValidAndNotEmpty } from '../../../../utils/nullChecks';
import callHandlers from '../../../../utils/callHandlers';

// Exclude props that should not be passed down to InputNumber
type ExcludeProps = 'onChange' | 'value' | 'onBlur';

// Props type for FormikInputNumber
type FormikInputNumberProps<FormValues> = Omit<InputNumberProps, ExcludeProps> & {
    field: FieldInputProps<number>;
    form: FormikProps<FormValues>;
    filled?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    onChangeHandlers?: Array<string>;
    onBlurHandlers?: Array<string>;
    actionHandlers?: Record<string, (newValue: number | null, fieldName: string) => void>;
    label?: string;
    className?: string;
};

const FormikInputNumber = <FormValues extends object>({
    form,
    field,
    filled = false,
    disabled = false,
    onChangeHandlers,
    onBlurHandlers,
    actionHandlers,
    label,
    className = '',
    ...otherProps
}: FormikInputNumberProps<FormValues>) => {
    const { getFieldMeta, setFieldTouched, setFieldValue } = form;
    const {
        name, value, onBlur,
    } = field;
    const { error, touched } = getFieldMeta(name);

    // Handle change event
    const handleChange = (newValue: number | null) => {
        setFieldValue(name, newValue);
        if (isArrayValidAndNotEmpty(onChangeHandlers) && newValue !== null) {
            callHandlers(newValue, name, onChangeHandlers, actionHandlers);
        }
    };

    // Handle blur event
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur(event);
        if (isArrayValidAndNotEmpty(onBlurHandlers)) {
            callHandlers(value, name, onBlurHandlers, actionHandlers);
        }
        setFieldTouched(name, true, false);
    };

    // Determine class names based on props
    const inputClassName = classNames('p-inputnumber', {
        'p-invalid': touched && error,
        'p-filled': filled,
        'p-disabled': disabled,
    }, className);

    return (
        <div className="p-field">
            {label && (
                <div className="p-label mb-1 text-sm">
                    <label htmlFor={name}>{label}</label>
                </div>
            )}
            <InputNumber
                {...field}
                value={value}
                // @ts-ignore
                onValueChange={(e) => handleChange(e.value)}
                onBlur={handleBlur}
                className={inputClassName}
                disabled={disabled}
                {...otherProps}
            />
            {touched && error && (
                <div>
                    <small className="p-error text-xs">{error}</small>
                </div>
            )}
        </div>
    );
};

export default FormikInputNumber;
