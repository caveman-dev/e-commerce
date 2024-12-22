import React from 'react';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

interface FloatInputTextProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
}

const FloatInputText = ({
    id,
    value,
    onChange,
    label,
    className,
    required,
    disabled,
    ...otherProps
}: FloatInputTextProps) => (
    <span className={classNames('p-float-label', className)}>
        <InputText
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            {...otherProps}
        />
        <label htmlFor={id}>{label}</label>
    </span>
);

export default FloatInputText;
