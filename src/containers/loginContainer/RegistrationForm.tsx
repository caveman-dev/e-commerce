import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Field, useFormikContext } from 'formik';
// import { useState } from 'react';
import { registrationFormFieldLabel, registrationFormFieldName } from './loginUtils';
import FormikTextfield from '../../components/formik/fieldComponents/formikTextfield/FormikTextfield';
import FormikPasswordField from '../../components/formik/fieldComponents/formikPasswordField/FormikPasswordField';

type Props = {
    handleRegistrationLoginToggle:()=>void;
};

const RegistrationForm = ({ handleRegistrationLoginToggle }:Props) => {
    console.log();
    const {
        handleSubmit,
    } = useFormikContext();

    return (
        <div>
            <div className="flex flex-column w-full ">
                <div className="text-center text-sm font-bold">
                    Create you account
                </div>
                <div className="flex justify-content-center align-items-center mt-2">
                    <Button label="Login with Google" icon="pi pi-google" outlined size="small" />
                </div>
                <Divider align="center">
                    <span className="p-tag m-0">OR</span>
                </Divider>
                <div>
                    {/* <div>
                        {registrationFormFieldLabel.FIRSTNAME}
                    </div> */}
                    <div className="grid">
                        <div className="col-6">
                            <Field
                                component={FormikTextfield}
                                name={registrationFormFieldName.FIRSTNAME}
                                placeholder="John"
                                className="w-full"
                                // onKeyDown={handleKeyDown}
                                label={registrationFormFieldLabel.FIRSTNAME}
                            // autoFocus
                            />
                        </div>
                        <div className="col-6">
                            <Field
                                component={FormikTextfield}
                                name={registrationFormFieldName.LASTNAME}
                                className="w-full"
                                // onKeyDown={handleKeyDown}
                                label={registrationFormFieldLabel.LASTNAME}
                                placeholder="Doe"
                            // autoFocus
                            />
                        </div>
                    </div>
                    <div>
                        <Field
                            component={FormikTextfield}
                            name={registrationFormFieldName.EMAIL}
                            // onKeyDown={handleKeyDown}
                            className="w-full"
                            placeholder="johndoe@example.com"
                            label={registrationFormFieldLabel.EMAIL}
                        />
                    </div>
                    <div>
                        <Field
                            component={FormikTextfield}
                            name={registrationFormFieldName.MOBILE_NUMBER}
                            // onKeyDown={handleKeyDown}
                            className="w-full mt-1"
                            label={registrationFormFieldLabel.MOBILE_NUMBER}
                            // autoFocus
                        />
                    </div>
                    <div className="grid">
                        <div className="col-6">
                            <Field
                                component={FormikPasswordField}
                                name={registrationFormFieldName.PASSWORD}
                                inputClassName="w-full"
                                // onKeyDown={handleKeyDown}
                                className="w-full"
                                label={registrationFormFieldLabel.PASSWORD}
                            // autoFocus
                            />
                        </div>
                        <div className="col-6">
                            <Field
                                component={FormikPasswordField}
                                name={registrationFormFieldName.CONFIRM_PASSWORD}
                                inputClassName="w-full"
                                // onKeyDown={handleKeyDown}
                                className="w-full "
                                label={registrationFormFieldLabel.CONFIRM_PASSWORD}
                            // autoFocus
                            />
                        </div>
                    </div>
                    <div className="flex justify-content-center align-items-center mt-2">
                        <div>
                            <Button className="w-20rem" label="Sign Up" size="small" type="submit" onClick={() => handleSubmit()} />
                            <div className="text-xs p-1 font-bold flex justify-content-start align-items-center">
                                <span>Already have an account?</span>
                                <Button
                                    size="small"
                                    onClick={handleRegistrationLoginToggle}
                                    label="Login"
                                    text
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
