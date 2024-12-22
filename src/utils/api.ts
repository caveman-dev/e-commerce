const serverContext = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/corals` : '/corals';

export default {
    USERS: {
        REGISTER_NEW_USER: `${serverContext}/users/registerNewUser`,
        AUTHENTICATE_AND_GET_TOKEN: `${serverContext}/users/authenticateAndGetToken`,
    },
    CATEGORIES: {
        LIST: `${serverContext}/categories/search`,
        CREATE_CATEGORY:
        `${serverContext}/categories/createCategory`,
        SEARCH:
        `${serverContext}/categories/search`,
        DELETE: `${serverContext}/categories/`,
        HIERARCHICAL: `${serverContext}/categories/hierarchical`,
    },
    PRODUCTS: {
        CREATE: `${serverContext}/product/create`,
        LIST: `${serverContext}/product/all`,
        PRODUCT: `${serverContext}/product/`,
        RELATED: `${serverContext}/product/related/`,
    },
    WISHLIST: {
        ADD: `${serverContext}/wishlist/add?productId=`,
        LIST: `${serverContext}/wishlist/get`,
        REMOVE: `${serverContext}/wishlist/remove?productId=`,
    },
    CARTS: {
        ADD_ITEMS_TO_CART: `${serverContext}/carts/addItemsToCart`,
        GET_CART_FOR_USERS: `${serverContext}/carts/getCartForUsers`,
        UPDATE: `${serverContext}/carts/updateCartItems`,
        REMOVE: `${serverContext}/carts/removeCartItems`,
    },
    ADDRESSES: {
        CREATE: `${serverContext}/addresses/create`,
        // LIST: `${serverContext}/addresses`,
        LIST: `${serverContext}/addresses/getAddressForUser/`,
        DELETE: `${serverContext}/addresses/delete/`,
    },
    PAYMENT: {
        INTENT: `${serverContext}/paymentGateway/checkout`,
    },
    ORDERS: {
        CREATE: `${serverContext}/orders/createOrders`,
        GET_ORDERS: `${serverContext}/orders/getOrders/`,
    },
    REVIEWS: {
        CREATE: `${serverContext}/reviews/create`,
        GET: `${serverContext}/reviews/`,
        COUNT: `${serverContext}/reviews/rating-counts/`,
    },
};
