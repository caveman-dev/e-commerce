interface CustomMenuItem {
    label: string;
    icon?: string;
    command?: () => void;
}

type NavigateFunction = (path: string) => void;

export const getMenuItems = (navigate: NavigateFunction): CustomMenuItem[] => [
    // {
    //     label: 'Dashboard',
    //     icon: 'pi pi-fw pi-home',
    //     command: () => {
    //         navigate('/admin/dashboard');
    //     },
    // },
    // {
    //     label: 'Products',
    //     icon: 'pi pi-fw pi-tags',
    //     command: () => {
    //         navigate('/admin/products');
    //     },
    // },
    {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        command: () => {
            navigate('/admin/dashboard');
        },
    },
    {
        label: 'Products',
        icon: 'pi pi-fw pi-box',
        command: () => {
            navigate('/admin/products');
        },
    },
    {
        label: 'Categories',
        icon: 'pi pi-fw pi-sitemap',
        command: () => {
            navigate('/admin/categories');
        },
    },
    {
        label: 'Customers',
        icon: 'pi pi-fw pi-users',
        command: () => {
            navigate('/admin/customers');
        },
    },
    {
        label: 'Orders',
        icon: 'pi pi-fw pi-truck',
        command: () => {
            navigate('/admin/orders');
        },
    },
];
export const a = 'a';
