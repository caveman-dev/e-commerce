import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { MegaMenu } from 'primereact/megamenu';
import { ToggleButton } from 'primereact/togglebutton';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import {
    useEffect, useMemo, useRef,
    useState,
} from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
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
            const categoriesPromise = axios.get(api.CATEGORIES.HIERARCHICAL, {
                withCredentials: true,
            });
            const [response] = await resolvePromise(categoriesPromise, commonHandlers);
            if (isObjectValidAndNotEmpty(response)) {
                const updatedMenuItems = convertToMenuItems(response);
                setMenuItems(updatedMenuItems);
            }
        };
        fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { theme, toggleTheme } = useThemeSwitcher();
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
        return options;
    }, [isLoggedIn]);

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
        toggleTheme();
    };
    const start = (
        <Button
            className="p-0 border-0 "
            style={{ background: 'transparent', border: 'none' }}
            onClick={() => history.push(PAGE_ROUTES.BASE_ROUTE)}
        >
            <img alt="logo" src={getJsonPath('corals_name.svg')} height="50" className="mr-2" />
        </Button>
    );
    const end = (
        <div className="flex align-items-center gap-2">
            {!isAdmin && (
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText placeholder="Search" type="text" className="w-4rem sm:w-auto p-inputtext-sm" />
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
                    <div className="flex justify-content-center align-items-center w-full ">
                        <ListBox
                            className="border-0 w-full"
                            listClassName="text-xs p-0 m-0"
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
        <MegaMenu className="p-2   text-sm border-noround-top" model={isAdmin ? [] : menuItems} start={start} end={end} />
    );
};

export default NavigationContainer;
