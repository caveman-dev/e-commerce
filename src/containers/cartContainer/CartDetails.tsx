import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import { getLoginState, setCartToLocal } from '../../utils/localStorage';
import resolvePromise from '../../utils/resolvePromise';
import { isNotNullOrUndefined, isObjectValidAndNotEmpty } from '../../utils/nullChecks';
// import useGlobalStore from '../../store/store';
// import { GlobalState } from '../../store/storeTypes';
// import useFetchCart from './useFetchCart';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import { PAGE_ROUTES } from '../../utils/constants';
import api from '../../utils/api';
import useGlobalStore from '../../store/store';
import { GlobalState } from '../../store/storeTypes';
import { NumberOf } from '../../utils/commonUtils';

type Props = {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    // @ts-ignore
    // handleDisplayProducts?:([any])=>void;
    checkout?:boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    displayProducts:any[];
    refetch:()=>void
};

const CartDetails = (props:Props) => {
    console.log('props: ', props);
    const { checkout, displayProducts, refetch } = props;
    console.log('displayProducts:42344234234 ', displayProducts);
    // const [displayProducts, setDisplayProducts] = useState([]);
    const [products, setProducts] = useState([]);
    // const [cartToggle, setCartToggle] = useState(false);
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const { errorMessage } = commonHandlers;
    const { isLoggedIn } = getLoginState();
    const [customLoginState, setCustomLoginState] = useState(isLoggedIn);
    const setCart = useGlobalStore((state: GlobalState) => state.setCart);
    const setTotalCartValue = useGlobalStore((state: GlobalState) => state.setTotalCartValue);

    console.log('customLoginState:234234234 ', customLoginState);
    console.log('setCustomLoginState: ', setCustomLoginState);
    // const { data, refetch } = useFetchCart(customLoginState, cartToggle);

    const history = useHistory();

    useEffect(() => {
        const productsValue = displayProducts.map((product) => ({
            // @ts-ignore
            productId: isLoggedIn ? product.productId : product.id,
            // @ts-ignore
            size: product.cartSize,
            // @ts-ignore
            quantity: product.cartQuantity,
            // @ts-ignore
            price: product.price,
            // @ts-ignore
            discountedPrice: product.discountedPrice,
        }));
        // @ts-ignore
        setProducts(productsValue);
    }, [displayProducts, isLoggedIn]);
    // const enableFetchCart = () => {
    //     setCustomLoginState(isLoggedIn);
    // };

    // useEffect(() => {
    //     refetch();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [cartToggle]);

    // @ts-ignore
    const handleRemoveItem = async (id) => {
        const accept = async () => {
            if (isLoggedIn) {
                const toBeDeletedCartItem = displayProducts.find(
                    // @ts-ignore
                    (product) => product.productId === id,
                );
                console.log('toBeDeletedCartItem: ', toBeDeletedCartItem);
                // @ts-ignore
                const removePromise = axios.delete(`${api.CARTS.REMOVE}?cartItemId=${toBeDeletedCartItem.cartItemId}`);
                const [response] = await resolvePromise(removePromise, commonHandlers, 'Removed Item from cart');
                console.log('response:23423423 ', response);
                if (response) {
                    // setCartToggle((prevState) => !prevState);
                    refetch();
                    if (displayProducts.length === 1) {
                        // setCustomLoginState(false);
                    }
                }
            } else {
                const updateProductQuantity = products.filter(
                    // @ts-ignore
                    (product) => product.productId !== id,
                );
                const updateProductQuantityLocal = displayProducts.map(
                    // @ts-ignore
                    (product) => product.id !== id,
                );
                setCartToLocal(updateProductQuantityLocal);
                // @ts-ignore
                setProducts(updateProductQuantity);
                console.log();
            }
            setCart();
        };

        confirmDialog({
            message: 'Are you sure you want to delete this item from cart?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
        });
    };

    // @ts-ignore
    const handleQuantityIncrease = async (id) => {
        if (isLoggedIn) {
            const updatedItem = displayProducts.find(({ productId }) => productId === id);
            console.log('updatedItem:234234234 ', updatedItem);
            if (isObjectValidAndNotEmpty(updatedItem)) {
                // @ts-ignore
                const quantity = Number(updatedItem?.cartQuantity) + 1;
                // @ts-ignore
                const updateCartPrmosie = axios.put(`${api.CARTS.UPDATE}?cartItemId=${updatedItem?.cartItemId}&quantity=${quantity}`);
                const [response] = await resolvePromise(updateCartPrmosie, commonHandlers);
                if (response) {
                    refetch();
                }
            }
            // reftech;
        } else {
            const updateProductQuantity = products.map((product) => {
                // @ts-ignore
                if (product.productId !== id) return product;
                // @ts-ignore
                return { ...product, quantity: Number(product.quantity) + 1 };
            });

            const updateProductQuantityLocal = displayProducts.map((product) => {
                console.log('product:3423423432 ', product);
                // @ts-ignore
                if (product.id !== id) return product;
                // @ts-ignore
                return { ...product, cartQuantity: Number(product.cartQuantity) + 1 };
            });
            setCartToLocal(updateProductQuantityLocal);
            // @ts-ignore
            setProducts(updateProductQuantity);
        }
    };
    // @ts-ignore
    const handleQuantityDecrease = async (id) => {
        if (isLoggedIn) {
            const updatedItem = displayProducts.find(({ productId }) => productId === id);
            if (isObjectValidAndNotEmpty(updatedItem)) {
                // @ts-ignore
                const quantity = Number(updatedItem?.cartQuantity) - 1;
                if (quantity > 0) {
                    const updateCartPrmosie = axios.put(
                    // @ts-ignore
                        `${api.CARTS.UPDATE}?cartItemId=${updatedItem?.cartItemId}&quantity=${quantity}`,
                    );
                    const [response] = await resolvePromise(updateCartPrmosie, commonHandlers);
                    if (response) {
                        refetch();
                    }
                } else {
                    errorMessage('Quantity cannot be less than 1');
                }
            }
        } else {
            const updateProductQuantity = products.map((product) => {
                // @ts-ignore
                if (product.productId !== id) return product;
                // @ts-ignore
                if (product.quantity === 1) {
                    errorMessage('Quantity cannot be less than 1');
                    return product;
                }
                // @ts-ignore
                return { ...product, quantity: Number(product.quantity) - 1 };
            });
            const updateProductQuantityLocal = displayProducts.map((product) => {
                console.log('product:4234234234 ', product);
                // @ts-ignore
                if (product.id !== id) return product;
                // @ts-ignore
                // @ts-ignore
                if (product.cartQuantity === 1) {
                    errorMessage('Quantity cannot be less than 1');
                    return product;
                }
                // @ts-ignore
                return { ...product, cartQuantity: Number(product.cartQuantity) - 1 };
            });
            setCartToLocal(updateProductQuantityLocal);
            // @ts-ignore
            setProducts(updateProductQuantity);
        }
    };

    const memoisedBillingSummary = useMemo(() => {
        const subTotal = products.reduce((acc, obj) => Number(acc) +
        // @ts-ignore
         (obj.discountedPrice * obj.quantity), 0);
        const gstValue = subTotal * 0.18;
        const grandTotal = subTotal + gstValue + 299;
        return {
            subTotal,
            gstValue,
            grandTotal,
        };
    }, [products]);

    useEffect(() => {
        if (isNotNullOrUndefined(memoisedBillingSummary.grandTotal)) {
            setTotalCartValue(NumberOf(memoisedBillingSummary.grandTotal));
        }
    }, [memoisedBillingSummary.grandTotal, setTotalCartValue]);

    const accept = () => {
        history.push(PAGE_ROUTES.LOGIN);
    };

    const handleCheckout = () => {
        if (isLoggedIn) {
            history.push(PAGE_ROUTES.CHECKOUT);
        } else {
            confirmDialog({
                message: 'To proceed with checkout, you need to log in or register. Would you like to navigate to the login screen now?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                defaultFocus: 'accept',
                accept,
            });
        }
    };

    console.log();
    return (
        <>
            <div className={`${checkout ? 'p-1' : 'pl-4 pr-4'} w-full m-0 cart`}>

                {displayProducts.map((product, index) => (
                    <div
                        // @ts-ignore
                        key={product.id ?? product?.productId}
                        className="shadow-8 flex relative justify-content-start border-3 border-primary border-round-lg p-2 bg-secodary-reverse-100 hover-enlarge p-shadow-3 mb-2 mt-2 z-4 "
                    >
                        <div className="w-10rem h-12rem ">
                            <img
                                // @ts-ignore
                                src={product.mainImageUrl}
                                alt="PRODUCT"
                                className="w-full bg-black-500 h-full border-round-lg  hover-card p-1 border-2 border-primary   "
                                style={{
                                    objectFit: 'contain',
                                    // display: imagesLoaded ? 'block' : 'none',
                                }}
                            />
                        </div>
                        <div className="w-7  p-1 ">
                            {/* @ts-ignore */}
                            <div className=" p-2 font-bold  text-xl">{product.title}</div>
                            <div className="p-2 text-base ">
                                <span className="text-red-600">
                                    {/* @ts-ignore */}
                                    {product.discountPercent}
                                    %
                                    {' '}
                                </span>
                                {' '}
                                <span>
                                    ₹
                                    {/* @ts-ignore */}
                                    {product.discountedPrice}
                                </span>
                            </div>

                            <div className=" p-2 text-base line-through   ">
                                ₹
                                {' '}
                                {/* @ts-ignore */}
                                {product.price}
                            </div>
                            <div className="w-full p-2">
                                Size - &nbsp;
                                {/* @ts-ignore */}
                                <span className="bg-primary p-2 border-round-lg p-1">{product.cartSize}</span>
                                {' '}

                            </div>
                            <div className="flex justify-content-start align-items-center gap-2 pl-2 pt-2   ">
                                {/* eslint-disable-next-line max-len */}
                                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
                                <i
                                    className="pi pi-minus hover:bg-primary p-2 border-round-lg z-2 cursor-pointer"
                                    onClick={() => handleQuantityDecrease(
                                        // @ts-ignore
                                        product.id ?? product.productId,
                                    )}
                                />
                                {' '}
                                    &nbsp;
                                {/* @ts-ignore */}
                                {products[index]?.quantity}
                                    &nbsp;
                                {' '}
                                {/* eslint-disable-next-line max-len */}
                                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
                                <i
                                    onClick={() => handleQuantityIncrease(
                                        // @ts-ignore
                                        product.id ?? product.productId,
                                    )}
                                    className="pi pi-plus hover:bg-primary p-2 border-round-lg z-2 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="absolute w-full h-full top-0  flex justify-content-end align-items-center pr-4 pb-4">
                            <Button
                                className="pi pi-trash"
                                size="small"
                                onClick={() => handleRemoveItem(
                                    // @ts-ignore
                                    product.id ?? product.productId,
                                )}
                            />
                        </div>
                    </div>
                )) }
            </div>
            {/* @ts-ignore   */}
            { displayProducts.length > 0 &&
                 (
                     <>
                         <div className="border-1 w-full border-primary mt-2 mb-2 " />
                         <div className="font-italic">
                             <div className="w-full flex justify-content-between align-items-center p-2  ">
                                 <div>Subtotal </div>
                                 <div>
                                     {' '}
                                     ₹
                                     {memoisedBillingSummary.subTotal}
                                 </div>
                             </div>
                             <div className="w-full flex justify-content-between align-items-center p-2">
                                 <div>GST(18%)</div>
                                 <div>
                                     {' '}
                                     ₹
                                     {memoisedBillingSummary.gstValue}
                                 </div>
                             </div>
                             <div className="w-full flex justify-content-between align-items-center p-2">
                                 <div>Delivery </div>
                                 <div> ₹299.00</div>
                             </div>
                         </div>
                         <div className="border-1 w-full border-primary mt-2 mb-2 " />
                         <div className="w-full flex justify-content-between align-items-center p-2">
                             <div>Grand Total </div>
                             <div>
                                 {' '}
                                 ₹
                                 {memoisedBillingSummary.grandTotal}
                             </div>
                         </div>
                         {checkout && (
                         //  eslint-disable-next-line jsx-a11y/no-static-element-interactions,
                         //   jsx-a11y/click-events-have-key-events
                             // eslint-disable-next-line max-len
                             // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                             <div
                                 onClick={handleCheckout}
                                 className="border-3 bg-primary-reverse border-round-lg border-primary
                            w-full flex justify-content-around align-items-center  sticky bottom-0
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
                                     {memoisedBillingSummary.grandTotal}
                                 </div>
                             </div>
                         )}
                     </>
                 )}
            {/* @ts-ignore */}
            {displayProducts?.length === 0 && (
                <div className="flex justify-content-center align-items-center text-2xl" style={{ height: '50vh', verticalAlign: 'center', textAlign: 'center' }}>
                    <div>
                        Your cart looks a little lonely.
                        Let’s fill it up with amazing finds!
                    </div>
                </div>
            )}
        </>
    );
};

export default CartDetails;
