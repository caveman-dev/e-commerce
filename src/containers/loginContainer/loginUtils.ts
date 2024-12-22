import * as Yup from 'yup';

export const registrationFormFieldLabel = {
    FIRSTNAME: 'Firstname',
    LASTNAME: 'Lastname',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    MOBILE_NUMBER: 'Mobile Number',
};

export const registrationFormFieldName = {
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    EMAIL: 'emailId',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    MOBILE_NUMBER: 'phoneNumber',
};
export const loginFormFieldLabel = {
    EMAIL_OR_PHONE: 'Email/Phone',
    PASSWORD: 'Password',
};

export const loginFormFieldName = {
    EMAIL_OR_PHONE: 'emailOrPhone',
    PASSWORD: 'password',
};

export const initialRegistrationValues = {
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
};

export const initialLoginValues = {
    emailOrPhone: '',
    password: '',
};

export const LOGIN_FORM_VALIDATION = Yup.object().shape({
    emailOrPhone: Yup.string()
        .required('This field cannot be empty')
        .test('email-or-phone', 'Must be a valid email or a 10-digit phone number', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;

            if (!value) return false;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
    password: Yup.string()
        .required('Password cannot be empty'),
});

export const REGISTRATION_FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required('Firstname is required'),
    lastName: Yup.string().required('Lastname is required'),
    emailId: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password cannot be empty')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    phoneNumber: Yup.number()
        .typeError('Phone number must be a number')
        .required('Phone number cannot be empty')
        .test('len', 'Phone number must be exactly 10 digits', (val) => {
            if (val === undefined) return false; // Handle undefined case
            return val.toString().length === 10;
        }),
});

export const a = 'a';
