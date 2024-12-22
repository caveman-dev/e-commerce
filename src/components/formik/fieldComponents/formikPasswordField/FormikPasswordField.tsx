import React from 'react';
import { FieldInputProps, FormikProps } from 'formik';
import { Password, PasswordProps } from 'primereact/password';
import { classNames } from 'primereact/utils';

type ExcludeProps = 'onChange' | 'value' | 'onBlur';

type FormikPasswordProps<FormValues> = Omit<PasswordProps, ExcludeProps> & {
    field: FieldInputProps<string>;
    form: FormikProps<FormValues>;
    filled?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    onChangeHandlers?: Array<string>;
    onBlurHandlers?: Array<string>;
    actionHandlers?: Record<string, (newValue: string, fieldName: string) => void>;
    label?: string;
    className?: string;
};

const FormikPasswordField = <FormValues extends object>({
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
}: FormikPasswordProps<FormValues>) => {
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
        if (onChangeHandlers) {
            onChangeHandlers.forEach((handler) => {
                if (actionHandlers && actionHandlers[handler]) {
                    actionHandlers[handler](newValue, name);
                }
            });
        }
    };

    // Handle blur event
    const handleBlur = (
        event: React.FocusEvent<HTMLInputElement>,
    ) => {
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
    const passwordClassName = classNames('p-password', {
        'p-invalid': touched && error,
        'p-filled': filled,
        'p-disabled': disabled,
        'p-inputtext-sm': true,
        'w-full': true,
    }, className);

    return (
        <div className="p-field     ">
            {label && (
                <div className="p-label mb-1 text-sm">
                    <label htmlFor={name}>{label}</label>
                </div>
            )}
            <Password
                id={name}
                {...field}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={passwordClassName}
                disabled={disabled}
                feedback={false}
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

export default FormikPasswordField;
