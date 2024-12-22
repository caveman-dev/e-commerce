// import { getAppVersion } from './localStorage';
// import { RouteName } from '../types/CommonTypes';

import { RouteName } from '../types/commonTypes';
import { getAppVersion } from './localStorage';
import { isTextValidAndNotEmpty } from './nullChecks';

export const PAGE_ROUTES: Record<RouteName, string> = {
    BASE_ROUTE: '/',
    HOME: '/home',
    ADMIN: '/admin',
    PRODUCTS: '/admin/products',
    CATEGORIES: '/admin/categories',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_DASHBOARD: '/admin/dashboard',
    CUSTOMERS: '/admin/customers',
    LOGIN: '/getStarted',
    UNAUTHORIZED: '/unauthorised',
    PRODUCT: '/product',
    PRODUCT_LISTING: '/productListing/:params?',
    CHECKOUT: '/checkout',
    WISHLIST: '/wishlist',
    ORDERS: '/orders',
    CONTACT_US: '/contactUs',
};

export const DEFAULT_PAGE_NUMBER = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [5, 10, 25];
export const QUANTITY_ROUND_DIGITS = '4';

export const getJsonPath = (
    path: string,
    {
        configUrl = import.meta.env.BASE_URL,
        appVersionNumber = getAppVersion(),
    } = {},
) => {
    let jsonPath = path || '';
    console.log('jsonPath:1 ', jsonPath);
    if (!jsonPath.startsWith('/')) {
        jsonPath = '/'.concat(jsonPath);
    }
    console.log('jsonPath:2 ', jsonPath);

    if (!jsonPath.startsWith('Public')) {
        jsonPath = 'public'.concat(jsonPath);
    }
    console.log('jsonPath:3 ', jsonPath);

    if (isTextValidAndNotEmpty(appVersionNumber)) {
        return `${configUrl}${jsonPath}?ver=${appVersionNumber}`;
    }
    return `${configUrl}${jsonPath}`;
};
