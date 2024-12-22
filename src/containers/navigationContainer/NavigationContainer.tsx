import { Avatar } from 'primereact/avatar';
// import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';
// import { Menubar } from 'primereact/menubar';
// import { MenuItem } from 'primereact/menuitem';
import { MegaMenu } from 'primereact/megamenu';
import { ToggleButton } from 'primereact/togglebutton';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import {
    useEffect, useMemo, useRef,
    useState,
} from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
// import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { ListBox, ListBoxChangeEvent } from 'primereact/listbox';
import { useHistory } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import axios from 'axios';
import { getJsonPath, PAGE_ROUTES } from '../../utils/constants';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import { NameCode } from '../../types/commonTypes';
import useGlobalStore from '../../store/store';
import {
    clearAllDataAndReload,
    // setTheme
} from '../../utils/localStorage';
import { useCommonMessageAndSpinnerHandlers } from '../../hooks/useCommonMessageAndSpinnerHandlers';
import { GlobalState } from '../../store/storeTypes';
import './navigationContainer.css';
import api from '../../utils/api';
import resolvePromise from '../../utils/resolvePromise';
import { isObjectValidAndNotEmpty } from '../../utils/nullChecks';

const NavigationContainer = () => {
    const loginPanelRef = useRef<OverlayPanel | null>(null);
    const history = useHistory();
    const { isAdmin, isLoggedIn } = useGlobalStore();
    const setLogout = useGlobalStore((state: GlobalState) => state.setLogout);
    const setUser = useGlobalStore((state: GlobalState) => state.setUser);
    const [menuItems, setMenuItems] = useState([]);
    console.log('', isAdmin);

    const commonHandlers = useCommonMessageAndSpinnerHandlers();
    const {
        successMessage, showSpinner,
        hideSpinner,
    } = commonHandlers;
    // @ts-ignore
    const convertToMenuItems = (data) => data.map((topLevel) => ({
        label: topLevel.name.toUpperCase(),

        // @ts-ignore
        items: topLevel.secondLevelCategories.map((secondLevel) => ({
            label: secondLevel.name,
            // @ts-ignore
            items: secondLevel.thirdLevelCategories.map((thirdLevel) => ({
                label: thirdLevel.name,
                command: () => {
                    history.push(
                        `productListing?thirdLevelCategory=${thirdLevel.id}`,
                    );
                },
            })),
        })),
    }));

    useEffect(() => {
        const fetchMenuItems = async () => {
            const categoriesPromise = axios.get(api.CATEGORIES.HIERARCHICAL);
            const [response] = await resolvePromise(categoriesPromise, commonHandlers);
            if (isObjectValidAndNotEmpty(response)) {
                const updatedMenuItems = convertToMenuItems(response);
                setMenuItems(updatedMenuItems);
                console.log('response:234234234234 ', response);
            }
        };
        fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // const [loginOption, setLoginOption] = useState('');
    // const itemRenderer = (item) => (
    //     // eslint-disable-next-line jsx-a11y/anchor-is-valid
    //     <a className="flex align-items-center p-menuitem-link">
    //         <span className={item.icon} />
    //         <span className="mx-2">{item.label}</span>
    //         {item.badge && <Badge className="ml-auto" value={item.badge} />}
    // eslint-disable-next-line max-len
    //         {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    //     </a>
    // );
    const { theme, toggleTheme } = useThemeSwitcher();
    // useEffect(() => {
    //     console.log('theme: 2342423423', theme);
    //     setTheme(theme);
    // }, [theme]);
    const toggleCheck = theme === 'light';
    const loginOptions:NameCode[] = useMemo(() => {
        let options = [
            { name: 'CONTACT US', code: 'CONTACT US' },
        ];
        if (isLoggedIn) {
            options = options.concat([
                { name: 'ORDERS', code: 'ORDERS' },
                { name: 'WISHLIST', code: 'WISHLIST' }]);
        }
        console.log('options: 23423423', options);
        return options;
    }, [isLoggedIn]);
    console.log('isLoggedIn: 23123', isLoggedIn);
    console.log('theme:2223423 ', theme);
    // const items: MenuItem[] = [
    //     {
    //         label: 'MEN',
    //         icon: 'pi pi-mars',
    //         items: [
    //             {
    //                 label: 'Clothing',
    //                 items: [
    //                     { label: 'Mens\'s Kurtas' },
    //                     { label: 'Shirts' },
    //                     { label: 'Jeans' },
    //                     { label: 'Sweaters' },
    //                     { label: 'T-Shirts' },
    //                     { label: 'Jackets' },
    //                     { label: 'Active Wear' },
    //                 ],
    //             },
    //             {
    //                 label: 'Accessories',
    //                 items: [
    //                     { label: 'Watches' },
    //                     { label: 'Wallets' },
    //                     { label: 'Bags' },
    //                     { label: 'Sunglasses' },
    //                     { label: 'Hats' },
    //                     { label: 'Belts' },
    //                 ],
    //             },
    //             {
    //                 label: 'Brands',
    //                 items: [
    //                     { label: 'Re-Arranged' },
    //                     { label: 'Counterfeit' },
    //                     { label: 'Full Nelseon' },
    //                     { label: 'My Way' },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         label: 'WOMEN',
    //         icon: 'pi pi-venus',
    //         items: [
    //             {
    //                 label: 'Clothing',
    //                 items: [
    //                     { label: 'Tops' },
    //                     { label: 'Dresses' },
    //                     { label: 'Jeans' },
    //                     { label: 'Sweaters' },
    //                     { label: 'T-Shirts' },
    //                     { label: 'Jackets' },
    //                     { label: 'Active Wear' },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         label: 'BRAND',
    //         icon: 'pi pi-sparkles',
    //     },
    //     {
    //         label: 'STORES',
    //         icon: 'pi pi-shop',
    //     },
    // ];

    const handleNavigation = () => {
        if (isLoggedIn) {
            successMessage('User has been logged out');
            showSpinner();
            clearAllDataAndReload(false);
            setLogout();
            setUser();
            hideSpinner();
            history.push(PAGE_ROUTES.BASE_ROUTE);
        } else {
            history.push(PAGE_ROUTES.LOGIN);
        }
    };
    const handleOptionsChange = (event:ListBoxChangeEvent) => {
        console.log('e:23423 ', event.value);
        const { value: { code } } = event;
        switch (code) {
            case 'ORDERS':
                history.push(PAGE_ROUTES.ORDERS);
                break;
            case 'WISHLIST':
                history.push(PAGE_ROUTES.WISHLIST);
                break;
            case 'CONTACT US':
                history.push(PAGE_ROUTES.CONTACT_US);
                break;
            default:
                break;
        }
    };

    const toggleThemeHandler = () => {
        // if (theme === 'dark') {
        //     setTheme('dark');
        // } else {
        //     setTheme('light');
        // }
        toggleTheme();
    };
    const start = (
        <Button
            className="p-0 border-0 "
            style={{ background: 'transparent', border: 'none' }}
            onClick={() => history.push(PAGE_ROUTES.BASE_ROUTE)}
        >
            <img alt="logo" src={getJsonPath('/corals_name.svg')} height="50" className="mr-2" />
        </Button>
    );
    const end = (
        <div className="flex align-items-center gap-2">
            {!isAdmin && (
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText placeholder="Search" type="text" className="w-4rem sm:w-auto p-inputtext-sm" />
                    {/* <InputText v-model="value1" placeholder="Search" /> */}
                </IconField>
            )}
            <ToggleButton
                onIcon="pi pi-sun"
                offIcon="pi pi-moon"
                onLabel=""
                offLabel=""
                checked={toggleCheck}
                onChange={toggleThemeHandler}
            />
            <Avatar icon="pi pi-user" className="cursor-pointer" shape="circle" onClick={(e) => loginPanelRef.current?.toggle(e)} />
            <OverlayPanel ref={loginPanelRef} className="flex align-items-start mt-4 z-1">
                <div className="flex flex-column align-items-start w-14rem ">
                    <div>
                        <div className="text-sm font-semibold">
                            Welcome
                        </div>
                        {
                            !isLoggedIn && (
                                <div className="text-xs">
                                    To access account and manage orders
                                </div>
                            )
                        }
                    </div>
                    <br />
                    <div className="flex justify-content-center align-items-center w-full m-2">
                        <div>
                            <Avatar icon="pi pi-user" size="xlarge" className="cursor-pointer p-overlay-badge" shape="circle" onClick={(e) => loginPanelRef.current?.toggle(e)}>
                                {(isLoggedIn || true) && <Badge value="+" />}
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex justify-content-center align-items-center w-full mt-2">
                        <Button type="button" onClick={handleNavigation} label={isLoggedIn ? 'LOGOUT' : 'LOGIN/SIGNUP'} icon={isLoggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in'} className="p-button-sm w-full" />
                    </div>
                    {/* <Divider className="border-1" /> */}
                    {/* <div>
                        ORDERS
                    </div>
                    <div>
                        WISHLIST
                        </div>
                        <div>
                        CONTACT US
                        </div> */}
                    <div className="flex justify-content-center align-items-center w-full ">
                        <ListBox
                            className="border-0 w-full"
                            listClassName="text-xs p-0 m-0"
                            // value={loginOption}
                            onChange={handleOptionsChange}
                            options={loginOptions}
                            optionLabel="name"
                        />
                    </div>
                </div>
            </OverlayPanel>
        </div>
    );

    return (
        // <div className="card">
        <MegaMenu className="p-2   text-sm border-noround-top" model={isAdmin ? [] : menuItems} start={start} end={end} />
        // </div>
    );
};

export default NavigationContainer;
