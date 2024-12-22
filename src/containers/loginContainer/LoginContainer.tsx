import { Formik } from 'formik';
// import { Button } from 'primereact/button';
// import { Divider } from 'primereact/divider';
import { Galleria } from 'primereact/galleria';
// import { classNames } from 'primereact/utils';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
    initialLoginValues,
    initialRegistrationValues, LOGIN_FORM_VALIDATION, REGISTRATION_FORM_VALIDATION,
} from './loginUtils';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';
import { persistLogin } from '../../utils/localStorage';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import useGlobalStore from '../../store/store';
import { GlobalState } from '../../store/storeTypes';
import { PAGE_ROUTES } from '../../utils/constants';
import { Roles } from '../../types/loginTypes';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';

const LoginContainer = () => {
    console.log();
    const history = useHistory();
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const { errorMessage } = commonHandlers;
    console.log('errorMessage: ', errorMessage);
    const setLogin = useGlobalStore((state: GlobalState) => state.setLogin);
    console.log('setLogin: ', setLogin);
    const setAdmin = useGlobalStore((state: GlobalState) => state.setAdmin);
    console.log('setAdmin: ', setAdmin);

    const [registrationLoginToggle, setRegistrationLoginToggle] = useState(true);

    const redirectToDestination = (isUserAdmin:boolean) => {
        const destination = isUserAdmin ? PAGE_ROUTES.ADMIN_DASHBOARD : PAGE_ROUTES.BASE_ROUTE;
        history.push(destination);
    };
    console.log('redirectToDestination: ', redirectToDestination);
    // const[isSubmitting,setIsSubmitting]
    const handleRegistrationLoginToggle = () => {
        setRegistrationLoginToggle((prevState) => !prevState);
    };

    const galleriaRef = useRef(null);
    // const galleriaClassName = classNames('custom-galleria', {
    //     fullscreen: false,
    // });
    const images = [
        {
            itemImageSrc: '/loginImages/login1.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1',
        },
        {
            itemImageSrc: '/loginImages/login2.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2',
        },
        {
            itemImageSrc: '/loginImages/login3.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3',
        },
        {
            itemImageSrc: '/loginImages/login4.webp',
            // thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 4',
            title: 'Title 4',
        },
    ];
    const itemTemplate = (item:unknown) => (
        <img
            // @ts-ignore
            src={item.itemImageSrc}
            // @ts-ignore
            alt={item.alt}
            className="shadow-8"
            style={{
                width: '46vw', height: '80vh', objectFit: 'cover', borderRadius: '10px 100px 10px 100px ',
            }}
        />
    );

    const handleSubmit = async (payload:object) => {
        console.log('test:234234 ', payload);
        const updatedPayload = {
            ...payload,
            // role: Roles.ROLE_ADMIN,
        };
        // payload.role=
        // const loginPayload = { login };
        const loginPromise = axios.post(registrationLoginToggle ?
            api.USERS.REGISTER_NEW_USER : api.USERS.AUTHENTICATE_AND_GET_TOKEN, updatedPayload);

        const loginResolve = await resolvePromise(
            loginPromise,
            commonHandlers,
            registrationLoginToggle ? 'Registration complete' : 'Welcome back!',
        );
        if (isObjectValidAndNotEmpty(loginResolve[0])) {
            // @ts-ignore
            const isUserAdmin = loginResolve[0]?.role === Roles.ROLE_ADMIN;
            if (isUserAdmin) {
                setAdmin();
            }
            setLogin();
            // @ts-ignore
            persistLogin(loginResolve[0]);
            redirectToDestination(isUserAdmin);
        }
        //  else {
        //     const error = loginResolve[1] as AxiosError<ErrorType>;
        //     if (didApiCallFailDueToUnauthorizedUser(error)) {
        //         errorMessage('Authentication Failed');
        //     } else {
        //         const currentErrorMessage = getErrorMessage(error);
        //         errorMessage(currentErrorMessage);
        //     }
        // }
        // const loginResp = await axios.post(API.SESSION.AUTHENTICATE, values);
    };
    return (
        <div style={{ height: '100%' }} className="w-full  flex justify-content-between align-items-center grid ">
            <div className="col-6 p-2 ">
                <div className="card pb-8">
                    <Galleria
                        ref={galleriaRef}
                        value={images}
                        showThumbnails={false}
                        showItemNavigatorsOnHover
                        numVisible={4}
                        circular
                        autoPlay
                        transitionInterval={5000}
                        item={itemTemplate}
                    />
                </div>

            </div>
            <div className="col-6 pl-8 pr-8">
                <div>
                    <Formik
                        initialValues={
                            registrationLoginToggle ?
                                initialRegistrationValues : initialLoginValues
                        }
                        onSubmit={handleSubmit}
                        validationSchema={
                            registrationLoginToggle ?
                                REGISTRATION_FORM_VALIDATION : LOGIN_FORM_VALIDATION
                        }
                        validateOnChange={false}
                        validateOnMount={false}
                        validateOnBlur
                    >
                        {
                            registrationLoginToggle ? (
                                <RegistrationForm
                                    handleRegistrationLoginToggle={handleRegistrationLoginToggle}
                                />
                            ) : (
                                <LoginForm
                                    handleRegistrationLoginToggle={handleRegistrationLoginToggle}
                                />
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default LoginContainer;