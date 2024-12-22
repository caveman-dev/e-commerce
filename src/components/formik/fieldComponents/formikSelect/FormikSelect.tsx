// components/FormikSelect.tsx
import React from 'react';
import { FieldInputProps, FormikProps } from 'formik';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { isTextValidAndNotEmpty } from '../../../../utils/nullChecks';

// Type for each option
interface SelectOption<T> {
    label: string;
    value: T;
}

// Props type for FormikSelect
type FormikSelectProps<FormValues, T> = Omit<DropdownProps, 'onChange' | 'value' | 'onBlur'> & {
    field: FieldInputProps<T>;
    form: FormikProps<FormValues>;
    options: SelectOption<T>[]; // Array of options
    optionLabel?: string;
    optionValue?: string;
    disabled?: boolean;
    onChangeHandlers?: Array<string>;
    onBlurHandlers?: Array<string>;
    actionHandlers?: Record<string, (newValue: T, fieldName: string) => void>;
    label?: string;
    className?: string;
};

const FormikSelect = <FormValues extends object, T>({
    form,
    field,
    options,
    optionLabel,
    optionValue,
    disabled = false,
    onChangeHandlers,
    onBlurHandlers,
    actionHandlers,
    label,
    className = '',
    ...otherProps
}: FormikSelectProps<FormValues, T>) => {
    const { getFieldMeta, setFieldTouched } = form;
    const {
        name, value, onChange, onBlur,
    } = field;
    const { error, touched } = getFieldMeta(name);

    // Handle change event
    const handleChange = (
        event: { value: T },
    ) => {
        const newValue = event.value;
        onChange({
            target: {
                name,
                value: newValue,
            },
        });
        if (onChangeHandlers) {
            onChangeHandlers.forEach((handler) => {
                if (actionHandlers && actionHandlers[handler]) {
                    actionHandlers[handler](newValue, name);
                }
            });
        }
    };

    // Handle blur event
    const handleBlur = () => {
        onBlur({} as React.FocusEvent<HTMLSelectElement>); // Type assertion if needed
        setFieldTouched(name, true, false);
        if (onBlurHandlers) {
            onBlurHandlers.forEach((handler) => {
                if (actionHandlers && actionHandlers[handler]) {
                    actionHandlers[handler](value, name);
                }
            });
        }
    };

    // Determine class names based on props
    const selectClassName = classNames('p-dropdown', {
        'p-invalid': touched && error,
        'p-disabled': disabled,
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
            <Dropdown
                id={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur} // Ensure this matches expected type
                options={options}
                optionLabel={optionLabel}
                optionValue={optionValue}
                disabled={disabled}
                className={selectClassName}
                {...otherProps}
            />
            {touched && isTextValidAndNotEmpty(error) && (
                <div>
                    <small className="p-error text-xs">{error}</small>
                </div>
            )}
        </div>
    );
};

export default FormikSelect;
