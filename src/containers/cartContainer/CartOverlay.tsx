import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from 'react';
import useGlobalStore from '../../store/store';
import { GlobalState } from '../../store/storeTypes';
import { getCartFromLocal, getLoginState } from '../../utils/localStorage';
import useFetchCart from './useFetchCart';
// @ts-ignore
import CartDetails from './cartDetails';

const CartOverlay = () => {
    const [showCart, setShowCart] = useState(false);
    const [displayProducts, setDisplayProducts] = useState([]);

    const { isLoggedIn } = getLoginState();
    const setCartClose = useGlobalStore((state: GlobalState) => state.setCartClose);
    const setCartOpen = useGlobalStore((state: GlobalState) => state.setCartOpen);
    const { cart } = useGlobalStore();
    const cartProducts = getCartFromLocal();
    const { data, refetch } = useFetchCart(isLoggedIn, showCart, cart);

    useEffect(() => {
        const mainData = isLoggedIn ? data : cartProducts;
        if (Array.isArray(mainData)) {
            // @ts-ignore
            setDisplayProducts(mainData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(cartProducts), JSON.stringify(data),
    ]);

    const toggleCartSlider = () => {
        setShowCart(!showCart);
        if (showCart) {
            setCartClose();
        } else {
            setCartOpen();
        }
    };

    const customHeader = (
        <div className="w-full flex justify-content-between align-items-center">

            <div className="flex align-items-center p-0  m-0 gap-2">
                <i className="pi pi-shopping-cart" />
                <h2>Cart</h2>
                <span className="font-italic"> &nbsp;Amlost there!</span>
            </div>
        </div>
    );
    return (
        <div>
            <Sidebar
                header={customHeader}
                visible={showCart}
                onHide={toggleCartSlider}
                position="right"
                className="md:w-20rem lg:w-30rem"
            >
                {showCart && (
                    <CartDetails
                    // @ts-ignore
                        checkout
                        displayProducts={displayProducts}
                        refetch={refetch}
                    />
                )}
            </Sidebar>
            <div className="fixed z-3 top-50 right-0 p-relative">
                <div className="relative">
                    <Button
                        icon="pi pi-shopping-cart"
                        className="border-noround-right "
                        size="large"
                        onClick={toggleCartSlider}
                    />

                    {displayProducts.length > 0 && (
                        <Badge
                            value={displayProducts.length}
                            severity="danger"
                            style={{ position: 'absolute', top: '-10px', right: '50%' }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartOverlay;
