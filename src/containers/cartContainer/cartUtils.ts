import { getCartFromLocal } from '../../utils/localStorage';
import { isArrayValidAndNotEmpty, isObjectValidAndNotEmpty } from '../../utils/nullChecks';

export const checkIfProductPresentinCart = (id:number, cart:[] = []) => {
    console.log('id:342342 ', id);
    console.log('cart:642342342 ', cart);
    const currentCart = isArrayValidAndNotEmpty(getCartFromLocal()) ?
        getCartFromLocal() : cart;
    // @ts-ignore
    const productPresentinCartCheck = currentCart?.find(({ productId }) => (productId === id));
    console.log('getCartFromLocal():2341231 ', id, getCartFromLocal(), productPresentinCartCheck);
    console.log('productPresentinCartCheck: 983692804', productPresentinCartCheck);
    // if (isObjectValidAndNotEmpty(productPresentinCartCheck) || isArrayValidAndNotEmpty(cart)) {
    if (isObjectValidAndNotEmpty(productPresentinCartCheck)) {
        return true;
    }
    return false;
};
export const a = '1';
