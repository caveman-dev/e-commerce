export type RouteName = 'HOME' | 'BASE_ROUTE' | 'ADMIN' | 'PRODUCTS' | 'CATEGORIES' | 'ORDERS' | 'ADMIN_DASHBOARD' | 'CUSTOMERS' | 'LOGIN' |
 'UNAUTHORIZED' | 'PRODUCT' | 'PRODUCT_LISTING' | 'CHECKOUT' | 'ADMIN_ORDERS' | 'CONTACT_US' | 'WISHLIST';

export interface ErrorType {
    message: string
    exception: string
}
export interface MenuItemType {
    label: string;
    icon: string;
    route?: string;
    privilege?: string;
command?:()=>void
}

export interface NameCode {
    name: string;
    code: string | number | boolean | null;
}

export interface KeyValue {
    key: string;
    value: string | number | boolean | null;
}
export interface LabelValue {
    label: string;
    value: string | number | boolean | null;
}

export interface GenericKeyValue<K, V> {
    key: K;
    value: V;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export interface MapKV extends Object {
    [name: string]: unknown,
}

export type GenericMapKV<K extends string | number, V> = {
    [key in K]: V;
};
