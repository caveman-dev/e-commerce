// components/FormikAutoCompleteField.tsx
import React from 'react';
import { FieldInputProps, FormikProps } from 'formik';
import { classNames } from 'primereact/utils';
import AutoCompleteField, { AutoCompleteFieldProps } from '../../../inputComponent/autocompleteField/AutoCompleteField';
import { isArrayValidAndNotEmpty } from '../../../../utils/nullChecks';
import callHandlers from '../../../../utils/callHandlers';

// Props type for FormikAutoCompleteField
type FormikAutoCompleteFieldProps<FormValues, T> = Omit<AutoCompleteFieldProps<T>, 'onChange' | 'value'> & {
    field: FieldInputProps<T | T[] | null>;
    form: FormikProps<FormValues>;
    disabled?: boolean;
    className?: string;
    onChangeHandlers?:Array<string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionHandlers?: Record<string, (newValue: any, fieldName: string) => void>;
};

const FormikAutoCompleteField = <FormValues extends object, T extends object>({
    field,
    form,
    disabled = false,
    className = '',
    dataSourceApi,
    dataSourceConfig,
    // customLabel,
    itemTemplate,
    bodyClassName,
    label,
    onChangeHandlers,
    actionHandlers,
    ...otherProps
}: FormikAutoCompleteFieldProps<FormValues, T>) => {
    const {
        name, value, onChange, onBlur,
    } = field;
    const { getFieldMeta, setFieldTouched, setFieldValue } = form;
    console.log('setFieldValue: ', setFieldValue);
    const { error, touched } = getFieldMeta(name);

    // useEffect(() => {
    //     if (dataSourceApi) setFieldValue(name, null);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dataSourceApi]);

    // Handle change event
    const handleChange = (newValue: T | T[] | null) => {
        onChange({
            target: {
                name,
                value: newValue,
            },
        });
        console.log('onChangeHandlers:1312312312 ', onChangeHandlers);
        if (isArrayValidAndNotEmpty(onChangeHandlers)) {
            callHandlers(newValue, name, onChangeHandlers, actionHandlers);
        }
    };

    // Handle blur event
    const handleBlur = () => {
        onBlur({} as React.FocusEvent<HTMLInputElement>);
        setFieldTouched(name, true, false);
    };

    const autoCompleteClassName = classNames('p-autocomplete ', {
        'p-invalid': touched && error,
        'p-disabled': disabled,
    }, className);

    return (
        <div className="p-field">
            <AutoCompleteField
                id={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                dataSourceApi={dataSourceApi}
                dataSourceConfig={dataSourceConfig}
                // customLabel={customLabel}
                itemTemplate={itemTemplate}
                className={autoCompleteClassName}
                bodyClassName={bodyClassName}
                disabled={disabled}
                label={label} // Pass the label directly to AutoCompleteField
                {...otherProps}
            />
            {touched && error && (
                <small className="p-error">{error}</small>
            )}
        </div>
    );
};

export default FormikAutoCompleteField;
