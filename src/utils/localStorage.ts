// import { isJsonString, isObjectValidAndNotEmpty, isTextValidAndNotEmpty } from './nullChecks';
// import { NumberOf } from './commonUtils';
// import { LoginState, SessionData } from '../types/LogInTypes';

import { Theme } from '../store/storeTypes';
import { LoginState, SessionData } from '../types/loginTypes';
import { isJsonString } from './nullChecks';

export const JSONToken = 'JSONToken';
export const APP_VERSION = 'AppVersion';
const REDUX_AUTH = 'redux:auth';
const CART = 'CART';
const THEME = 'theme';
const ADDRESS = 'address';

// const PRIVILEGES = 'privileges';
const ROUNDING_PLACES = 'rounding.places';

const getCookieValue = (name:string) => {
    const appVersionCookie = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    if (!appVersionCookie) {
        return '';
    }
    return appVersionCookie.pop() || '';
};

// export const persistPrivileges = (privileges: Array<string>) => {
//     localStorage.setItem(PRIVILEGES, privileges.join(','));
// };
// export const getPrivileges = () => localStorage.getItem(PRIVILEGES);

export const persistLogin = (state: SessionData) => {
    localStorage.setItem(REDUX_AUTH, JSON.stringify({ isLoggedIn: true, login: state }));
};

// @ts-ignore
export const setCartToLocal = (products) => {
    localStorage.setItem(CART, JSON.stringify(products));
};
export const getCartFromLocal = () => {
    const cart = localStorage.getItem(CART);
    console.log('cart: w3234234', cart);
    console.log('isJsonString(cart):w3234234 ', cart && isJsonString(cart));
    if (cart && isJsonString(cart)) {
        return JSON.parse(cart);
    }
    return null;
};

export const getLoginState = (): LoginState => {
    const storedState = localStorage.getItem(REDUX_AUTH);
    let loginState;
    if (storedState && isJsonString(storedState)) {
        loginState = JSON.parse(storedState);
    } else {
        loginState = {
            isLoggedIn: false,
            login: null,
        };
    }
    return loginState;
};

export const setTheme = (theme:Theme) => {
    localStorage.setItem(THEME, theme);
};
export const getTheme = () => localStorage.getItem(THEME) as Theme;

export const setAddress = (address:string) => {
    localStorage.setItem(ADDRESS, address);
};
export const getAddress = () => localStorage.getItem(ADDRESS) as Theme;

// export const getLoggedInUserName = () => {
//     const state = getLoginState();
//     return (state?.login?.name);
// };

// export const getLoggedInUserTitle = () => {
//     const state = getLoginState();
//     return state?.login?.title;
// };

export const getAppVersion = () => getCookieValue(APP_VERSION);

export const persistRoundingPlaces = (roundingPlaces: string) => {
    localStorage.setItem(ROUNDING_PLACES, roundingPlaces);
};
// export const getRoundingPlaces = () => NumberOf(localStorage.getItem(ROUNDING_PLACES)) || 2;

export const clearAllDataAndReload = (reload = true) => {
    localStorage.clear();
    sessionStorage.clear();
    if (reload)setTimeout(() => window.location.reload(), 1000);
    // document.cookie = `${JSONToken}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};
