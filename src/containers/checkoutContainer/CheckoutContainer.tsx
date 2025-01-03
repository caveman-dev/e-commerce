import { useEffect, useRef, useState } from 'react';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

import './checkoutContainer.css';
import { Card } from 'primereact/card';
import {
    CardElement, Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { confirmDialog } from 'primereact/confirmdialog';
import { useHistory } from 'react-router-dom';
import { PAGE_ROUTES } from '../../utils/constants';
import AddAddressForm from './AddAddressForm';
import useFetchAddresses from './useFetchAddresses';
import { getAddress, getLoginState, setAddress } from '../../utils/localStorage';
import { isArrayValidAndNotEmpty, isObjectValidAndNotEmpty, isTextValidAndNotEmpty } from '../../utils/nullChecks';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import useFetchCart from '../cartContainer/useFetchCart';
import useGlobalStore from '../../store/store';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';
import CartDetails from '../cartContainer/CartDetails';

const stripePromise = loadStripe('pk_test_51QVxiNKK9SwEjkXLW21YMUBkqGZflyTspGBPVu9ZQmkE6bDlmGO1vX1kj7sUyLAprnr8S0pibCNy5w15dA0sDhLn00qLQ3fEtb');

const CheckoutContainer = () => {
    const stepperRef = useRef(null);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState<number>();
    const [activeStep, setActiveStep] = useState(0);
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const { infoMessage } = commonHandlers;
    const { isLoggedIn, login } = getLoginState();
    const { cart } = useGlobalStore();
    const { data: addressesData, refetch } = useFetchAddresses(login?.userId as number);
    const { data: cartData, refetch: refetchCart } = useFetchCart(isLoggedIn, cart);

    const handleSelectAddress = (id:number) => {
        setSelectedAddress(id);
        setAddress(id.toString());
    };
    const { totalCartValue } = useGlobalStore();

    const { hash } = window.location;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const queryParams = new URLSearchParams(queryString);
    // Get the thirdLevelCategory
    const transactionStatus = queryParams.get('transactionStatus');
    const history = useHistory();
    useEffect(() => {
        const currentAddress = getAddress();
        const handleOrder = async () => {
            const createOrderPromise = axios.post(
                `${api.ORDERS.CREATE}?userId=${login?.userId}`,
                {
                    shippingAddress: {
                        id: currentAddress,
                    },
                    paymentDetails: {
                        paymentType: 'CASH_ON_DELIVERY',
                    },
                },
            );
            const [response] = await resolvePromise(createOrderPromise, commonHandlers, 'Order Placed');
            if (response) {
                setAddress('');
            }
        };

        if (isTextValidAndNotEmpty(transactionStatus)) {
            setActiveStep(2);
            handleOrder();
        }
        if (isTextValidAndNotEmpty(currentAddress)) {
            setSelectedAddress(Number(currentAddress));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (Array.isArray(cartData)) {
            // @ts-ignore
            setDisplayProducts(cartData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(cartData)]);

    const makePayment = async () => {
        const paymentIntentPromise = axios.post(api.PAYMENT.INTENT, {
            amount: totalCartValue,
            quantity: 1,
            currency: 'USD',
            name: 'Corals',
        });
        const [response] = await resolvePromise(paymentIntentPromise, commonHandlers);
        if (isObjectValidAndNotEmpty(response)) {
            // @ts-ignore
            window.location.href = response.sessionUrl;
        }
    };

    const handleNavigateToHome = () => {
        history.push(PAGE_ROUTES.BASE_ROUTE);
    };

    const handleStepperNext = async () => {
        switch (activeStep) {
            case 0:
                if (!selectedAddress) {
                    infoMessage('Select Address to proceed');
                    return;
                }
                setActiveStep((prevStep) => prevStep + 1);
                break;
            case 1:
                setActiveStep((prevStep) => prevStep + 1);
                makePayment();
                break;
            default:
                break;
        }
        // @ts-ignore
        stepperRef?.current?.nextCallback();
    };
    console.log('handleStepperNext: ', handleStepperNext);
    const handleStepperBack = () => {
        // @ts-ignore
        stepperRef.current.prevCallback();
        setActiveStep((prevStep) => prevStep - 1);
    };
    const handleDeleteAddress = (id:number) => {
        confirmDialog({
            message: 'Are you sure you want to delete this Address?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                const deletePromise = axios.delete(`${api.ADDRESSES.DELETE}${id}`);
                const [success] = await resolvePromise(deletePromise, commonHandlers, 'Address deleted');
                if (success) {
                    refetch();
                }
            },
        });
    };

    const confirmAddress = () => (
        <div style={{ height: '70vh' }} className=" flex justify-content-between w-full  ">
            <div className="w-6  p-2  overflow-y-auto cart">
                <div className="p-2 b text-2xl font-large">
                    Select Address
                </div>
                {/* @ts-ignore */}
                { addressesData?.length === 0 && (
                    <Card>
                        No addresses added.
                    </Card>
                )}
                {isArrayValidAndNotEmpty(addressesData) &&
                // @ts-ignore
                addressesData.map((address) => (
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                    // @ts-ignore
                        onClick={() => handleSelectAddress(address.id)}
                        // @ts-ignore
                        key={address.nameOfAddress}
                        // @ts-ignore
                        className={`w-full border-2 border-round-lg card hover:bg-primary mt-3 cursor-pointer ${selectedAddress === address.id ? 'bg-primary mt-3 cursor-pointer' : ''}`}
                    >
                        <div className="flex justify-content-between">
                            {/* @ts-ignore */}
                            <div className="text-2xl font-medium">{address.nameOfAddress?.toUpperCase()}</div>
                            <Button
                                icon="pi pi-trash"
                                className=" p-button-danger p-m-2"
                                //  @ts-ignore
                                onClick={() => handleDeleteAddress(address.id)}
                            />
                        </div>
                        <div className="text-xl font-medium pl-2 mt-2">
                            {/* @ts-ignore */}
                            {address.firstName}
&nbsp;
                            {/* @ts-ignore */}
                            {address.secondName}
                        </div>
                        <div className="pl-2">
                            {/* @ts-ignore */}
                            {address.streetAddress}
                            ,
                            {/* @ts-ignore */}
                            {address.state}
                            ,
                            {/* @ts-ignore */}
                            {address.city}
                            {' '}
                            {/* @ts-ignore */}
                            {address.zipCode}
                        </div>
                        <div className="text-xl mt-2  font-medium pl-2">
                            Contact:
                            {/* @ts-ignore */}
                            {address.mobile}
                        </div>
                    </div>
                ))}
            </div>
            <Divider style={{ backgroundColor: 'transparent!important' }} layout="vertical">
                <span className="p-tag m-0">OR</span>
            </Divider>
            <div className="w-6  p-2 ">
                <div className="text-2xl p-2">Add Address</div>
                <AddAddressForm refetch={refetch} />
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: 'transparent' }} className="card flex justify-content-center">
            <Stepper
                activeStep={activeStep}
                ref={stepperRef}
                // @ts-ignore
                className="w-full"
                headerPosition="bottom"
                linear
            >
                {/* @ts-ignore */}
                <StepperPanel header="Confirm Address">
                    {confirmAddress()}
                    <div className="flex pt-4 justify-content-end">
                        {/* @ts-ignore */}
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={handleStepperNext} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Confirm Order">
                    <div style={{ height: '70vh' }} className=" flex justify-content-end  ">
                        <div className="w-14 ">
                            <img
                                src="/order-confirmed.svg"
                                style={{
                                    objectFit: 'contain',
                                    width: '100%',
                                    height: '60vh',
                                }}
                                alt="error"
                            />
                        </div>
                        <div style={{ maxHeight: '72vh', overflowY: 'scroll' }} className="w-8   pt-1 cart ">
                            <CartDetails
                                displayProducts={displayProducts}
                                refetch={refetchCart}
                            />
                        </div>

                    </div>
                    <div className="flex pt-4 justify-content-between">
                        {/* @ts-ignore */}
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={handleStepperBack} />
                        {/* @ts-ignore */}
                        <Elements stripe={stripePromise}>
                            <CardElement />
                            <button
                                type="button"
                                onClick={handleStepperNext}
                                className="border-3 bg-primary-reverse border-round-lg border-primary
                            w-2 flex justify-content-around align-items-center  sticky bottom-0
                            p-3 hover:bg-primary hover:text-primary-reverse text-primary hover:border-primary-reverse
                            cursor-pointer z-4"
                            >
                                <div>
                                    <span>
                                        <i className="pi pi-receipt" />
&nbsp;
                                    </span>
                                    <span>CHECKOUT</span>
                                </div>
                                <div>
                                    ₹
                                    {totalCartValue}
                                </div>
                            </button>
                        </Elements>
                    </div>
                </StepperPanel>
                <StepperPanel header="Payment">
                    <div style={{ height: '70vh' }} className="w-full flex justify-content-center align-items-start">
                        {/* <ProcessingAnimation /> */}

                        {/* <CheckoutForm /> */}
                        <div className="w-6 ">
                            <img
                                src={transactionStatus === 'success' ? '/orderSuccessfull.png' : '/paymentFailed.png'}
                                style={{
                                    objectFit: 'contain',
                                    width: '100%',
                                    height: '50vh',
                                }}
                                alt="error"
                            />
                            <div className="text-center font-light  text-3xl ">
                                {transactionStatus === 'success' ? '🎉 Order Confirmed! We’ll start preparing your items right away—thank you for choosing Corals! 🌊' : '⚠️ Payment Unsuccessful: Oops, it looks like something went wrong with your payment. Please try again or contact us for assistance.'}
                            </div>
                            <div className="flex justify-content-center pt-4">
                                <Button className="btn btn-primary p-button-success" icon="pi pi-shopping-bag" label="Continue Shopping" onClick={handleNavigateToHome} />
                            </div>
                        </div>

                    </div>
                    <div className="flex pt-4 justify-content-start">
                        {/* @ts-ignore */}
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={handleStepperBack} />
                    </div>
                </StepperPanel>
            </Stepper>
        </div>
    );
};

export default CheckoutContainer;
