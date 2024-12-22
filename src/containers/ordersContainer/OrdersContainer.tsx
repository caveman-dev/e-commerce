import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Rating, RatingChangeEvent } from 'primereact/rating';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import useFetchOrders from './useFetchOrders';
import { getLoginState } from '../../utils/localStorage';
import { converToStringDate } from '../../utils/DateUtils';
import { isNumberValid } from '../../utils/nullChecks';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';

const OrdersContainer = () => {
    const { login } = getLoginState();
    const { data, isLoading, refetch } = useFetchOrders(login?.userId);
    console.log('isLoading: ', isLoading);
    const [reviewDiaog, setReviewDialog] = useState(false);
    const [currentReview, setCurrentReview] = useState('');
    const [currentProduct, setCurrentProduct] = useState();
    const [currentRating, setCurrentRating] = useState(0);

    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const { infoMessage } = commonHandlers;

    console.log();
    const handleCloseDialog = () => {
        refetch();
        setReviewDialog(false);
        setCurrentReview('');
        setCurrentProduct(undefined);
        setCurrentRating(0);
    };
    // @ts-ignore
    const handleOpenDialog = (product) => {
        setCurrentProduct(product);
        setReviewDialog(true);
    };

    const handleReviewChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentReview(e.target.value);
    };
    const handleSubmitReview = async () => {
        console.log('currentRating: 34234', currentRating);
        if (!currentRating) {
            infoMessage('Rate product to submit review!');
            return;
        }
        const payload = {
            // @ts-ignore
            productId: currentProduct.productId,
            review: currentReview,
            // eslint-disable-next-line no-bitwise
            rating: currentRating | 0,
        };
        const submitReviewPromise = axios.post(api.REVIEWS.CREATE, payload);
        await resolvePromise(submitReviewPromise, commonHandlers, 'Review Submitted');
        console.log('currentProduct: ', currentProduct);
        handleCloseDialog();
    };

    const handleRatingChange = (e: RatingChangeEvent) => {
        // Update the state with the new rating value
        if (isNumberValid(e?.value)) {
            setCurrentRating(e?.value);
        }
    };
    return (
        <div className="card w-full" style={{ minHeight: '90vh' }}>
            <div className="text-4xl font-bold font-italic">
                Account
            </div>
            <div className="text-xl font-medium mb-2 font-italic">
                {login?.firstName}
&nbsp;
                {login?.lastName}
            </div>
            <Divider />
            <div className="mb-2 flex w-full justify-content-between align-items-center">

                <div className="text-3xl font-semibold font-italic">
                    All orders
                </div>
                <div className="flex align-items-center">
                    <div>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText placeholder="Search" type="text" className="w-4rem sm:w-auto p-inputtext-sm" />
                            {/* <InputText v-model="value1" placeholder="Search" /> */}
                        </IconField>
                    </div>
                    <div>
                        <Button className="m-1 hover:bg-primary hover:text-primary-reverse" icon="pi pi-filter" label="Filter" outlined />
                    </div>
                </div>
            </div>
            {/* @ts-ignore */}
            {data?.map((order) => order?.orderItems.map((item) => (
                // @ts-ignore
                <div key={`${order.orderId}-${item.productId}`} className="w-full  m-2 border-2 bg-primary-reverse border-round-lg shadow-8">
                    <div className="bg-round-lg card p-2 ">
                        <div className="w-full flex align-items-center  mb-2">
                            <div>
                                <i className="pi pi-box  border-circle bg-primary m-2" style={{ fontSize: '1.5rem', padding: '10px' }} />
                            </div>
                            <div className="">
                                <div className="text-primary font-medium text-xl mb-2">
                                    {' '}
                                    {/* @ts-ignore */}
                                    {order?.orderStatus ?? ''}
                                </div>
                                <div className="text-xl text-bluegray-600">
                                    {/* @ts-ignore */}
                                    {converToStringDate(order?.orderDate)}
                                </div>
                            </div>

                        </div>
                        <div className="border-round-lg w-full">
                            <div
                                className="border-round-lg flex justify-content-start  p-2 "
                            >
                                <div className="w-10rem h-12rem m-2 border-2 bg-bluegray-800 border-round-lg ">
                                    <img
                                        src={item.mainImageUrl}
                                        alt="PRODUCT"
                                        className="w-full h-full border-round-lg"
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="p-2 m-2 w-full">
                                    <div className="text-2xl font-medium  font-italic mb-2">{item.productName}</div>
                                    <div className="text-xl mb-2">{item.brand}</div>
                                    <div className="text-xl mb-2">
                                        Size:
                                        {item.size}
                                    </div>
                                    <Divider />

                                    <div className="w-full flex justify-content-between  pt-2 mt-2 text-lg">
                                        <div>
                                            <Rating
                                                value={item.rating ?? 0}
                                                readOnly
                                                cancel={false}
                                            />
                                        </div>
                                        {!item.review && (
                                            <Button
                                                outlined
                                                raised
                                                onClick={() => handleOpenDialog(item)}
                                            >
                                                Write review
                                            </Button>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )))}
            <Dialog
                header={<div className="text-2xl font-semibold  font-italic mb-2">Write a review</div>}
                visible={reviewDiaog}
                style={{ width: '50vw' }}
                onHide={handleCloseDialog}
            >
                <div className="flex w-full justify-content-start gap-4 mb-2 align-items-center">
                    <div className="text-xl font-medium  font-italic mb-2">
                        {/* @ts-ignore */}
                        {currentProduct?.productName}
                    </div>
                    <Rating className="mb-2" onChange={handleRatingChange} value={currentRating} cancel={false} />
                </div>
                <p className="m-0">
                    <InputTextarea
                        autoResize
                        placeholder="Tell us what you think about this item!"
                        className="w-full"
                        value={currentReview}
                        onChange={handleReviewChange}
                        rows={5}
                    />
                </p>

                <div className="justify-content-end flex w-full pt-2">
                    <Button raised onClick={handleSubmitReview}>
                        Submit
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default OrdersContainer;
