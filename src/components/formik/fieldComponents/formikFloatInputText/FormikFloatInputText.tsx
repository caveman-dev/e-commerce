import React from 'react';
import { FieldInputProps, FormikProps } from 'formik';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

// Exclude props that should not be passed down to InputText
type ExcludeProps = 'onChange' | 'value' | 'onBlur';

// Props type for FormikFloatInputText
type FormikFloatInputTextProps<FormValues> = Omit<InputTextProps, ExcludeProps> & {
    field: FieldInputProps<string>;
    form: FormikProps<FormValues>;
    filled?: boolean;
    disabled?: boolean;
    onChangeHandlers?: Array<string>;
    onBlurHandlers?: Array<string>;
    actionHandlers?: Record<string, (newValue: string, fieldName: string) => void>;
    label?: string;
    className?: string;
};

const FormikFloatInputText = <FormValues extends object>({
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
}: FormikFloatInputTextProps<FormValues>) => {
    const { getFieldMeta, setFieldTouched } = form;
    const {
        name, value, onChange, onBlur,
    } = field;
    const { error, touched } = getFieldMeta(name);

    // Handle change event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(event);
        if (onChangeHandlers) {
            onChangeHandlers.forEach((handler) => {
                if (actionHandlers && actionHandlers[handler]) {
                    actionHandlers[handler](newValue, name);
                }
            });
        }
    };

    // Handle blur event
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur(event);
        if (onBlurHandlers) {
            onBlurHandlers.forEach((handler) => {
                if (actionHandlers && actionHandlers[handler]) {
                    actionHandlers[handler](value, name);
                }
            });
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
        <span className={classNames('p-float-label', className)}>
            <InputText
                {...field}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName}
                disabled={disabled}
                {...otherProps}
            />
            <label htmlFor={name}>{label}</label>
            {touched && error && (
                <div>
                    <small className="p-error text-xs">{error}</small>
                </div>
            )}
        </span>
    );
};

export default FormikFloatInputText;
