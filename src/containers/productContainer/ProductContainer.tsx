import { BreadCrumb } from 'primereact/breadcrumb';
import { Galleria } from 'primereact/galleria';
import { useEffect, useMemo, useState } from 'react';
import './productContainer.css';
import { Rating } from 'primereact/rating';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
// import { TabPanel, TabView } from 'primereact/tabview';
import { TabMenu } from 'primereact/tabmenu';
// eslint-disable-next-line max-len
import axios from 'axios';
import PageLoadingAnimation from '../../components/animationComponent/pageLoadingAnimation/PageLoadingAnimation';
import useFetchProduct from './useFetchProduct';
import { isArrayValidAndNotEmpty, isTextValidAndNotEmpty } from '../../utils/nullChecks';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
// import { getLoginState } from '../../utils/localStorage';
// import useGlobalStore from '../../store/store';
// import { GlobalState } from '../../store/storeTypes';
import { getCartFromLocal, getLoginState, setCartToLocal } from '../../utils/localStorage';
import { checkIfProductPresentinCart } from '../cartContainer/cartUtils';
import useFetchCart from '../cartContainer/useFetchCart';
import useGlobalStore from '../../store/store';
import { GlobalState } from '../../store/storeTypes';
import SimilarProducts from './SimilarProducts';
import ReviewsProduct from './ReviewsProduct';
import Ratings from './Ratings';
// eslint-disable-next-line max-len
// import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';

