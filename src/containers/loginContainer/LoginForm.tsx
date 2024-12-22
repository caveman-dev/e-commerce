import { Field, useFormikContext } from 'formik';
import { Button } from 'primereact/button';
import FormikTextfield from '../../components/formik/fieldComponents/formikTextfield/FormikTextfield';
import FormikPasswordField from '../../components/formik/fieldComponents/formikPasswordField/FormikPasswordField';
import { loginFormFieldLabel, loginFormFieldName } from './loginUtils';

type Props = {
    handleRegistrationLoginToggle:()=>void
};

const LoginForm = ({ handleRegistrationLoginToggle }:Props) => {
    console.log();
    const {
        handleSubmit,
    } = useFormikContext();
    return (
        <div className="flex flex-column w-full p-6 ">
            <div className="text-lg font-bold m-2">Log in</div>
            <div>
                <Field
                    component={FormikTextfield}
                    name={loginFormFieldName.EMAIL_OR_PHONE}
                    className="w-full"
                    placeholder="Enter Email or Phone"
                    label={loginFormFieldLabel.EMAIL_OR_PHONE}
                />
            </div>
            <div>
                <Field
                    component={FormikPasswordField}
                    inputClassName="w-full"
                    name={loginFormFieldName.PASSWORD}
                    className="w-full mt-2"
                    label={loginFormFieldLabel.PASSWORD}
                />
            </div>
            <div className="flex justify-content-start align-items-center mt-2">
                <div>
                    <Button className="w-16rem" label="Login" type="submit" onClick={() => handleSubmit()} size="small" />
                    <div className="text-xs p-1 font-bold flex justify-content-start align-items-center">
                        <span>New User?</span>
                        <Button
                            size="small"
                            onClick={handleRegistrationLoginToggle}
                            label="Signup"
                            text
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
