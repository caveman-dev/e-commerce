import React from 'react';
import { FieldInputProps, FormikProps } from 'formik';
import { Chips, ChipsProps } from 'primereact/chips';
import { classNames } from 'primereact/utils';

type ExcludeProps = 'value' | 'onChange' | 'onBlur';

type FormikChipsProps<FormValues> = Omit<ChipsProps, ExcludeProps> & {
    field: FieldInputProps<string[]>;
    form: FormikProps<FormValues>;
    label?: string;
    className?: string;
    helperText?: string;
    fieldClassName?:string
};

const FormikChips = <FormValues extends object>({
    field,
    form,
    label,
    className,
    fieldClassName,
    helperText,
    ...otherProps
}: FormikChipsProps<FormValues>) => {
    const { name, value = [] } = field;
    const { setFieldValue, getFieldMeta, setFieldTouched } = form;
    const { touched, error } = getFieldMeta(name);

    const handleChange = (e: { value: string[] }) => {
        setFieldValue(name, e.value);
    };

    const handleBlur = () => {
        setFieldTouched(name, true, false);
    };

    const inputClassName = classNames(`p-chips p-chips-multiple-container${fieldClassName ?? ''}`, {
        'p-invalid': touched && error,
    });
    console.log('inputClassName: ', inputClassName);

    return (
        <div className={classNames('p-field', className)}>
            {label && <label htmlFor={name} className="p-label mb-1 text-sm">{label}</label>}
            <Chips
                id={name}
                value={value}
                // @ts-ignore
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full"
                style={{ width: '100%' }}
                {...otherProps}
            />
            {touched && error && (
                <small className="p-error text-xs">{error}</small>
            )}
            {!error && helperText && (
                <small className="p-helper text-xs">{helperText}</small>
            )}
        </div>
    );
};

export default FormikChips;