const ProductContainer = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cartSize, setSize] = useState('');
    const { hash } = window.location;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const queryParams = new URLSearchParams(queryString);
    const id = queryParams.get('id');
    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const { errorMessage, successMessage, infoMessage } = commonHandlers;
    const setCart = useGlobalStore((state: GlobalState) => state.setCart);
    const { cart } = useGlobalStore();
    const { login, isLoggedIn } = getLoginState();
    const { data: cartData, refetch: refetchCart } = useFetchCart(isLoggedIn, cart);
    const [inCart, setInCart] = useState(false);
    const memeoisedCartData = useMemo(() => cartData, [cartData]);
    useEffect(() => {
        // @ts-ignore
        if (checkIfProductPresentinCart(Number(id), memeoisedCartData)) {
            setInCart(true);
        } else {
            setInCart(false);
        }
    }, [memeoisedCartData, id]);
    const { data: productData, isLoading, refetch } = useFetchProduct(id ?? '', login?.userId ?? null);
    if (isLoading) return <div className="w-screen h-screen"><PageLoadingAnimation /></div>;

    let images:string[] = [];
    // @ts-ignore
    if (isArrayValidAndNotEmpty(productData?.imageUrls)) {
        // @ts-ignore
        images = [...productData.imageUrls];
        // @ts-ignore
        images.unshift(productData.mainImageUrl);
        // @ts-ignore
        images = images.map((image) => ({
            itemImageSrc: image, thumbnailImageSrc: image, alt: 'Product Image',
        }));
    }
    const categories = [];
    if (isTextValidAndNotEmpty(
        // @ts-ignore
        productData?.category?.name,
    )) {
        // @ts-ignore
        categories.unshift({ label: productData.category.name });
    }
    if (isTextValidAndNotEmpty(
        // @ts-ignore
        productData?.category?.secondLevelCategory?.name,
    )) {
        // @ts-ignore
        categories.unshift({ label: productData.category.secondLevelCategory.name });
    }
    if (isTextValidAndNotEmpty(
        // @ts-ignore
        productData?.category?.topLevelCategory?.name,
    )) {
        // @ts-ignore
        categories.unshift({ label: productData.category.topLevelCategory.name });
    }

    // eslint-disable-next-line max-len
    //     { itemImageSrc: '/bannerImages/banner1.webp', thumbnailImageSrc: '/bannerImages/banner1.webp', alt: 'Shoe 1' },
    // eslint-disable-next-line max-len
    //     { itemImageSrc: '/bannerImages/banner2.webp', thumbnailImageSrc: '/bannerImages/banner2.webp', alt: 'Shoe 2' },
    // eslint-disable-next-line max-len
    //     { itemImageSrc: '/bannerImages/banner3.webp', thumbnailImageSrc: '/bannerImages/banner3.webp', alt: 'Shoe 3' },

    // ]);

    // {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemTemplate = (item: any) => (
        <img
            src={item.itemImageSrc}
            alt={item.alt}
            className="w-full border-round-lg p-shadow-5 hover-card p-1 border-1 border-primary-300 box  fadein animation-duration-500"
            style={{
                height: '60vh',
                objectFit: 'contain',
                margin: ' 0 auto',
                backgroundColor: '#FFFFFF33',
            }}
        />
    );
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const thumbnailTemplate = (item: any) => (
        <img
            src={item.thumbnailImageSrc}
            alt={item.alt}
            className="w-8rem h-8rem  border-round-lg"
            style={{ objectFit: 'cover' }}
        />
    );
    const home = { icon: 'pi pi-home' };
    const itemsProduct = [
        { label: 'Description', icon: 'pi pi-home' },
        { label: 'Reviews', icon: 'pi pi-chart-line' },
    ];

    const handleAddToWishlist = async () => {
        if (isLoggedIn) {
            // @ts-ignore
            const wishListPromise = productData.wishlist ? axios.delete(`${api.WISHLIST.REMOVE}${productData.id}`) : axios.post(`${api.WISHLIST.ADD}${productData.id}`);
            const [response] = await resolvePromise(
                wishListPromise,
                commonHandlers,
                // @ts-ignore
                `${productData?.wishlist ? 'Item removed from Wishlist' : 'Added to Wishlist'}`,
            );
            if (response) {
                refetch();
            }
        } else {
            infoMessage('Login to add product to wishlist');
        }
    };

    const handleAddToCart = async () => {
        console.log('inCart:342334234 ', inCart);
        if (isLoggedIn) {
            // @ts-ignore
            const mapProductToCartPayload = (product) => ({
                productId: product.id,
                size: cartSize,
                quantity: 1,
                price: product.price,
            }
            );
            if (inCart) {
                // @ts-ignore
                const toBeDeletedCartItem = cartData?.find(
                    // @ts-ignore
                    ({ productId }) => (productId === Number(id)),
                );
                // eslint-disable-next-line max-len
                const removePromise = axios.delete(`${api.CARTS.REMOVE}?cartItemId=${toBeDeletedCartItem.cartItemId}`);

                const response = await resolvePromise(
                    removePromise,
                    commonHandlers,
                    'Product removed from cart',
                );
                if (response) {
                    refetchCart();
                    setCart();
                }
            } else {
                if (!isTextValidAndNotEmpty(cartSize)) {
                    errorMessage('Please select a size to proceed.');
                    return;
                }
                const addToCartPromise = axios.post(
                    api.CARTS.ADD_ITEMS_TO_CART,
                    mapProductToCartPayload(productData),
                );
                const [response] = await resolvePromise(
                    addToCartPromise,
                    commonHandlers,
                    'Product added to cart',
                );
                if (response) {
                    setCart();
                    refetchCart();
                }
            }
        } else {
            // @ts-ignore
            let currentCart = isArrayValidAndNotEmpty(getCartFromLocal()) ? getCartFromLocal() : [];
            // @ts-ignore
            if (!checkIfProductPresentinCart(productData.id, cartData)) {
                if (!isTextValidAndNotEmpty(cartSize)) {
                    errorMessage('Please select a size to proceed.');
                    return;
                }
                // @ts-ignore
                currentCart.push({ ...productData, cartSize, cartQuantity: 1 });
                setInCart(true);
                successMessage('Product added to cart');
            } else {
                currentCart = currentCart.filter(
                    // @ts-ignore
                    ({ id: productId }) => productId !== productData.id,
                );
                setInCart(false);
                successMessage('Product removed from cart');
            }
            // @ts-ignore
            setCartToLocal(currentCart);
        }
    };

    const handleSizeSelect = (name:string) => {
        setSize(name);
    };

    return (
        <div className="grid pt-3 pb-2 ">
            <div className="col-6">

                <div className="w-full">
                    <BreadCrumb className="w-80 border-0" style={{ backgroundColor: 'transparent' }} model={categories} home={home} />
                </div>
                <div className="w-full p-2">
                    <Galleria
                    // @ts-ignore
                        value={images ?? []}
                        item={itemTemplate}
                        thumbnail={thumbnailTemplate}
                        showThumbnailNavigators={false} // Hide thumbnail navigator arrows
                        showThumbnails
                    />

                </div>
                <div style={{ backgroundColor: 'transparent!important' }} className="w-full pl-3 pr-3">
                    <TabMenu
                        className="border-primary"
                        model={itemsProduct}
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    />
                    {
                        activeIndex === 0 && (
                            <p className="m-0 p-2" style={{ backgroundColor: 'transparent!important' }}>
                                {/* @ts-ignore  */}
                                {productData?.description ?? ''}
                            </p>
                        )
                    }
                    {
                        activeIndex === 1 && (
                            <div>
                                {id && <ReviewsProduct id={id} />}
                                <div className="w-full flex justify-content-start border-1 border-gray-300 m-2 p-2  shadow-8 border-round-lg">
                                    <div className="m-2 p-2">
                                        <Avatar label="P" size="large" shape="circle" />
                                    </div>
                                    <div className="m-2 p-2">
                                        <div className="pb-2">
                                            <span className="font-medium text-lg">Helen M.&nbsp;</span>
                                            <span className="text-gray-500">Yesterday</span>
                                        </div>
                                        <div className="pr-2 pl-2 mt-1">
                                            <Rating value={4} readOnly cancel={false} />
                                        </div>
                                        <div className=" p-2">Excellent running shoes</div>
                                        <div>
                                            <i
                                                className="pi pi-thumbs-up m-2"
                                            />
                                            <i
                                                className="pi pi-thumbs-down m-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-content-start border-1 border-gray-300 m-2 p-2  shadow-8 border-round-lg">
                                    <div className="m-2 p-2">
                                        <Avatar label="P" size="large" shape="circle" />
                                    </div>
                                    <div className="m-2 p-2">
                                        <div className="pb-2">
                                            <span className="font-medium text-lg">Helen M.&nbsp;</span>
                                            <span className="text-gray-500">Yesterday</span>
                                        </div>
                                        <div className="pr-2 pl-2 mt-1">
                                            <Rating value={4} readOnly cancel={false} />
                                        </div>
                                        <div className=" p-2">Excellent running shoes</div>
                                        <div>
                                            <i
                                                className="pi pi-thumbs-up m-2"
                                            />
                                            <i
                                                className="pi pi-thumbs-down m-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="col-6">
                <div className="w-full flex justify-content-center ">
                    <div className="w-11 p-3  ">

                        <div className="text-3xl w-full font-bold   text-center pl-3 flex justify-content-between align-items-center ">
                            {/* @ts-ignore */}
                            <div className="text-primary  font-italic">{productData.title}</div>
                            {/* @ts-ignore */}
                            {productData?.brand?.[0] && (
                                <div className="text-gray-500">
                                    {/* @ts-ignore */}
                                    {productData.brand}
&nbsp;
                                    {/* @ts-ignore */}
                                    <Avatar label={productData?.brand[0]} size="large" shape="circle" />
                                </div>
                            )}
                        </div>
                        <div className="pl-4 flex">
                            <Rating
                                //  @ts-ignore
                                value={productData?.averageRating ?? 5}
                                readOnly
                                cancel={false}
                            />
                            {' '}
&nbsp;
                            {/* @ts-ignore */}
                            {productData?.numRatings && (<span className="text-gray-600">{productData?.numRatings}</span>)}
                        </div>
                        <div className="pl-4 ">
                            <div className="pt-3">
                                <span className="gap-4 text-4xl line-through">
                                    ₹
                                    {' '}
                                    {/* @ts-ignore */}
                                    {productData.price}
                                </span>
                                &nbsp;
                                <span className="text-xl gap-4 text-red-600">
                                    %
                                    {/* @ts-ignore */}
                                    { productData.discountPercent}
                                </span>
&nbsp;
&nbsp;
&nbsp;
                                <span className="text-6xl gap-4">
                                    ₹
                                    {/* @ts-ignore */}
                                    { productData.discountedPrice}
                                </span>
                            </div>
                            <div className="text-xl font-medium text-gray-500    pt-1 pb-1">Color</div>
                            <div className="w-5 flex justify-content-start pt-2 gap-4">
                                <div
                                    className="w-5rem h-5rem border-3 border-gray-400 border-round-lg"
                                    style={{
                                        background: ' linear-gradient(to bottom, rgba(210,224,251, 1), rgba(210,224,251, 0.5))',
                                    }}
                                />
                            </div>
                            <div className="text-xl font-medium text-gray-500    pt-2 pb-1">Size</div>
                            <div className="pt-2">
                                {/* @ts-ignore */}
                                {isArrayValidAndNotEmpty(productData?.size) &&
                                // @ts-ignore
                                  (productData?.size.map(({ name }) => (
                                      <Button
                                          key={name}
                                          className="p-3 w-5rem mr-2 "
                                          label={name}
                                          outlined={cartSize !== name}
                                          raised
                                          onClick={() => handleSizeSelect(name)}
                                          rounded
                                      />
                                  )))}
                            </div>
                            <Card className="p-0 mt-3">
                                This product is eligible for return or
                                exchange under our 30-day return or exchange policy.
                                No questions asked.
                            </Card>
                            <div className="flex w-full pt-3">
                                <div className="w-6  pr-2">
                                    <Button
                                        // @ts-ignore
                                        icon={productData?.wislist ? 'pi pi-heart-fill' : 'pi pi-heart'}
                                        className="p-3 w-full text-lg"
                                        // @ts-ignore
                                        label={productData?.wishlist ? 'Wishlisted' : 'Add to wishlist'}
                                        outlined
                                        onClick={handleAddToWishlist}
                                    />
                                </div>
                                <Button
                                    icon={inCart ?
                                        'pi pi-cart-minus' : 'pi pi-shopping-cart'}
                                    className="p-3 w-6 text-lg col-6 "
                                    label={inCart ? 'Remove from cart ' : ' Add to cart '}
                                    onClick={handleAddToCart}
                                />
                            </div>
                            <br />
                            <br />
                            {/* @ts-ignore  */}
                            <Ratings overall={productData?.averageRating ?? 5} id={id} />
                        </div>
                        {id && <SimilarProducts id={id} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductContainer;
